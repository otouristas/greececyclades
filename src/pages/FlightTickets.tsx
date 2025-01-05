import React, { useState } from 'react';
import { NextPage } from 'next';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import Layout from '../components/Layout';
import { Search, Calendar, Users, Plane, ArrowRight } from 'lucide-react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { debounce } from '@mui/material/utils';

interface Location {
  iataCode: string;
  name: string;
  city: string;
  country: string;
}

interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Array<{
    segments: Array<{
      departure: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      carrierCode: string;
      number: string;
      duration: string;
    }>;
  }>;
}

const FlightTickets: NextPage = () => {
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [flightOffers, setFlightOffers] = useState<FlightOffer[]>([]);
  const [error, setError] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState<Location | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Location | null>(null);
  const [originOptions, setOriginOptions] = useState<Location[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<Location[]>([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);

  const searchAirports = async (
    keyword: string,
    setOptions: (locations: Location[]) => void,
    setLoading: (loading: boolean) => void
  ) => {
    if (!keyword || keyword.length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      console.log('Searching for:', keyword);
      const response = await fetch(`/api/airports/search?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Search error:', data);
        throw new Error(data.message || 'Failed to search airports');
      }

      console.log('Search results:', data);
      if (Array.isArray(data)) {
        setOptions(data);
      } else {
        console.error('Unexpected response format:', data);
        setOptions([]);
      }
    } catch (error) {
      console.error('Error searching airports:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchOrigin = debounce(
    (value: string) => searchAirports(value, setOriginOptions, setOriginLoading),
    300
  );

  const debouncedSearchDestination = debounce(
    (value: string) => searchAirports(value, setDestinationOptions, setDestinationLoading),
    300
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrigin || !selectedDestination || !departureDate) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originLocationCode: selectedOrigin.iataCode,
          destinationLocationCode: selectedDestination.iataCode,
          departureDate: format(departureDate, 'yyyy-MM-dd'),
          returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : undefined,
          adults,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flight offers');
      }

      const data = await response.json();
      setFlightOffers(data);
    } catch (err) {
      setError('Error searching for flights. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (duration: string) => {
    return duration
      .replace('PT', '')
      .replace('H', 'h ')
      .replace('M', 'm');
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Flight</h1>
            <p className="text-lg text-gray-600">Discover the best deals on flights to Greece and nearby destinations</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90">
            <form onSubmit={handleSearch} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <Autocomplete
                    options={originOptions}
                    loading={originLoading}
                    value={selectedOrigin}
                    onChange={(_, newValue) => setSelectedOrigin(newValue)}
                    getOptionLabel={(option) => 
                      `${option.city} (${option.iataCode}) - ${option.country}`
                    }
                    onInputChange={(_, value) => debouncedSearchOrigin(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Search cities or airports"
                        className="bg-white"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <Plane className="text-blue-500 w-5 h-5 mr-2" />
                              {params.InputProps.startAdornment}
                            </>
                          ),
                          endAdornment: (
                            <>
                              {originLoading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    To
                  </label>
                  <Autocomplete
                    options={destinationOptions}
                    loading={destinationLoading}
                    value={selectedDestination}
                    onChange={(_, newValue) => setSelectedDestination(newValue)}
                    getOptionLabel={(option) => 
                      `${option.city} (${option.iataCode}) - ${option.country}`
                    }
                    onInputChange={(_, value) => debouncedSearchDestination(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Search cities or airports"
                        className="bg-white"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <Plane className="text-blue-500 w-5 h-5 mr-2 transform rotate-90" />
                              {params.InputProps.startAdornment}
                            </>
                          ),
                          endAdornment: (
                            <>
                              {destinationLoading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Departure Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={departureDate}
                      onChange={(date) => setDepartureDate(date)}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      placeholderText="Select date"
                      required
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Return Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                      dateFormat="yyyy-MM-dd"
                      minDate={departureDate || new Date()}
                      placeholderText="Select date"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Passengers
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                      min="1"
                      max="9"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading || !selectedOrigin || !selectedDestination || !departureDate}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl
                           hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                           disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200
                           hover:scale-105 active:scale-95 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={24} color="inherit" className="mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Search Flights
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {flightOffers.length > 0 && (
            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Flights</h2>
              <div className="grid gap-6">
                {flightOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-2xl font-bold text-blue-600">
                        €{parseFloat(offer.price.total).toFixed(2)}
                      </span>
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                        Select Flight
                      </button>
                    </div>

                    {offer.itineraries.map((itinerary, idx) => (
                      <div key={idx} className="mb-6 last:mb-0">
                        <div className="text-sm font-medium text-gray-500 mb-3">
                          {idx === 0 ? 'Outbound' : 'Return'} Flight
                        </div>
                        {itinerary.segments.map((segment, segIdx) => (
                          <div
                            key={segIdx}
                            className="flex items-center py-4 border-t first:border-t-0 border-gray-100"
                          >
                            <div className="flex-1">
                              <div className="flex items-center space-x-4">
                                <div className="text-lg font-semibold text-gray-900">
                                  {segment.departure.iataCode}
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                                <div className="text-lg font-semibold text-gray-900">
                                  {segment.arrival.iataCode}
                                </div>
                              </div>
                              <div className="mt-2 text-sm text-gray-600">
                                {new Date(segment.departure.at).toLocaleString()} →{' '}
                                {new Date(segment.arrival.at).toLocaleString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900">
                                {segment.carrierCode} {segment.number}
                              </div>
                              <div className="text-sm text-gray-600">
                                Duration: {formatDuration(segment.duration)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FlightTickets;
