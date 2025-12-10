import { Star, MapPin, Phone, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { MarketplaceHotel, getOTAColor, calculateSavings, generateHotelAdvicePrompt } from '@/services/hotelMarketplaceService';
import { useTouristas } from '@/contexts/TouristasContext';
import OTAPriceTable from './OTAPriceTable';

interface HotelMarketplaceCardProps {
    hotel: MarketplaceHotel;
    destination: string;
    currency?: string;
}

export default function HotelMarketplaceCard({ hotel, destination, currency = 'EUR' }: HotelMarketplaceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { openChat } = useTouristas();

    const savings = calculateSavings(hotel.vendors);
    const vendorCount = hotel.vendors.length;

    const handleAskTouristas = () => {
        const prompt = generateHotelAdvicePrompt(hotel, destination);
        openChat(prompt);
    };

    return (
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all duration-300">
            {/* Header with Hotel Info */}
            <div className="p-5">
                <div className="flex justify-between items-start gap-4">
                    {/* Hotel Details */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                            {hotel.name}
                        </h3>

                        {/* Rating & Reviews */}
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {hotel.reviews.rating}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-white/60">
                                ({hotel.reviews.count.toLocaleString()} reviews)
                            </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1 mt-2 text-gray-500 dark:text-white/60">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm capitalize">{destination}</span>
                        </div>

                        {/* Phone */}
                        {hotel.telephone && (
                            <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-white/60">
                                <Phone className="w-4 h-4" />
                                <a href={`tel:${hotel.telephone}`} className="text-sm hover:text-cyclades-blue transition-colors">
                                    {hotel.telephone}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Best Price Badge */}
                    <div className="text-right flex-shrink-0">
                        <div className="text-sm text-gray-500 dark:text-white/60">Best price from</div>
                        <div
                            className="text-2xl font-bold mt-1"
                            style={{ color: getOTAColor(hotel.lowestPriceVendor) }}
                        >
                            {hotel.vendors[0]?.price || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-white/60 mt-1">
                            via <span className="font-medium">{hotel.lowestPriceVendor}</span>
                        </div>
                        {savings > 0 && (
                            <div className="inline-block mt-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                                Save up to {savings}%
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Price Comparison - Always show all vendors */}
                <div className="mt-4">
                    <div className="text-xs font-semibold text-gray-500 dark:text-white/50 uppercase tracking-wide mb-2">
                        {vendorCount} {vendorCount === 1 ? 'OTA' : 'OTAs'} Available
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {hotel.vendors.map((vendor, index) => (
                            <div
                                key={vendor.name}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${index === 0
                                    ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                                    : 'bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10'
                                    }`}
                            >
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: getOTAColor(vendor.name) }}
                                />
                                <span className="text-gray-600 dark:text-white/70">{vendor.name}</span>
                                <span className={`font-semibold ${index === 0 ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                    {vendor.price}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center gap-3">
                    {/* Ask Touristas AI */}
                    <button
                        onClick={handleAskTouristas}
                        className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                        style={{ background: 'linear-gradient(to right, #1E2E48, #40E0D0)' }}
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Ask Touristas AI</span>
                    </button>

                    {/* Expand/Collapse - only show if multiple vendors */}
                    {vendorCount > 1 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1 px-4 py-2 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    <span>Show less</span>
                                    <ChevronUp className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    <span>Compare all {vendorCount} prices</span>
                                    <ChevronDown className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Expanded Price Table */}
            {isExpanded && vendorCount > 1 && (
                <div className="border-t border-gray-100 dark:border-white/10">
                    <OTAPriceTable vendors={hotel.vendors} currency={currency} />
                </div>
            )}
        </div>
    );
}
