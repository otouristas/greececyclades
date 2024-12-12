// Base paths for different content types
export const IMAGE_PATHS = {
  hotels: {
    base: '/images/hotels',
    // Example: /images/hotels/mykonos-grand/hero.jpg
    getHotelPath: (hotelSlug: string) => `/images/hotels/${hotelSlug}`,
    getHeroImage: (hotelSlug: string) => `/images/hotels/${hotelSlug}/hero.jpg`,
    getGalleryImage: (hotelSlug: string, index: number) => `/images/hotels/${hotelSlug}/gallery-${index + 1}.jpg`,
    getRoomImage: (hotelSlug: string, roomSlug: string) => `/images/hotels/${hotelSlug}/rooms/${roomSlug}.jpg`,
  },
  activities: {
    base: '/images/activities',
    // Example: /images/activities/wine-tasting/hero.jpg
    getActivityPath: (activitySlug: string) => `/images/activities/${activitySlug}`,
    getHeroImage: (activitySlug: string) => `/images/activities/${activitySlug}/hero.jpg`,
    getGalleryImage: (activitySlug: string, index: number) => `/images/activities/${activitySlug}/gallery-${index + 1}.jpg`,
  },
  islands: {
    base: '/images/islands',
    // Example: /images/islands/mykonos/hero.jpg
    getIslandPath: (islandSlug: string) => `/images/islands/${islandSlug}`,
    getHeroImage: (islandSlug: string) => `/images/islands/${islandSlug}/hero.jpg`,
    getGalleryImage: (islandSlug: string, index: number) => `/images/islands/${islandSlug}/gallery-${index + 1}.jpg`,
    getFeatureImage: (islandSlug: string, feature: string) => `/images/islands/${islandSlug}/features/${feature}.jpg`,
  },
  placeholders: {
    base: '/images/placeholders',
    hero: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Hotel+Hero+Image',
    gallery: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Gallery+Image',
    room: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Room+Image',
    feature: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Feature+Image',
  }
} as const;
