import { RestaurantService } from '../../../services/restaurantService';
import { TwilioService } from '../../../services/twilioService';
import { ElevenLabsService } from '../../../services/elevenLabsService';

export interface RestaurantBookingRequest {
  naturalLanguageRequest: string;
  userPhone: string;
}

export interface RestaurantBookingResponse {
  success: boolean;
  message: string;
  reservationId?: string;
  restaurant?: any;
  confirmationDetails?: any;
  callStatus?: string;
}

/**
 * Restaurant Booking API Handler
 * Processes natural language restaurant reservation requests
 */
export async function handleRestaurantBooking(
  request: RestaurantBookingRequest
): Promise<RestaurantBookingResponse> {
  try {
    console.log('🍽️ Processing restaurant booking request:', request.naturalLanguageRequest);

    // Step 1: Parse the natural language request
    const bookingResult = await RestaurantService.bookRestaurant(request.naturalLanguageRequest);
    
    if (!bookingResult.success) {
      return {
        success: false,
        message: bookingResult.message
      };
    }

    console.log('✅ Restaurant booking parsed successfully:', {
      restaurant: bookingResult.restaurant?.name,
      reservationId: bookingResult.reservationId
    });

    // Step 2: Generate Greek call script
    if (bookingResult.restaurant && bookingResult.confirmationDetails) {
      const reservation = {
        id: bookingResult.reservationId!,
        userPhone: request.userPhone,
        restaurantId: bookingResult.restaurant.id,
        date: bookingResult.confirmationDetails.date,
        time: bookingResult.confirmationDetails.time,
        partySize: bookingResult.confirmationDetails.partySize,
        specialRequests: bookingResult.confirmationDetails.specialRequests,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
      };

      const callScript = RestaurantService.generateGreekCallScript(
        reservation,
        bookingResult.restaurant
      );

      console.log('📞 Generated Greek call script for restaurant');

      // Step 3: Generate Greek TTS audio
      try {
        const audioBuffer = await ElevenLabsService.generateSpeech(callScript, 'Maria');
        console.log('🔊 Generated Greek TTS audio');

        // Step 4: Initiate voice call to restaurant
        const callResult = await TwilioService.makeVoiceCall(
          bookingResult.restaurant.phone,
          audioBuffer,
          `restaurant_booking_${bookingResult.reservationId}`
        );

        console.log('📞 Voice call initiated:', callResult);

        // Step 5: Send SMS confirmation to user
        const userSmsText = `
🍽️ Κράτηση Εστιατορίου - Touristas AI

Η κράτησή σας έχει σταλεί!

📍 ${bookingResult.restaurant.name}
📅 ${bookingResult.confirmationDetails.date}
🕐 ${bookingResult.confirmationDetails.time}
👥 ${bookingResult.confirmationDetails.partySize} άτομα

Κωδικός κράτησης: ${bookingResult.reservationId}

Θα σας ειδοποιήσουμε μόλις το εστιατόριο επιβεβαιώσει την κράτησή σας.

Touristas AI 🇬🇷
        `.trim();

        await TwilioService.sendSMS(request.userPhone, userSmsText);
        console.log('📱 Confirmation SMS sent to user');

        return {
          success: true,
          message: `Η κράτησή σας στο ${bookingResult.restaurant.name} έχει σταλεί! Θα λάβετε SMS επιβεβαίωσης σύντομα.`,
          reservationId: bookingResult.reservationId,
          restaurant: bookingResult.restaurant,
          confirmationDetails: bookingResult.confirmationDetails,
          callStatus: 'initiated'
        };

      } catch (audioError) {
        console.error('Audio/Call error:', audioError);
        
        // Fallback: Send SMS to restaurant instead
        const restaurantSmsText = `
🍽️ Νέα Κράτηση - Touristas AI

Εστιατόριο: ${bookingResult.restaurant.name}
Ημερομηνία: ${bookingResult.confirmationDetails.date}
Ώρα: ${bookingResult.confirmationDetails.time}
Άτομα: ${bookingResult.confirmationDetails.partySize}
Τηλέφωνο: ${request.userPhone}
${bookingResult.confirmationDetails.specialRequests ? `Ειδικές επιθυμίες: ${bookingResult.confirmationDetails.specialRequests}` : ''}

Κωδικός: ${bookingResult.reservationId}

Απαντήστε ΝΑΙ ή ΟΧΙ
        `.trim();

        await TwilioService.sendSMS(bookingResult.restaurant.phone, restaurantSmsText);

        return {
          success: true,
          message: `Η κράτησή σας στο ${bookingResult.restaurant.name} έχει σταλεί με SMS! Θα λάβετε επιβεβαίωση σύντομα.`,
          reservationId: bookingResult.reservationId,
          restaurant: bookingResult.restaurant,
          confirmationDetails: bookingResult.confirmationDetails,
          callStatus: 'sms_fallback'
        };
      }
    }

    return bookingResult;

  } catch (error) {
    console.error('❌ Restaurant booking error:', error);
    return {
      success: false,
      message: 'Παρουσιάστηκε σφάλμα κατά την κράτηση. Παρακαλώ δοκιμάστε ξανά.'
    };
  }
}

// For demo purposes - mock the API endpoint
export const restaurantBookingAPI = {
  book: handleRestaurantBooking
}; 