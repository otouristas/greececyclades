/**
 * Planner Service
 * Handles itinerary saving, sharing, and optimization
 */

import { supabase } from '../lib/supabase';

export interface ItineraryStep {
    islandId: string;
    islandName: string;
    days: number;
    notes?: string;
    ferryInfo?: {
        operator: string;
        departureTime: string;
        arrivalTime: string;
        price: number;
    };
}

export interface SavedItinerary {
    id: string;
    userId: string;
    name: string;
    startDate: string;
    steps: ItineraryStep[];
    totalDays: number;
    estimatedCost: number;
    shareCode?: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

class PlannerService {
    // Save itinerary to database
    async saveItinerary(
        userId: string,
        name: string,
        startDate: string,
        steps: ItineraryStep[],
        estimatedCost: number
    ): Promise<SavedItinerary | null> {
        const totalDays = steps.reduce((sum, step) => sum + step.days, 0);
        const islands = steps.map(s => s.islandName);

        const { data, error } = await supabase
            .from('trip_plans')
            .insert({
                user_id: userId,
                title: name,
                start_date: startDate,
                end_date: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + totalDays)).toISOString().split('T')[0],
                duration: totalDays,
                islands,
                estimated_budget: estimatedCost,
                notes: JSON.stringify(steps),
                status: 'planned'
            })
            .select()
            .single();

        if (error) {
            console.error('Failed to save itinerary:', error);
            return null;
        }

        return {
            id: data.id,
            userId: data.user_id,
            name: data.title,
            startDate: data.start_date,
            steps,
            totalDays: data.duration,
            estimatedCost: data.estimated_budget,
            isPublic: false,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        };
    }

    // Load user's itineraries
    async getUserItineraries(userId: string): Promise<SavedItinerary[]> {
        const { data, error } = await supabase
            .from('trip_plans')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error || !data) {
            console.error('Failed to load itineraries:', error);
            return [];
        }

        return data.map(item => ({
            id: item.id,
            userId: item.user_id,
            name: item.title,
            startDate: item.start_date,
            steps: JSON.parse(item.notes || '[]'),
            totalDays: item.duration,
            estimatedCost: item.estimated_budget,
            isPublic: false,
            createdAt: item.created_at,
            updatedAt: item.updated_at
        }));
    }

    // Generate share code for itinerary
    async generateShareCode(itineraryId: string): Promise<string | null> {
        const shareCode = this.generateRandomCode();

        // Update itinerary with share code
        const { error } = await supabase
            .from('trip_plans')
            .update({ notes: JSON.stringify({ shareCode }) })
            .eq('id', itineraryId);

        if (error) {
            console.error('Failed to generate share code:', error);
            return null;
        }

        return shareCode;
    }

    // Generate ICS calendar file content
    generateCalendarFile(
        tripName: string,
        steps: ItineraryStep[],
        startDate: Date
    ): string {
        let currentDate = new Date(startDate);
        let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Discover Cyclades//Island Hopping Planner//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${tripName}
`;

        steps.forEach((step, index) => {
            const eventStart = new Date(currentDate);
            currentDate.setDate(currentDate.getDate() + step.days);
            const eventEnd = new Date(currentDate);

            const uid = `${Date.now()}-${index}@discovercyclades.gr`;
            const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            const dtStart = eventStart.toISOString().split('T')[0].replace(/-/g, '');
            const dtEnd = eventEnd.toISOString().split('T')[0].replace(/-/g, '');

            icsContent += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}
DTSTART;VALUE=DATE:${dtStart}
DTEND;VALUE=DATE:${dtEnd}
SUMMARY:🏝️ ${step.islandName}
DESCRIPTION:${step.days} days in ${step.islandName}, Cyclades, Greece${step.notes ? '\\n' + step.notes : ''}
LOCATION:${step.islandName}, Cyclades, Greece
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
`;
        });

        icsContent += 'END:VCALENDAR';
        return icsContent;
    }

    // Download calendar file
    downloadCalendar(tripName: string, steps: ItineraryStep[], startDate: Date) {
        const content = this.generateCalendarFile(tripName, steps, startDate);
        const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${tripName.replace(/\s+/g, '-').toLowerCase()}-itinerary.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Optimize route using simple distance heuristic
    optimizeRoute(islands: string[]): string[] {
        // Simple optimization: group nearby islands together
        // In a real implementation, this would call an AI/algorithm endpoint

        const islandGroups: Record<string, string[]> = {
            'central': ['paros', 'naxos', 'ios', 'santorini'],
            'western': ['milos', 'sifnos', 'serifos', 'kythnos', 'kea'],
            'northern': ['mykonos', 'tinos', 'syros', 'andros'],
            'eastern': ['amorgos', 'koufonisia', 'schinoussa', 'iraklia', 'donoussa']
        };

        // Group islands by region
        const groupedIslands: { island: string; group: string }[] = islands.map(island => {
            for (const [group, groupIslands] of Object.entries(islandGroups)) {
                if (groupIslands.includes(island.toLowerCase())) {
                    return { island, group };
                }
            }
            return { island, group: 'other' };
        });

        // Sort by group, then by original order within group
        return groupedIslands
            .sort((a, b) => a.group.localeCompare(b.group))
            .map(item => item.island);
    }

    // Calculate estimated ferry cost
    estimateFerryCost(fromIsland: string, toIsland: string): number {
        // Base price estimation based on distance
        const basePrices: Record<string, number> = {
            'piraeus': 40,
            'default': 25
        };

        const from = fromIsland.toLowerCase();
        return basePrices[from] || basePrices.default;
    }

    // Generate random share code
    private generateRandomCode(): string {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
}

export const plannerService = new PlannerService();
