import { useState } from 'react';
import { Calendar, Users, Sparkles, MapPin, Search, SlidersHorizontal, Star, Utensils, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/Switch';
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
  searchMode: 'destination' | 'vibe';
  cityName?: string;
  countryCode?: string;
  aiSearch?: string;
  starRating?: number[];
  boardType?: 'RO' | 'BB' | 'HB' | 'FB' | 'AI';
  refundableRatesOnly?: boolean;
  minRating?: number;
  sort?: Array<{ field: 'price' | 'top_picks'; direction: 'ascending' | 'descending' }>;
}

export function BookingSearch({ onSearch, isLoading, defaultSearchMode = 'destination', showAdvancedFilters = true }: BookingSearchProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  const [checkin, setCheckin] = useState(formatDateForAPI(tomorrow));
  const [checkout, setCheckout] = useState(formatDateForAPI(dayAfter));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [currency, setCurrency] = useState('EUR');
  const [guestNationality, setGuestNationality] = useState('GR');
  const [searchMode, setSearchMode] = useState<'destination' | 'vibe'>(defaultSearchMode);
  const [destination, setDestination] = useState<{ cityName: string; countryCode: string } | null>(null);
  const [vibeQuery, setVibeQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [starRating, setStarRating] = useState<number[] | undefined>(undefined);
  const [boardType, setBoardType] = useState<'RO' | 'BB' | 'HB' | 'FB' | 'AI' | undefined>(undefined);
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'top_picks' | undefined>(undefined);

  const activeFilterCount = [starRating, boardType, refundableOnly, minRating, sortBy].filter(Boolean).length;

  function validateAndSearch() {
    if (!checkin || !checkout) { alert('Please select check-in and check-out dates'); return; }
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    if (checkoutDate <= checkinDate) { alert('Check-out date must be after check-in date'); return; }
    if (searchMode === 'destination' && !destination) { alert('Please select a destination'); return; }
    if (searchMode === 'vibe' && !vibeQuery.trim()) { alert('Please describe the type of hotel you\'re looking for'); return; }

    const occupancies: Occupancy[] = [];
    const adultsPerRoom = Math.floor(adults / rooms);
    const extraAdults = adults % rooms;
    const childrenPerRoom = Math.floor(children / rooms);
    const extraChildren = children % rooms;

    for (let i = 0; i < rooms; i++) {
      const roomAdults = adultsPerRoom + (i < extraAdults ? 1 : 0);
      const roomChildren = childrenPerRoom + (i < extraChildren ? 1 : 0);
      occupancies.push({ adults: roomAdults, children: roomChildren > 0 ? Array(roomChildren).fill(0) : undefined });
    }

    const formData: SearchFormData = { checkin, checkout, occupancies, currency, guestNationality, searchMode };
    if (searchMode === 'destination' && destination) {
      formData.cityName = destination.cityName;
      formData.countryCode = destination.countryCode;
    } else if (searchMode === 'vibe') {
      formData.aiSearch = vibeQuery.trim();
    }
    if (starRating) formData.starRating = starRating;
    if (boardType) formData.boardType = boardType;
    if (refundableOnly) formData.refundableRatesOnly = true;
    if (minRating !== undefined) formData.minRating = minRating;
    if (sortBy) {
      if (sortBy === 'price_asc') formData.sort = [{ field: 'price', direction: 'ascending' }];
      else if (sortBy === 'price_desc') formData.sort = [{ field: 'price', direction: 'descending' }];
      else if (sortBy === 'top_picks') formData.sort = [{ field: 'top_picks', direction: 'descending' }];
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
    <div className={`p-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <Tabs value={searchMode} onValueChange={(v) => setSearchMode(v as 'destination' | 'vibe')}>
        <TabsList className={`grid w-full grid-cols-2 mb-4 h-auto p-1 rounded-lg ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
          <TabsTrigger value="destination" className={`flex items-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all ${searchMode === 'destination' ? 'bg-cyclades-turquoise text-white shadow-md' : isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <MapPin className="w-4 h-4" />By Destination
          </TabsTrigger>
          <TabsTrigger value="vibe" className={`flex items-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all ${searchMode === 'vibe' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <Sparkles className="w-4 h-4" />By Vibe (AI)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="destination" className="mt-0">
          <CityAutocomplete value={destination} onChange={setDestination} label="Where do you want to stay?" disabled={isLoading} />
        </TabsContent>

        <TabsContent value="vibe" className="mt-0">
          <div>
            <Label htmlFor="vibe-search" className={`flex items-center gap-2 mb-1.5 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              <Sparkles className="w-4 h-4 text-purple-500" />Describe your ideal hotel
            </Label>
            <Input id="vibe-search" type="text" value={vibeQuery} onChange={(e) => setVibeQuery(e.target.value)} placeholder="e.g., romantic sunset views with infinity pool in Santorini" disabled={isLoading} className={`text-sm h-10 ${isDark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50' : 'bg-white border-gray-300'}`} />
            <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Tell us what you're looking for, and we'll find the perfect match using AI</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4 mt-4">
        {/* Dates - Compact */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="checkin" className={`flex items-center gap-1.5 mb-1 text-xs font-medium ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
              <Calendar className="w-3.5 h-3.5 text-cyclades-turquoise" />Check-in
            </Label>
            <input id="checkin" type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} min={formatDateForAPI(new Date())} className={`w-full px-3 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyclades-turquoise/50 ${isDark ? 'bg-white/10 border-white/20 text-white focus:border-cyclades-turquoise' : 'bg-white border-gray-200 text-gray-900 focus:border-cyclades-turquoise'}`} />
          </div>
          <div>
            <Label htmlFor="checkout" className={`flex items-center gap-1.5 mb-1 text-xs font-medium ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
              <Calendar className="w-3.5 h-3.5 text-cyclades-turquoise" />Check-out
            </Label>
            <input id="checkout" type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} min={checkin} className={`w-full px-3 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-cyclades-turquoise/50 ${isDark ? 'bg-white/10 border-white/20 text-white focus:border-cyclades-turquoise' : 'bg-white border-gray-200 text-gray-900 focus:border-cyclades-turquoise'}`} />
          </div>
        </div>

        {/* Guests - Compact inline */}
        <div>
          <Label className={`flex items-center gap-1.5 mb-2 text-xs font-medium ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
            <Users className="w-3.5 h-3.5 text-cyclades-turquoise" />Guests & Rooms
          </Label>
          <div className="grid grid-cols-3 gap-2">
            <Select value={adults.toString()} onValueChange={(v) => setAdults(parseInt(v))}>
              <SelectTrigger className={`h-9 text-sm rounded-lg ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                <SelectValue placeholder="Adults" />
              </SelectTrigger>
              <SelectContent>{[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <SelectItem key={n} value={n.toString()}>{n} Adult{n !== 1 ? 's' : ''}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={children.toString()} onValueChange={(v) => setChildren(parseInt(v))}>
              <SelectTrigger className={`h-9 text-sm rounded-lg ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                <SelectValue placeholder="Children" />
              </SelectTrigger>
              <SelectContent>{[0, 1, 2, 3, 4, 5, 6].map((n) => <SelectItem key={n} value={n.toString()}>{n} Child{n !== 1 ? 'ren' : ''}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={rooms.toString()} onValueChange={(v) => setRooms(parseInt(v))}>
              <SelectTrigger className={`h-9 text-sm rounded-lg ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                <SelectValue placeholder="Rooms" />
              </SelectTrigger>
              <SelectContent>{[1, 2, 3, 4, 5].map((n) => <SelectItem key={n} value={n.toString()}>{n} Room{n !== 1 ? 's' : ''}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        {/* Currency & Nationality - Compact */}
        <div className="grid grid-cols-2 gap-2">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className={`h-9 text-sm rounded-lg ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={guestNationality} onValueChange={setGuestNationality}>
            <SelectTrigger className={`h-9 text-sm rounded-lg ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}>
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
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters Toggle */}
        {showAdvancedFilters && (
          <div className={`border-t pt-3 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className={`w-full flex items-center justify-between text-sm ${isDark ? 'text-white/80 hover:text-cyclades-turquoise hover:bg-white/5' : 'text-gray-700 hover:text-cyclades-turquoise'}`}>
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />Advanced Filters
                {activeFilterCount > 0 && <span className="bg-cyclades-turquoise text-white text-xs px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>}
              </span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>

            {showFilters && (
              <div className={`mt-3 p-3 rounded-lg space-y-3 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className={`text-xs mb-1 block ${isDark ? 'text-white/70' : 'text-gray-600'}`}><Star className="w-3 h-3 inline mr-1 text-yellow-500" />Star Rating</Label>
                    <Select value={starRating ? JSON.stringify(starRating) : 'any'} onValueChange={(v) => setStarRating(v === 'any' ? undefined : JSON.parse(v))}>
                      <SelectTrigger className={`h-8 text-xs ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}><SelectValue placeholder="Any" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        {STAR_RATING_OPTIONS.map((option) => <SelectItem key={option.label} value={JSON.stringify(option.value)}>{option.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className={`text-xs mb-1 block ${isDark ? 'text-white/70' : 'text-gray-600'}`}><Utensils className="w-3 h-3 inline mr-1 text-orange-500" />Meal Plan</Label>
                    <Select value={boardType || 'any'} onValueChange={(v) => setBoardType(v === 'any' ? undefined : v as any)}>
                      <SelectTrigger className={`h-8 text-xs ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-200'}`}><SelectValue placeholder="Any" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        {Object.entries(BOARD_TYPE_LABELS).map(([code, label]) => <SelectItem key={code} value={code}>{label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-white/70' : 'text-gray-600'}`}><Shield className="w-3 h-3 text-green-500" />Refundable only</Label>
                  <Switch checked={refundableOnly} onCheckedChange={setRefundableOnly} />
                </div>
                {activeFilterCount > 0 && (
                  <Button type="button" variant="outline" size="sm" onClick={clearFilters} className={`w-full text-xs ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'text-gray-600'}`}>Clear Filters</Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Search Button */}
        <Button onClick={validateAndSearch} disabled={isLoading} className="w-full h-11 bg-gradient-to-r from-cyclades-turquoise to-cyan-600 hover:from-cyclades-turquoise/90 hover:to-cyan-600/90 text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Search Hotels
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
