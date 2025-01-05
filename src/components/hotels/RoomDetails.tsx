import { Users, Maximize2, Bed, Check } from 'lucide-react';

interface RoomFeature {
  name: string;
  description?: string;
}

interface RoomAmenity {
  name: string;
  included: boolean;
}

interface Room {
  id: string;
  type: string;
  description: string;
  size: number;
  maxOccupancy: number;
  bedType: string;
  price: number;
  image: string;
  features: RoomFeature[];
  amenities: RoomAmenity[];
}

interface RoomDetailsProps {
  room: Room;
  onSelect: (room: Room) => void;
  isSelected: boolean;
}

export default function RoomDetails({ room, onSelect, isSelected }: RoomDetailsProps) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Room Image */}
        <div className="relative h-48 md:h-full">
          <img
            src={room.image}
            alt={room.type}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            View Photos
          </div>
        </div>

        {/* Room Details */}
        <div className="p-6 md:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{room.type}</h3>
              <p className="text-gray-600 mt-2">{room.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">€{room.price}</div>
              <div className="text-sm text-gray-500">per night</div>
            </div>
          </div>

          {/* Room Specs */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <span>Up to {room.maxOccupancy} guests</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Maximize2 className="w-5 h-5 mr-2" />
              <span>{room.size} m²</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bed className="w-5 h-5 mr-2" />
              <span>{room.bedType}</span>
            </div>
          </div>

          {/* Room Features */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Room Features</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {room.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900">{feature.name}</div>
                    {feature.description && (
                      <div className="text-sm text-gray-500">{feature.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Room Amenities */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-2">Room Amenities</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <Check 
                    className={`w-4 h-4 mr-2 ${
                      amenity.included ? 'text-green-500' : 'text-gray-300'
                    }`} 
                  />
                  <span className={amenity.included ? 'text-gray-900' : 'text-gray-500'}>
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Select Room Button */}
          <button
            onClick={() => onSelect(room)}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition-colors ${
              isSelected
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSelected ? 'Room Selected' : 'Select Room'}
          </button>
        </div>
      </div>
    </div>
  );
}
