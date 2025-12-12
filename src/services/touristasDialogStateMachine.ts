/**
 * Touristas AI - Dialog State Machine
 * Progressive field collection for conversational booking flows
 * 
 * Pattern: Ask ONE question at a time, never overwhelm the user
 */

import {
    PromptPattern,
    matchPromptPatterns,
    getBestMatch,
    getMissingFields,
    getNextQuestion,
    APITrigger,
    IntentCategory,
} from '@/data/touristasPromptLibrary';
import { findIslandByInput } from '@/data/cycladesNormalization';

// ============================================
// TYPES
// ============================================

export type DialogState =
    | 'IDLE'                    // No active conversation flow
    | 'INTENT_DETECTED'         // User intent recognized, may need more info
    | 'COLLECTING_FIELDS'       // Asking clarification questions
    | 'READY_TO_CALL_API'       // All required fields collected
    | 'API_IN_PROGRESS'         // Waiting for API response
    | 'PRESENTING_RESULTS'      // Showing results to user
    | 'AWAITING_SELECTION'      // User needs to pick from options
    | 'BOOKING_CONFIRMATION'    // User confirming booking
    | 'COMPLETE';               // Flow complete

export interface ConversationContext {
    sessionId: string;
    state: DialogState;
    currentPattern: PromptPattern | null;
    collectedFields: Record<string, any>;
    missingFields: string[];
    turnCount: number;
    conversationHistory: ConversationTurn[];
    lastApiResult?: any;
    selectedItem?: any;
}

export interface ConversationTurn {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    intent?: IntentCategory;
    extractedData?: Record<string, any>;
}

export interface DialogTransition {
    nextState: DialogState;
    response: string;
    shouldCallAPI: boolean;
    apiTrigger?: APITrigger;
    apiParams?: Record<string, any>;
}

// ============================================
// FIELD EXTRACTION PATTERNS
// ============================================

const datePatterns: Record<string, RegExp> = {
    tomorrow: /tomorrow/i,
    today: /today/i,
    nextWeek: /next\s*week/i,
    nextWeekend: /next\s*weekend/i,
    specificDate: /(\d{1,2})[\/\-](\d{1,2})[\/\-]?(\d{2,4})?/,
    monthDay: /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s*(\d{1,2})/i,
    dayMonth: /(\d{1,2})\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    relative: /in\s*(\d+)\s*days?/i,
};

const passengerPatterns = {
    adults: /(\d+)\s*adult/i,
    children: /(\d+)\s*(child|kid)/i,
    infants: /(\d+)\s*(infant|baby)/i,
    total: /(\d+)\s*(people|travelers|passengers|guests)/i,
    family: /family\s*of\s*(\d+)/i,
    couple: /couple|2\s*people/i,
};

// ============================================
// FIELD EXTRACTORS
// ============================================

/**
 * Extract date from natural language
 */
export function extractDate(text: string): string | null {
    const today = new Date();

    if (datePatterns.tomorrow.test(text)) {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return formatDate(tomorrow);
    }

    if (datePatterns.today.test(text)) {
        return formatDate(today);
    }

    if (datePatterns.nextWeekend.test(text)) {
        const saturday = new Date(today);
        saturday.setDate(today.getDate() + (6 - today.getDay() + 7) % 7);
        return formatDate(saturday);
    }

    if (datePatterns.nextWeek.test(text)) {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return formatDate(nextWeek);
    }

    // Match specific date formats
    const specificMatch = text.match(datePatterns.specificDate);
    if (specificMatch) {
        const [, day, month, year] = specificMatch;
        const fullYear = year ? (year.length === 2 ? `20${year}` : year) : today.getFullYear();
        return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Match "July 15" or "15 July"
    const monthDayMatch = text.match(datePatterns.monthDay);
    if (monthDayMatch) {
        const month = parseMonth(monthDayMatch[1]);
        const day = monthDayMatch[2];
        const year = today.getFullYear();
        return `${year}-${month}-${day.padStart(2, '0')}`;
    }

    const dayMonthMatch = text.match(datePatterns.dayMonth);
    if (dayMonthMatch) {
        const day = dayMonthMatch[1];
        const month = parseMonth(dayMonthMatch[2]);
        const year = today.getFullYear();
        return `${year}-${month}-${day.padStart(2, '0')}`;
    }

    // Match "in X days"
    const relativeMatch = text.match(datePatterns.relative);
    if (relativeMatch) {
        const days = parseInt(relativeMatch[1]);
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + days);
        return formatDate(futureDate);
    }

    return null;
}

/**
 * Extract passenger counts
 */
export function extractPassengers(text: string): {
    adults?: number;
    children?: number;
    infants?: number;
    total?: number;
} {
    const result: { adults?: number; children?: number; infants?: number; total?: number } = {};

    if (passengerPatterns.couple.test(text)) {
        result.adults = 2;
        result.total = 2;
    }

    const adultsMatch = text.match(passengerPatterns.adults);
    if (adultsMatch) {
        result.adults = parseInt(adultsMatch[1]);
    }

    const childrenMatch = text.match(passengerPatterns.children);
    if (childrenMatch) {
        result.children = parseInt(childrenMatch[1]);
    }

    const infantsMatch = text.match(passengerPatterns.infants);
    if (infantsMatch) {
        result.infants = parseInt(infantsMatch[1]);
    }

    const totalMatch = text.match(passengerPatterns.total);
    if (totalMatch) {
        result.total = parseInt(totalMatch[1]);
        if (!result.adults) {
            result.adults = result.total;
        }
    }

    const familyMatch = text.match(passengerPatterns.family);
    if (familyMatch) {
        result.total = parseInt(familyMatch[1]);
        // Assume 2 adults, rest are children
        result.adults = 2;
        result.children = Math.max(0, result.total - 2);
    }

    return result;
}

/**
 * Extract location/island
 */
export function extractLocation(text: string): {
    from?: string;
    to?: string;
    location?: string;
} {
    const lowerText = text.toLowerCase();
    const result: { from?: string; to?: string; location?: string } = {};

    // Pattern: "from X to Y"
    const fromToMatch = text.match(/from\s+(\w+)\s+to\s+(\w+)/i);
    if (fromToMatch) {
        const fromIsland = findIslandByInput(fromToMatch[1]);
        const toIsland = findIslandByInput(fromToMatch[2]);
        if (fromIsland) result.from = fromIsland.name;
        if (toIsland) result.to = toIsland.name;
    }

    // Pattern: "X → Y" or "X to Y"
    const arrowMatch = text.match(/(\w+)\s*(?:→|->|to)\s*(\w+)/i);
    if (arrowMatch && !result.from) {
        const fromIsland = findIslandByInput(arrowMatch[1]);
        const toIsland = findIslandByInput(arrowMatch[2]);
        if (fromIsland) result.from = fromIsland.name;
        if (toIsland) result.to = toIsland.name;
    }

    // Pattern: "in X" (for hotels, activities)
    const inMatch = text.match(/in\s+(\w+)/i);
    if (inMatch) {
        const island = findIslandByInput(inMatch[1]);
        if (island) result.location = island.name;
    }

    // Check for any Cyclades island mentioned
    const islands = ['santorini', 'mykonos', 'paros', 'naxos', 'ios', 'milos', 'syros',
        'tinos', 'andros', 'sifnos', 'folegandros', 'amorgos', 'koufonisia',
        'piraeus', 'athens', 'rafina'];

    for (const island of islands) {
        if (lowerText.includes(island) && !result.location && !result.to) {
            result.location = island.charAt(0).toUpperCase() + island.slice(1);
        }
    }

    return result;
}

// ============================================
// DIALOG STATE MACHINE
// ============================================

export class TouristasDialogMachine {
    private context: ConversationContext;

    constructor(sessionId?: string) {
        this.context = {
            sessionId: sessionId || this.generateSessionId(),
            state: 'IDLE',
            currentPattern: null,
            collectedFields: {},
            missingFields: [],
            turnCount: 0,
            conversationHistory: [],
        };
    }

    /**
     * Process a user message and return the next action
     */
    public processMessage(userMessage: string): DialogTransition {
        this.context.turnCount++;

        // Add to history
        this.context.conversationHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: new Date().toISOString(),
        });

        // Extract any data from the message
        const extractedData = this.extractAllFields(userMessage);

        // Merge extracted data into collected fields
        this.context.collectedFields = {
            ...this.context.collectedFields,
            ...extractedData,
        };

        switch (this.context.state) {
            case 'IDLE':
                return this.handleIdleState(userMessage);

            case 'COLLECTING_FIELDS':
                return this.handleCollectingState(userMessage, extractedData);

            case 'PRESENTING_RESULTS':
                return this.handleResultsState(userMessage);

            case 'AWAITING_SELECTION':
                return this.handleSelectionState(userMessage);

            default:
                return this.handleIdleState(userMessage);
        }
    }

    private handleIdleState(userMessage: string): DialogTransition {
        // Try to match a prompt pattern
        const pattern = getBestMatch(userMessage);

        if (!pattern) {
            // No matching pattern - pass to general info
            return {
                nextState: 'IDLE',
                response: 'I can help you with flights, ferries, hotels, activities, weather, and trip planning in the Cyclades. What would you like to explore?',
                shouldCallAPI: false,
            };
        }

        this.context.currentPattern = pattern;
        this.context.state = 'INTENT_DETECTED';

        // Check for missing fields
        const missing = getMissingFields(pattern, this.context.collectedFields);
        this.context.missingFields = missing;

        if (missing.length === 0) {
            // We have everything, call the API
            this.context.state = 'READY_TO_CALL_API';
            return {
                nextState: 'API_IN_PROGRESS',
                response: `${pattern.responseTemplate}`,
                shouldCallAPI: true,
                apiTrigger: pattern.apiTrigger,
                apiParams: this.context.collectedFields,
            };
        } else {
            // Ask for the first missing field
            this.context.state = 'COLLECTING_FIELDS';
            const question = getNextQuestion(pattern, missing);
            return {
                nextState: 'COLLECTING_FIELDS',
                response: question || 'Could you provide more details?',
                shouldCallAPI: false,
            };
        }
    }

    private handleCollectingState(
        userMessage: string,
        extractedData: Record<string, any>
    ): DialogTransition {
        if (!this.context.currentPattern) {
            this.context.state = 'IDLE';
            return this.handleIdleState(userMessage);
        }

        // Re-check missing fields after extraction
        const missing = getMissingFields(this.context.currentPattern, this.context.collectedFields);
        this.context.missingFields = missing;

        if (missing.length === 0) {
            // All fields collected, call API
            this.context.state = 'API_IN_PROGRESS';
            return {
                nextState: 'API_IN_PROGRESS',
                response: `${this.context.currentPattern.responseTemplate}`,
                shouldCallAPI: true,
                apiTrigger: this.context.currentPattern.apiTrigger,
                apiParams: this.context.collectedFields,
            };
        } else {
            // Ask for the next missing field (ONE at a time!)
            const question = getNextQuestion(this.context.currentPattern, missing);
            return {
                nextState: 'COLLECTING_FIELDS',
                response: question || 'Could you provide more details?',
                shouldCallAPI: false,
            };
        }
    }

    private handleResultsState(userMessage: string): DialogTransition {
        // User might ask follow-up or make selection
        const lower = userMessage.toLowerCase();

        if (lower.includes('book') || lower.includes('select') || lower.includes('choose')) {
            this.context.state = 'AWAITING_SELECTION';
            return {
                nextState: 'AWAITING_SELECTION',
                response: 'Which option would you like to book?',
                shouldCallAPI: false,
            };
        }

        // Check if user asks about a specific option
        const numberMatch = userMessage.match(/\b(\d+)\b/);
        if (numberMatch) {
            const selection = parseInt(numberMatch[1]);
            this.context.selectedItem = selection;
            return {
                nextState: 'BOOKING_CONFIRMATION',
                response: `Great choice! Option ${selection} selected. Would you like me to proceed with the booking?`,
                shouldCallAPI: false,
            };
        }

        // Reset for new query
        return this.handleIdleState(userMessage);
    }

    private handleSelectionState(userMessage: string): DialogTransition {
        // Handle selection
        const numberMatch = userMessage.match(/\b(\d+)\b/);
        if (numberMatch) {
            const selection = parseInt(numberMatch[1]);
            this.context.selectedItem = selection;
            this.context.state = 'BOOKING_CONFIRMATION';
            return {
                nextState: 'BOOKING_CONFIRMATION',
                response: `Option ${selection} selected. I'll generate the booking link for you now.`,
                shouldCallAPI: false,
            };
        }

        const lower = userMessage.toLowerCase();
        if (lower.includes('first') || lower.includes('top') || lower.includes('best')) {
            this.context.selectedItem = 1;
            this.context.state = 'BOOKING_CONFIRMATION';
            return {
                nextState: 'BOOKING_CONFIRMATION',
                response: 'Great! I\'ll proceed with the first/best option. Generating booking link...',
                shouldCallAPI: false,
            };
        }

        return {
            nextState: 'AWAITING_SELECTION',
            response: 'Please select an option by number (1, 2, 3...) or say "first" for the best match.',
            shouldCallAPI: false,
        };
    }

    /**
     * Extract all possible fields from a message
     */
    private extractAllFields(text: string): Record<string, any> {
        const result: Record<string, any> = {};

        // Extract dates
        const date = extractDate(text);
        if (date) {
            result.departure_date = date;
            result.date = date;
            result.checkin = date;
            result.pickup_date = date;
            result.start_date = date;
        }

        // Check for date ranges (July 10-14)
        const rangeMatch = text.match(/(\w+\s*\d+)\s*[-–to]+\s*(\d+)/i);
        if (rangeMatch) {
            const startDate = extractDate(rangeMatch[1]);
            if (startDate) {
                result.checkin = startDate;
                const endDay = parseInt(rangeMatch[2]);
                const [year, month] = startDate.split('-');
                result.checkout = `${year}-${month}-${endDay.toString().padStart(2, '0')}`;
                result.dropoff_date = result.checkout;
            }
        }

        // Extract passengers
        const passengers = extractPassengers(text);
        if (passengers.adults) result.adults = passengers.adults;
        if (passengers.children) result.children = passengers.children;
        if (passengers.infants) result.infants = passengers.infants;
        if (passengers.total) {
            result.passengers = passengers.total;
            result.guests = passengers.total;
            result.participants = passengers.total;
            result.travelers = passengers.total;
        } else if (passengers.adults) {
            const total = (passengers.adults || 0) + (passengers.children || 0) + (passengers.infants || 0);
            result.passengers = total;
            result.guests = total;
        }

        // Extract locations
        const locations = extractLocation(text);
        if (locations.from) {
            result.from = locations.from;
            result.from_port = locations.from;
            result.departure_airport = locations.from;
            result.origin = locations.from;
        }
        if (locations.to) {
            result.to = locations.to;
            result.to_port = locations.to;
            result.arrival_airport = locations.to;
            result.destination = locations.to;
        }
        if (locations.location) {
            result.location = locations.location;
        }

        // Extract budget
        const budgetMatch = text.match(/under\s*(\d+)/i);
        if (budgetMatch) {
            result.budget_max = parseInt(budgetMatch[1]);
        }

        // Extract duration
        const durationMatch = text.match(/(\d+)\s*(day|night|week)/i);
        if (durationMatch) {
            const num = parseInt(durationMatch[1]);
            const unit = durationMatch[2].toLowerCase();
            result.duration = unit === 'week' ? num * 7 : num;
        }

        return result;
    }

    /**
     * Set API results and transition to presenting
     */
    public setApiResults(results: any): void {
        this.context.lastApiResult = results;
        this.context.state = 'PRESENTING_RESULTS';
    }

    /**
     * Reset the conversation
     */
    public reset(): void {
        this.context = {
            sessionId: this.context.sessionId,
            state: 'IDLE',
            currentPattern: null,
            collectedFields: {},
            missingFields: [],
            turnCount: 0,
            conversationHistory: [],
        };
    }

    /**
     * Get current context
     */
    public getContext(): ConversationContext {
        return { ...this.context };
    }

    private generateSessionId(): string {
        return `touristas_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// ============================================
// HELPERS
// ============================================

function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

function parseMonth(monthStr: string): string {
    const months: Record<string, string> = {
        jan: '01', january: '01',
        feb: '02', february: '02',
        mar: '03', march: '03',
        apr: '04', april: '04',
        may: '05',
        jun: '06', june: '06',
        jul: '07', july: '07',
        aug: '08', august: '08',
        sep: '09', september: '09',
        oct: '10', october: '10',
        nov: '11', november: '11',
        dec: '12', december: '12',
    };
    return months[monthStr.toLowerCase().substring(0, 3)] || '01';
}

export default TouristasDialogMachine;
