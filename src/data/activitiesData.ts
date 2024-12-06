export type ActivityCategory = 'water-sports' | 'tours' | 'cultural' | 'food-wine' | 'adventure';
export type ActivityDifficulty = 'easy' | 'moderate' | 'challenging';

export interface Activity {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  location: string;
  island: string;
  duration: string;
  price: {
    amount: number;
    currency: string;
    display: string;
  };
  included: string[];
  notIncluded: string[];
  highlights: string[];
  images: {
    main: string;
    gallery: string[];
  };
  category: ActivityCategory;
  difficulty: ActivityDifficulty;
  bestTime: string;
  minParticipants: number;
  maxParticipants: number;
  bookingNotice: string;
  cancellationPolicy: string;
  meetingPoint: string;
  requirements?: string[];
  tags: string[];
  languages: string[];
  providedEquipment?: string[];
  startTimes: string[];
}

export const activities: Activity[] = [
  {
    id: 'santorini-catamaran-sunset',
    title: 'Premium Santorini Catamaran Sunset Cruise',
    slug: 'santorini-catamaran-sunset-cruise',
    shortDescription: 'Experience the magic of Santorinis world-famous sunset aboard a luxury catamaran with a premium BBQ dinner.',
    description: `Embark on an unforgettable 5-hour sailing journey around Santorinis caldera on our premium sunset cruise. Our modern catamaran offers the perfect setting to experience the world-famous Santorini sunset in style and comfort.

Your journey begins at the Amoudi Bay port, where youll be welcomed aboard our spacious catamaran. As we set sail, youll cruise past the iconic red and white beaches, with opportunities to swim and snorkel in the crystal-clear Aegean waters.

Visit the famous volcanic hot springs, where you can enjoy a therapeutic mud bath and swim in the warm waters. Our experienced crew will share fascinating insights about Santorinis volcanic history and formation.

As the day progresses, well find the perfect spot to watch the legendary Santorini sunset. Witness the sky transform into a canvas of orange, pink, and purple hues while enjoying a freshly prepared Greek BBQ dinner served with local wine.

This premium experience includes:
• Spacious modern catamaran with both sun and shade areas
• Professional crew and experienced captain
• Premium Greek BBQ dinner with local wine
• Swimming and snorkeling stops at the best locations
• Hot springs visit
• Spectacular sunset views
• Transportation from and to your hotel`,
    location: 'Amoudi Bay',
    island: 'Santorini',
    duration: '5 hours',
    price: {
      amount: 150,
      currency: 'EUR',
      display: '€150'
    },
    included: [
      'Round-trip hotel transfers',
      'Premium Greek BBQ dinner',
      'Unlimited local wine and soft drinks',
      'Snorkeling equipment',
      'Towels',
      'Professional crew',
      'Onboard WiFi',
      'Safety equipment',
      'Insurance'
    ],
    notIncluded: [
      'Additional alcoholic beverages',
      'Professional photos (available for purchase)',
      'Gratuities (optional)',
      'Personal expenses'
    ],
    highlights: [
      'Sail around Santorinis caldera on a luxury catamaran',
      'Swim in crystal-clear waters at Red and White beaches',
      'Visit the volcanic hot springs',
      'Watch the famous Santorini sunset',
      'Enjoy a premium Greek BBQ dinner with local wine',
      'Small group experience (max 20 guests)',
      'Professional crew and commentary'
    ],
    images: {
      main: '/images/activities/santorini-sailing-main.jpg',
      gallery: [
        '/images/activities/santorini-sailing-1.jpg',
        '/images/activities/santorini-sailing-2.jpg',
        '/images/activities/santorini-sailing-3.jpg',
        '/images/activities/santorini-sailing-4.jpg'
      ]
    },
    category: 'water-sports',
    difficulty: 'easy',
    bestTime: 'April to October',
    minParticipants: 2,
    maxParticipants: 20,
    bookingNotice: '24 hours in advance',
    cancellationPolicy: 'Full refund if cancelled at least 24 hours before the activity starts',
    meetingPoint: 'Hotel pickup included',
    requirements: [
      'Suitable for all ages',
      'Not recommended for pregnant women',
      'Bring sunscreen, hat, and swimwear',
      'Comfortable walking shoes recommended'
    ],
    tags: ['sailing', 'sunset', 'swimming', 'snorkeling', 'dinner', 'cruise', 'catamaran'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Snorkeling gear',
      'Towels',
      'Life jackets',
      'Safety equipment'
    ],
    startTimes: ['15:00', '15:30'],
  },
  {
    id: 'milos-sea-kayaking',
    title: 'Milos Sea Kayaking & Cave Exploration',
    slug: 'milos-sea-kayaking-adventure',
    shortDescription: 'Paddle through crystal-clear waters to discover Milos’s stunning coastline, sea caves, and hidden beaches.',
    description: `Discover the hidden treasures of Milos’s coastline on this exciting sea kayaking adventure. Perfect for both beginners and experienced kayakers, this tour offers a unique perspective of the island’s stunning geological formations and pristine waters.

Starting from Adamantas port, we’ll paddle along the dramatic coastline, exploring hidden caves and coves that are only accessible by water. Your expert guide will lead you to some of the most spectacular spots, including the famous Kleftiko Bay and Sykia Cave.

Throughout the journey, you’ll learn about the island’s fascinating volcanic history and unique geology. Take breaks to swim and snorkel in crystal-clear waters, discovering the rich marine life beneath the surface.

This adventure includes:
• High-quality sea kayaking equipment
• Professional certified guide
• Safety briefing and basic kayaking instruction
• Snorkeling gear
• Waterproof bags for your belongings
• Light snacks and water
• Photos of your adventure`,
    location: 'Adamantas Port',
    island: 'Milos',
    duration: '4 hours',
    price: {
      amount: 85,
      currency: 'EUR',
      display: '€85'
    },
    included: [
      'Professional certified guide',
      'Quality kayaking equipment',
      'Snorkeling gear',
      'Dry bags',
      'Water and snacks',
      'Photos of the tour',
      'Safety equipment',
      'Insurance'
    ],
    notIncluded: [
      'Hotel transfers',
      'Additional food and drinks',
      'Gratuities',
      'Personal items'
    ],
    highlights: [
      'Explore Milos’s volcanic coastline by kayak',
      'Discover hidden caves and secluded beaches',
      'Visit the famous Kleftiko Bay',
      'Swim and snorkel in crystal-clear waters',
      'Learn about local geology and history',
      'Small group experience (max 8 participants)',
      'Professional photos included'
    ],
    images: {
      main: '/images/activities/milos-kayaking-main.jpg',
      gallery: [
        '/images/activities/milos-kayaking-1.jpg',
        '/images/activities/milos-kayaking-2.jpg',
        '/images/activities/milos-kayaking-3.jpg',
        '/images/activities/milos-kayaking-4.jpg'
      ]
    },
    category: 'adventure',
    difficulty: 'moderate',
    bestTime: 'May to September',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: '48 hours in advance',
    cancellationPolicy: 'Full refund if cancelled at least 48 hours before the activity starts',
    meetingPoint: 'Adamantas Port, next to the kayak rental shop',
    requirements: [
      'Suitable for ages 8 and above',
      'Not recommended for pregnant women',
      'Bring sunscreen, hat, and swimwear',
      'Comfortable shoes recommended'
    ],
    tags: ['kayaking', 'adventure', 'swimming', 'snorkeling', 'caves', 'nature'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Kayaking equipment',
      'Snorkeling gear',
      'Dry bags',
      'Safety equipment'
    ],
    startTimes: ['09:00', '14:00'],
  },
  {
    id: 'naxos-cooking-class',
    title: 'Traditional Naxian Cooking Experience',
    slug: 'naxos-traditional-cooking-class',
    shortDescription: 'Master the art of Greek cuisine in a charming mountain village setting with local ingredients and traditional recipes.',
    description: `Immerse yourself in the rich culinary traditions of Naxos with our authentic cooking class experience. Set in the picturesque mountain village of Chalki, this hands-on class teaches you the secrets of traditional Greek cuisine using fresh, local ingredients.

Your experience begins with a visit to our organic garden, where you'll learn about and collect fresh herbs and vegetables. Our experienced local chef will guide you through the selection of seasonal ingredients and explain their significance in Naxian cuisine.

In our traditional stone-built kitchen, you'll learn to prepare a complete Greek meal including:
• Classic mezedes (appetizers)
• Main dishes featuring local specialties
• Traditional desserts
• Homemade bread

Throughout the class, you'll discover the stories behind each dish and learn about the island's culinary heritage. The experience concludes with a feast of your creations, accompanied by local wine and spectacular views of the Naxian countryside.`,
    location: 'Chalki Village',
    island: 'Naxos',
    duration: '6 hours',
    price: {
      amount: 95,
      currency: 'EUR',
      display: '€95'
    },
    included: [
      'Hotel pickup and drop-off',
      'All ingredients and equipment',
      'Detailed recipe booklet',
      'Full meal with wine',
      'Welcome drink',
      'Cooking certificate',
      'Local cheese and wine tasting'
    ],
    notIncluded: [
      'Additional beverages',
      'Gratuities',
      'Personal items',
      'Cookbook (available for purchase)'
    ],
    highlights: [
      'Cook authentic Naxian dishes in a traditional setting',
      'Visit an organic garden and select fresh ingredients',
      'Learn family recipes passed down through generations',
      'Enjoy wine pairing with your creations',
      'Take home a recipe booklet',
      'Small group experience (max 8 participants)',
      'Spectacular mountain village location'
    ],
    images: {
      main: '/images/activities/naxos-cooking-main.jpg',
      gallery: [
        '/images/activities/naxos-cooking-1.jpg',
        '/images/activities/naxos-cooking-2.jpg',
        '/images/activities/naxos-cooking-3.jpg',
        '/images/activities/naxos-cooking-4.jpg'
      ]
    },
    category: 'food-wine',
    difficulty: 'easy',
    bestTime: 'Year-round',
    minParticipants: 2,
    maxParticipants: 8,
    bookingNotice: '24 hours in advance',
    cancellationPolicy: 'Full refund if cancelled at least 24 hours before the activity starts',
    meetingPoint: 'Hotel pickup included',
    requirements: [
      'Suitable for all ages',
      'Not recommended for people with mobility issues',
      'Bring apron and comfortable shoes',
      'Food allergies must be notified in advance'
    ],
    tags: ['cooking', 'culinary', 'traditional', 'food', 'wine', 'cultural', 'local experience'],
    languages: ['English', 'Greek', 'French'],
    providedEquipment: [
      'Cooking equipment',
      'Ingredients',
      'Aprons',
      'Recipe booklet'
    ],
    startTimes: ['10:00', '16:00'],
  }
];
