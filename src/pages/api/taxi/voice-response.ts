// API endpoint for handling voice responses from taxi drivers
import { NextApiRequest, NextApiResponse } from 'next';
import { TwilioService } from '../../../services/twilioService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { Digits, CallSid } = req.body;

    console.log('📞 Voice response received:', { Digits, CallSid });

    // Handle the driver's response
    const response = TwilioService.handleVoiceResponse(Digits, CallSid);

    // Set the content type for TwiML
    res.setHeader('Content-Type', 'text/xml');
    
    // Return TwiML response
    res.status(200).send(response.response);

    // Log the outcome
    if (response.accepted) {
      console.log('✅ Driver accepted the ride:', CallSid);
      // Here you would update the booking status in your database
      // and send confirmation SMS to the user
    } else {
      console.log('❌ Driver declined the ride:', CallSid);
      // Here you would find another driver and retry
    }

  } catch (error) {
    console.error('Voice response API error:', error);
    
    // Return error TwiML
    const errorTwiML = `
      <?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say voice="woman" language="el-GR">
          Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.
        </Say>
        <Hangup/>
      </Response>
    `;
    
    res.setHeader('Content-Type', 'text/xml');
    res.status(500).send(errorTwiML);
  }
} 