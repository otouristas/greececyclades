export enum VenueType {
    Bar = 'Bar',
    Club = 'Club',
    Lounge = 'Lounge',
    Restaurant = 'Restaurant',
    CocktailBar = "CocktailBar"
}

interface Location {
    island: string;
    area: string;
    address: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

interface OpeningHours {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
}

export interface NightlifeVenue {
    id: string;
    name: string;
    slug: string;
    location: Location;
    description: string;
    venueType: VenueType;
    priceRange: string;
    openingHours: OpeningHours;
    images?: string[];
    website?: string;
    phoneNumber?: string;
    socialMedia?: {
        instagram?: string;
        facebook?: string;
    };
    features?: string[];
    bestKnownFor?: string[];
    reservationRequired?: boolean;
    seasonalOperation?: {
        openingMonth?: number;
        closingMonth?: number;
    };
    seoMeta?: {
        title: string;
        description: string;
        keywords: string[];
    };
}
