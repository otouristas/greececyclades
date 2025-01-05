import { useState } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { HotelRoom } from '../../types/hotel';
import { generateHotelRequestEmail } from '../../utils/emailTemplates';

interface RequestRoomFormProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: {
    name: string;
    logo?: string;
    location: {
      area: string;
      island: string;
    };
  };
  selectedDates: [Date | null, Date | null];
  selectedRoom: HotelRoom | null;
  guests: number;
  rooms: number;
  totalPrice: number;
}

export default function RequestRoomForm({
  isOpen,
  onClose,
  hotel,
  selectedDates,
  selectedRoom,
  guests,
  rooms,
  totalPrice,
}: RequestRoomFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mailtoLink = `mailto:greececycladesgr@gmail.com?subject=Hotel Request: ${
      hotel.name
    }&body=${encodeURIComponent(
      generateHotelRequestEmail({
        ...formData,
        hotelName: hotel.name,
        hotelLogo: hotel.logo,
        location: hotel.location,
        selectedDates,
        selectedRoom,
        guests,
        rooms,
        totalPrice,
      })
    )}`;
    
    window.open(mailtoLink);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white flex items-center justify-between">
          <h2 className="text-xl font-semibold">Request Room</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Booking Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">{hotel.name}</h3>
            <div className="space-y-1 text-sm">
              {selectedRoom && (
                <p>Room: <span className="font-medium">{selectedRoom.name}</span></p>
              )}
              <p>Check-in: <span className="font-medium">
                {selectedDates[0] ? format(selectedDates[0], 'MMM dd, yyyy') : 'Not selected'}
              </span></p>
              <p>Check-out: <span className="font-medium">
                {selectedDates[1] ? format(selectedDates[1], 'MMM dd, yyyy') : 'Not selected'}
              </span></p>
              <p>Guests: <span className="font-medium">{guests}</span></p>
              <p>Rooms: <span className="font-medium">{rooms}</span></p>
              {totalPrice > 0 && (
                <p>Total: <span className="font-medium">€{totalPrice}</span></p>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
