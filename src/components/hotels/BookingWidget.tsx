import { useState, useEffect } from 'react';
import { Calendar, Users, ChevronDown, Shield, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

interface BookingWidgetProps {
  hotel: {
    priceRange: {
      min: number;
      max: number;
    };
    name: string;
    location: {
      area: string;
      island: string;
    };
  };
  selectedDates: [Date | null, Date | null];
  onDateChange: (dates: [Date | null, Date | null]) => void;
}

export default function BookingWidget({ hotel, selectedDates, onDateChange }: BookingWidgetProps) {
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 300); // Adjust this value based on when you want the widget to become sticky
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateNights = () => {
    if (selectedDates[0] && selectedDates[1]) {
      return Math.ceil((selectedDates[1].getTime() - selectedDates[0].getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return nights * hotel.priceRange.min;
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${isSticky ? 'lg:sticky lg:top-24' : ''}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">€{hotel.priceRange.min}</h3>
        <p className="text-gray-500">per night</p>
      </div>

      {/* Date Selection */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDates[0] ? format(selectedDates[0], 'yyyy-MM-dd') : ''}
              onChange={(e) => onDateChange([new Date(e.target.value), selectedDates[1]])}
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDates[1] ? format(selectedDates[1], 'yyyy-MM-dd') : ''}
              onChange={(e) => onDateChange([selectedDates[0], new Date(e.target.value)])}
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Guests and Rooms */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="relative">
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-2 pl-10 pr-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
            <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rooms
          </label>
          <div className="relative">
            <select
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full px-4 py-2 pl-10 pr-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Room' : 'Rooms'}
                </option>
              ))}
            </select>
            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Price Summary */}
      {calculateNights() > 0 && (
        <div className="border-t border-b py-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">€{hotel.priceRange.min} × {calculateNights()} nights</span>
            <span className="font-semibold">€{calculateTotalPrice()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Taxes and fees</span>
            <span>Included</span>
          </div>
        </div>
      )}

      {/* Book Now Button */}
      <button
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        onClick={() => {
          // Handle booking logic
          console.log('Booking:', {
            hotel: hotel.name,
            dates: selectedDates,
            guests,
            rooms
          });
        }}
      >
        Book Now
      </button>

      {/* Best Price Guarantee */}
      <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
        <Shield className="w-4 h-4 mr-2" />
        Best Price Guarantee
      </div>
    </div>
  );
}