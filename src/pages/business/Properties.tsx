import { useState } from 'react';
import DashboardLayout from '../../components/business/DashboardLayout';
import { Home, MapPin, Star, Users, Euro, Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: number;
  price: number;
  capacity: number;
  image: string;
  status: 'active' | 'maintenance' | 'draft';
}

const properties: Property[] = [
  {
    id: 'P001',
    name: 'Sunset Villa',
    location: 'Oia, Santorini',
    type: 'Villa',
    rating: 4.8,
    price: 350,
    capacity: 6,
    image: '/properties/villa1.jpg',
    status: 'active',
  },
  {
    id: 'P002',
    name: 'Blue Cave House',
    location: 'Mykonos Town',
    type: 'House',
    rating: 4.5,
    price: 250,
    capacity: 4,
    image: '/properties/house1.jpg',
    status: 'active',
  },
  {
    id: 'P003',
    name: 'Harbor View Suite',
    location: 'Paros',
    type: 'Apartment',
    rating: 4.7,
    price: 180,
    capacity: 2,
    image: '/properties/apartment1.jpg',
    status: 'maintenance',
  },
];

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={property.image}
          alt={property.name}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
              property.status === 'active'
                ? 'bg-green-100 text-green-700'
                : property.status === 'maintenance'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{property.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{property.rating}</span>
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{property.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>{property.type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Up to {property.capacity} guests</span>
          </div>
          <div className="flex items-center space-x-2">
            <Euro className="h-4 w-4" />
            <span>€{property.price} per night</span>
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <div className="flex space-x-3">
          <button className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Edit
          </button>
          <Link 
            to={`/business/properties/${property.id}`}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
          <div className="mt-4 sm:mt-0">
            <button className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus className="h-5 w-5" />
              <span>Add Property</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="inline-flex items-center space-x-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
            <select className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700">
              <option value="newest">Newest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-gray-500">Showing 3 of 3 properties</p>
          <div className="space-x-2">
            <button className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
