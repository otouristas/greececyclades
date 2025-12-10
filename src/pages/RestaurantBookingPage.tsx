import React, { useState, useEffect } from 'react';
import {
    Utensils,
    MapPin,
    Clock,
    Users,
    Phone,
    MessageCircle,
    Star,
    ChevronRight,
    Search,
    Filter,
    Calendar,
    Check,
    X
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cyclades } from '../data/cyclades';

interface Restaurant {
    id: string;
    name: string;
    island: string;
    cuisine: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    image: string;
    address: string;
    phone?: string;
    whatsapp?: string;
    openHours: string;
    features: string[];
    hasOnlineBooking: boolean;
}

// Mock restaurant data
const mockRestaurants: Restaurant[] = [
    {
        id: 'r1',
        name: 'Sunset Taverna',
        island: 'Santorini',
        cuisine: 'Traditional Greek',
        rating: 4.8,
        reviewCount: 342,
        priceRange: '€€€',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
        address: 'Oia Main Street, Oia',
        phone: '+30 22860 71280',
        whatsapp: '+306971234567',
        openHours: '12:00 - 23:00',
        features: ['Sea View', 'Sunset View', 'Vegetarian Options', 'Wine List'],
        hasOnlineBooking: true,
    },
    {
        id: 'r2',
        name: "Kiki's Tavern",
        island: 'Mykonos',
        cuisine: 'Greek BBQ',
        rating: 4.7,
        reviewCount: 512,
        priceRange: '€€',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
        address: 'Agios Sostis Beach',
        phone: '+30 22890 27065',
        openHours: '13:00 - 19:00',
        features: ['Beachfront', 'Fresh Seafood', 'No Reservations', 'Cash Only'],
        hasOnlineBooking: false,
    },
    {
        id: 'r3',
        name: 'Omega3',
        island: 'Sifnos',
        cuisine: 'Seafood',
        rating: 4.9,
        reviewCount: 189,
        priceRange: '€€€',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
        address: 'Kamares Port',
        phone: '+30 22840 33640',
        whatsapp: '+306981234567',
        openHours: '18:00 - 00:00',
        features: ['Fresh Catch', 'Waterfront', 'Romantic', 'Local Wine'],
        hasOnlineBooking: true,
    },
    {
        id: 'r4',
        name: 'Lefteris Grill',
        island: 'Naxos',
        cuisine: 'Souvlaki & Gyros',
        rating: 4.6,
        reviewCount: 823,
        priceRange: '€',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
        address: 'Naxos Town Center',
        phone: '+30 22850 23456',
        openHours: '11:00 - 01:00',
        features: ['Quick Service', 'Local Favorite', 'Budget Friendly'],
        hasOnlineBooking: true,
    },
];

const RestaurantBookingPage: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
    const [selectedIsland, setSelectedIsland] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Booking form state
    const [bookingForm, setBookingForm] = useState({
        date: '',
        time: '19:00',
        partySize: 2,
        name: '',
        phone: '',
        specialRequests: '',
    });

    const timeSlots = [
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
    ];

    const filteredRestaurants = restaurants.filter(r => {
        if (selectedIsland && r.island.toLowerCase() !== selectedIsland.toLowerCase()) return false;
        if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const openBookingModal = (restaurant: Restaurant) => {
        setSelectedRestaurant(restaurant);
        setShowBookingModal(true);
        setBookingSuccess(false);
    };

    const handleBooking = async () => {
        // Simulate booking submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookingSuccess(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setShowBookingModal(false);
            setBookingForm({
                date: '',
                time: '19:00',
                partySize: 2,
                name: '',
                phone: '',
                specialRequests: '',
            });
        }, 3000);
    };

    const openWhatsApp = (restaurant: Restaurant) => {
        const message = encodeURIComponent(
            `Hi! I'd like to make a reservation at ${restaurant.name}.\n\nDate: ${bookingForm.date || 'TBD'}\nTime: ${bookingForm.time}\nGuests: ${bookingForm.partySize}`
        );
        window.open(`https://wa.me/${restaurant.whatsapp?.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    };

    return (
        <>
            <SEO
                title="Restaurant Booking | Discover Cyclades"
                description="Book tables at the best restaurants across the Cyclades islands. From romantic sunset dinners to local tavernas."
            />

            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                {/* Header */}
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-orange-900 to-red-900' : 'bg-gradient-to-r from-orange-600 to-red-600'} text-white py-12 px-4`}>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Utensils className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-bold">Restaurant Booking</h1>
                        </div>
                        <p className="text-lg opacity-90 max-w-2xl">
                            Discover and book the finest dining experiences across the Cyclades islands.
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Filters */}
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg mb-6`}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search restaurants or cuisines..."
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        }`}
                                />
                            </div>
                            <select
                                value={selectedIsland}
                                onChange={e => setSelectedIsland(e.target.value)}
                                className={`px-4 py-3 rounded-xl border ${isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            >
                                <option value="">All Islands</option>
                                {cyclades.map(island => (
                                    <option key={island.id} value={island.name}>{island.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Restaurant Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredRestaurants.map(restaurant => (
                            <motion.div
                                key={restaurant.id}
                                layout
                                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}
                            >
                                <div className="relative h-48">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3 px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-900">
                                        {restaurant.priceRange}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {restaurant.name}
                                            </h3>
                                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {restaurant.cuisine}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                            <span className="font-medium">{restaurant.rating}</span>
                                        </div>
                                    </div>

                                    <div className={`flex flex-wrap gap-4 text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {restaurant.island}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {restaurant.openHours}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {restaurant.features.slice(0, 3).map(feature => (
                                            <span
                                                key={feature}
                                                className={`text-xs px-2 py-1 rounded-full ${isDarkMode
                                                        ? 'bg-gray-700 text-gray-300'
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                        {restaurant.features.length > 3 && (
                                            <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                +{restaurant.features.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {restaurant.hasOnlineBooking && (
                                            <button
                                                onClick={() => openBookingModal(restaurant)}
                                                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <Calendar className="w-5 h-5" />
                                                Book Table
                                            </button>
                                        )}
                                        {restaurant.whatsapp && (
                                            <button
                                                onClick={() => {
                                                    setSelectedRestaurant(restaurant);
                                                    openWhatsApp(restaurant);
                                                }}
                                                className={`py-3 px-4 rounded-xl font-semibold flex items-center gap-2 transition-colors ${restaurant.hasOnlineBooking
                                                        ? isDarkMode
                                                            ? 'bg-gray-700 text-green-400 hover:bg-gray-600'
                                                            : 'bg-gray-100 text-green-600 hover:bg-gray-200'
                                                        : 'flex-1 bg-green-500 hover:bg-green-600 text-white'
                                                    }`}
                                            >
                                                <MessageCircle className="w-5 h-5" />
                                                {!restaurant.hasOnlineBooking && 'WhatsApp'}
                                            </button>
                                        )}
                                        {restaurant.phone && !restaurant.hasOnlineBooking && !restaurant.whatsapp && (
                                            <a
                                                href={`tel:${restaurant.phone}`}
                                                className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <Phone className="w-5 h-5" />
                                                Call to Book
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredRestaurants.length === 0 && (
                        <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Utensils className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No restaurants found matching your criteria</p>
                        </div>
                    )}
                </div>

                {/* Booking Modal */}
                <AnimatePresence>
                    {showBookingModal && selectedRestaurant && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                            onClick={() => setShowBookingModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto`}
                                onClick={e => e.stopPropagation()}
                            >
                                {bookingSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Booking Request Sent!
                                        </h3>
                                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                            {selectedRestaurant.name} will confirm your reservation shortly.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                Book at {selectedRestaurant.name}
                                            </h3>
                                            <button
                                                onClick={() => setShowBookingModal(false)}
                                                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Date */}
                                        <div className="mb-4">
                                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                value={bookingForm.date}
                                                onChange={e => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                                                min={new Date().toISOString().split('T')[0]}
                                                className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white'
                                                        : 'bg-white border-gray-300 text-gray-900'
                                                    }`}
                                            />
                                        </div>

                                        {/* Time */}
                                        <div className="mb-4">
                                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Time
                                            </label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {timeSlots.map(time => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setBookingForm(prev => ({ ...prev, time }))}
                                                        className={`py-2 rounded-lg text-sm font-medium transition-all ${bookingForm.time === time
                                                                ? 'bg-orange-500 text-white'
                                                                : isDarkMode
                                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Party Size */}
                                        <div className="mb-4">
                                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Number of Guests
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => setBookingForm(prev => ({ ...prev, partySize: Math.max(1, prev.partySize - 1) }))}
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    -
                                                </button>
                                                <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {bookingForm.partySize}
                                                </span>
                                                <button
                                                    onClick={() => setBookingForm(prev => ({ ...prev, partySize: Math.min(20, prev.partySize + 1) }))}
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <div className="mb-4">
                                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                value={bookingForm.name}
                                                onChange={e => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="John Smith"
                                                className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                                    }`}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="mb-4">
                                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={bookingForm.phone}
                                                onChange={e => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                                                placeholder="+30 694 123 4567"
                                                className={`w-full px-4 py-3 rounded-xl border ${isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                                    }`}
                                            />
                                        </div>

                                        {/* Special Requests */}
                                        <div className="mb-6">
                                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Special Requests (optional)
                                            </label>
                                            <textarea
                                                value={bookingForm.specialRequests}
                                                onChange={e => setBookingForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                                                placeholder="Allergies, special occasion, seating preference..."
                                                rows={3}
                                                className={`w-full px-4 py-3 rounded-xl border resize-none ${isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                                    }`}
                                            />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            onClick={handleBooking}
                                            disabled={!bookingForm.date || !bookingForm.name || !bookingForm.phone}
                                            className={`w-full py-4 rounded-xl font-semibold transition-all ${bookingForm.date && bookingForm.name && bookingForm.phone
                                                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            Request Booking
                                        </button>

                                        {selectedRestaurant.whatsapp && (
                                            <button
                                                onClick={() => openWhatsApp(selectedRestaurant)}
                                                className={`w-full mt-3 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${isDarkMode
                                                        ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                    }`}
                                            >
                                                <MessageCircle className="w-5 h-5" />
                                                Or book via WhatsApp
                                            </button>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default RestaurantBookingPage;
