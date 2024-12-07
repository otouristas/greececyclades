import { Activity, ActivityCategory, ActivityDifficulty } from '../types/activity';

export const activities: Activity[] = [
  {
    id: 'santorini-catamaran-sunset',
    title: 'Premium Santorini Catamaran Sunset Cruise',
    slug: 'santorini-catamaran-sunset',
    shortDescription: 'Experience the magic of Santorini from the water with our premium catamaran sunset cruise.',
    description: 'Set sail on our luxurious catamaran for an unforgettable sunset cruise around Santorini. Visit the famous Red and White beaches, swim in crystal-clear waters, and enjoy a delicious BBQ dinner on board.',
    location: 'Vlychada Port',
    island: 'Santorini',
    duration: '5 hours',
    price: {
      amount: 150,
      currency: 'EUR',
      display: '€150'
    },
    included: [
      'Hotel pickup and drop-off',
      'BBQ dinner',
      'Open bar',
      'Snorkeling equipment',
      'Towels'
    ],
    notIncluded: [
      'Gratuities',
      'Personal expenses'
    ],
    highlights: [
      'Sunset views of Santorini',
      'Swimming and snorkeling stops',
      'Visit to Red and White beaches',
      'Gourmet BBQ dinner',
      'Premium drinks included'
    ],
    images: {
      main: '/images/activities/santorini-catamaran-main.jpg',
      gallery: [
        '/images/activities/santorini-catamaran-1.jpg',
        '/images/activities/santorini-catamaran-2.jpg',
        '/images/activities/santorini-catamaran-3.jpg'
      ]
    },
    category: 'water-sports',
    difficulty: 'easy',
    bestTime: 'May to October',
    minParticipants: 2,
    maxParticipants: 20,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the activity',
    meetingPoint: 'Vlychada Port or hotel pickup',
    requirements: [
      'Suitable for all ages',
      'Not recommended for pregnant women',
      'Bring sunscreen, hat, and swimwear',
      'Comfortable walking shoes recommended'
    ],
    tags: ['sailing', 'sunset', 'swimming', 'cruise', 'dinner'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Snorkeling gear',
      'Towels',
      'Life jackets',
      'Safety equipment'
    ],
    startTimes: ['15:00', '15:30']
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

export type { Activity, ActivityCategory, ActivityDifficulty };
