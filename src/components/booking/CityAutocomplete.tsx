import { useState, useEffect, useMemo } from 'react';
import { MapPin, Search, Globe } from 'lucide-react';
import { getCountries, getCities, type Country, type City } from '@/lib/liteapi-data';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CityAutocompleteProps {
  value: { cityName: string; countryCode: string } | null;
  onChange: (value: { cityName: string; countryCode: string } | null) => void;
  label?: string;
  disabled?: boolean;
}

export function CityAutocomplete({
  value,
  onChange,
  label = 'Destination',
  disabled = false,
}: CityAutocompleteProps) {
  // State
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  
  // Selection state
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [openCountry, setOpenCountry] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  // Popular countries fallback (in case API fails)
  const POPULAR_COUNTRIES: Country[] = [
    { code: 'GR', name: 'Greece' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'BE', name: 'Belgium' },
    { code: 'AT', name: 'Austria' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
  ];

  // Load countries on mount
  useEffect(() => {
    async function loadCountries() {
      setIsLoadingCountries(true);
      try {
        const data = await getCountries();
        
        // If API returns data, use it; otherwise use fallback
        if (data && data.length > 0) {
          // Sort popular countries first or alphabetically
          const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
          setCountries(sorted);
          console.log(`✅ Loaded ${sorted.length} countries from LiteAPI`);
        } else {
          console.warn('⚠️ LiteAPI countries returned empty, using fallback list');
          setCountries(POPULAR_COUNTRIES);
        }
      } catch (error) {
        console.error('❌ Failed to load countries from LiteAPI:', error);
        console.log('Using fallback popular countries list');
        // Use fallback popular countries to prevent broken UX
        setCountries(POPULAR_COUNTRIES);
      } finally {
        setIsLoadingCountries(false);
      }
    }
    loadCountries();
  }, []);

  // Sync internal state with props
  useEffect(() => {
    if (value && value.countryCode && countries.length > 0) {
      const country = countries.find(c => c.code === value.countryCode);
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [value, countries]);

  // Popular Greek cities fallback (for when API fails)
  const POPULAR_GREEK_CITIES: Record<string, City[]> = {
    'GR': [
      { name: 'Santorini' },
      { name: 'Athens' },
      { name: 'Mykonos' },
      { name: 'Crete' },
      { name: 'Rhodes' },
      { name: 'Corfu' },
      { name: 'Zakynthos' },
      { name: 'Naxos' },
      { name: 'Paros' },
      { name: 'Ios' },
      { name: 'Milos' },
      { name: 'Thessaloniki' },
    ],
  };

  // Load cities when country changes
  useEffect(() => {
    async function loadCities() {
      if (!selectedCountry) {
        setCities([]);
        return;
      }

      setIsLoadingCities(true);
      try {
        const data = await getCities(selectedCountry.code);
        
        if (data && data.length > 0) {
          setCities(data.sort((a, b) => a.name.localeCompare(b.name)));
          console.log(`✅ Loaded ${data.length} cities for ${selectedCountry.name}`);
        } else {
          console.warn(`⚠️ LiteAPI cities returned empty for ${selectedCountry.code}, using fallback`);
          // Use fallback if available
          const fallbackCities = POPULAR_GREEK_CITIES[selectedCountry.code] || [];
          setCities(fallbackCities);
        }
      } catch (error) {
        console.error(`❌ Failed to load cities for ${selectedCountry.code}:`, error);
        // Use fallback popular cities for Greece, empty for others
        const fallbackCities = POPULAR_GREEK_CITIES[selectedCountry.code] || [];
        setCities(fallbackCities);
        console.log(`Using fallback: ${fallbackCities.length} cities`);
      } finally {
        setIsLoadingCities(false);
      }
    }
    loadCities();
  }, [selectedCountry]);

  // Handlers
  const handleCountrySelect = (currentValue: string) => {
    const country = countries.find((c) => c.name === currentValue || c.code === currentValue);
    
    if (country) {
      setSelectedCountry(country);
      setOpenCountry(false);
      // Reset city when country changes
      onChange(null);
      // Small delay to ensure popover closes before opening city
      setTimeout(() => {
        setOpenCity(true); // Open city selection automatically
      }, 100);
    }
  };

  const handleCitySelect = (cityName: string) => {
    if (selectedCountry) {
      onChange({
        cityName: cityName,
        countryCode: selectedCountry.code
      });
      setOpenCity(false);
    }
  };

  return (
    <div className="space-y-4">
      {label && (
        <Label className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {label}
        </Label>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Country Selection */}
        <Popover open={openCountry} onOpenChange={setOpenCountry}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCountry}
              className="w-full justify-between border-gray-300 hover:border-sifnos-deep-blue focus:border-sifnos-deep-blue focus:ring-sifnos-deep-blue/20"
              disabled={disabled || isLoadingCountries}
            >
              {selectedCountry ? (
                <span className="flex items-center gap-2 truncate">
                  <Globe className="w-4 h-4 opacity-50" />
                  {selectedCountry.name}
                </span>
              ) : (
                <span className="text-muted-foreground">Select country...</span>
              )}
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[300px] p-0 z-[200]" 
            onOpenAutoFocus={(e) => e.preventDefault()}
            sideOffset={5}
            align="start"
            side="bottom"
          >
            <Command>
              <CommandInput placeholder="Search country..." className="border-sifnos-deep-blue/20 focus:border-sifnos-deep-blue" />
              <CommandList className="max-h-[300px] overflow-y-auto">
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.code}
                      value={country.name}
                      onSelect={(currentValue) => {
                        handleCountrySelect(currentValue);
                      }}
                      className="cursor-pointer hover:bg-sifnos-beige/20 touch-manipulation"
                      onTouchStart={(e) => {
                        // Ensure touch events work properly on mobile
                        e.stopPropagation();
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 text-sifnos-deep-blue",
                          selectedCountry?.code === country.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {country.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* City Selection */}
        <Popover open={openCity} onOpenChange={setOpenCity}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCity}
              className="w-full justify-between border-gray-300 hover:border-sifnos-deep-blue focus:border-sifnos-deep-blue focus:ring-sifnos-deep-blue/20"
              disabled={!selectedCountry || disabled || isLoadingCities}
            >
              {value?.cityName ? (
                <span className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 opacity-50" />
                  {value.cityName}
                </span>
              ) : (
                <span className="text-muted-foreground">
                  {isLoadingCities ? "Loading cities..." : "Select city..."}
                </span>
              )}
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[300px] p-0 z-[200]" 
            onOpenAutoFocus={(e) => e.preventDefault()}
            sideOffset={5}
            align="start"
            side="bottom"
          >
            <Command>
              <CommandInput placeholder="Search city..." className="border-sifnos-deep-blue/20 focus:border-sifnos-deep-blue" />
              <CommandList className="max-h-[300px] overflow-y-auto">
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      key={city.name}
                      value={city.name}
                      onSelect={(currentValue) => {
                        handleCitySelect(currentValue);
                      }}
                      className="cursor-pointer hover:bg-sifnos-beige/20 touch-manipulation"
                      onTouchStart={(e) => {
                        // Ensure touch events work properly on mobile
                        e.stopPropagation();
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 text-sifnos-deep-blue",
                          value?.cityName === city.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
