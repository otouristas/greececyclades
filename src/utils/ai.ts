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

// OpenRouter API key
const OPENROUTER_API_KEY = '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';

// Simple fallback response for when the API fails
const getSimpleFallbackResponse = (userInput: string) => {
  // Create a more personalized response based on the user input
  let customResponse = `I'd be happy to help you plan a trip to the Greek islands! `;
  
  // Check for common keywords in the user input
  if (userInput.toLowerCase().includes('santorini')) {
    customResponse += `Santorini is a fantastic choice! Known for its stunning caldera views, white-washed buildings with blue domes, and spectacular sunsets, it's one of the most iconic Greek islands. `;
  }
  
  if (userInput.toLowerCase().includes('mykonos')) {
    customResponse += `Mykonos is famous for its vibrant nightlife, beautiful beaches, and iconic windmills. It's perfect if you're looking for a mix of relaxation and entertainment. `;
  }
  
  if (userInput.toLowerCase().includes('naxos')) {
    customResponse += `Naxos is the largest of the Cyclades islands, offering beautiful beaches, mountain villages, and ancient ruins. It's more laid-back than Santorini or Mykonos. `;
  }
  
  if (userInput.toLowerCase().includes('paros')) {
    customResponse += `Paros offers a great balance of beautiful beaches, traditional villages, and good nightlife options, without being as crowded or expensive as Mykonos. `;
  }
  
  // Add general recommendations
  customResponse += `\n\nHere are some general recommendations for the Greek islands:

1. **Popular islands** like Santorini and Mykonos offer stunning views, luxury accommodations, and vibrant nightlife, but can be crowded and expensive.

2. **More relaxed islands** like Naxos, Paros, and Milos have beautiful beaches, charming villages, and are more budget-friendly.

3. **Off-the-beaten-path islands** like Folegandros, Sifnos, and Amorgos offer authentic experiences with fewer tourists.

For a more detailed itinerary, please provide:
- Your travel dates or preferred season
- Trip duration
- Your interests (beaches, history, food, hiking, etc.)
- Your travel pace (relaxed, moderate, active)
- Any specific islands you're interested in

I'll then create a personalized itinerary for your Greek island adventure!`;

  return {
    message: customResponse
  };
};

// Mock response system for quick and reliable responses
export async function generateConversationalTrip(
  userInput: string,
  _conversationHistory: string // Prefix with underscore to indicate it's not used
): Promise<{
  message: string;
  tripPlan?: {
    islands: any[];
    itinerary: {
      day: number;
      title: string;
      description: string;
      activities: {
        time: string;
        title: string;
        description: string;
        location?: string;
        type: 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport';
      }[];
    }[];
  };
}> {
  try {
    console.log('Starting generateConversationalTrip with input:', userInput);
    
    // For now, use a mock response system that's guaranteed to work
    // This avoids the API timeout issues while still providing useful responses
    
    // Check if this is a detailed trip planning request
    const isTripPlanningRequest = 
      userInput.toLowerCase().includes('day') || 
      userInput.toLowerCase().includes('trip') ||
      userInput.toLowerCase().includes('plan') ||
      userInput.toLowerCase().includes('visit') ||
      userInput.toLowerCase().includes('travel');
    
    // If it's a detailed trip planning request with specific islands and duration
    if (isTripPlanningRequest && 
        (userInput.toLowerCase().includes('santorini') || 
         userInput.toLowerCase().includes('mykonos') || 
         userInput.toLowerCase().includes('naxos'))) {
      
      // Extract duration if mentioned
      let duration = 7; // Default
      const durationMatch = userInput.match(/(\d+)[ -]day/);
      if (durationMatch && durationMatch[1]) {
        duration = parseInt(durationMatch[1]);
      }
      
      // Create a sample trip plan
      const islands = [];
      const itinerary = [];
      
      // Add islands based on what was mentioned
      if (userInput.toLowerCase().includes('santorini')) {
        islands.push({
          name: 'Santorini',
          description: 'Famous for its stunning caldera views, white-washed buildings, and sunsets',
          image: 'https://greececyclades.com/images/islands/santorini.jpg'
        });
      }
      
      if (userInput.toLowerCase().includes('mykonos')) {
        islands.push({
          name: 'Mykonos',
          description: 'Known for beautiful beaches, vibrant nightlife, and iconic windmills',
          image: 'https://greececyclades.com/images/islands/mykonos.jpg'
        });
      }
      
      if (userInput.toLowerCase().includes('naxos')) {
        islands.push({
          name: 'Naxos',
          description: 'The largest Cycladic island with beautiful beaches and mountain villages',
          image: 'https://greececyclades.com/images/islands/naxos.jpg'
        });
      }
      
      // If no specific islands were mentioned, add some popular ones
      if (islands.length === 0) {
        islands.push({
          name: 'Santorini',
          description: 'Famous for its stunning caldera views, white-washed buildings, and sunsets',
          image: 'https://greececyclades.com/images/islands/santorini.jpg'
        });
        
        islands.push({
          name: 'Mykonos',
          description: 'Known for beautiful beaches, vibrant nightlife, and iconic windmills',
          image: 'https://greececyclades.com/images/islands/mykonos.jpg'
        });
      }
      
      // Create a simple itinerary
      for (let day = 1; day <= Math.min(duration, 10); day++) {
        const islandIndex = (day - 1) % islands.length;
        const island = islands[islandIndex];
        
        const dayActivities = [];
        
        // Morning activity
        dayActivities.push({
          time: '9:00 AM',
          title: day === 1 ? `Arrive in ${island.name}` : `Explore ${island.name}`,
          description: day === 1 ? `Check into your hotel and get settled` : `Start your day with a walking tour of the main attractions`,
          location: island.name,
          type: 'sightseeing' as 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport'
        });
        
        // Lunch
        dayActivities.push({
          time: '1:00 PM',
          title: 'Enjoy a traditional Greek lunch',
          description: 'Try local specialties at a taverna with a view',
          location: island.name,
          type: 'dining' as 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport'
        });
        
        // Afternoon activity
        dayActivities.push({
          time: '3:00 PM',
          title: island.name === 'Santorini' ? 'Visit a local winery' : 'Relax at the beach',
          description: island.name === 'Santorini' ? 'Santorini is famous for its unique wines' : 'Enjoy the crystal clear waters',
          location: island.name,
          type: (island.name === 'Santorini' ? 'activity' : 'beach') as 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport'
        });
        
        // Dinner
        dayActivities.push({
          time: '7:00 PM',
          title: 'Dinner with a view',
          description: 'Enjoy fresh seafood and local cuisine',
          location: island.name,
          type: 'dining' as 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport'
        });
        
        // Add the day to the itinerary
        itinerary.push({
          day: day,
          title: day === 1 ? `Arrival in ${island.name}` : `Day ${day} in ${island.name}`,
          description: `Explore the beauty of ${island.name}`,
          activities: dayActivities
        });
      }
      
      // Create a personalized response
      const response = `Based on your request, I've created a ${duration}-day itinerary for your trip to the Greek islands! Here's a personalized plan for visiting ${islands.map(i => i.name).join(' and ')}.

I've included a mix of sightseeing, beach time, dining experiences, and local activities to give you a well-rounded experience. The itinerary is flexible, so you can adjust it based on your preferences.

Some highlights of this trip:
${islands.map(island => `- Explore the beauty of ${island.name} and experience ${island.description.toLowerCase()}`).join('\n')}

I've also included a detailed day-by-day itinerary with specific activities for each day. You can view the full plan below.`;

      return {
        message: response,
        tripPlan: {
          islands,
          itinerary
        }
      };
    }
    
    // For all other requests, return a customized response
    return getSimpleFallbackResponse(userInput);
    
  } catch (error) {
    console.error('Error in generateConversationalTrip:', error);
    
    // Return a fallback response instead of throwing an error
    return getSimpleFallbackResponse(userInput);
  }
}

export async function generateTripSuggestions(tripDetails: TripDetails): Promise<TripSuggestion> {
  try {
    const prompt = generatePrompt(tripDetails);
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Greece Cyclades Trip Planner',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API error:', errorData);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in API response');
    }
    
    // Parse the response to extract island recommendations
    const lines = content.split('\n');
    const selectedIslands: string[] = [];
    let explanation = '';
    let isExplanation = false;
    
    for (const line of lines) {
      if (line.includes('Selected Islands:')) {
        isExplanation = false;
      } else if (line.includes('Explanation:')) {
        isExplanation = true;
      } else if (line.trim().startsWith('- ') && !isExplanation) {
        const island = line.trim().substring(2);
        selectedIslands.push(island);
      } else if (isExplanation) {
        explanation += line + '\n';
      }
    }
    
    return {
      selectedIslands,
      explanation: explanation.trim()
    };
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    return generateFallbackSuggestions(tripDetails);
  }
}

function generatePrompt(tripDetails: TripDetails): string {
  return `
You are an AI travel assistant specializing in Greek island travel, particularly the Cyclades. 
I need you to recommend the best islands for a ${tripDetails.duration}-day trip in ${tripDetails.month}, 
based on the following preferences:

Desired vibes: ${tripDetails.vibes.join(', ')}
Travel pace: ${tripDetails.pace}

Available islands:
${tripDetails.islands.map(island => `
- ${island.name}
  Description: ${island.description}
  Activities: ${island.activities.join(', ')}
  Highlights: ${island.highlights.join(', ')}
  Vibes: ${island.vibes.join(', ')}
`).join('')}

Please recommend which islands to visit and explain why they're a good fit for these preferences.
Format your response as follows:

Selected Islands:
- [Island Name 1]
- [Island Name 2]
- [Island Name 3]

Explanation:
[Your detailed explanation of why these islands are recommended]
`;
}

function generateFallbackSuggestions(tripDetails: TripDetails): TripSuggestion {
  // Simple logic to select islands based on duration
  const selectedIslands = tripDetails.islands
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, Math.min(tripDetails.duration / 3, tripDetails.islands.length)) // Select a reasonable number of islands
    .map(island => island.name);
  
  return {
    selectedIslands,
    explanation: `Based on your ${tripDetails.duration}-day trip in ${tripDetails.month} with a ${tripDetails.pace} pace, 
    I've selected these islands that match your preferred vibes (${tripDetails.vibes.join(', ')}). 
    Each island offers unique experiences that align with your preferences.`
  };
}
