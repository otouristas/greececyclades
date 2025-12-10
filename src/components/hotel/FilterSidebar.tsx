import { Filter, SlidersHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/Switch";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { santoriniHotelTypes } from "@/data/santoriniHotelTypes";
import { getHotelTypeIcon } from "@/components/icons/HotelTypeIcons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  filters: {
    amenities: {
      wifi: boolean;
      breakfast: boolean;
      pool: boolean;
      parking: boolean;
      airConditioning: boolean;
      restaurant: boolean;
      seaView: boolean;
      [key: string]: boolean;
    };
    starRating: number;
    hotelType: string;
    priceRange: [number, number] | null;
    location: string;
  };
  onFiltersChange: (filters: any) => void;
  className?: string;
  isMobile?: boolean;
}

const FilterSidebar = ({ 
  filters, 
  onFiltersChange,
  className,
  isMobile = false
}: FilterSidebarProps) => {
  const handleStarRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      starRating: rating === filters.starRating ? 0 : rating,
    });
  };

  const handleHotelTypeChange = (type: string) => {
    onFiltersChange({
      ...filters,
      hotelType: type === filters.hotelType ? "" : type,
    });
  };

  const handleAmenityChange = (amenity: string) => {
    onFiltersChange({
      ...filters,
      amenities: {
        ...filters.amenities,
        [amenity]: !filters.amenities[amenity],
      },
    });
  };

  const handleLocationChange = (location: string) => {
    onFiltersChange({
      ...filters,
      location,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      amenities: {
        wifi: false,
        breakfast: false,
        pool: false,
        parking: false,
        airConditioning: false,
        restaurant: false,
        seaView: false,
      },
      starRating: 0,
      hotelType: "",
      priceRange: null,
      location: "",
    });
  };

  const filterCount = 
    (filters.starRating ? 1 : 0) +
    (filters.hotelType ? 1 : 0) +
    (filters.location ? 1 : 0) +
    Object.values(filters.amenities).filter(Boolean).length;

  function renderFilterContent() {
    return (
      <>
        <div className="space-y-5">
          {/* Location Filter */}
          <div className="mb-5">
            <h3 className="font-medium mb-3">Location</h3>
            <Select 
              value={filters.location} 
              onValueChange={handleLocationChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                <SelectItem value="Oia">Oia</SelectItem>
                <SelectItem value="Fira">Fira</SelectItem>
                <SelectItem value="Imerovigli">Imerovigli</SelectItem>
                <SelectItem value="Firostefani">Firostefani</SelectItem>
                <SelectItem value="Kamari">Kamari</SelectItem>
                <SelectItem value="Perissa">Perissa</SelectItem>
                <SelectItem value="Perivolos">Perivolos</SelectItem>
                <SelectItem value="Pyrgos">Pyrgos</SelectItem>
                <SelectItem value="Akrotiri">Akrotiri</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <Collapsible defaultOpen className="mb-5">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="font-medium">Property Type</h3>
              <SlidersHorizontal size={16} className="text-gray-500" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="space-y-3 pl-1">
                {santoriniHotelTypes.map((type) => (
                  <div
                    key={type.slug}
                    className={cn(
                      "flex items-center cursor-pointer p-2 rounded-md transition-colors",
                      filters.hotelType === type.slug
                        ? "bg-sifnos-turquoise/10 text-sifnos-deep-blue" 
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => handleHotelTypeChange(type.slug)}
                  >
                    <div className="flex items-center">
                      <span className="w-5 h-5 mr-3 text-sifnos-turquoise inline-flex items-center justify-center">
                        {getHotelTypeIcon(type.slug)}
                      </span>
                      <span className="text-sm">{type.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Star Rating */}
          <Collapsible defaultOpen className="mb-5">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="font-medium">Star Rating</h3>
              <SlidersHorizontal size={16} className="text-gray-500" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <ToggleGroup 
                type="single" 
                value={filters.starRating.toString()} 
                onValueChange={(value) => handleStarRatingChange(parseInt(value) || 0)}
                className="flex justify-between w-full"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <ToggleGroupItem 
                    key={rating} 
                    value={rating.toString()} 
                    className="flex-1 text-xs py-1 border border-gray-200"
                    aria-label={`${rating} star${rating > 1 ? 's' : ''}`}
                  >
                    {rating}★
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </CollapsibleContent>
          </Collapsible>

          {/* Amenities */}
          <Collapsible defaultOpen className="mb-5">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="font-medium">Amenities</h3>
              <SlidersHorizontal size={16} className="text-gray-500" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="space-y-3">
                {[
                  { id: "wifi", label: "Free WiFi" },
                  { id: "breakfast", label: "Breakfast Included" },
                  { id: "pool", label: "Swimming Pool" },
                  { id: "parking", label: "Free Parking" },
                  { id: "airConditioning", label: "Air Conditioning" },
                  { id: "restaurant", label: "Restaurant" },
                  { id: "seaView", label: "Sea View" },
                ].map((amenity) => (
                  <div className="flex items-center justify-between" key={amenity.id}>
                    <Label htmlFor={amenity.id} className="text-sm cursor-pointer flex-1">
                      {amenity.label}
                    </Label>
                    <Switch
                      id={amenity.id}
                      checked={filters.amenities[amenity.id]}
                      onCheckedChange={() => handleAmenityChange(amenity.id)}
                      className="data-[state=checked]:bg-sifnos-turquoise"
                    />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {!isMobile && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button 
              onClick={handleClearFilters}
              variant="outline" 
              className="w-full"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={cn("bg-white rounded-lg shadow p-6", className)}>
      <h2 className="font-montserrat font-semibold text-xl mb-6 pb-3 border-b flex items-center">
        <Filter size={18} className="mr-2 text-sifnos-turquoise" /> 
        Filters
        {filterCount > 0 && (
          <span className="ml-auto inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-sifnos-turquoise rounded-full">
            {filterCount}
          </span>
        )}
      </h2>
      {renderFilterContent()}
    </div>
  );
};

export default FilterSidebar;
