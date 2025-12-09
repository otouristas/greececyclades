import { useState } from 'react';
import { Calendar, Users, Sparkles, MapPin, Search, SlidersHorizontal, Star, Utensils, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CityAutocomplete } from './CityAutocomplete';
import { formatDateForAPI, type Occupancy, BOARD_TYPE_LABELS, STAR_RATING_OPTIONS } from '@/lib/liteapi';
import { useTheme } from '@/contexts/ThemeContext';

interface BookingSearchProps {
  onSearch: (params: SearchFormData) => void;
  isLoading?: boolean;
  defaultSearchMode?: 'destination' | 'vibe';
  showAdvancedFilters?: boolean;
}

export interface SearchFormData {
  checkin: string;
  checkout: string;
  occupancies: Occupancy[];
  currency: string;
  guestNationality: string;
  // Search mode specific
  searchMode: 'destination' | 'vibe';
  cityName?: string;
  countryCode?: string;
  aiSearch?: string;
  // Advanced filters
  starRating?: number[];
  boardType?: 'RO' | 'BB' | 'HB' | 'FB' | 'AI';
  refundableRatesOnly?: boolean;
  minRating?: number;
  // Sorting
  sort?: Array<{ field: 'price' | 'top_picks'; direction: 'ascending' | 'descending' }>;
}

export function BookingSearch({ onSearch, isLoading, defaultSearchMode = 'destination', showAdvancedFilters = true }: BookingSearchProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Date handling
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  
  const [checkin, setCheckin] = useState(formatDateForAPI(tomorrow));
  const [checkout, setCheckout] = useState(formatDateForAPI(dayAfter));
  
  // Guest handling
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  
  // Other params
  const [currency, setCurrency] = useState('EUR');
  const [guestNationality, setGuestNationality] = useState('GR');
  
  // Search mode
  const [searchMode, setSearchMode] = useState<'destination' | 'vibe'>(defaultSearchMode);
  
  // Destination search
  const [destination, setDestination] = useState<{ cityName: string; countryCode: string } | null>(null);
  
  // AI Vibe search
  const [vibeQuery, setVibeQuery] = useState('');

  // Advanced filters
  const [showFilters, setShowFilters] = useState(false);
  const [starRating, setStarRating] = useState<number[] | undefined>(undefined);
  const [boardType, setBoardType] = useState<'RO' | 'BB' | 'HB' | 'FB' | 'AI' | undefined>(undefined);
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'top_picks' | undefined>(undefined);
  
  // Count active filters
  const activeFilterCount = [
    starRating,
    boardType,
    refundableOnly,
    minRating,
    sortBy,
  ].filter(Boolean).length;

  function validateAndSearch() {
    // Validate dates
    if (!checkin || !checkout) {
      alert('Please select check-in and check-out dates');
      return;
    }

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    
    if (checkoutDate <= checkinDate) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Validate search criteria
    if (searchMode === 'destination' && !destination) {
      alert('Please select a destination');
      return;
    }

    if (searchMode === 'vibe' && !vibeQuery.trim()) {
      alert('Please describe the type of hotel you\'re looking for');
      return;
    }

    // Build occupancies array
    const occupancies: Occupancy[] = [];
    const adultsPerRoom = Math.floor(adults / rooms);
    const extraAdults = adults % rooms;
    const childrenPerRoom = Math.floor(children / rooms);
    const extraChildren = children % rooms;
    
    for (let i = 0; i < rooms; i++) {
      const roomAdults = adultsPerRoom + (i < extraAdults ? 1 : 0);
      const roomChildren = childrenPerRoom + (i < extraChildren ? 1 : 0);
      
      occupancies.push({
        adults: roomAdults,
        children: roomChildren > 0 ? Array(roomChildren).fill(0) : undefined,
      });
    }

    const formData: SearchFormData = {
      checkin,
      checkout,
      occupancies,
      currency,
      guestNationality,
      searchMode,
    };

    if (searchMode === 'destination' && destination) {
      formData.cityName = destination.cityName;
      formData.countryCode = destination.countryCode;
    } else if (searchMode === 'vibe') {
      formData.aiSearch = vibeQuery.trim();
    }

    // Add advanced filters
    if (starRating) formData.starRating = starRating;
    if (boardType) formData.boardType = boardType;
    if (refundableOnly) formData.refundableRatesOnly = true;
    if (minRating !== undefined) formData.minRating = minRating;
    
    // Add sorting
    if (sortBy) {
      if (sortBy === 'price_asc') {
        formData.sort = [{ field: 'price', direction: 'ascending' }];
      } else if (sortBy === 'price_desc') {
        formData.sort = [{ field: 'price', direction: 'descending' }];
      } else if (sortBy === 'top_picks') {
        formData.sort = [{ field: 'top_picks', direction: 'descending' }];
      }
    }

    onSearch(formData);
  }

  function clearFilters() {
    setStarRating(undefined);
    setBoardType(undefined);
    setRefundableOnly(false);
    setMinRating(undefined);
    setSortBy(undefined);
  }

  return (
    <div className={`p-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <Tabs value={searchMode} onValueChange={(v) => setSearchMode(v as 'destination' | 'vibe')}>
        <TabsList className={`grid w-full grid-cols-2 mb-6 h-auto p-1 rounded-xl ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
          <TabsTrigger 
            value="destination" 
            className={`flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg transition-all ${
              searchMode === 'destination' 
                ? 'bg-cyclades-turquoise text-white shadow-lg' 
                : isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            By Destination
          </TabsTrigger>
          <TabsTrigger 
            value="vibe" 
            className={`flex items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg transition-all ${
              searchMode === 'vibe' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            By Vibe (AI)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="destination" className="space-y-4">
          <CityAutocomplete
            value={destination}
            onChange={setDestination}
            label="Where do you want to stay?"
            disabled={isLoading}
          />
        </TabsContent>

        <TabsContent value="vibe" className="space-y-4">
          <div>
            <Label htmlFor="vibe-search" className={`flex items-center gap-2 mb-2 font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              <Sparkles className="w-4 h-4 text-purple-500" />
              Describe your ideal hotel
            </Label>
            <Input
              id="vibe-search"
              type="text"
              value={vibeQuery}
              onChange={(e) => setVibeQuery(e.target.value)}
              placeholder="e.g., romantic sunset views with infinity pool in Santorini"
              disabled={isLoading}
              className={`text-base h-12 ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' : 'bg-white border-gray-300'}`}
            />
            <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              Tell us what you're looking for, and we'll find the perfect match using AI
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-6 mt-6">
        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="checkin" className={`flex items-center gap-2 mb-2 font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              <Calendar className="w-4 h-4 text-cyclades-turquoise" />
              Check-in
            </Label>
            <input
              id="checkin"
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              min={formatDateForAPI(new Date())}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-cyclades-turquoise/50 ${
                isDark 
                  ? 'bg-white/10 border-white/20 text-white focus:border-cyclades-turquoise' 
                  : 'bg-white border-gray-200 text-gray-900 focus:border-cyclades-turquoise'
              }`}
            />
          </div>
          <div>
            <Label htmlFor="checkout" className={`flex items-center gap-2 mb-2 font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              <Calendar className="w-4 h-4 text-cyclades-turquoise" />
              Check-out
            </Label>
            <input
              id="checkout"
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              min={checkin}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-cyclades-turquoise/50 ${
                isDark 
                  ? 'bg-white/10 border-white/20 text-white focus:border-cyclades-turquoise' 
                  : 'bg-white border-gray-200 text-gray-900 focus:border-cyclades-turquoise'
              }`}
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <Label className={`flex items-center gap-2 mb-3 font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
            <Users className="w-4 h-4 text-cyclades-turquoise" />
            Guests & Rooms
          </Label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="adults" className={`text-xs mb-1 block ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                Adults
              </Label>
              <Select value={adults.toString()} onValueChange={(v) => setAdults(parseInt(v))}>
                <SelectTrigger id="adults" className={`h-12 rounded-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="children" className={`text-xs mb-1 block ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                Children
              </Label>
              <Select value={children.toString()} onValueChange={(v) => setChildren(parseInt(v))}>
                <SelectTrigger id="children" className={`h-12 rounded-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="rooms" className={`text-xs mb-1 block ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                Rooms
              </Label>
              <Select value={rooms.toString()} onValueChange={(v) => setRooms(parseInt(v))}>
                <SelectTrigger id="rooms" className={`h-12 rounded-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Currency & Nationality - Collapsed into one row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currency" className={`text-xs mb-1 block ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" className={`h-12 rounded-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="nationality" className={`text-xs mb-1 block ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              Nationality
            </Label>
            <Select value={guestNationality} onValueChange={setGuestNationality}>
              <SelectTrigger id="nationality" className={`h-12 rounded-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GR">Greece</SelectItem>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="GB">United Kingdom</SelectItem>
                <SelectItem value="DE">Germany</SelectItem>
                <SelectItem value="FR">France</SelectItem>
                <SelectItem value="IT">Italy</SelectItem>
                <SelectItem value="ES">Spain</SelectItem>
                <SelectItem value="NL">Netherlands</SelectItem>
                <SelectItem value="BE">Belgium</SelectItem>
                <SelectItem value="CH">Switzerland</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        {showAdvancedFilters && (
          <div className={`border-t pt-4 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className={`w-full flex items-center justify-between ${isDark ? 'text-white/80 hover:text-cyclades-turquoise hover:bg-white/5' : 'text-gray-700 hover:text-cyclades-turquoise'}`}
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Advanced Filters
                {activeFilterCount > 0 && (
                  <span className="bg-cyclades-turquoise text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>

            {showFilters && (
              <div className={`mt-4 p-4 rounded-xl space-y-4 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                {/* Star Rating */}
                <div>
                  <Label className={`flex items-center gap-2 mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    <Star className="w-4 h-4 text-yellow-500" />
                    Star Rating
                  </Label>
                  <Select 
                    value={starRating ? JSON.stringify(starRating) : 'any'} 
                    onValueChange={(v) => setStarRating(v === 'any' ? undefined : JSON.parse(v))}
                  >
                    <SelectTrigger className={`h-11 rounded-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                      <SelectValue placeholder="Any star rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any star rating</SelectItem>
                      {STAR_RATING_OPTIONS.map((option) => (
                        <SelectItem key={option.label} value={JSON.stringify(option.value)}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Board Type */}
                <div>
                  <Label className={`flex items-center gap-2 mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    <Utensils className="w-4 h-4 text-orange-500" />
                    Meal Plan
                  </Label>
                  <Select 
                    value={boardType || 'any'} 
                    onValueChange={(v) => setBoardType(v === 'any' ? undefined : v as any)}
                  >
                    <SelectTrigger className={`h-11 rounded-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                      <SelectValue placeholder="Any meal plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any meal plan</SelectItem>
                      {Object.entries(BOARD_TYPE_LABELS).map(([code, label]) => (
                        <SelectItem key={code} value={code}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Min Guest Rating */}
                <div>
                  <Label className={`flex items-center gap-2 mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    <Star className="w-4 h-4 text-blue-500" />
                    Minimum Guest Rating
                  </Label>
                  <Select 
                    value={minRating?.toString() || 'any'} 
                    onValueChange={(v) => setMinRating(v === 'any' ? undefined : parseFloat(v))}
                  >
                    <SelectTrigger className={`h-11 rounded-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any rating</SelectItem>
                      <SelectItem value="4.5">4.5+ Exceptional</SelectItem>
                      <SelectItem value="4">4.0+ Very Good</SelectItem>
                      <SelectItem value="3.5">3.5+ Good</SelectItem>
                      <SelectItem value="3">3.0+ Average</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Refundable Only */}
                <div className="flex items-center justify-between">
                  <Label className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    <Shield className="w-4 h-4 text-green-500" />
                    Refundable rates only
                  </Label>
                  <Switch
                    checked={refundableOnly}
                    onCheckedChange={setRefundableOnly}
                  />
                </div>

                {/* Sort By */}
                <div>
                  <Label className={`text-sm mb-2 block ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Sort Results By</Label>
                  <Select 
                    value={sortBy || 'default'} 
                    onValueChange={(v) => setSortBy(v === 'default' ? undefined : v as any)}
                  >
                    <SelectTrigger className={`h-11 rounded-xl ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                      <SelectValue placeholder="Default (Top Picks)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="top_picks">Top Picks</SelectItem>
                      <SelectItem value="price_asc">Price: Low to High</SelectItem>
                      <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearFilters}
                    className={`w-full ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'text-gray-600'}`}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Search Button */}
        <Button
          onClick={validateAndSearch}
          disabled={isLoading}
          className="w-full h-14 bg-gradient-to-r from-cyclades-turquoise to-cyan-600 hover:from-cyclades-turquoise/90 hover:to-cyan-600/90 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Search Hotels
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
