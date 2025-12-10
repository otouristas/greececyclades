import { CheckCircle, Mail, Calendar, MapPin, CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import type { BookingResponse } from '@/lib/liteapi';

interface BookingConfirmationProps {
  bookingData: BookingResponse['data'];
}

export function BookingConfirmation({ bookingData }: BookingConfirmationProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const currencySymbol = bookingData.bookedRooms[0]?.price.currency === 'EUR' ? '€'
    : bookingData.bookedRooms[0]?.price.currency === 'USD' ? '$'
      : '£';

  const totalPrice = bookingData.bookedRooms.reduce(
    (sum, room) => sum + room.price.amount,
    0
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDark ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
            <CheckCircle className={`w-10 h-10 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Booking Confirmed!
          </h1>
          <p className={`text-lg ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
            Your reservation has been successfully confirmed
          </p>
        </div>

        {/* Booking Details */}
        <Card className={`p-8 mb-6 ${isDark ? 'bg-dark-card border-white/10' : 'bg-white'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Booking ID */}
            <div>
              <div className={`flex items-center gap-2 text-sm mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                <CreditCard className="w-4 h-4" />
                Booking Reference
              </div>
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {bookingData.bookingId}
              </div>
              <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Hotel Confirmation: {bookingData.hotelConfirmationCode}
              </div>
            </div>

            {/* Status */}
            <div>
              <div className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Status</div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800'
                }`}>
                <CheckCircle className="w-4 h-4" />
                {bookingData.status}
              </div>
            </div>
          </div>

          <div className={`border-t pt-6 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Hotel Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sifnos-turquoise mt-1" />
                <div>
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {bookingData.hotel.name}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    {bookingData.hotel.address}, {bookingData.hotel.city}, {bookingData.hotel.countryCode}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-sifnos-turquoise" />
                <div>
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Stay Dates</div>
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Check-in: {new Date(bookingData.checkin).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
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

          <div className={`border-t mt-6 pt-6 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Room Details
            </h2>

            <div className="space-y-3">
              {bookingData.bookedRooms.map((room, index) => (
                <div key={index} className={`flex justify-between items-start p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'
                  }`}>
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {room.roomType}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {room.adults} {room.adults === 1 ? 'Adult' : 'Adults'}
                      {room.children > 0 && `, ${room.children} ${room.children === 1 ? 'Child' : 'Children'}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {currencySymbol}{room.price.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Total Amount Paid
                </span>
                <span className="text-2xl font-bold text-sifnos-turquoise">
                  {currencySymbol}{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Email Confirmation Notice */}
        <Card className={`p-6 mb-6 ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
          }`}>
          <div className="flex items-start gap-3">
            <Mail className={`w-6 h-6 flex-shrink-0 mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <div>
              <h3 className={`font-semibold mb-1 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                Confirmation Email Sent
              </h3>
              <p className={`text-sm ${isDark ? 'text-blue-200/80' : 'text-blue-800'}`}>
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
            className={`flex-1 ${isDark ? 'border-white/20 text-white hover:bg-white/10' : ''}`}
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
            <Button variant="outline" className={`w-full ${isDark ? 'border-white/20 text-white hover:bg-white/10' : ''}`}>
              Return to Homepage
            </Button>
          </Link>
        </div>

        {/* Important Information */}
        <Card className={`mt-6 p-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50'}`}>
          <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Important Information
          </h3>
          <ul className={`space-y-2 text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
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
    </div>
  );
}

