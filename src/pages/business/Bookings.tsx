import { useState } from 'react';
import DashboardLayout from '../../components/business/DashboardLayout';
import { Calendar, User, MapPin, Euro, Search, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Booking {
  id: string;
  guestName: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
  location: string;
}

const bookings: Booking[] = [
  {
    id: 'B001',
    guestName: 'John Smith',
    propertyName: 'Sunset Villa',
    checkIn: '2025-02-01',
    checkOut: '2025-02-07',
    status: 'confirmed',
    amount: 1200,
    location: 'Santorini',
  },
  {
    id: 'B002',
    guestName: 'Maria Garcia',
    propertyName: 'Blue Cave House',
    checkIn: '2025-02-03',
    checkOut: '2025-02-10',
    status: 'pending',
    amount: 1500,
    location: 'Mykonos',
  },
  {
    id: 'B003',
    guestName: 'David Wilson',
    propertyName: 'Harbor View Suite',
    checkIn: '2025-02-05',
    checkOut: '2025-02-12',
    status: 'confirmed',
    amount: 900,
    location: 'Paros',
  },
];

function BookingRow({ booking }: { booking: Booking }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between space-x-4 rounded-lg border bg-white p-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <User className="h-10 w-10 rounded-full bg-blue-50 p-2 text-blue-600" />
            <div>
              <Link 
                to={`/business/bookings/${booking.id}`}
                className="group"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{booking.guestName}</h3>
                <p className="text-sm text-gray-500">{booking.propertyName}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">{booking.location}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Euro className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">€{booking.amount}</span>
          </div>
        </div>
        <div className="flex-1">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
              booking.status === 'confirmed'
                ? 'bg-green-100 text-green-700'
                : booking.status === 'pending'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-lg border p-2 hover:bg-gray-50"
        >
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="rounded-lg border bg-white p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Check-in Instructions</h4>
              <p className="mt-1 text-sm text-gray-900">
                Check-in time starts at 3:00 PM. Please contact the property for early check-in requests.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Special Requests</h4>
              <p className="mt-1 text-sm text-gray-900">
                No special requests noted for this booking.
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Contact Guest
            </button>
            <Link 
              to={`/business/bookings/${booking.id}`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              View Full Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
          <div className="mt-4 sm:mt-0">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              New Booking
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
              placeholder="Search bookings..."
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
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Amount: High to Low</option>
              <option value="amount-low">Amount: Low to High</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-gray-500">Showing 3 of 3 bookings</p>
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
