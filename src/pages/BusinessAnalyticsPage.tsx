import React, { useState, useEffect } from 'react';
import {
    Building2,
    BarChart3,
    Users,
    Star,
    Eye,
    MousePointer,
    TrendingUp,
    TrendingDown,
    Calendar,
    DollarSign,
    MapPin,
    MessageCircle,
    Clock,
    ChevronRight,
    Download,
    Settings,
    Bell
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface AnalyticsData {
    views: number;
    viewsChange: number;
    clicks: number;
    clicksChange: number;
    bookings: number;
    bookingsChange: number;
    revenue: number;
    revenueChange: number;
    rating: number;
    reviews: number;
}

interface DailyStats {
    date: string;
    views: number;
    bookings: number;
}

interface TopSource {
    source: string;
    visits: number;
    percentage: number;
}

const BusinessAnalyticsPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
    const [analytics, setAnalytics] = useState<AnalyticsData>({
        views: 12450,
        viewsChange: 15.2,
        clicks: 3280,
        clicksChange: 8.5,
        bookings: 156,
        bookingsChange: 22.3,
        revenue: 28500,
        revenueChange: 18.7,
        rating: 4.8,
        reviews: 89,
    });

    const [dailyStats] = useState<DailyStats[]>([
        { date: '2024-12-01', views: 420, bookings: 5 },
        { date: '2024-12-02', views: 385, bookings: 4 },
        { date: '2024-12-03', views: 510, bookings: 7 },
        { date: '2024-12-04', views: 445, bookings: 6 },
        { date: '2024-12-05', views: 390, bookings: 4 },
        { date: '2024-12-06', views: 620, bookings: 9 },
        { date: '2024-12-07', views: 580, bookings: 8 },
    ]);

    const [topSources] = useState<TopSource[]>([
        { source: 'Google Search', visits: 4820, percentage: 38.7 },
        { source: 'Direct', visits: 3150, percentage: 25.3 },
        { source: 'Touristas AI', visits: 2340, percentage: 18.8 },
        { source: 'Social Media', visits: 1280, percentage: 10.3 },
        { source: 'Email', visits: 860, percentage: 6.9 },
    ]);

    const [recentBookings] = useState([
        { id: 'B001', guest: 'Maria K.', date: '2024-12-15', nights: 3, amount: 450, status: 'confirmed' },
        { id: 'B002', guest: 'John D.', date: '2024-12-18', nights: 5, amount: 750, status: 'pending' },
        { id: 'B003', guest: 'Elena P.', date: '2024-12-20', nights: 2, amount: 300, status: 'confirmed' },
    ]);

    const maxViews = Math.max(...dailyStats.map(d => d.views));

    return (
        <>
            <SEO
                title="Business Analytics | Discover Cyclades"
                description="Track your business performance with detailed analytics, booking insights, and revenue reports."
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-violet-900 to-purple-900' : 'bg-gradient-to-r from-violet-600 to-purple-600'} text-white py-12 px-4`}>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Building2 className="w-8 h-8" />
                                    <h1 className="text-3xl md:text-4xl font-bold">Business Analytics</h1>
                                </div>
                                <p className="text-lg opacity-90">
                                    Sunset Villas, Santorini
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-white/20 rounded-xl flex items-center gap-2 hover:bg-white/30 transition-colors">
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                                <button className="px-4 py-2 bg-white/20 rounded-xl flex items-center gap-2 hover:bg-white/30 transition-colors">
                                    <Settings className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Time Range Selector */}
                    <div className="flex gap-2 mb-6">
                        {(['7d', '30d', '90d'] as const).map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${timeRange === range
                                        ? 'bg-violet-500 text-white'
                                        : isDarkMode
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                    }`}
                            >
                                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                            </button>
                        ))}
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Views', value: analytics.views.toLocaleString(), change: analytics.viewsChange, icon: Eye, color: 'blue' },
                            { label: 'Profile Clicks', value: analytics.clicks.toLocaleString(), change: analytics.clicksChange, icon: MousePointer, color: 'green' },
                            { label: 'Bookings', value: analytics.bookings, change: analytics.bookingsChange, icon: Calendar, color: 'purple' },
                            { label: 'Revenue', value: `€${analytics.revenue.toLocaleString()}`, change: analytics.revenueChange, icon: DollarSign, color: 'amber' },
                        ].map((kpi, i) => (
                            <motion.div
                                key={kpi.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-lg`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-2 rounded-xl bg-${kpi.color}-100 dark:bg-${kpi.color}-900/30`}>
                                        <kpi.icon className={`w-5 h-5 text-${kpi.color}-500`} />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm ${kpi.change > 0 ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                        {kpi.change > 0 ? (
                                            <TrendingUp className="w-4 h-4" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4" />
                                        )}
                                        {Math.abs(kpi.change)}%
                                    </div>
                                </div>
                                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {kpi.value}
                                </p>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {kpi.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Chart Area */}
                        <div className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Views & Bookings
                            </h2>
                            <div className="h-64 flex items-end gap-2">
                                {dailyStats.map((day, i) => (
                                    <div key={day.date} className="flex-1 flex flex-col items-center">
                                        <div className="w-full flex flex-col gap-1">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(day.views / maxViews) * 100}%` }}
                                                transition={{ delay: i * 0.05 }}
                                                className="bg-violet-500 rounded-t-lg min-h-[4px]"
                                                style={{ height: `${(day.views / maxViews) * 200}px` }}
                                            />
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(day.bookings / 10) * 100}%` }}
                                                transition={{ delay: i * 0.05 + 0.1 }}
                                                className="bg-green-500 rounded-b-lg min-h-[4px]"
                                                style={{ height: `${day.bookings * 8}px` }}
                                            />
                                        </div>
                                        <span className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {new Date(day.date).getDate()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-4 justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-violet-500" />
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Views</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bookings</span>
                                </div>
                            </div>
                        </div>

                        {/* Traffic Sources */}
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Traffic Sources
                            </h2>
                            <div className="space-y-4">
                                {topSources.map((source, i) => (
                                    <div key={source.source}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {source.source}
                                            </span>
                                            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {source.percentage}%
                                            </span>
                                        </div>
                                        <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${source.percentage}%` }}
                                                transition={{ delay: i * 0.1 }}
                                                className={`h-full ${i === 0 ? 'bg-violet-500' :
                                                        i === 1 ? 'bg-blue-500' :
                                                            i === 2 ? 'bg-green-500' :
                                                                i === 3 ? 'bg-yellow-500' : 'bg-pink-500'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Bookings */}
                    <div className={`mt-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Recent Bookings
                            </h2>
                            <button className="text-violet-500 hover:text-violet-600 flex items-center gap-1 text-sm font-medium">
                                View All
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className={`text-left text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <th className="pb-3 font-medium">Booking ID</th>
                                        <th className="pb-3 font-medium">Guest</th>
                                        <th className="pb-3 font-medium">Check-in</th>
                                        <th className="pb-3 font-medium">Nights</th>
                                        <th className="pb-3 font-medium">Amount</th>
                                        <th className="pb-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.map(booking => (
                                        <tr key={booking.id} className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                            <td className={`py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{booking.id}</td>
                                            <td className={`py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{booking.guest}</td>
                                            <td className={`py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{booking.date}</td>
                                            <td className={`py-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{booking.nights}</td>
                                            <td className={`py-3 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>€{booking.amount}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Rating & Reviews Summary */}
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Guest Ratings
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <div className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {analytics.rating}
                                    </div>
                                    <div className="flex gap-0.5 mt-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} className={`w-4 h-4 ${star <= Math.round(analytics.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                                }`} />
                                        ))}
                                    </div>
                                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {analytics.reviews} reviews
                                    </p>
                                </div>
                                <div className="flex-1 space-y-2">
                                    {[5, 4, 3, 2, 1].map(rating => (
                                        <div key={rating} className="flex items-center gap-2">
                                            <span className={`w-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{rating}</span>
                                            <div className={`flex-1 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                <div
                                                    className="h-full bg-yellow-400 rounded-full"
                                                    style={{ width: `${rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 8 : 2}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                AI Insights
                            </h2>
                            <div className="space-y-3">
                                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
                                    <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                                        📈 Your bookings are up 22% this month. Peak season is driving strong demand!
                                    </p>
                                </div>
                                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                                    <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                                        💡 Touristas AI is driving 18.8% of your traffic. Consider adding more photos to improve AI recommendations.
                                    </p>
                                </div>
                                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-amber-900/30 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
                                    <p className={`text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                                        ⚡ Response time to inquiries averages 2.5 hours. Aim for under 1 hour for higher conversion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BusinessAnalyticsPage;
