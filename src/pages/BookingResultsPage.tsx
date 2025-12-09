import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingSearch, type SearchFormData } from '@/components/booking/BookingSearch';
import { HotelResults } from '@/components/booking/HotelResults';
import { searchHotelRates, type Hotel } from '@/lib/liteapi';
import SEO from '@/components/SEO';
import SimpleBreadcrumbs from '@/components/SimpleBreadcrumbs';

export default function BookingResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [allHotels, setAllHotels] = useState<Hotel[]>([]); // Store all hotels
  const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>([]); // Currently displayed hotels
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  
  const RESULTS_PER_PAGE = 20;

  // Parse search params
  const checkin = searchParams.get('checkin') || '';
  const checkout = searchParams.get('checkout') || '';
  const occupancies = JSON.parse(searchParams.get('occupancies') || '[{"adults":2}]');
  const currency = searchParams.get('currency') || 'EUR';
  const guestNationality = searchParams.get('guestNationality') || 'GR';
  const searchMode = (searchParams.get('searchMode') || 'destination') as 'destination' | 'vibe';
  
  // Search mode specific params
  const cityName = searchParams.get('cityName');
  const countryCode = searchParams.get('countryCode');
  const aiSearch = searchParams.get('aiSearch');
  
  // Advanced filter params
  const starRatingParam = searchParams.get('starRating');
  const starRating = starRatingParam ? JSON.parse(starRatingParam) : undefined;
  const boardType = searchParams.get('boardType') as 'RO' | 'BB' | 'HB' | 'FB' | 'AI' | undefined;
  const refundableRatesOnly = searchParams.get('refundableRatesOnly') === 'true';
  const minRatingParam = searchParams.get('minRating');
  const minRating = minRatingParam ? parseFloat(minRatingParam) : undefined;
  const sortParam = searchParams.get('sort');
  const sort = sortParam ? JSON.parse(sortParam) : undefined;

  // Initial search
  useEffect(() => {
    if (!checkin || !checkout) {
      setError('Missing check-in or check-out dates');
      setIsLoading(false);
      return;
    }

    // Validate search criteria
    if (searchMode === 'destination' && (!cityName || !countryCode)) {
      setError('Missing destination. Please select a city to search.');
      setIsLoading(false);
      return;
    }

    if (searchMode === 'vibe' && !aiSearch) {
      setError('Missing search query. Please describe what you\'re looking for.');
      setIsLoading(false);
      return;
    }

    performSearch();
  }, [checkin, checkout, cityName, countryCode, aiSearch, searchMode, starRating, boardType, refundableRatesOnly, minRating, sort]);

  async function performSearch() {
    setIsLoading(true);
    setError(null);

    try {
      const searchParamsObj: any = {
        checkin,
        checkout,
        occupancies,
        currency,
        guestNationality,
        maxRatesPerHotel: 1, // Show best rate per hotel in results
        limit: 100, // Limit initial API response to reduce costs (we'll paginate client-side)
        timeout: 12, // Increase timeout for better results
      };

      // Location parameters
      if (searchMode === 'destination' && cityName && countryCode) {
        searchParamsObj.cityName = cityName;
        searchParamsObj.countryCode = countryCode;
      } else if (searchMode === 'vibe' && aiSearch) {
        searchParamsObj.aiSearch = aiSearch;
      }

      // Add advanced filters
      if (starRating && starRating.length > 0) {
        searchParamsObj.starRating = starRating;
      }
      if (boardType) {
        searchParamsObj.boardType = boardType;
      }
      if (refundableRatesOnly) {
        searchParamsObj.refundableRatesOnly = true;
      }
      if (minRating !== undefined) {
        searchParamsObj.minRating = minRating;
      }
      if (sort && sort.length > 0) {
        searchParamsObj.sort = sort;
      }

      console.log('Searching with params:', searchParamsObj);
      const results = await searchHotelRates(searchParamsObj);
      console.log('Search results:', results);

      if (!results || results.length === 0) {
        setError('No hotels found for your search criteria. Please try different dates or a different destination.');
        setAllHotels([]);
        setDisplayedHotels([]);
        setHasMore(false);
      } else {
        setAllHotels(results);
        // Display first 20 results
        const initialResults = results.slice(0, RESULTS_PER_PAGE);
        setDisplayedHotels(initialResults);
        setHasMore(results.length > RESULTS_PER_PAGE);
        setHotels(initialResults); // Keep for backward compatibility
      }
    } catch (err) {
      console.error('Search error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to search hotels. Please try again.';
      setError(`Search Error: ${errorMessage}. Please check the browser console for more details.`);
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewSearch(formData: SearchFormData) {
    // Rebuild query parameters
    const params = new URLSearchParams();
    params.set('checkin', formData.checkin);
    params.set('checkout', formData.checkout);
    params.set('occupancies', JSON.stringify(formData.occupancies));
    params.set('currency', formData.currency);
    params.set('guestNationality', formData.guestNationality);
    params.set('searchMode', formData.searchMode);

    if (formData.searchMode === 'destination' && formData.cityName && formData.countryCode) {
      params.set('cityName', formData.cityName);
      params.set('countryCode', formData.countryCode);
    } else if (formData.searchMode === 'vibe' && formData.aiSearch) {
      params.set('aiSearch', formData.aiSearch);
    }

    // Add advanced filter parameters
    if (formData.starRating && formData.starRating.length > 0) {
      params.set('starRating', JSON.stringify(formData.starRating));
    }
    if (formData.boardType) {
      params.set('boardType', formData.boardType);
    }
    if (formData.refundableRatesOnly) {
      params.set('refundableRatesOnly', 'true');
    }
    if (formData.minRating !== undefined) {
      params.set('minRating', formData.minRating.toString());
    }
    if (formData.sort && formData.sort.length > 0) {
      params.set('sort', JSON.stringify(formData.sort));
    }

    navigate(`/book/search?${params.toString()}`);
  }

  function handleSelectHotel(hotel: Hotel) {
    // Navigate to hotel page with search params
    const params = new URLSearchParams();
    params.set('checkin', checkin);
    params.set('checkout', checkout);
    params.set('occupancies', JSON.stringify(occupancies));
    params.set('currency', currency);
    params.set('guestNationality', guestNationality);

    navigate(`/book/hotel/${hotel.id}?${params.toString()}`);
  }

  function handleLoadMore() {
    setIsLoadingMore(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const currentCount = displayedHotels.length;
      const nextBatch = allHotels.slice(currentCount, currentCount + RESULTS_PER_PAGE);
      setDisplayedHotels([...displayedHotels, ...nextBatch]);
      setHotels([...displayedHotels, ...nextBatch]); // Update for backward compatibility
      setHasMore(currentCount + RESULTS_PER_PAGE < allHotels.length);
      setIsLoadingMore(false);
    }, 300);
  }

  // Build search query display text
  const searchQueryDisplay = searchMode === 'vibe' 
    ? aiSearch || 'AI Search'
    : `${cityName || 'Selected City'}, ${countryCode || ''}`;

  const pageTitle = hotels.length > 0 
    ? `${hotels.length} Hotels Found | ${searchQueryDisplay}`
    : `Search Hotels | ${searchQueryDisplay}`;

  const pageDescription = searchMode === 'vibe'
    ? `AI-powered search results for "${aiSearch}". ${allHotels.length} properties available.`
    : `Hotels in ${cityName}, ${countryCode}. ${allHotels.length} properties available for ${checkin} to ${checkout}.`;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical="https://hotelssantorini.gr/book/search"
      />

      <SimpleBreadcrumbs
        items={[
          { label: 'Book Hotels', href: '/book' },
          { label: 'Search Results', href: '' },
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Search Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <BookingSearch
              onSearch={handleNewSearch}
              isLoading={isLoading}
              defaultSearchMode={searchMode}
            />
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 py-8">
          {/* Search Info Header */}
          <div className="mb-8">
            {searchMode === 'vibe' && (
              <div className="flex items-center gap-2 text-sifnos-turquoise mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">AI-Powered Search</span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {searchMode === 'vibe' ? (
                <>"{aiSearch}"</>
              ) : (
                <>Hotels in {searchQueryDisplay}</>
              )}
            </h1>
            <p className="text-gray-600">
              {checkin} → {checkout}
              {' • '}
              {occupancies.reduce((sum: number, occ: any) => sum + occ.adults, 0)} guests
              {allHotels.length > 0 && (
                <>
                  {' • '}
                  <span className="font-semibold">{allHotels.length}</span> hotels found
                  {displayedHotels.length < allHotels.length && (
                    <span className="text-gray-500">
                      {' '}(showing {displayedHotels.length} of {allHotels.length})
                    </span>
                  )}
                </>
              )}
            </p>
          </div>

          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Search Error</h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => navigate('/book')}
                  className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Start a new search
                </button>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-sifnos-turquoise rounded-full animate-spin mb-4" />
              <p className="text-gray-600 text-lg">
                {searchMode === 'vibe' ? 'Finding your perfect match...' : 'Searching for hotels...'}
              </p>
            </div>
          ) : hotels.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-gray-700 text-lg mb-4">
                No hotels found for your search criteria.
              </p>
              <button
                onClick={() => navigate('/book')}
                className="text-sifnos-turquoise hover:text-sifnos-deep-blue underline"
              >
                Try a different search
              </button>
            </div>
          ) : (
            <>
              <HotelResults
                hotels={displayedHotels}
                onSelectHotel={handleSelectHotel}
                isLoading={false}
                currency={currency}
              />
              
              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="bg-gradient-to-r from-sifnos-turquoise to-sifnos-deep-blue hover:from-sifnos-deep-blue hover:to-sifnos-turquoise text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    {isLoadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Hotels ({allHotels.length - displayedHotels.length} remaining)
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {/* Results Summary */}
              {displayedHotels.length > 0 && (
                <div className="mt-6 text-center text-sm text-gray-600">
                  Showing {displayedHotels.length} of {allHotels.length} hotels
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
