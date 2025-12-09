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
 * Call the Perplexity-powered Cyclades Chat API with streaming
 */
export async function sendChatMessage(
  messages: ChatMessage[],
  options: ChatOptions = {}
): Promise<string> {
  const { islandContext, budget, travelers, onChunk } = options;
  
  // Build preferences object
  const preferences: Record<string, any> = {};
  if (budget) preferences.budget = budget;
  if (travelers) preferences.travelers = travelers;

  // Build website context from our data
  const websiteContext = buildWebsiteContext();
  const dateContext = getDateContext();

  try {
    // Call Supabase Edge Function
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/cyclades-chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          websiteContext,
          dateContext,
          islandContext: islandContext || null,
          preferences: Object.keys(preferences).length > 0 ? preferences : null,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `API error: ${response.status}`);
    }

    // Handle streaming response
    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      
      // Parse SSE events
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';
            if (content) {
              fullContent += content;
              onChunk?.(content);
            }
          } catch {
            // Not valid JSON, might be partial data
          }
        }
      }
    }

    return fullContent;

  } catch (error) {
    console.error('Chat API error:', error);
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
