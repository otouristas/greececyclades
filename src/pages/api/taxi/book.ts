// API endpoint for taxi booking
import { NextApiRequest, NextApiResponse } from 'next';
import { TaxiService } from '../../../services/taxiService';
import { TwilioService } from '../../../services/twilioService';
import { ElevenLabsService } from '../../../services/elevenLabsService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { naturalLanguageRequest } = req.body;

    if (!naturalLanguageRequest) {
      return res.status(400).json({ 
        error: 'Natural language request is required' 
      });
    }

    // Process the booking request
    const bookingResult = await TaxiService.bookTaxi(naturalLanguageRequest);

    if (bookingResult.success && bookingResult.driverInfo) {
      // Parse the original request to get details
      const parsedRequest = TaxiService.parseNaturalLanguageRequest(naturalLanguageRequest);
      
      // Generate Greek call script
      const callScript = TaxiService.generateGreekCallScript({
        pickupLocation: parsedRequest.pickupLocation || 'Unknown',
        dropoffLocation: parsedRequest.dropoffLocation || 'Unknown',
        requestedTime: parsedRequest.requestedTime || 'ASAP',
        userPhone: parsedRequest.userPhone || 'Unknown',
        passengerCount: parsedRequest.passengerCount || 1,
        status: 'pending'
      }, bookingResult.driverInfo.name);

      // Make voice call to driver
      const callResult = await TwilioService.makeVoiceCall(
        bookingResult.driverInfo.phone,
        callScript
      );

      // Send SMS confirmation to user
      if (parsedRequest.userPhone) {
        await TwilioService.sendSMSConfirmation(parsedRequest.userPhone, {
          driverName: bookingResult.driverInfo.name,
          driverPhone: bookingResult.driverInfo.phone,
          vehicle: bookingResult.driverInfo.vehicle,
          estimatedArrival: bookingResult.estimatedArrival || '15 minutes',
          estimatedPrice: bookingResult.estimatedPrice || 15,
          requestId: bookingResult.requestId || 'REQ_' + Date.now()
        });
      }

      // Send SMS to driver with ride details
      await TwilioService.sendDriverSMS(bookingResult.driverInfo.phone, {
        pickupLocation: parsedRequest.pickupLocation || 'Unknown',
        dropoffLocation: parsedRequest.dropoffLocation || 'Unknown',
        requestedTime: parsedRequest.requestedTime || 'ASAP',
        userPhone: parsedRequest.userPhone || 'Unknown',
        passengerCount: parsedRequest.passengerCount || 1,
        requestId: bookingResult.requestId || 'REQ_' + Date.now()
      });

      // Log the booking
      console.log('🚕 Taxi booking processed:', {
        requestId: bookingResult.requestId,
        driver: bookingResult.driverInfo.name,
        callSid: callResult.callSid,
        success: bookingResult.success
      });
    }

    res.status(200).json(bookingResult);

  } catch (error) {
    console.error('Taxi booking API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 