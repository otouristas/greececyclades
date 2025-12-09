import { CheckCircle, Mail, Calendar, MapPin, CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import type { BookingResponse } from '@/lib/liteapi';

interface BookingConfirmationProps {
  bookingData: BookingResponse['data'];
}

export function BookingConfirmation({ bookingData }: BookingConfirmationProps) {
  const currencySymbol = bookingData.bookedRooms[0]?.price.currency === 'EUR' ? '€' 
    : bookingData.bookedRooms[0]?.price.currency === 'USD' ? '$' 
    : '£';

  const totalPrice = bookingData.bookedRooms.reduce(
    (sum, room) => sum + room.price.amount,
    0
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Your reservation has been successfully confirmed
        </p>
      </div>

      {/* Booking Details */}
      <Card className="p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Booking ID */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <CreditCard className="w-4 h-4" />
              Booking Reference
            </div>
            <div className="text-xl font-bold text-gray-900">
              {bookingData.bookingId}
            </div>
            <div className="text-sm text-gray-600">
              Hotel Confirmation: {bookingData.hotelConfirmationCode}
            </div>
          </div>

          {/* Status */}
          <div>
            <div className="text-sm text-gray-600 mb-1">Status</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
              <CheckCircle className="w-4 h-4" />
              {bookingData.status}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hotel Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sifnos-turquoise mt-1" />
              <div>
                <div className="font-semibold text-gray-900">{bookingData.hotel.name}</div>
                <div className="text-gray-600 text-sm">
                  {bookingData.hotel.address}, {bookingData.hotel.city}, {bookingData.hotel.countryCode}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-sifnos-turquoise" />
              <div>
                <div className="font-semibold text-gray-900">Stay Dates</div>
                <div className="text-gray-600 text-sm">
                  Check-in: {new Date(bookingData.checkin).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-gray-600 text-sm">
                  Check-out: {new Date(bookingData.checkout).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Room Details</h2>
          
          <div className="space-y-3">
            {bookingData.bookedRooms.map((room, index) => (
              <div key={index} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{room.roomType}</div>
                  <div className="text-sm text-gray-600">
                    {room.adults} {room.adults === 1 ? 'Adult' : 'Adults'}
                    {room.children > 0 && `, ${room.children} ${room.children === 1 ? 'Child' : 'Children'}`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {currencySymbol}{room.price.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total Amount Paid</span>
              <span className="text-2xl font-bold text-sifnos-turquoise">
                {currencySymbol}{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Email Confirmation Notice */}
      <Card className="p-6 bg-blue-50 border-blue-200 mb-6">
        <div className="flex items-start gap-3">
          <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Confirmation Email Sent</h3>
            <p className="text-blue-800 text-sm">
              A confirmation email with all booking details has been sent to your email address. 
              Please check your inbox and spam folder.
            </p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => window.print()}
          variant="outline"
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          Print Confirmation
        </Button>
        <Link to="/book" className="flex-1">
          <Button className="w-full bg-sifnos-turquoise hover:bg-sifnos-deep-blue text-white">
            Book Another Hotel
          </Button>
        </Link>
        <Link to="/" className="flex-1">
          <Button variant="outline" className="w-full">
            Return to Homepage
          </Button>
        </Link>
      </div>

      {/* Important Information */}
      <Card className="mt-6 p-6 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Important Information</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-sifnos-turquoise mt-1">•</span>
            <span>
              Please present your booking reference and a valid ID at check-in
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sifnos-turquoise mt-1">•</span>
            <span>
              Check-in time is typically 15:00 and check-out is 11:00 (may vary by property)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sifnos-turquoise mt-1">•</span>
            <span>
              For any changes or cancellations, please refer to the hotel's cancellation policy
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-sifnos-turquoise mt-1">•</span>
            <span>
              For questions or assistance, contact the hotel directly using the information in your confirmation email
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

