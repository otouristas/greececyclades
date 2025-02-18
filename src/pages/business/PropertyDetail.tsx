// import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/business/DashboardLayout';
import {
  MapPin,
  Users,
  BedDouble,
  Bath,
  Home,
  Calendar,
  Star,
  Edit,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';

// Mock data - In a real app, this would come from an API
const propertyData = {
  id: 'P001',
  name: 'Sunset Villa',
  location: 'Oia, Santorini',
  description: 'Luxurious villa with stunning sunset views over the Aegean Sea. Features a private infinity pool and traditional Cycladic architecture.',
  price: 350,
  rating: 4.8,
  reviews: 45,
  type: 'Villa',
  status: 'active',
  amenities: ['Pool', 'Wi-Fi', 'Air Conditioning', 'Kitchen', 'Sea View', 'Parking'],
  specs: {
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    size: 180, // in square meters
  },
  images: [
    '/properties/villa1-main.jpg',
    '/properties/villa1-pool.jpg',
    '/properties/villa1-interior.jpg',
    '/properties/villa1-bedroom.jpg',
  ],
  performance: {
    occupancyRate: 85,
    averageNightlyRate: 350,
    totalRevenue: 78500,
    totalBookings: 45,
    trend: 'up',
  },
  upcomingBookings: [
    {
      id: 'B001',
      guestName: 'John Doe',
      checkIn: '2025-01-25',
      checkOut: '2025-01-30',
      status: 'confirmed',
      amount: 1750,
    },
    {
      id: 'B002',
      guestName: 'Sarah Smith',
      checkIn: '2025-02-01',
      checkOut: '2025-02-05',
      status: 'pending',
      amount: 1400,
    },
  ],
  recentReviews: [
    {
      id: 'R001',
      guestName: 'Emma Wilson',
      rating: 5,
      comment: 'Beautiful property with amazing views. The host was very responsive and helpful.',
      date: '2025-01-20',
    },
    {
      id: 'R002',
      guestName: 'Alex Brown',
      rating: 4,
      comment: 'Great location and comfortable stay. Could use some minor maintenance.',
      date: '2025-01-19',
    },
  ],
};

const revenueData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Revenue',
      data: [2100, 1800, 2400, 2800, 3200, 3800, 3400],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

export default function PropertyDetail() {
  // Uncomment and use this when integrating with real data
  // const { id } = useParams();
  // const property = useProperty(id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{propertyData.name}</h1>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPin className="mr-1 h-4 w-4" />
              {propertyData.location}
            </div>
          </div>
          <div className="mt-4 flex space-x-3 sm:mt-0">
            <button className="inline-flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Edit className="h-4 w-4" />
              <span>Edit Property</span>
            </button>
            <button className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Calendar className="h-4 w-4" />
              <span>Manage Availability</span>
            </button>
          </div>
        </div>

        {/* Property Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={propertyData.images[0]}
                  alt={propertyData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 p-2">
                {propertyData.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-w-4 aspect-h-3">
                    <img
                      src={image}
                      alt={`${propertyData.name} ${index + 2}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">About this property</h2>
              <p className="mt-4 text-gray-600">{propertyData.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-6 border-t pt-6 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-500">Property Type</p>
                  <div className="mt-2 flex items-center text-gray-900">
                    <Home className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="font-medium">{propertyData.type}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <div className="mt-2 flex items-center text-gray-900">
                    <BedDouble className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="font-medium">{propertyData.specs.bedrooms}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <div className="mt-2 flex items-center text-gray-900">
                    <Bath className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="font-medium">{propertyData.specs.bathrooms}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Max Guests</p>
                  <div className="mt-2 flex items-center text-gray-900">
                    <Users className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="font-medium">{propertyData.specs.maxGuests}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900">Amenities</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {propertyData.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                      <span className="text-sm text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
              <div className="mt-6 h-[300px]">
                <Line
                  data={revenueData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `€${value}`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Performance</h2>
              <dl className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500">Occupancy Rate</dt>
                  <dd className="text-sm font-medium text-gray-900">{propertyData.performance.occupancyRate}%</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500">Average Nightly Rate</dt>
                  <dd className="text-sm font-medium text-gray-900">€{propertyData.performance.averageNightlyRate}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500">Total Revenue</dt>
                  <dd className="text-sm font-medium text-gray-900">€{propertyData.performance.totalRevenue}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500">Total Bookings</dt>
                  <dd className="text-sm font-medium text-gray-900">{propertyData.performance.totalBookings}</dd>
                </div>
              </dl>
            </div>

            {/* Upcoming Bookings */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Bookings</h2>
              <div className="mt-6 space-y-6">
                {propertyData.upcomingBookings.map((booking) => (
                  <div key={booking.id} className="border-t pt-6 first:border-t-0 first:pt-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{booking.guestName}</p>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Check-in: {booking.checkIn}</p>
                      <p>Check-out: {booking.checkOut}</p>
                      <p className="mt-1 font-medium text-gray-900">€{booking.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Recent Reviews</h2>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 font-medium text-gray-900">{propertyData.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({propertyData.reviews} reviews)</span>
                </div>
              </div>
              <div className="mt-6 space-y-6">
                {propertyData.recentReviews.map((review) => (
                  <div key={review.id} className="border-t pt-6 first:border-t-0 first:pt-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{review.guestName}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                    <p className="mt-2 text-xs text-gray-500">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
