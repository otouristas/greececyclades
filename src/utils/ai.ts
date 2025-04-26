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

// Use OpenRouter API for conversational trip planning
export async function generateConversationalTrip(
  userInput: string,
  conversationHistory: string
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
    
    // Create conversation history in the format expected by OpenRouter
    const messages = [
      {
        role: "system",
        content: `You are a knowledgeable Greek travel assistant specializing in the Cyclades islands. 
        Provide helpful, accurate information about Greek islands, travel tips, and personalized itineraries.
        When creating trip plans, be specific about islands, activities, and logistics.
        Focus on providing authentic experiences that match the user's preferences.
        If the user is asking for a detailed trip plan, try to extract information about:
        - Trip duration
        - Travel dates/season
        - Islands of interest
        - Activities they enjoy
        - Travel style (luxury, budget, etc.)
        
        When appropriate, provide a structured trip plan with a day-by-day itinerary.
        Include specific recommendations for beaches, restaurants, activities, and sights.
        
        Format trip plans in a clear, organized way with days, times, and descriptions.
        If you don't know something, admit it rather than making up information.`
      }
    ];
    
    // Add conversation history if available
    if (conversationHistory) {
      const historyLines = conversationHistory.split('\n');
      for (const line of historyLines) {
        if (line.startsWith('User:')) {
          messages.push({
            role: "user",
            content: line.substring(5).trim()
          });
        } else if (line.startsWith('Assistant:')) {
          messages.push({
            role: "assistant",
            content: line.substring(10).trim()
          });
        }
      }
    }
    
    // Add the current user input
    messages.push({
      role: "user",
      content: userInput
    });
    
    // Set up timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out after 30 seconds'));
      }, 30000); // 30 second timeout
    });
    
    // Call OpenRouter API with timeout
    const fetchPromise = fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://greececyclades.com',
        'X-Title': 'Greece Cyclades Trip Planner'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku:beta', // Using a faster model to reduce timeouts
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });
    
    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Check if the response has the expected structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Received an invalid response from the AI service');
    }
    
    const aiMessage = data.choices[0].message.content;
    
    // Check if the response contains a trip plan
    let tripPlan = undefined;
    
    // Look for patterns that suggest a trip plan is included
    const hasDayByDayItinerary = 
      (aiMessage.includes('Day 1') && aiMessage.includes('Day 2')) || 
      (aiMessage.includes('Day 1:') && aiMessage.includes('Day 2:'));
    
    const mentionsMultipleIslands = 
      (aiMessage.toLowerCase().includes('santorini') && aiMessage.toLowerCase().includes('mykonos')) ||
      (aiMessage.toLowerCase().includes('santorini') && aiMessage.toLowerCase().includes('naxos')) ||
      (aiMessage.toLowerCase().includes('mykonos') && aiMessage.toLowerCase().includes('naxos'));
    
    // If it seems like a trip plan, create a structured tripPlan object
    if (hasDayByDayItinerary && mentionsMultipleIslands) {
      // Extract mentioned islands
      const islands = [];
      const islandNames = ['Santorini', 'Mykonos', 'Naxos', 'Paros', 'Milos', 'Folegandros', 'Sifnos', 'Amorgos'];
      
      for (const island of islandNames) {
        if (aiMessage.includes(island)) {
          islands.push({
            name: island,
            description: `Visit the beautiful island of ${island}`,
            image: `https://greececyclades.com/images/islands/${island.toLowerCase()}.jpg`
          });
        }
      }
      
      // Create a simple itinerary based on the response
      const itinerary = [];
      const dayMatches = aiMessage.match(/Day \d+:?[^\n]*/g) || [];
      
      for (let i = 0; i < dayMatches.length && i < 10; i++) {
        const dayMatch = dayMatches[i];
        const dayNumber = parseInt(dayMatch.match(/\d+/)[0]);
        
        // Find the content for this day
        const startIndex = aiMessage.indexOf(dayMatch);
        const nextDayMatch = dayMatches[i + 1];
        const endIndex = nextDayMatch ? aiMessage.indexOf(nextDayMatch) : aiMessage.length;
        const dayContent = aiMessage.substring(startIndex, endIndex);
        
        // Extract title and description
        const title = dayMatch.replace(/Day \d+:?\s*/, '').trim();
        const description = dayContent.split('\n')[1]?.trim() || 'Explore and enjoy the island';
        
        // Create activities
        const activities = [];
        const timeMatches = dayContent.match(/\d{1,2}:\d{2} [AP]M[^\n]*/g) || [];
        
        for (const timeMatch of timeMatches) {
          // Check if the match has the expected format
          const timeRegex = /\d{1,2}:\d{2} [AP]M/;
          if (!timeRegex.test(timeMatch)) {
            continue;
          }
          
          const time = timeMatch.match(timeRegex)[0];
          const activityTitle = timeMatch.replace(/\d{1,2}:\d{2} [AP]M\s*-?\s*/, '').trim();
          
          // Determine activity type
          let type: 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport' = 'activity';
          if (activityTitle.toLowerCase().includes('breakfast') || 
              activityTitle.toLowerCase().includes('lunch') || 
              activityTitle.toLowerCase().includes('dinner')) {
            type = 'dining';
          } else if (activityTitle.toLowerCase().includes('beach')) {
            type = 'beach';
          } else if (activityTitle.toLowerCase().includes('tour') || 
                    activityTitle.toLowerCase().includes('visit')) {
            type = 'sightseeing';
          } else if (activityTitle.toLowerCase().includes('ferry') || 
                    activityTitle.toLowerCase().includes('travel')) {
            type = 'transport';
          }
          
          activities.push({
            time,
            title: activityTitle,
            description: 'Enjoy this activity on your Greek island adventure',
            type
          });
        }
        
        // If no activities were found, add a placeholder
        if (activities.length === 0) {
          activities.push({
            time: '9:00 AM',
            title: 'Start your day exploring',
            description: 'Enjoy the beauty of the Greek islands',
            type: 'activity' as 'sightseeing' | 'dining' | 'beach' | 'activity' | 'transport'
          });
        }
        
        itinerary.push({
          day: dayNumber,
          title: title as string,
          description: description as string,
          activities
        });
      }
      
      // If we have islands and itinerary items, create a trip plan
      if (islands.length > 0 && itinerary.length > 0) {
        tripPlan = {
          islands,
          itinerary
        };
      }
    }
    
    return {
      message: aiMessage,
      tripPlan
    };
  } catch (error) {
    console.error('Error in generateConversationalTrip:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Unknown error type:', error);
    }
    
    // Create a more helpful error message based on the error
    let errorMessage = "I apologize, but I encountered an error while generating your trip plan.";
    
    if (error instanceof Error) {
      if (error.message.includes('timed out')) {
        errorMessage = "I apologize, but my response took too long to generate. This might be due to high traffic or complex planning needs.";
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = "I apologize, but I'm having trouble connecting to my knowledge database right now.";
      }
    }
    
    errorMessage += " Here are some general recommendations for Greek island travel:\n\n" +
      "1. **Popular islands** like Santorini and Mykonos offer stunning views, luxury accommodations, and vibrant nightlife.\n" +
      "2. **More relaxed islands** like Naxos, Paros, and Milos have beautiful beaches and are more budget-friendly.\n" +
      "3. **Off-the-beaten-path islands** like Folegandros, Sifnos, and Amorgos offer authentic experiences.\n\n" +
      "Please try again with more specific details about your trip preferences, such as:\n" +
      "- When you plan to travel\n" +
      "- How long your trip will be\n" +
      "- What kind of experiences you're looking for (beaches, history, food, etc.)\n" +
      "- Your travel style (luxury, budget, adventure, relaxation)";
    
    // Return a fallback response if the API call fails
    return {
      message: errorMessage
    };
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
