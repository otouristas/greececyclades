import { useState } from 'react';
import { Calendar, Users, CreditCard, Check, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickBookingWidgetProps {
  price: number;
  currency?: string;
  availability?: boolean;
  onBook?: (data: BookingData) => void;
  className?: string;
  sticky?: boolean;
}

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function QuickBookingWidget({
  price,
  currency = '€',
  availability = true,
  onBook,
  className = '',
  sticky = true
}: QuickBookingWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      return;
    }

    if (onBook) {
      onBook({ checkIn, checkOut, guests });
    }
  };

  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const totalPrice = nights * price;

  return (
    <motion.div
      initial={false}
      animate={{ y: sticky ? 0 : undefined }}
      className={`${sticky ? 'sticky top-4' : ''} ${className}`}
    >
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Price Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm opacity-90">Price per night</p>
              <p className="text-3xl font-bold">
                {currency}
                {price.toLocaleString()}
              </p>
            </div>
            {availability && (
              <span className="px-3 py-1 bg-green-500 rounded-full text-xs font-medium">
                Available
              </span>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <div className="p-6 space-y-4">
          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={today}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || tomorrow}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guests
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Summary */}
          {nights > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-gray-200 space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {currency}
                  {price.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}
                </span>
                <span className="font-medium">
                  {currency}
                  {totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-blue-600">
                  {currency}
                  {totalPrice.toLocaleString()}
                </span>
              </div>
            </motion.div>
          )}

          {/* Book Button */}
          <button
            onClick={handleBook}
            disabled={!checkIn || !checkOut || !availability}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="h-5 w-5" />
            {availability ? 'Book Now' : 'Not Available'}
          </button>

          {!availability && (
            <p className="text-sm text-center text-gray-500">
              This property is not available for the selected dates
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="px-6 pb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-1"
          >
            {isExpanded ? (
              <>
                Show less <X className="h-4 w-4" />
              </>
            ) : (
              <>
                View price breakdown <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600"
              >
                <div className="flex justify-between">
                  <span>Base price</span>
                  <span>{currency}{price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Included</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

