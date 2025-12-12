import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, TrendingUp, Shield, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { HotelMarketplaceCard, MarketplaceSearchForm } from '@/components/marketplace';
import {
    searchMarketplaceHotels,
    MarketplaceSearchParams,
    MarketplaceSearchResult,
    CYCLADES_ISLANDS
} from '@/services/hotelMarketplaceService';
import { useTouristas } from '@/contexts/TouristasContext';

export default function HotelMarketplace() {
    const { t } = useTranslation();
    const [searchResult, setSearchResult] = useState<MarketplaceSearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [lastSearchParams, setLastSearchParams] = useState<MarketplaceSearchParams | null>(null);
    const { openChat } = useTouristas();

    const handleSearch = async (params: MarketplaceSearchParams) => {
        setIsLoading(true);
        setError(null);
        setCurrentPage(params.pagination || 0);
        setLastSearchParams(params);

        try {
            const result = await searchMarketplaceHotels(params);
            setSearchResult(result);
        } catch (err) {
            console.error('Search error:', err);
            setError(err instanceof Error ? err.message : 'Failed to search hotels. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (lastSearchParams) {
            handleSearch({ ...lastSearchParams, pagination: newPage });
        }
    };

    const handleAskGeneralAdvice = () => {
        const destination = lastSearchParams?.destination
            ? CYCLADES_ISLANDS.find(i => i.id === lastSearchParams.destination)?.name
            : 'the Cyclades';

        openChat(`I'm planning a trip to ${destination}. Can you help me with:
1. Best areas to stay
2. What to look for when comparing hotel prices
3. Best time to book for good deals
4. Any insider tips for accommodation?`);
    };

    return (
        <>
            <SEO
                title="Hotel Marketplace - Compare Prices Across OTAs | Discover Cyclades"
                description="Compare hotel prices across Booking.com, Expedia, Hotels.com, Priceline and more. Find the best deals on Cyclades islands accommodation with AI-powered recommendations."
                keywords="hotel price comparison, Cyclades hotels, Santorini hotels, Mykonos hotels, best hotel deals, OTA comparison, booking comparison"
                canonicalUrl="/hotel-marketplace"
            />

            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
                {/* Hero Section */}
                <section className="relative pt-24 pb-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E2E48 0%, #0891B2 50%, #40E0D0 100%)' }}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                                <TrendingUp className="w-4 h-4" />
                                <span>Save up to 40% by comparing prices</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Hotel Marketplace
                            </h1>
                            <p className="text-xl text-white/80 max-w-2xl mx-auto">
                                Compare hotel prices across Booking.com, Expedia, Hotels.com, Priceline and more.
                                Find the best deals in the Cyclades with AI-powered recommendations.
                            </p>
                        </div>

                        {/* Search Form */}
                        <MarketplaceSearchForm onSearch={handleSearch} isLoading={isLoading} />
                    </div>
                </section>

                {/* Features Bar */}
                <section className="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/10 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-8">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-white/70">
                                <Search className="w-5 h-5 text-cyclades-blue" />
                                <span className="text-sm">Compare 10+ OTAs</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-white/70">
                                <Shield className="w-5 h-5 text-green-500" />
                                <span className="text-sm">Real-time prices</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-white/70">
                                <Award className="w-5 h-5 text-yellow-500" />
                                <span className="text-sm">Trusted reviews</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-white/70">
                                <Sparkles className="w-5 h-5 text-purple-500" />
                                <span className="text-sm">AI-powered advice</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
                            <p className="text-red-700 dark:text-red-400">{error}</p>
                            <button
                                onClick={() => lastSearchParams && handleSearch(lastSearchParams)}
                                className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white dark:bg-dark-card rounded-2xl p-6 animate-pulse">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-2/3 mb-3" />
                                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4 mb-2" />
                                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/3" />
                                        </div>
                                        <div className="text-right">
                                            <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-24 mb-2" />
                                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-16" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        {[1, 2, 3, 4].map((j) => (
                                            <div key={j} className="h-10 bg-gray-200 dark:bg-white/10 rounded-lg w-32" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Results */}
                    {!isLoading && searchResult && (
                        <>
                            {/* Results Header */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                                        Hotels in {searchResult.destination}
                                    </h2>
                                    {searchResult.metadata && (
                                        <p className="text-gray-600 dark:text-white/60 mt-1">
                                            {searchResult.metadata.totalHotelCount.toLocaleString()} hotels found •
                                            Showing {searchResult.hotels.length} results
                                        </p>
                                    )}
                                </div>

                                {/* Ask AI Button */}
                                <button
                                    onClick={handleAskGeneralAdvice}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    <span>Ask Touristas AI for advice</span>
                                </button>
                            </div>

                            {/* Hotel Cards */}
                            <div className="space-y-6">
                                {searchResult.hotels.map((hotel) => (
                                    <HotelMarketplaceCard
                                        key={hotel.hotelId}
                                        hotel={hotel}
                                        destination={searchResult.destination}
                                        currency={searchResult.searchParams.currency}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {searchResult.metadata && searchResult.metadata.totalPageCount > 1 && (
                                <div className="mt-10 flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 0}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white/80 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </button>

                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: Math.min(5, searchResult.metadata.totalPageCount) }, (_, i) => {
                                            const pageNum = currentPage < 2
                                                ? i
                                                : currentPage > searchResult.metadata!.totalPageCount - 3
                                                    ? searchResult.metadata!.totalPageCount - 5 + i
                                                    : currentPage - 2 + i;

                                            if (pageNum < 0 || pageNum >= searchResult.metadata!.totalPageCount) return null;

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`w-10 h-10 rounded-lg font-medium transition-all ${pageNum === currentPage
                                                        ? 'bg-cyclades-blue text-white'
                                                        : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/80 hover:bg-gray-50 dark:hover:bg-white/10'
                                                        }`}
                                                >
                                                    {pageNum + 1}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= searchResult.metadata.totalPageCount - 1}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-white/80 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* Empty/Initial State */}
                    {!isLoading && !searchResult && !error && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gradient-to-br from-cyclades-blue/20 to-cyclades-turquoise/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-cyclades-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                Start Your Hotel Search
                            </h3>
                            <p className="text-gray-600 dark:text-white/60 max-w-md mx-auto mb-6">
                                Select a destination and dates above to compare hotel prices across
                                Booking.com, Expedia, Hotels.com, and more.
                            </p>
                            <button
                                onClick={handleAskGeneralAdvice}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>Or ask Touristas AI for hotel recommendations</span>
                            </button>
                        </div>
                    )}

                    {/* No Results State */}
                    {!isLoading && searchResult && searchResult.hotels.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                No Hotels Found
                            </h3>
                            <p className="text-gray-600 dark:text-white/60 max-w-md mx-auto mb-6">
                                No hotels available for your selected dates and destination.
                                Try different dates or another Cyclades island.
                            </p>
                            <button
                                onClick={handleAskGeneralAdvice}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyclades-blue to-cyclades-turquoise text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>Ask Touristas AI for alternatives</span>
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
