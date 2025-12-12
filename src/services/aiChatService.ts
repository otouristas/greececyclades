import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase';
import { cyclades } from '../data/islandsData';

// Build rich website context from local data
function buildWebsiteContext(): string {
  const islandsSummary = cyclades.map(island => {
    return `- **${island.name}**: ${island.shortDescription || island.description?.slice(0, 100) || ''}`;
  }).join('\n');

  return `
## Available Islands in Database:
${islandsSummary}

## Website Features:
- 24 Cyclades islands with detailed guides
- Hotel search and booking integration
- Ferry schedule information
- Activities and tours booking
- AI-powered trip planning

## Current Promotions:
- Island hopping packages available
- Early booking discounts for summer 2025
`;
}

// Get current date context
function getDateContext(): string {
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();
  const season = getSeason(now.getMonth());

  return `Current date: ${month} ${year}
Current season: ${season}
Best time to visit: May-October (peak: July-August)
Shoulder season: April-May, September-October (recommended for fewer crowds)`;
}

function getSeason(month: number): string {
  if (month >= 5 && month <= 8) return 'Summer (Peak Season)';
  if (month >= 3 && month <= 4) return 'Spring (Shoulder Season)';
  if (month >= 9 && month <= 10) return 'Autumn (Shoulder Season)';
  return 'Winter (Off Season)';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  islandContext?: string;
  budget?: 'budget' | 'mid-range' | 'luxury';
  travelers?: number;
  onChunk?: (chunk: string) => void;
}

/**
 * Process a single SSE line and extract content
 */
function processSSELine(line: string, onContent: (content: string) => void): void {
  const trimmed = line.trim();
  if (!trimmed.startsWith('data: ')) return;

  const data = trimmed.slice(6);
  if (data === '[DONE]') return;

  try {
    const parsed = JSON.parse(data);
    const content = parsed.choices?.[0]?.delta?.content || '';
    if (content) {
      onContent(content);
    }
  } catch {
    // Not valid JSON, might be partial data - ignore
  }
}

/**
 * Call the Touristas AI Orchestrator with REAL Weather/Hotel data
 * Uses Gemini AI + WeatherAPI.com + LiteAPI
 */
export async function sendChatMessage(
  messages: ChatMessage[],
  options: ChatOptions = {}
): Promise<string> {
  const { budget, travelers, onChunk } = options;

  // Build user context
  const userContext: Record<string, any> = {};
  if (budget) userContext.budget = budget;
  if (travelers) userContext.travelers = travelers;

  try {
    // Call Supabase Edge Function - touristas-orchestrator with REAL data
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/touristas-orchestrator`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          userContext,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Unknown error from orchestrator');
    }

    const fullContent = data.response || '';

    // Call onChunk with full content (non-streaming for now)
    if (onChunk && fullContent) {
      onChunk(fullContent);
    }

    return fullContent;

  } catch (error) {
    console.error('Touristas Orchestrator error:', error);
    throw error;
  }
}

/**
 * Quick chat without streaming (for simple queries)
 */
export async function quickChat(prompt: string): Promise<string> {
  const messages: ChatMessage[] = [{ role: 'user', content: prompt }];
  return sendChatMessage(messages);
}
