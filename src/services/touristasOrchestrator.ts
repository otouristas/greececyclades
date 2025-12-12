/**
 * Touristas AI Orchestrator Service
 * Calls the touristas-orchestrator edge function
 * Implements the Orchestrator-Worker pattern with Gemini
 */

import { supabase } from '@/lib/supabase';

export interface OrchestratorMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface OrchestratorMetadata {
    deconstructed: {
        destination: string;
        duration: string;
        intents: string[];
        dates?: { checkin?: string; checkout?: string };
        travelers?: number;
        budget?: 'budget' | 'mid-range' | 'luxury';
        contextKeywords: string[];
    };
    workerData: {
        hotels?: Array<{
            name: string;
            stars: number;
            pricePerNight: number;
            currency: string;
            location: string;
            highlights: string[];
        }>;
        weather?: {
            destination: string;
            forecast: string;
            temperature: { min: number; max: number };
            conditions: string;
            ferryStatus: string;
        };
        activities?: any[];
        places?: any[];
    };
}

export interface OrchestratorResponse {
    response: string;
    metadata?: OrchestratorMetadata;
    success: boolean;
    error?: string;
}

/**
 * Send a message to the Touristas AI Orchestrator
 * Uses Gemini for query understanding and synthesis
 */
export async function sendToOrchestrator(
    messages: OrchestratorMessage[],
    userContext?: {
        favoriteIslands?: string[];
        travelStyle?: string;
        budget?: string;
    }
): Promise<OrchestratorResponse> {
    try {
        const { data, error } = await supabase.functions.invoke('touristas-orchestrator', {
            body: { messages, userContext }
        });

        if (error) {
            console.error('Orchestrator error:', error);
            return {
                response: 'I apologize, I had trouble connecting. Please try again.',
                success: false,
                error: error.message
            };
        }

        return data as OrchestratorResponse;
    } catch (err) {
        console.error('Orchestrator fetch error:', err);
        return {
            response: 'Unable to reach Touristas AI. Please check your connection.',
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error'
        };
    }
}

/**
 * Check if the orchestrator is available
 */
export async function checkOrchestratorHealth(): Promise<boolean> {
    try {
        const response = await sendToOrchestrator([
            { role: 'user', content: 'ping' }
        ]);
        return response.success;
    } catch {
        return false;
    }
}
