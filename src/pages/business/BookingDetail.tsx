// import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/business/DashboardLayout';
import {
  Calendar,
  Clock,
  Users,
  CreditCard,
  MessageSquare,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

// Mock data - In a real app, this would come from an API
const bookingData = {
  id: 'B001',
  status: 'confirmed',
  property: {
    id: 'P001',
    name: 'Sunset Villa',
    location: 'Oia, Santorini',
    image: '/properties/villa1-main.jpg',
  },
  guest: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    nationality: 'United States',
    previousBookings: 2,
  },
  dates: {
    checkIn: '2025-01-25',
    checkOut: '2025-01-30',
    nights: 5,
    checkInTime: '15:00',
    checkOutTime: '11:00',
  },
  payment: {
    total: 1750,
    status: 'paid',
    method: 'Credit Card',
    breakdown: [
      { description: 'Nightly Rate (5 nights)', amount: 1500 },
      { description: 'Cleaning Fee', amount: 150 },
      { description: 'Service Fee', amount: 100 },
    ],
  },
  guests: {
    adults: 2,
    children: 1,
    infants: 0,
  },
  requests: [
    {
      id: 'R001',
      type: 'special',
      description: 'Early check-in if possible',
      status: 'pending',
    },
    {
      id: 'R002',
      type: 'dietary',
      description: 'Gluten-free breakfast options',
      status: 'confirmed',
    },
  ],
  timeline: [
    {
      id: 'T001',
      date: '2025-01-10',
      time: '14:30',
      event: 'Booking Confirmed',
      description: 'Payment received and booking confirmed',
      status: 'completed',
    },
    {
      id: 'T002',
      date: '2025-01-25',
      time: '15:00',
      event: 'Check-in',
      description: 'Guest scheduled to check in',
      status: 'upcoming',
    },
    {
      id: 'T003',
      date: '2025-01-30',
      time: '11:00',
      event: 'Check-out',
      description: 'Guest scheduled to check out',
      status: 'upcoming',
    },
  ],
};

export default function BookingDetail() {
  // Uncomment and use this when integrating with real data
  // const { id } = useParams();
  // const booking = useBooking(id);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Booking #{bookingData.id}</h1>
              <span
                className={`ml-4 inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                  bookingData.status
                )}`}
              >
                {bookingData.status.charAt(0).toUpperCase() + bookingData.status.slice(1)}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">Created on January 10, 2025</p>
          </div>
          <div className="mt-4 flex space-x-3 sm:mt-0">
            <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Guest
            </button>
            <button className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Calendar className="mr-2 h-4 w-4" />
              Modify Booking
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Information */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Property Information</h2>
                <div className="mt-6 flex items-center space-x-4">
                  <img
                    src={bookingData.property.image}
                    alt={bookingData.property.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{bookingData.property.name}</h3>
                    <p className="text-sm text-gray-500">{bookingData.property.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Booking Details</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Check-in</h3>
                    <div className="mt-2 flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{bookingData.dates.checkIn}</span>
                      <span className="ml-2 text-sm text-gray-500">({bookingData.dates.checkInTime})</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Check-out</h3>
                    <div className="mt-2 flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{bookingData.dates.checkOut}</span>
                      <span className="ml-2 text-sm text-gray-500">({bookingData.dates.checkOutTime})</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Length of Stay</h3>
                    <div className="mt-2 flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{bookingData.dates.nights} nights</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Guests</h3>
                    <div className="mt-2 flex items-center">
                      <Users className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">
                        {bookingData.guests.adults} adults, {bookingData.guests.children} children
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Special Requests</h2>
                <div className="mt-6 space-y-4">
                  {bookingData.requests.map((request) => (
                    <div key={request.id} className="flex items-start justify-between rounded-lg bg-gray-50 p-4">
                      <div>
                        <p className="font-medium text-gray-900">{request.description}</p>
                        <p className="mt-1 text-sm text-gray-500">Request Type: {request.type}</p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Timeline */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Booking Timeline</h2>
                <div className="mt-6 flow-root">
                  <ul className="-mb-8">
                    {bookingData.timeline.map((event, index) => (
                      <li key={event.id}>
                        <div className="relative pb-8">
                          {index !== bookingData.timeline.length - 1 && (
                            <span
                              className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                  event.status === 'completed'
                                    ? 'bg-green-100'
                                    : event.status === 'upcoming'
                                    ? 'bg-blue-100'
                                    : 'bg-gray-100'
                                }`}
                              >
                                {event.status === 'completed' ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : event.status === 'upcoming' ? (
                                  <Clock className="h-5 w-5 text-blue-600" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-gray-600" />
                                )}
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="font-medium text-gray-900">{event.event}</p>
                                <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                <p>{event.date}</p>
                                <p>{event.time}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guest Information */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Guest Information</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="mt-1 font-medium text-gray-900">{bookingData.guest.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <div className="mt-1 flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-gray-400" />
                    <a href={`mailto:${bookingData.guest.email}`} className="text-blue-600 hover:text-blue-700">
                      {bookingData.guest.email}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <div className="mt-1 flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{bookingData.guest.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nationality</p>
                  <p className="mt-1 text-gray-900">{bookingData.guest.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Previous Bookings</p>
                  <p className="mt-1 text-gray-900">{bookingData.guest.previousBookings}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                      bookingData.payment.status
                    )}`}
                  >
                    {bookingData.payment.status.charAt(0).toUpperCase() + bookingData.payment.status.slice(1)}
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{bookingData.payment.method}</span>
                </div>
                <div className="mt-6 space-y-4">
                  {bookingData.payment.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="font-medium text-gray-900">€{item.amount}</p>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between font-medium">
                      <p className="text-gray-900">Total Amount</p>
                      <p className="text-blue-600">€{bookingData.payment.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
