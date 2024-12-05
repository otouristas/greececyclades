export async function generateTripSuggestions(tripDetails: {
  islands: { name: string; activities: string[] }[];
  duration: number;
  month: string;
}) {
  try {
    // Always use the fallback for now due to rate limits
    return generateFallbackSuggestions(tripDetails);
    
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    return generateFallbackSuggestions(tripDetails);
  }
}

function generateFallbackSuggestions(tripDetails: {
  islands: { name: string; activities: string[] }[];
  duration: number;
  month: string;
}) {
  const islandCount = tripDetails.islands.length;
  const daysPerIsland = Math.floor(tripDetails.duration / islandCount);
  
  const monthCharacteristics = {
    May: "perfect spring weather with mild temperatures",
    June: "early summer warmth and fewer crowds",
    July: "peak summer season with vibrant atmosphere",
    August: "bustling high season with warm waters",
    September: "pleasant late summer weather",
    October: "mild autumn temperatures and peaceful ambiance"
  };

  const monthDesc = monthCharacteristics[tripDetails.month as keyof typeof monthCharacteristics] || "great weather";

  let suggestion = `🌞 Your ${tripDetails.duration}-Day Cyclades Adventure (${tripDetails.month})\n\n`;
  suggestion += `I've crafted an exciting itinerary that makes the most of ${monthDesc}!\n\n`;
  
  tripDetails.islands.forEach((island, index) => {
    const days = index === 0 ? daysPerIsland + (tripDetails.duration % islandCount) : daysPerIsland;
    suggestion += `🏝️ ${island.name} (${days} days):\n`;
    suggestion += `Experience the magic of ${island.name} during ${monthDesc}. You'll love:\n`;
    suggestion += island.activities.map(activity => `• ${activity}\n`).join('');
    
    // Add specific recommendations based on the island
    if (island.name === 'Santorini') {
      suggestion += "\nHighlight: Don't miss the world-famous sunset in Oia - arrive early to secure the best viewing spot!\n";
    } else if (island.name === 'Mykonos') {
      suggestion += "\nHighlight: Visit Little Venice during golden hour for spectacular photos and atmosphere!\n";
    } else if (island.name === 'Naxos') {
      suggestion += "\nHighlight: Take a day trip to the mountain villages for an authentic Greek experience!\n";
    } else if (island.name === 'Milos') {
      suggestion += "\nHighlight: Book a boat tour to Kleftiko caves - it's a must-do experience!\n";
    }
    
    suggestion += '\n';
  });

  suggestion += `\n💡 Pro Tips for ${tripDetails.month}:\n`;
  suggestion += `• Book your ferry tickets in advance - ${tripDetails.month} can be quite busy\n`;
  suggestion += `• Consider the Blue Star ferries for more stable sailing\n`;
  suggestion += `• Pack light layers - evenings can be cooler on the islands\n`;
  suggestion += `• Make dinner reservations for popular restaurants, especially in ${tripDetails.islands[0].name}\n`;
  suggestion += `\nEnjoy your Greek island adventure! 🇬🇷✨`;

  return suggestion;
}
