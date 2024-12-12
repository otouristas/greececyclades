import axios from 'axios';

interface TripDetails {
  islands: { 
    name: string; 
    activities: string[];
    description: string;
    mustSee: string[];
    vibes: string[];
  }[];
  duration: number;
  month: string;
  vibes: string[];
  pace: 'relaxed' | 'moderate' | 'active';
}

export async function generateTripSuggestions(tripDetails: TripDetails) {
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

    return response.data.content[0].text;
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

function generateFallbackSuggestions(tripDetails: TripDetails) {
  const islandCount = tripDetails.islands.length;
  const daysPerIsland = Math.floor(tripDetails.duration / islandCount);
  
  const monthCharacteristics = {
    May: "perfect spring weather with mild temperatures and blooming wildflowers",
    June: "early summer warmth with long daylight hours and fewer crowds",
    July: "peak summer season with vibrant atmosphere and warm seas",
    August: "bustling high season with festive events and warmest waters",
    September: "pleasant late summer weather with warm seas and wine harvests",
    October: "mild autumn temperatures with golden light and peaceful ambiance"
  };

  const paceCharacteristics = {
    relaxed: "taking time to soak in each location",
    moderate: "balancing activities with relaxation",
    active: "maximizing experiences each day"
  };

  const monthDesc = monthCharacteristics[tripDetails.month as keyof typeof monthCharacteristics] || "great weather";
  const paceDesc = paceCharacteristics[tripDetails.pace];

  let suggestion = `🌞 Your ${tripDetails.duration}-Day Cyclades Adventure (${tripDetails.month})\n\n`;
  suggestion += `I've crafted an exciting itinerary that makes the most of ${monthDesc}, while ${paceDesc}!\n\n`;
  
  tripDetails.islands.forEach((island, index) => {
    const days = index === 0 ? daysPerIsland + (tripDetails.duration % islandCount) : daysPerIsland;
    suggestion += `🏝️ ${island.name} (${days} days):\n`;
    suggestion += `Experience the magic of ${island.name} during ${monthDesc}. Perfect for: ${island.vibes.join(', ')}.\n\n`;
    
    suggestion += "Must-See Highlights:\n";
    suggestion += island.mustSee.map(spot => `• ${spot}\n`).join('');
    suggestion += "\nRecommended Activities:\n";
    suggestion += island.activities.map(activity => `• ${activity}\n`).join('');
    
    // Add specific recommendations based on the island
    if (island.name === 'Santorini') {
      suggestion += "\n💎 Insider Tips:\n";
      suggestion += "• Book a sunset wine tasting at Venetsanos Winery for a less crowded alternative to Oia\n";
      suggestion += "• Visit Akrotiri archaeological site first thing in the morning to avoid crowds\n";
      suggestion += "• Take the hidden path from Oia to Ammoudi Bay for swimming\n";
    } else if (island.name === 'Mykonos') {
      suggestion += "\n💎 Insider Tips:\n";
      suggestion += "• Watch the sunset from 180° Sunset Bar - less crowded than Little Venice\n";
      suggestion += "• Visit Fokos Beach for a secluded experience away from crowds\n";
      suggestion += "• Try the local specialty 'kopanisti' at Joanna's Nikos Place Taverna\n";
    } else if (island.name === 'Naxos') {
      suggestion += "\n💎 Insider Tips:\n";
      suggestion += "• Hike to the hidden Routsouna waterfall - locals' secret spot\n";
      suggestion += "• Visit Halki village early morning before day-trippers arrive\n";
      suggestion += "• Try kitesurfing at Mikri Vigla - one of the best spots in Europe\n";
    } else if (island.name === 'Milos') {
      suggestion += "\n💎 Insider Tips:\n";
      suggestion += "• Visit Sarakiniko beach at sunrise for the best photos\n";
      suggestion += "• Book a small boat tour to Kleftiko with Captain Antonis\n";
      suggestion += "• Try traditional 'pitarakia' at O! Hamos! taverna\n";
    }
    
    suggestion += '\n';
  });

  suggestion += `\n🎯 Pro Tips for ${tripDetails.month}:\n`;
  suggestion += `• Book your ferry tickets in advance - ${tripDetails.month} can be quite busy\n`;
  suggestion += `• Consider the Blue Star ferries for more stable sailing\n`;
  suggestion += `• Pack light layers - evenings can be cooler on the islands\n`;
  suggestion += `• Make dinner reservations for popular restaurants, especially in ${tripDetails.islands[0].name}\n`;
  
  suggestion += `\n🌊 Water Conditions in ${tripDetails.month}:\n`;
  if (['July', 'August'].includes(tripDetails.month)) {
    suggestion += "• Perfect for swimming with warm waters (24-25°C)\n";
    suggestion += "• Great visibility for snorkeling\n";
    suggestion += "• Some strong meltemi winds - check weather for boat trips\n";
  } else if (['June', 'September'].includes(tripDetails.month)) {
    suggestion += "• Very pleasant water temperatures (22-24°C)\n";
    suggestion += "• Generally calmer seas than peak summer\n";
    suggestion += "• Ideal for water activities\n";
  } else {
    suggestion += "• Cooler waters but still swimmable (20-22°C)\n";
    suggestion += "• Calmer seas - perfect for boat tours\n";
    suggestion += "• Less crowded beaches\n";
  }

  suggestion += `\nEnjoy your Greek island adventure! 🇬🇷✨`;

  return suggestion;
}
