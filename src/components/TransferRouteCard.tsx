import React from 'react';
import { Car } from 'lucide-react';

interface TransferRouteCardProps {
  from: string;
  to: string;
  duration: string;
  price: string;
  image: string;
  onClick: () => void;
}

const TransferRouteCard: React.FC<TransferRouteCardProps> = ({
  from,
  to,
  duration,
  price,
  image,
  onClick,
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <Car className="w-5 h-5" />
          <span className="font-medium">{duration}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {from} → {to}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">Starting from</span>
          <span className="text-xl font-semibold text-blue-600">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default TransferRouteCard;
