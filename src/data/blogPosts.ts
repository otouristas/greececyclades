import { BlogPost } from '../types/blog';
import { 
  mykonosContent,
  parosContent,
  naxosContent,
  sifnosContent,
  antiparosContent
} from './blogContent';

export const blogPosts: BlogPost[] = [
  {
    id: 'mykonos-island-guide-2024',
    slug: 'mykonos-island-guide-2024',
    title: 'Mykonos 2024: Complete Guide to the Island of the Winds',
    description: 'Experience the perfect blend of luxury, nightlife, and traditional Greek charm in Mykonos. Your comprehensive guide to beaches, restaurants, activities, and accommodation.',
    author: 'Greece Cyclades Team',
    date: '2024-01-06',
    lastModified: '2024-01-06',
    featuredImage: '/images/blog/mykonos-little-venice.jpg',
    category: 'Island Guides',
    tags: ['Mykonos', 'Travel Guide', 'Greek Islands', 'Nightlife', 'Beaches', 'Luxury Travel', 'Restaurants'],
    readTime: 14,
    relatedIslands: ['santorini', 'paros', 'delos'],
    relatedActivities: ['mykonos-beach-hopping', 'delos-day-trip', 'mykonos-windmills-tour'],
    relatedHotels: ['cavo-tagoo', 'belvedere-mykonos', 'myconian-villa-collection'],
    content: mykonosContent
  },
  {
    id: 'paros-hidden-gem-guide-2024',
    slug: 'paros-hidden-gem-guide-2024',
    title: 'Paros 2024: Your Guide to the Cyclades' Best-Kept Secret',
    description: 'Explore the authentic charm of Paros, from pristine beaches to traditional villages. Discover why this island is becoming the new favorite among travelers.',
    author: 'Greece Cyclades Team',
    date: '2024-01-05',
    lastModified: '2024-01-05',
    featuredImage: '/images/blog/paros-naoussa-harbor.jpg',
    category: 'Island Guides',
    tags: ['Paros', 'Travel Guide', 'Greek Islands', 'Beaches', 'Traditional Villages', 'Water Sports'],
    readTime: 12,
    relatedIslands: ['naxos', 'antiparos', 'mykonos'],
    relatedActivities: ['paros-windsurfing', 'naoussa-food-tour', 'lefkes-hiking'],
    relatedHotels: ['parilio-hotel', 'yria-boutique-hotel', 'paros-agnanti'],
    content: parosContent
  },
  {
    id: 'naxos-authentic-greece-2024',
    slug: 'naxos-authentic-greece-2024',
    title: 'Naxos 2024: Experience Authentic Greek Island Life',
    description: 'Discover the largest Cycladic island's rich history, stunning beaches, and mountain villages. Your complete guide to Naxos' authentic Greek experiences.',
    author: 'Greece Cyclades Team',
    date: '2024-01-04',
    lastModified: '2024-01-04',
    featuredImage: '/images/blog/naxos-portara-sunset.jpg',
    category: 'Island Guides',
    tags: ['Naxos', 'Travel Guide', 'Greek Islands', 'History', 'Beaches', 'Mountain Villages', 'Local Food'],
    readTime: 13,
    relatedIslands: ['paros', 'santorini', 'small-cyclades'],
    relatedActivities: ['naxos-temple-tour', 'mountain-village-exploration', 'kitesurfing-mikri-vigla'],
    relatedHotels: ['naxian-collection', 'kavos-naxos', 'naxos-resort'],
    content: naxosContent
  },
  {
    id: 'sifnos-culinary-paradise-2024',
    slug: 'sifnos-culinary-paradise-2024',
    title: 'Sifnos 2024: A Gastronomic Journey Through the Cyclades',
    description: 'Explore Sifnos, the culinary capital of the Cyclades. Discover traditional recipes, ceramic workshops, and pristine beaches in this comprehensive guide.',
    author: 'Greece Cyclades Team',
    date: '2024-01-03',
    lastModified: '2024-01-03',
    featuredImage: '/images/blog/sifnos-kastro-sunset.jpg',
    category: 'Island Guides',
    tags: ['Sifnos', 'Travel Guide', 'Greek Islands', 'Gastronomy', 'Ceramics', 'Traditional Villages'],
    readTime: 11,
    relatedIslands: ['milos', 'serifos', 'kimolos'],
    relatedActivities: ['sifnos-cooking-class', 'pottery-workshop', 'hiking-trails'],
    relatedHotels: ['verina-astra', 'kamaroti-suites', 'niriedes-hotel'],
    content: sifnosContent
  },
  {
    id: 'antiparos-escape-guide-2024',
    slug: 'antiparos-escape-guide-2024',
    title: 'Antiparos 2024: Your Guide to the Perfect Island Escape',
    description: 'Discover the laid-back charm of Antiparos, a small island big on authenticity. From cave exploration to secluded beaches, find your perfect Greek island getaway.',
    author: 'Greece Cyclades Team',
    date: '2024-01-02',
    lastModified: '2024-01-02',
    featuredImage: '/images/blog/antiparos-chora-street.jpg',
    category: 'Island Guides',
    tags: ['Antiparos', 'Travel Guide', 'Greek Islands', 'Beaches', 'Cave', 'Relaxation'],
    readTime: 10,
    relatedIslands: ['paros', 'despotiko', 'sifnos'],
    relatedActivities: ['antiparos-cave-tour', 'beach-hopping', 'sunset-sailing'],
    relatedHotels: ['rooster-antiparos', 'kouros-village', 'beach-house'],
    content: antiparosContent
  },
  {
    id: 'santorini-complete-travel-guide-2024',
    slug: 'santorini-complete-travel-guide-2024',
    title: 'Santorini Travel Guide 2024: The Ultimate Island Experience',
    description: 'Discover the magic of Santorini with our comprehensive 2024 travel guide. From stunning caldera views to hidden gems, learn everything about planning your perfect Santorini vacation.',
    author: 'Greece Cyclades Team',
    date: '2024-01-07',
    lastModified: '2024-01-07',
    featuredImage: '/images/blog/santorini-oia-sunset.jpg',
    category: 'Island Guides',
    tags: ['Santorini', 'Travel Guide', 'Greek Islands', 'Luxury Travel', 'Honeymoon', 'Beaches', 'Restaurants', 'Activities'],
    readTime: 15,
    relatedIslands: ['mykonos', 'ios', 'naxos'],
    relatedActivities: ['santorini-wine-tasting', 'caldera-sunset-cruise', 'akrotiri-excavations'],
    relatedHotels: ['grace-santorini', 'andronis-luxury-suites', 'katikies-hotel'],
    content: `
# Santorini Travel Guide 2024: Your Ultimate Island Experience

Welcome to our comprehensive guide to Santorini, the crown jewel of the Cyclades islands. This guide will help you plan the perfect Santorini vacation, from where to stay and what to do, to insider tips that will make your trip unforgettable.

## Table of Contents
1. [Why Visit Santorini](#why-visit)
2. [Best Time to Visit](#best-time)
3. [Where to Stay](#where-to-stay)
4. [Must-Do Activities](#activities)
5. [Dining and Wineries](#dining)
6. [Beaches](#beaches)
7. [Island Hopping](#island-hopping)
8. [Travel Tips](#travel-tips)

## Why Visit Santorini {#why-visit}
Santorini is more than just a destination; it's an experience that captivates all your senses. The island's unique crescent shape, formed by one of the largest volcanic eruptions in history, creates the perfect backdrop for unforgettable memories. From the iconic white-washed buildings of Oia to the multi-colored beaches, every corner of Santorini tells a story.

## Best Time to Visit {#best-time}
The ideal time to visit Santorini is between April and October. However, for the perfect balance of good weather and fewer crowds, we recommend:
- **April to May**: Spring blooms and mild temperatures
- **September to October**: Warm seas and harvest season

## Where to Stay {#where-to-stay}
Santorini offers accommodation for every budget and style. Here are our top recommendations:

### Luxury Stays
- [Grace Santorini](/hotels/grace-santorini): Infinity pools overlooking the caldera
- [Andronis Luxury Suites](/hotels/andronis-luxury-suites): Cave-style rooms with private plunge pools
- [Katikies Hotel](/hotels/katikies-hotel): Romantic atmosphere perfect for honeymoons

### Mid-Range Options
- Santorini Palace
- El Greco Resort

### Budget-Friendly Choices
- Caveland Hostel
- Costa Marina Villas

## Must-Do Activities {#activities}
Make your Santorini trip memorable with these essential experiences:

1. [Sunset Caldera Cruise](/activities/caldera-sunset-cruise)
   - Watch the famous Santorini sunset from the water
   - Visit hot springs and volcanic islands
   - Enjoy dinner and drinks onboard

2. [Wine Tasting Tour](/activities/santorini-wine-tasting)
   - Visit traditional wineries
   - Learn about Assyrtiko grapes
   - Taste unique volcanic wines

3. [Akrotiri Archaeological Site](/activities/akrotiri-excavations)
   - Explore the "Pompeii of the Aegean"
   - See preserved frescoes and artifacts
   - Learn about the Minoan civilization

## Dining and Wineries {#dining}
Santorini's culinary scene is as impressive as its views:

### Must-Try Restaurants
- Metaxy Mas (Traditional Greek)
- La Maison (Fine Dining)
- Lucky's Souvlaki (Street Food)

### Top Wineries
- Santo Wines
- Domaine Sigalas
- Venetsanos Winery

## Beaches {#beaches}
Discover Santorini's unique volcanic beaches:

- Red Beach: Famous for its red cliffs
- Perissa: Black sand beach with water sports
- Kamari: Organized beach with restaurants

## Island Hopping {#island-hopping}
Combine your Santorini trip with visits to nearby islands:

- [Mykonos](/islands/mykonos): Cosmopolitan atmosphere and nightlife
- [Ios](/islands/ios): Beautiful beaches and young vibe
- [Naxos](/islands/naxos): Traditional villages and great food

## Travel Tips {#travel-tips}
1. Book accommodations early, especially for caldera views
2. Use our [Trip Planner](/trip-planner) to organize your itinerary
3. Consider [renting a car](/rent-a-car) for flexibility
4. Visit popular spots early morning or sunset for best photos
5. Make dinner reservations in advance for sunset views

## Getting Around
- Local buses connect major towns
- Taxis are limited but reliable
- [Car rentals](/rent-a-car) offer the most flexibility

## Conclusion
Santorini is a dream destination that combines natural beauty, rich history, and modern luxury. Whether you're planning a romantic honeymoon, a family vacation, or a solo adventure, this guide will help you make the most of your Santorini experience.

Ready to start planning your Santorini adventure? Use our [Trip Planner](/trip-planner) to create your perfect itinerary, or browse our curated selection of [activities](/activities) and [hotels](/hotels) to start building your dream vacation.
`
  }
];
