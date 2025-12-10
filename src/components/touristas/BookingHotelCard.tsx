import { Link } from 'react-router-dom';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import type { Hotel } from '@/lib/liteapi';

interface BookingHotelCardProps {
    hotel: Hotel;
    onViewDetails?: () => void;
    searchParams?: string;
}

export function BookingHotelCard({ hotel, onViewDetails, searchParams }: BookingHotelCardProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    // Get minimum price from rates
    const minPrice = hotel.rates && hotel.rates.length > 0
        ? hotel.rates
            .filter(r => r.retailRate?.total && r.retailRate.total.length > 0)
            .map(r => r.retailRate.total[0].amount)
            .filter(a => a > 0)
            .reduce((min, amount) => Math.min(min, amount), Infinity)
        : null;

    const hasRates = minPrice !== null && minPrice !== Infinity;
    const imageUrl = hotel.images && hotel.images.length > 0 ? hotel.images[0].url : null;
    const hotelUrl = `/book/hotel/${hotel.id}${searchParams ? `?${searchParams}` : ''}`;

    return (
        <Card className={`overflow-hidden transition-all duration-200 group ${isDark
                ? 'bg-dark-card border-white/10 hover:border-cyclades-turquoise/50'
                : 'bg-white border-gray-200 hover:border-cyan-300 hover:shadow-lg'
            }`}>
            <Link to={hotelUrl} onClick={onViewDetails} className="block">
                <div className="flex flex-col sm:flex-row">
                    {/* Hotel Image */}
                    <div className="w-full sm:w-28 h-32 sm:h-auto bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden flex-shrink-0">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={`${hotel.name}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className={`w-full h-full flex flex-col items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                                <span className="text-2xl mb-1">🏨</span>
                                <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>No image</span>
                            </div>
                        )}
                    </div>

                    {/* Hotel Info */}
                    <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                        <div className="flex-1 min-w-0">
                            {/* Name & Rating */}
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className={`font-bold text-sm line-clamp-2 flex-1 min-w-0 transition-colors ${isDark
                                        ? 'text-white group-hover:text-cyclades-turquoise'
                                        : 'text-gray-900 group-hover:text-cyan-700'
                                    }`}>
                                    {hotel.name}
                                </h3>
                                {hotel.rating && hotel.rating > 0 && (
                                    <div className="flex items-center gap-0.5 flex-shrink-0">
                                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                        <span className={`text-xs font-semibold ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                                            {hotel.rating.toFixed(1)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Location */}
                            {(hotel.city || hotel.address) && (
                                <div className={`flex items-center gap-1 text-xs mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                    <MapPin className={`w-3 h-3 flex-shrink-0 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
                                    <span className="truncate">{hotel.city || hotel.address}</span>
                                </div>
                            )}
                        </div>

                        {/* Price and CTA */}
                        <div className={`flex items-center justify-between gap-2 mt-2 pt-2 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                            {hasRates ? (
                                <div className="flex-1 min-w-0">
                                    <div className={`text-sm font-bold whitespace-nowrap ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-700'}`}>
                                        €{minPrice.toFixed(0)}
                                        <span className={`text-[10px] font-normal ml-0.5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>/night</span>
                                    </div>
                                </div>
                            ) : (
                                <Badge variant="outline" className={`text-[10px] px-1.5 py-0.5 ${isDark ? 'border-white/20 text-white/60' : ''}`}>
                                    Check rates
                                </Badge>
                            )}

                            <Button
                                size="sm"
                                className={`text-[10px] px-2.5 py-1 h-auto flex-shrink-0 ${isDark
                                        ? 'bg-cyclades-turquoise hover:bg-cyan-500 text-white'
                                        : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onViewDetails) onViewDetails();
                                    window.location.href = hotelUrl;
                                }}
                            >
                                Details
                                <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );
}
