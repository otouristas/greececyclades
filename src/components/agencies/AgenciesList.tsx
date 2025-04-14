import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Star, MapPin, Globe, Phone, Mail, CheckCircle, RefreshCw } from 'lucide-react';

// Define the agency type
type Agency = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  islands: string[];
  services: string[];
  rating?: number;
  reviews_count?: number;
};

interface AgenciesListProps {
  selectedIslands?: string[];
}

export default function AgenciesList({ selectedIslands = [] }: AgenciesListProps) {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Create a memoized fetchAgencies function to avoid recreation on each render
  const fetchAgencies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching agencies...');
      
      // Fetch all agencies
      const { data, error } = await supabase
        .from('agencies')
        .select('*');

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to fetch agencies: ${error.message || 'Unknown error'}`);
      }

      if (!data || !Array.isArray(data)) {
        console.error('Invalid data format received:', data);
        throw new Error('Received invalid data format from the server');
      }

      console.log('Agencies data:', data);
      
      // Process the data with default values for missing fields
      const validatedData = data.map(agency => ({
        id: agency.id || '',
        name: agency.name || '',
        description: agency.description || '',
        logo: agency.logo || '',
        website: agency.website || '',
        phone: agency.phone || '',
        email: agency.email || '',
        address: agency.address || '',
        islands: Array.isArray(agency.islands) ? agency.islands : [],
        services: Array.isArray(agency.services) ? agency.services : [],
        // Default values for rating and reviews if they don't exist
        rating: agency.rating !== undefined ? agency.rating : 4.5,
        reviews_count: agency.reviews_count !== undefined ? agency.reviews_count : 100
      }));
      
      setAgencies(validatedData);
      setFilteredAgencies(validatedData);
    } catch (err) {
      console.error('Error in fetchAgencies:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchAgencies();
  }, [fetchAgencies]);

  // Filter agencies based on selected islands
  useEffect(() => {
    if (agencies.length === 0) {
      setFilteredAgencies([]);
      return;
    }
    
    if (selectedIslands.length === 0) {
      setFilteredAgencies(agencies);
      return;
    }

    try {
      console.log('Filtering agencies by islands:', selectedIslands);
      
      const filtered = agencies.filter(agency => 
        Array.isArray(agency.islands) && 
        selectedIslands.some(island => agency.islands.includes(island))
      );
      
      console.log('Filtered agencies:', filtered);
      setFilteredAgencies(filtered);
    } catch (err) {
      console.error('Error filtering agencies:', err);
      // If there's an error filtering, just show all agencies
      setFilteredAgencies(agencies);
    }
  }, [agencies, selectedIslands]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-lg">
        <h3 className="font-medium text-lg mb-2">Error loading agencies</h3>
        <p className="mb-3">{error.message}</p>
        <button 
          onClick={() => fetchAgencies()} 
          className="flex items-center bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </button>
      </div>
    );
  }

  // If we have no agencies but no error, show a message
  if (agencies.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-5 rounded-lg">
        <h3 className="font-medium text-lg mb-2">No rental agencies found</h3>
        <p>Please check back later or try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          {filteredAgencies.length} {filteredAgencies.length === 1 ? 'agency' : 'agencies'} available
        </h2>
        <p className="text-sm text-gray-500">Find reliable car rental agencies for your Greek island adventure</p>
      </div>

      {filteredAgencies.length === 0 ? (
        <div className="bg-blue-50 border border-blue-100 text-blue-700 px-6 py-8 rounded-xl text-center">
          <h3 className="text-lg font-medium mb-2">No agencies match your selection</h3>
          <p className="text-blue-600">Try selecting different islands to see more options.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAgencies.map((agency) => (
            <div 
              key={agency.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Agency Logo */}
                <div className="md:w-1/4 p-6 flex items-center justify-center bg-gray-50">
                  <div className="w-full max-w-[200px] aspect-square relative">
                    <img 
                      src={agency.logo || 'https://placehold.co/400x400?text=Agency+Logo'} 
                      alt={agency.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Agency Details */}
                <div className="p-6 flex-1 flex flex-col border-t md:border-t-0 md:border-l border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{agency.name}</h3>
                      <div className="flex items-center mt-1 mb-3">
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 text-gray-700">{agency.rating || 4.5}</span>
                        </div>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600 text-sm">{agency.reviews_count || 100} reviews</span>
                      </div>
                    </div>
                    {agency.website && (
                      <a
                        href={agency.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm text-center whitespace-nowrap"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{agency.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {agency.address && (
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{agency.address}</span>
                      </div>
                    )}
                    {agency.phone && (
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                        <a href={`tel:${agency.phone}`} className="text-sm text-blue-600 hover:underline">{agency.phone}</a>
                      </div>
                    )}
                    {agency.email && (
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                        <a href={`mailto:${agency.email}`} className="text-sm text-blue-600 hover:underline">{agency.email}</a>
                      </div>
                    )}
                    {agency.website && (
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                        <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate max-w-[200px]">
                          {agency.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>

                  {Array.isArray(agency.islands) && agency.islands.length > 0 && (
                    <div className="mt-auto">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Available on islands:</h4>
                      <div className="flex flex-wrap gap-2">
                        {agency.islands.map((island, index) => (
                          <span 
                            key={index} 
                            className="flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {island}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(agency.services) && agency.services.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {agency.services.map((service, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
