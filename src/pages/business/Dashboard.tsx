import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/business/DashboardLayout';
import {
  Bell,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Building2,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  Clock,
  TrendingUp,
  Settings,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'review' | 'maintenance' | 'payment';
  read: boolean;
}

interface RecentBooking {
  id: string;
  guestName: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
}

interface RecentReview {
  id: string;
  guestName: string;
  propertyName: string;
  rating: number;
  comment: string;
  date: string;
}

interface UpcomingTask {
  id: string;
  title: string;
  property: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'maintenance' | 'pricing' | 'cleaning';
}

interface PropertyPerformance {
  id: string;
  name: string;
  occupancyRate: number;
  averageRating: number;
  totalBookings: number;
  revenue: number;
  trend: 'up' | 'down';
}

export default function BusinessDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      name: 'Total Revenue',
      value: '€24,500',
      change: '+12.5%',
      trend: 'up',
      icon: CreditCard,
    },
    {
      name: 'Total Bookings',
      value: '145',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
    },
    {
      name: 'Active Properties',
      value: '12',
      change: '0%',
      trend: 'neutral',
      icon: Building2,
    },
    {
      name: 'Average Rating',
      value: '4.8',
      change: '+0.3',
      trend: 'up',
      icon: Star,
    },
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Booking Request',
      message: 'John Doe requested to book Sunset Villa for 5 nights',
      time: '10 minutes ago',
      type: 'booking',
      read: false,
    },
    {
      id: '2',
      title: 'New Review',
      message: 'Sarah left a 5-star review for Blue Cave House',
      time: '1 hour ago',
      type: 'review',
      read: false,
    },
    {
      id: '3',
      title: 'Maintenance Alert',
      message: 'Scheduled maintenance for Harbor View Suite tomorrow',
      time: '2 hours ago',
      type: 'maintenance',
      read: true,
    },
  ];

  const recentBookings: RecentBooking[] = [
    {
      id: 'B001',
      guestName: 'John Doe',
      propertyName: 'Sunset Villa',
      checkIn: '2025-01-25',
      checkOut: '2025-01-30',
      status: 'confirmed',
      amount: 1750,
    },
    {
      id: 'B002',
      guestName: 'Sarah Smith',
      propertyName: 'Blue Cave House',
      checkIn: '2025-02-01',
      checkOut: '2025-02-05',
      status: 'pending',
      amount: 1000,
    },
    {
      id: 'B003',
      guestName: 'Mike Johnson',
      propertyName: 'Harbor View Suite',
      checkIn: '2025-02-10',
      checkOut: '2025-02-15',
      status: 'confirmed',
      amount: 900,
    },
  ];

  const recentReviews: RecentReview[] = [
    {
      id: 'R001',
      guestName: 'Emma Wilson',
      propertyName: 'Sunset Villa',
      rating: 5,
      comment: 'Beautiful property with amazing views. The host was very responsive and helpful.',
      date: '2025-01-20',
    },
    {
      id: 'R002',
      guestName: 'Alex Brown',
      propertyName: 'Blue Cave House',
      rating: 4,
      comment: 'Great location and comfortable stay. Could use some minor maintenance.',
      date: '2025-01-19',
    },
    {
      id: 'R003',
      guestName: 'Maria Garcia',
      propertyName: 'Harbor View Suite',
      rating: 5,
      comment: 'Perfect location with stunning harbor views. Everything was spotless.',
      date: '2025-01-18',
    },
  ];

  const upcomingTasks: UpcomingTask[] = [
    {
      id: 'T001',
      title: 'Property Inspection',
      property: 'Sunset Villa',
      dueDate: '2025-01-25',
      priority: 'high',
      type: 'maintenance',
    },
    {
      id: 'T002',
      title: 'Update Pricing',
      property: 'All Properties',
      dueDate: '2025-01-28',
      priority: 'medium',
      type: 'pricing',
    },
    {
      id: 'T003',
      title: 'Deep Cleaning',
      property: 'Blue Cave House',
      dueDate: '2025-01-30',
      priority: 'low',
      type: 'cleaning',
    },
  ];

  const propertyPerformance: PropertyPerformance[] = [
    {
      id: 'P001',
      name: 'Sunset Villa',
      occupancyRate: 85,
      averageRating: 4.8,
      totalBookings: 45,
      revenue: 78500,
      trend: 'up',
    },
    {
      id: 'P002',
      name: 'Blue Cave House',
      occupancyRate: 75,
      averageRating: 4.5,
      totalBookings: 38,
      revenue: 52000,
      trend: 'up',
    },
    {
      id: 'P003',
      name: 'Harbor View Suite',
      occupancyRate: 70,
      averageRating: 4.7,
      totalBookings: 32,
      revenue: 44000,
      trend: 'down',
    },
  ];

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

  const bookingsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Bookings',
        data: [5, 8, 6, 9, 7, 12, 10],
        backgroundColor: 'rgb(59, 130, 246)',
        borderRadius: 4,
      },
    ],
  };

  const maintenanceTasks = [
    {
      id: 'MT001',
      property: 'Sunset Villa',
      task: 'Pool maintenance',
      dueDate: '2025-01-23',
      priority: 'high',
    },
    {
      id: 'MT002',
      property: 'Blue Cave House',
      task: 'AC inspection',
      dueDate: '2025-01-25',
      priority: 'medium',
    },
    {
      id: 'MT003',
      property: 'Harbor View Suite',
      task: 'Deep cleaning',
      dueDate: '2025-01-24',
      priority: 'low',
    },
  ];

  const insights = [
    {
      id: 'I001',
      title: 'Booking Trend',
      description: 'Bookings have increased by 25% compared to last month',
      type: 'positive',
      metric: '+25%',
      icon: TrendingUp,
    },
    {
      id: 'I002',
      title: 'Peak Season Alert',
      description: 'Summer season is approaching. Consider adjusting rates.',
      type: 'info',
      metric: '90 days',
      icon: Calendar,
    },
    {
      id: 'I003',
      title: 'Review Score',
      description: 'Average rating has improved to 4.8/5',
      type: 'positive',
      metric: '4.8/5',
      icon: Star,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Here's what's happening with your properties
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="flex items-center">
                <div className="rounded-lg bg-blue-50 p-3">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.trend === 'up'
                          ? 'text-green-600'
                          : stat.trend === 'down'
                          ? 'text-red-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : stat.trend === 'down' ? (
                        <ArrowDownRight className="h-4 w-4" />
                      ) : null}
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/business/properties/new"
            className="flex items-center justify-between rounded-lg border bg-white p-4 hover:border-blue-500 hover:shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Add Property</h3>
                <p className="text-sm text-gray-500">List a new property</p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            to="/business/bookings/new"
            className="flex items-center justify-between rounded-lg border bg-white p-4 hover:border-blue-500 hover:shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-green-50 p-2">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">New Booking</h3>
                <p className="text-sm text-gray-500">Create a booking</p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            to="/business/settings/calendar"
            className="flex items-center justify-between rounded-lg border bg-white p-4 hover:border-blue-500 hover:shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-purple-50 p-2">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Availability</h3>
                <p className="text-sm text-gray-500">Manage calendar</p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            to="/business/support"
            className="flex items-center justify-between rounded-lg border bg-white p-4 hover:border-blue-500 hover:shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-yellow-50 p-2">
                <MessageSquare className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Support</h3>
                <p className="text-sm text-gray-500">Get help</p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>

        {/* Business Insights */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="flex items-start justify-between rounded-lg border bg-white p-6"
            >
              <div>
                <div className="flex items-center">
                  <insight.icon
                    className={`mr-2 h-5 w-5 ${
                      insight.type === 'positive'
                        ? 'text-green-500'
                        : insight.type === 'negative'
                        ? 'text-red-500'
                        : 'text-blue-500'
                    }`}
                  />
                  <h3 className="font-medium text-gray-900">{insight.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-500">{insight.description}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${
                  insight.type === 'positive'
                    ? 'bg-green-100 text-green-700'
                    : insight.type === 'negative'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {insight.metric}
              </span>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
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

          <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Booking Trends</h2>
            <div className="mt-6 h-[300px]">
              <Bar
                data={bookingsData}
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
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Maintenance Tasks */}
        <div className="rounded-lg border bg-white">
          <div className="border-b p-6">
            <h2 className="text-lg font-medium text-gray-900">Maintenance Tasks</h2>
          </div>
          <div className="divide-y">
            {maintenanceTasks.map((task) => (
              <div key={task.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <AlertTriangle
                        className={`mr-2 h-5 w-5 ${
                          task.priority === 'high'
                            ? 'text-red-500'
                            : task.priority === 'medium'
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}
                      />
                      <h3 className="font-medium text-gray-900">{task.task}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{task.property}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      <Clock className="mr-1 inline-block h-4 w-4" />
                      Due: {task.dueDate}
                    </div>
                    <button className="rounded-lg border px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-6">
            <Link
              to="/business/maintenance"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all tasks →
            </Link>
          </div>
        </div>

        {/* Property Performance */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-lg font-medium text-gray-900">Property Performance</h2>
          </div>
          <div className="divide-y">
            {propertyPerformance.map((property) => (
              <div key={property.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Link
                      to={`/business/properties/${property.id}`}
                      className="group inline-block"
                    >
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                        {property.name}
                      </h3>
                    </Link>
                    <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-sm text-gray-500">Occupancy Rate</p>
                        <p className="mt-1 font-medium text-gray-900">{property.occupancyRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Average Rating</p>
                        <p className="mt-1 font-medium text-gray-900">{property.averageRating}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Bookings</p>
                        <p className="mt-1 font-medium text-gray-900">{property.totalBookings}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="mt-1 font-medium text-gray-900">€{property.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {property.trend === 'up' ? (
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity and Notifications */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Bookings */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="border-b p-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
            </div>
            <div className="divide-y">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        to={`/business/bookings/${booking.id}`}
                        className="group inline-block"
                      >
                        <p className="font-medium text-gray-900 group-hover:text-blue-600">
                          {booking.guestName}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{booking.propertyName}</p>
                      </Link>
                    </div>
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
                  <div className="mt-3 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Check-in: {booking.checkIn}</span>
                      <span>€{booking.amount}</span>
                    </div>
                    <div className="mt-1">Check-out: {booking.checkOut}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="border-b p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  {notifications.filter((n) => !n.read).length}
                </span>
              </div>
            </div>
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 ${notification.read ? '' : 'bg-blue-50'}`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`rounded-full p-2 ${
                        notification.type === 'booking'
                          ? 'bg-blue-100 text-blue-600'
                          : notification.type === 'review'
                          ? 'bg-yellow-100 text-yellow-600'
                          : notification.type === 'maintenance'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {notification.type === 'booking' ? (
                        <Calendar className="h-5 w-5" />
                      ) : notification.type === 'review' ? (
                        <Star className="h-5 w-5" />
                      ) : notification.type === 'maintenance' ? (
                        <Bell className="h-5 w-5" />
                      ) : (
                        <MessageSquare className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                      <p className="mt-2 text-xs text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews and Tasks */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Reviews */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="border-b p-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Reviews</h2>
            </div>
            <div className="divide-y">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium text-gray-900">{review.guestName}</p>
                        <div className="ml-4 flex">
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
                      <p className="mt-1 text-sm text-gray-500">{review.propertyName}</p>
                    </div>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="border-b p-6">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Tasks</h2>
            </div>
            <div className="divide-y">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-6">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`rounded-full p-2 ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-600'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {task.type === 'maintenance' ? (
                        <Building2 className="h-5 w-5" />
                      ) : task.type === 'pricing' ? (
                        <CreditCard className="h-5 w-5" />
                      ) : (
                        <Bell className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{task.property}</p>
                      <p className="mt-2 text-sm text-gray-500">Due: {task.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
