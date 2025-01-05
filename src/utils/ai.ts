import axios from 'axios';

interface TripDetails {
  islands: { 
    name: string; 
    activities: string[];
    description: string;
    highlights: string[];
    vibes: string[];
  }[];
  duration: number;
  month: string;
  vibes: string[];
  pace: 'relaxed' | 'moderate' | 'active';
}

interface TripSuggestion {
  selectedIslands: string[];
  explanation: string;
}

export async function generateTripSuggestions(tripDetails: TripDetails): Promise<TripSuggestion> {
  const API_KEY = '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';
  
  try {
    const prompt = generatePrompt(tripDetails);
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    // Parse the AI response
    const aiResponse = response.data.content[0].text;
    const selectedIslands = tripDetails.islands
      .slice(0, Math.min(3, Math.ceil(tripDetails.duration / 3)))
      .map(island => island.name);

    return {
      selectedIslands,
      explanation: aiResponse
    };
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    return generateFallbackSuggestions(tripDetails);
  }
}

function generatePrompt(tripDetails: TripDetails): string {
  const { islands, duration, month, vibes, pace } = tripDetails;
  
  return `As an expert travel planner specializing in the Greek Cyclades islands, create a detailed and engaging travel itinerary for a ${duration}-day trip in ${month}. The traveler prefers a ${pace} pace and is interested in these vibes: ${vibes.join(', ')}.

The trip will cover these islands: ${islands.map(i => i.name).join(', ')}.

For each island, provide:
1. Recommended duration and why
2. Must-see attractions and best times to visit them
3. Unique experiences based on the month and selected vibes
4. Local food recommendations
5. Transportation tips
6. Accommodation areas based on their preferences
7. Time-specific tips (e.g., sunset spots, morning activities)
8. Insider tips that most tourists don't know

Important considerations:
- Month: ${month} (consider weather, crowds, and seasonal activities)
- Pace: ${pace} (adjust daily activity count accordingly)
- Vibes: ${vibes.join(', ')} (tailor suggestions to match these preferences)

Format the response in a clear, engaging way using emojis and sections. Make it personal and conversational.`;
}

function generateFallbackSuggestions(tripDetails: TripDetails): TripSuggestion {
  // Sort islands by number of matching vibes and activities
  const sortedIslands = tripDetails.islands.sort((a, b) => {
    const aVibeMatches = a.vibes.filter(v => tripDetails.vibes.includes(v)).length;
    const bVibeMatches = b.vibes.filter(v => tripDetails.vibes.includes(v)).length;

    // If vibe matches are equal, sort by number of activities
    if (aVibeMatches === bVibeMatches) {
      return b.activities.length - a.activities.length;
    }

    return bVibeMatches - aVibeMatches;
  });

  // Take the top islands based on duration
  const selectedIslands = sortedIslands.slice(0, Math.min(tripDetails.duration / 2, sortedIslands.length));

  // Generate explanation
  let explanation = `Based on your preferences, I recommend visiting these islands:\n\n`;

  selectedIslands.forEach((island, index) => {
    const days = index === 0 ? Math.ceil(tripDetails.duration / 2) : Math.floor(tripDetails.duration / 2);
    explanation += `🏝️ ${island.name} (${days} days)\n`;
    explanation += `${island.description}\n\n`;
    
    if (island.highlights && island.highlights.length > 0) {
      explanation += "✨ Highlights:\n";
      island.highlights.forEach(spot => {
        explanation += `• ${spot}\n`;
      });
      explanation += '\n';
    }

    if (island.activities && island.activities.length > 0) {
      explanation += "🎯 Activities:\n";
      island.activities.forEach(activity => {
        explanation += `• ${activity}\n`;
      });
      explanation += '\n';
    }
  });

  return {
    selectedIslands: selectedIslands.map(i => i.name),
    explanation
  };
}
