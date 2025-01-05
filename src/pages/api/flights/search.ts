import { NextApiRequest, NextApiResponse } from 'next';
import Amadeus from 'amadeus';

if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
  throw new Error('Missing Amadeus API credentials');
}

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  hostname: 'test.api.amadeus.com'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults } = req.body;

    if (!originLocationCode || !destinationLocationCode || !departureDate || !adults) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    console.log('Searching flights with params:', {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults
    });

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      ...(returnDate && { returnDate }),
      adults: Number(adults),
      currencyCode: 'EUR',
      max: 20
    });

    console.log('Amadeus API response:', response);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error searching flights:', error);
    return res.status(500).json({ 
      message: 'Error searching flights', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
