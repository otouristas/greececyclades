import { NextApiRequest, NextApiResponse } from 'next';
import { airports, Airport } from '../../../data/airports';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { keyword } = req.query;

    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({ message: 'Keyword is required' });
    }

    // Case-insensitive search across multiple fields
    const searchTerm = keyword.toLowerCase();
    const results = airports.filter((airport: Airport) => 
      airport.name.toLowerCase().includes(searchTerm) ||
      airport.city.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm) ||
      airport.iataCode.toLowerCase().includes(searchTerm)
    );

    // Sort results by relevance (exact matches first)
    results.sort((a: Airport, b: Airport) => {
      const aExact = a.iataCode.toLowerCase() === searchTerm || 
                    a.city.toLowerCase() === searchTerm;
      const bExact = b.iataCode.toLowerCase() === searchTerm || 
                    b.city.toLowerCase() === searchTerm;
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return 0;
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error searching airports:', error);
    return res.status(500).json({ 
      message: 'Error searching airports', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
