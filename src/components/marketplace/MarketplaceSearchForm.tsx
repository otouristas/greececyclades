import { useState } from 'react';
import { Search, Calendar, Users, MapPin, Euro, DollarSign } from 'lucide-react';
import { CYCLADES_ISLANDS, MarketplaceSearchParams } from '@/services/hotelMarketplaceService';

interface MarketplaceSearchFormProps {
    onSearch: (params: MarketplaceSearchParams) => void;
    isLoading?: boolean;
    initialValues?: Partial<MarketplaceSearchParams>;
}

export default function MarketplaceSearchForm({
    onSearch,
    isLoading = false,
    initialValues
}: MarketplaceSearchFormProps) {
    // Get tomorrow and day after for default dates
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const [destination, setDestination] = useState(initialValues?.destination || 'santorini');
    const [checkInDate, setCheckInDate] = useState(initialValues?.checkInDate || formatDate(tomorrow));
    const [checkOutDate, setCheckOutDate] = useState(initialValues?.checkOutDate || formatDate(dayAfter));
    const [adults, setAdults] = useState(initialValues?.adults || 2);
    const [children, setChildren] = useState(initialValues?.children || 0);
    const [rooms, setRooms] = useState(initialValues?.rooms || 1);
    const [currency, setCurrency] = useState(initialValues?.currency || 'EUR');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({
            destination,
            checkInDate,
            checkOutDate,
            adults,
            children,
            rooms,
            currency,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Destination */}
                <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Destination
                    </label>
                    <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyclades-sea-blue focus:border-transparent transition-all"
                    >
                        {CYCLADES_ISLANDS.map((island) => (
                            <option key={island.id} value={island.id} className="bg-white dark:bg-dark-card">
                                {island.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Check-in Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Check-in
                    </label>
                    <input
                        type="date"
                        value={checkInDate}
                        min={formatDate(new Date())}
                        onChange={(e) => {
                            setCheckInDate(e.target.value);
                            // Ensure checkout is after checkin
                            if (e.target.value >= checkOutDate) {
                                const newCheckout = new Date(e.target.value);
                                newCheckout.setDate(newCheckout.getDate() + 1);
                                setCheckOutDate(formatDate(newCheckout));
                            }
                        }}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyclades-sea-blue focus:border-transparent transition-all"
                    />
                </div>

                {/* Check-out Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Check-out
                    </label>
                    <input
                        type="date"
                        value={checkOutDate}
                        min={checkInDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyclades-sea-blue focus:border-transparent transition-all"
                    />
                </div>

                {/* Guests & Rooms */}
                <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        Guests & Rooms
                    </label>
                    <div className="flex gap-2">
                        <select
                            value={adults}
                            onChange={(e) => setAdults(Number(e.target.value))}
                            className="flex-1 px-3 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyclades-blue focus:border-transparent transition-all text-sm"
                            title="Adults"
                        >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <option key={n} value={n} className="bg-white dark:bg-dark-card">
                                    {n} Adult{n > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                        <select
                            value={rooms}
                            onChange={(e) => setRooms(Number(e.target.value))}
                            className="flex-1 px-3 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyclades-blue focus:border-transparent transition-all text-sm"
                            title="Rooms"
                        >
                            {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n} className="bg-white dark:bg-dark-card">
                                    {n} Room{n > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Second Row - Additional Options */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                {/* Children & Currency */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-700 dark:text-white/60 font-medium">Children:</label>
                        <select
                            value={children}
                            onChange={(e) => setChildren(Number(e.target.value))}
                            className="px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm"
                        >
                            {[0, 1, 2, 3, 4].map((n) => (
                                <option key={n} value={n} className="bg-white dark:bg-dark-card">
                                    {n}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-700 dark:text-white/60 font-medium">Currency:</label>
                        <div className="flex bg-gray-100 dark:bg-white/5 rounded-lg p-1">
                            <button
                                type="button"
                                onClick={() => setCurrency('EUR')}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${currency === 'EUR'
                                    ? 'bg-white dark:bg-dark-card text-cyclades-sea-blue shadow'
                                    : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <Euro className="w-3 h-3" />
                                EUR
                            </button>
                            <button
                                type="button"
                                onClick={() => setCurrency('USD')}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${currency === 'USD'
                                    ? 'bg-white dark:bg-dark-card text-cyclades-blue shadow'
                                    : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <DollarSign className="w-3 h-3" />
                                USD
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-8 py-3 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    style={{ background: 'linear-gradient(to right, #1E2E48, #40E0D0)' }}
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Comparing Prices...</span>
                        </>
                    ) : (
                        <>
                            <Search className="w-5 h-5" />
                            <span>Compare Prices</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
