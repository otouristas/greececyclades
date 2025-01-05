import { useState, useEffect } from 'react';
import { Calendar, Users, ChevronDown, Shield, CreditCard, Mail } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { HotelRoom } from '../../types/hotel';
import RequestRoomForm from './RequestRoomForm';

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
    logo?: string;
  };
  selectedDates: [Date | null, Date | null];
  selectedRoom: HotelRoom | null;
  onDateChange: (dates: [Date | null, Date | null]) => void;
}

export default function BookingWidget({ 
  hotel, 
  selectedDates, 
  selectedRoom,
  onDateChange 
}: BookingWidgetProps) {
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateNights = () => {
    if (selectedDates[0] && selectedDates[1]) {
      return differenceInDays(selectedDates[1], selectedDates[0]);
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    const pricePerNight = selectedRoom?.price ?? hotel.priceRange.min;
    return nights * pricePerNight;
  };

  const nights = calculateNights();
  const totalPrice = calculateTotalPrice();
  const pricePerNight = selectedRoom?.price ?? hotel.priceRange.min;

  return (
    <div 
      className={`
        bg-white rounded-xl shadow-lg p-6 
        ${isSticky 
          ? 'lg:sticky lg:top-[11rem] transition-all duration-300' 
          : ''
        }
        w-full lg:w-[380px]
        mx-auto lg:mx-0
      `}
    >
      <div className="mb-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">€{pricePerNight}</h3>
            <p className="text-gray-500">per night</p>
          </div>
          {selectedRoom && (
            <div className="text-right">
              <h4 className="text-lg font-semibold text-gray-900">{selectedRoom.name}</h4>
              <p className="text-sm text-gray-500">Selected Room</p>
            </div>
          )}
        </div>
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
              className="w-full px-4 py-2 pl-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[1, 2, 3, 4].map((num) => (
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
              className="w-full px-4 py-2 pl-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
      {nights > 0 && (
        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">€{pricePerNight} × {nights} nights</span>
            <span className="font-semibold">€{totalPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Taxes & fees (10%)</span>
            <span className="font-semibold">€{Math.round(totalPrice * 0.1)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
            <span>Total</span>
            <span>€{totalPrice + Math.round(totalPrice * 0.1)}</span>
          </div>
        </div>
      )}

      {/* Book Now Button */}
      <div className="space-y-3">
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          disabled={!selectedDates[0] || !selectedDates[1]}
        >
          {selectedDates[0] && selectedDates[1] ? 'Book Now' : 'Select Dates'}
        </button>

        <button
          onClick={() => setIsRequestFormOpen(true)}
          className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
        >
          <Mail className="w-5 h-5 mr-2" />
          Request via Email
        </button>
      </div>

      {/* Request Form Modal */}
      <RequestRoomForm
        isOpen={isRequestFormOpen}
        onClose={() => setIsRequestFormOpen(false)}
        hotel={hotel}
        selectedDates={selectedDates}
        selectedRoom={selectedRoom}
        guests={guests}
        rooms={rooms}
        totalPrice={totalPrice + Math.round(totalPrice * 0.1)}
      />

      {/* Security Note */}
      <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
        <Shield className="w-4 h-4 mr-2" />
        <span>Secure booking, instant confirmation</span>
      </div>
    </div>
  );
}