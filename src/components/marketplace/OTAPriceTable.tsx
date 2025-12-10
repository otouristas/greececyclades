import { ExternalLink, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { MarketplaceVendor, getOTAColor } from '@/services/hotelMarketplaceService';

interface OTAPriceTableProps {
    vendors: MarketplaceVendor[];
    currency?: string;
}

export default function OTAPriceTable({ vendors, currency = 'EUR' }: OTAPriceTableProps) {
    if (!vendors.length) return null;

    const lowestPrice = vendors[0]?.priceNumeric || 0;
    const highestPrice = vendors[vendors.length - 1]?.priceNumeric || 0;

    const getPriceDifference = (price: number): { value: number; type: 'savings' | 'higher' | 'same' } => {
        if (price === lowestPrice) return { value: 0, type: 'same' };
        const diff = price - lowestPrice;
        return { value: diff, type: price > lowestPrice ? 'higher' : 'savings' };
    };

    return (
        <div className="p-5 bg-gray-50 dark:bg-white/5">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-white/80 mb-4">
                Price Comparison Across OTAs
            </h4>

            <div className="space-y-3">
                {vendors.map((vendor, index) => {
                    const diff = getPriceDifference(vendor.priceNumeric);
                    const isLowest = index === 0;
                    const vendorColor = getOTAColor(vendor.name);

                    return (
                        <div
                            key={vendor.name}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all ${isLowest
                                    ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                                    : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10'
                                }`}
                        >
                            {/* Vendor Info */}
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-1 h-8 rounded-full"
                                    style={{ backgroundColor: vendorColor }}
                                />
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {vendor.name}
                                    </div>
                                    {isLowest && (
                                        <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                                            Best Price
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Price & Difference */}
                            <div className="flex items-center gap-4">
                                {/* Price Difference */}
                                {!isLowest && (
                                    <div className={`flex items-center gap-1 text-sm ${diff.type === 'higher'
                                            ? 'text-red-500 dark:text-red-400'
                                            : 'text-green-600 dark:text-green-400'
                                        }`}>
                                        {diff.type === 'higher' ? (
                                            <>
                                                <TrendingUp className="w-4 h-4" />
                                                <span>+{currency === 'EUR' ? '€' : '$'}{diff.value.toFixed(0)}</span>
                                            </>
                                        ) : diff.type === 'same' ? (
                                            <>
                                                <Minus className="w-4 h-4" />
                                                <span>Same</span>
                                            </>
                                        ) : (
                                            <>
                                                <TrendingDown className="w-4 h-4" />
                                                <span>-{currency === 'EUR' ? '€' : '$'}{Math.abs(diff.value).toFixed(0)}</span>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Price */}
                                <div
                                    className={`text-lg font-bold ${isLowest ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'
                                        }`}
                                >
                                    {vendor.price}
                                </div>

                                {/* Book Link (placeholder) */}
                                <button
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isLowest
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/80 hover:bg-gray-300 dark:hover:bg-white/20'
                                        }`}
                                    onClick={() => {
                                        // In a real implementation, this would open the booking link
                                        window.open(`https://www.google.com/search?q=${encodeURIComponent(vendor.name + ' booking')}`, '_blank');
                                    }}
                                >
                                    <span>Book</span>
                                    <ExternalLink className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            {vendors.length > 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-white/60">
                            Potential savings by comparing
                        </span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                            Up to {currency === 'EUR' ? '€' : '$'}{(highestPrice - lowestPrice).toFixed(0)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
