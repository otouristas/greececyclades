import React, { useEffect, useState } from 'react';
import { useHotelStore } from '../store/hotelStore';
import { Hotel } from '../types/hotel';
import supabase from '../lib/hotelsSupabase';

const HotelsTest: React.FC = () => {
  const { hotels, fetchHotels, loading, error } = useHotelStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [rawData, setRawData] = useState<any[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        // Direct fetch from Supabase for debugging
        const { data, error } = await supabase
          .from('accommodation')
          .select('*');
        
        if (error) {
          console.error('Error fetching from Supabase directly:', error);
          setFetchError(error.message);
        } else {
          setRawData(data || []);
        }
      } catch (err) {
        console.error('Exception during direct fetch:', err);
        setFetchError(err instanceof Error ? err.message : String(err));
      }

      // Also fetch through the store
      await fetchHotels();
      setIsLoaded(true);
    };
    
    loadHotels();
  }, [fetchHotels]);

  if (loading && !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading accommodations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Accommodations from Supabase</h1>
        
        {/* Display any errors */}
        {(error || fetchError) && (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-full w-full mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Accommodations</h2>
            {error && <p className="text-gray-700 mb-2">Store Error: {error}</p>}
            {fetchError && <p className="text-gray-700 mb-2">Direct Fetch Error: {fetchError}</p>}
            <div className="mt-6 p-4 bg-red-50 rounded border border-red-200">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Make sure you've created the accommodation table in Supabase by following the instructions in <code>src/utils/supabase_setup_instructions.md</code>
              </p>
            </div>
          </div>
        )}

        {/* Display raw data for debugging */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Raw Data from Supabase (Direct Fetch)</h2>
          <p className="text-gray-700 mb-4">Count: {rawData.length}</p>
          
          {rawData.length > 0 ? (
            <div className="overflow-x-auto">
              <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(rawData, null, 2)}</pre>
            </div>
          ) : (
            <p className="text-gray-700">No raw data available.</p>
          )}
        </div>
        
        {/* Display processed data from the store */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Processed Data (via Store)</h2>
        {hotels.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-900 mb-4">No accommodations found</h2>
            <p className="text-gray-700">
              There are no accommodations in the database yet. Make sure you've run the SQL script to create and populate the accommodation table.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel: Hotel, index) => (
              <div key={hotel.id || index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  {hotel.images?.main ? (
                    <img 
                      src={hotel.images.main} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{hotel.name || 'Unnamed Accommodation'}</h2>
                    {hotel.rating && (
                      <div className="flex items-center bg-blue-100 px-2 py-1 rounded text-sm">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{hotel.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {hotel.location && (
                    <p className="text-gray-600 text-sm mb-4">
                      {hotel.location.island || hotel.island_id}, 
                      {hotel.location.area && ` ${hotel.location.area}`}
                    </p>
                  )}
                  
                  {hotel.description && (
                    <p className="text-gray-700 mb-4 line-clamp-3">{hotel.description}</p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    {hotel.price_range && (
                      <div className="text-gray-900 font-bold">
                        From {hotel.price_range.min} {hotel.price_range.currency || '€'}
                      </div>
                    )}
                    
                    {hotel.star_rating && (
                      <div className="flex space-x-1">
                        {Array.from({ length: hotel.star_rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsTest;
