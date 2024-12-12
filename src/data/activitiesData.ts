import { Activity, ActivityCategory, ActivityDifficulty } from '../types/activity';

// Default image configuration
const DEFAULT_ACTIVITY_IMAGE = '/images/activities/activities-hero.jpg';
const DEFAULT_GALLERY_IMAGES = [
  '/images/activities/activities-hero.jpg',
  '/images/activities/photo-1569872868810-04548e90e93d.avif'
];

// Update image paths and SEO metadata for all activities
const activities: Activity[] = [
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
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to September',
    minParticipants: 2,
    maxGroupSize: 20,
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
    startTimes: ['15:00', '15:30'],
    rating: undefined,
    reviews: undefined,
    seoMeta: {
      title: 'Santorini Catamaran Sunset Cruise | Greece Cyclades',
      description: 'Experience the magic of Santorini from the water with our premium catamaran sunset cruise.',
      keywords: ['santorini catamaran', 'sunset cruise', 'greece activities', 'cyclades']
    }
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
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to September',
    minParticipants: 2,
    maxGroupSize: 8,
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
    rating: undefined,
    reviews: undefined,
    seoMeta: {
      title: 'Milos Sea Kayaking & Cave Exploration | Greece Cyclades',
      description: 'Paddle through crystal-clear waters to discover Milos’s stunning coastline, sea caves, and hidden beaches.',
      keywords: ['milos sea kayaking', 'cave exploration', 'greece activities', 'cyclades']
    }
  },
  {
    id: 'milos-sea-kayaking-adventure',
    title: 'Milos Sea Kayaking Adventure',
    slug: 'milos-sea-kayaking-adventure',
    shortDescription: 'Explore the stunning coastline of Milos by sea kayak, discovering hidden caves and pristine beaches.',
    description: `Embark on an unforgettable sea kayaking adventure along the dramatic coastline of Milos. This guided tour takes you to some of the island's most spectacular locations that are only accessible by water.

Highlights:
• Paddle through crystal-clear waters
• Explore hidden sea caves and rock formations
• Visit secluded beaches
• Learn about the island's volcanic geology
• Swim and snorkel in pristine waters
• Professional guide and safety equipment provided
• Small group size for personalized experience

Perfect for both beginners and experienced kayakers, this tour includes all necessary equipment and safety briefing. Our expert guides will share fascinating insights about Milos's unique geological formations and coastal ecosystem.`,
    location: 'Adamantas Port',
    island: 'Milos',
    duration: '5 hours',
    price: {
      amount: 89,
      currency: 'EUR',
      display: '€89'
    },
    difficulty: ActivityDifficulty.Moderate,
    category: ActivityCategory.WaterSports,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    maxGroupSize: 8,
    included: [
      'Professional guide',
      'Kayaking equipment',
      'Safety gear',
      'Snorkeling equipment',
      'Water and snacks',
      'Photos of your adventure'
    ],
    images: {
      main: '/images/activities/milos/sea-kayaking-main.jpg',
      gallery: [
        '/images/activities/milos/sea-kayaking-1.jpg',
        '/images/activities/milos/sea-kayaking-2.jpg',
        '/images/activities/milos/sea-kayaking-3.jpg'
      ]
    },
    startTimes: ['09:00', '14:00'],
    requirements: [
      'Basic swimming ability',
      'Minimum age: 12 years',
      'Moderate fitness level'
    ],
    meetingPoint: 'Adamantas Port, Milos (36.7225, 24.4467)',
    tags: ['kayaking', 'adventure', 'swimming', 'snorkeling', 'caves', 'nature'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Kayaking equipment',
      'Snorkeling gear',
      'Safety gear',
      'Waterproof bags'
    ],
    seoMeta: {
      title: 'Milos Sea Kayaking Adventure | Explore Hidden Caves & Beaches',
      description: 'Discover the stunning coastline of Milos on a guided sea kayaking tour. Explore hidden caves, pristine beaches, and dramatic rock formations. Book now!',
      keywords: ['Milos sea kayaking', 'kayak tours Milos', 'Greek islands kayaking', 'Milos water sports', 'Milos adventures', 'sea caves Milos']
    },
    rating: undefined,
    reviews: undefined
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
    category: ActivityCategory.Culinary,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    minParticipants: 2,
    maxGroupSize: 8,
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
    rating: undefined,
    reviews: undefined,
    seoMeta: {
      title: 'Naxos Cooking Class - Traditional Greek Cuisine | Greece Cyclades',
      description: 'Master the art of Greek cuisine in a charming mountain village setting with local ingredients and traditional recipes.',
      keywords: ['naxos cooking class', 'traditional greek cuisine', 'cooking experience', 'cyclades']
    }
  },
  {
    id: 'paros-windsurfing',
    title: 'Windsurfing in Paros - World-Class Wind Sports Experience',
    slug: 'paros-windsurfing',
    shortDescription: 'Experience world-class windsurfing in Paros, one of Europe\'s top windsurfing destinations.',
    description: `Discover why Paros is considered one of the best windsurfing spots in Europe. With consistent Meltemi winds during summer months and crystal-clear waters, New Golden Beach offers perfect conditions for both beginners and advanced windsurfers. Professional instructors provide lessons for all skill levels, and top-quality equipment is available for rent. The beach's unique geography creates ideal wind conditions, making it a paradise for wind sports enthusiasts.`,
    location: 'New Golden Beach',
    island: 'Paros',
    duration: 'Flexible',
    price: {
      amount: 60,
      currency: 'EUR',
      display: '€60'
    },
    included: [
      'Equipment rental available',
      'Professional instruction',
      'Safety briefing',
      'Storage facilities'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Challenging,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to September',
    images: {
      main: '/images/activities/paros-windsurfing-main.jpg',
      gallery: [
        '/images/activities/paros-windsurfing-1.jpg',
        '/images/activities/paros-windsurfing-2.jpg',
        '/images/activities/paros-windsurfing-3.jpg'
      ]
    },
    meetingPoint: 'New Golden Beach, Paros',
    seoMeta: {
      title: 'Paros Windsurfing - World-Class Wind Sports Experience | Greece Cyclades',
      description: 'Experience world-class windsurfing in Paros, one of Europe\'s top windsurfing destinations.',
      keywords: ['paros windsurfing', 'world-class wind sports', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'apollonia-shopping',
    title: 'Apollonia Shopping Experience - Traditional Cycladic Markets',
    slug: 'apollonia-shopping',
    shortDescription: 'Explore the charming shopping streets of Apollonia, the capital of Sifnos.',
    description: `Immerse yourself in the authentic shopping experience of Apollonia, Sifnos' picturesque capital. Wander through narrow whitewashed alleys lined with boutiques selling traditional Cycladic crafts, locally made ceramics, and designer fashion. Discover unique jewelry shops, artisanal food stores offering local delicacies, and workshops where you can watch craftsmen at work. The evening shopping culture, known as "volta," adds a special charm to your retail therapy.`,
    location: 'Apollonia',
    island: 'Sifnos',
    duration: 'Flexible',
    price: {
      amount: 0,
      currency: 'EUR',
      display: 'Free'
    },
    included: [
      'Self-guided shopping experience',
      'Access to all public shopping areas',
      'Optional guided tours available'
    ],
    notIncluded: [
      'Shopping purchases',
      'Food and drinks',
      'Transportation'
    ],
    highlights: [
      'Explore traditional Cycladic boutiques',
      'Shop for local ceramics and crafts',
      'Visit artisanal workshops',
      'Experience evening "volta" culture',
      'Find unique Greek fashion and jewelry'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'April to October',
    images: {
      main: '/images/activities/apollonia-shopping-main.jpg',
      gallery: [
        '/images/activities/apollonia-shopping-1.jpg',
        '/images/activities/apollonia-shopping-2.jpg',
        '/images/activities/apollonia-shopping-3.jpg'
      ]
    },
    meetingPoint: 'Apollonia town center',
    seoMeta: {
      title: 'Apollonia Shopping Guide - Traditional Markets in Sifnos | Greece Cyclades',
      description: 'Explore the charming shopping streets of Apollonia, the capital of Sifnos.',
      keywords: ['apollonia shopping', 'traditional cycladic markets', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined,
    bookingNotice: 'No booking required',
    cancellationPolicy: 'Not applicable - free activity'
  },
  {
    id: 'santorini-wine-tour',
    title: 'Santorini Wine Tour - Volcanic Vineyard Experience',
    slug: 'santorini-wine-tour',
    shortDescription: 'Discover Santorini\'s unique wine heritage through exclusive vineyard tours and tastings.',
    description: `Embark on a journey through Santorini's distinctive wine culture, shaped by its volcanic terroir. Visit three renowned wineries, including the historic Santo Wines and Venetsanos Winery, where you'll learn about the island's unique basket-trained vines (kouloura method) and taste exceptional varieties like Assyrtiko. Experience stunning caldera views while sampling 12-15 different wines paired with local cheeses and mezedes. Our expert sommeliers share fascinating insights about Santorini's 3,500-year-old wine history.`,
    location: 'Multiple Locations',
    island: 'Santorini',
    duration: '4-5 hours',
    price: {
      amount: 135,
      currency: 'EUR',
      display: '€135'
    },
    included: [
      'Hotel pickup and drop-off',
      'Wine tasting (12-15 varieties)',
      'Local cheese and appetizer pairings',
      'Expert sommelier guide',
      'Visit to 3 wineries'
    ],
    category: ActivityCategory.Food,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/santorini-wine-tour-main.jpg',
      gallery: [
        '/images/activities/santorini-wine-tour-1.jpg',
        '/images/activities/santorini-wine-tour-2.jpg',
        '/images/activities/santorini-wine-tour-3.jpg'
      ]
    },
    meetingPoint: 'Your Santorini hotel',
    seoMeta: {
      title: 'Santorini Wine Tour - Volcanic Vineyard Experience | Greece Cyclades',
      description: 'Discover Santorini\'s unique wine heritage through exclusive vineyard tours and tastings.',
      keywords: ['santorini wine tour', 'volcanic vineyard experience', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'red-beach-snorkeling',
    title: 'Red Beach Snorkeling Adventure - Santorini',
    slug: 'red-beach-snorkeling',
    shortDescription: 'Explore the underwater world of Santorini\'s famous Red Beach.',
    description: `Discover the vibrant marine life beneath the surface at Santorini's iconic Red Beach. This guided snorkeling experience takes you through crystal-clear waters alongside dramatic red cliffs. Perfect for beginners and experienced snorkelers alike, you'll encounter colorful Mediterranean fish, sea caves, and unique volcanic formations. Our experienced guides provide all necessary equipment and safety instructions.`,
    location: 'Red Beach, Akrotiri',
    island: 'Santorini',
    duration: '3 hours',
    price: {
      amount: 45,
      currency: 'EUR',
      display: '€45'
    },
    included: [
      'Professional guide',
      'Snorkeling equipment',
      'Safety briefing',
      'Beach facilities access',
      'Underwater photos'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to October',
    images: {
      main: '/images/activities/red-beach-snorkeling-main.jpg',
      gallery: [
        '/images/activities/red-beach-snorkeling-1.jpg',
        '/images/activities/red-beach-snorkeling-2.jpg',
        '/images/activities/red-beach-snorkeling-3.jpg'
      ]
    },
    meetingPoint: 'Red Beach, Akrotiri',
    seoMeta: {
      title: 'Red Beach Snorkeling Santorini - Guided Tours | Greece Cyclades',
      description: 'Explore the underwater world of Santorini\'s famous Red Beach.',
      keywords: ['red beach snorkeling', 'santorini underwater', 'guided snorkeling tours', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'oia-sunset',
    title: 'Oia Sunset Experience - World-Famous Santorini Sunset',
    slug: 'oia-sunset',
    shortDescription: 'Witness the world-renowned sunset of Oia in an exclusive setting.',
    description: `Experience the magic of Santorini's most famous sunset from carefully selected viewing points in Oia. Our expert guides lead you through the charming streets to avoid the crowds, sharing fascinating stories about the village's history and architecture. The tour includes stops at iconic blue-domed churches and windmills, culminating in a premium viewing spot for the sunset with a complimentary glass of Santorini wine.`,
    location: 'Oia Village',
    island: 'Santorini',
    duration: '2.5 hours',
    price: {
      amount: 65,
      currency: 'EUR',
      display: '€65'
    },
    included: [
      'Expert local guide',
      'Premium sunset viewing spot',
      'Glass of local wine',
      'Historical commentary',
      'Photo opportunities'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/oia-sunset-main.jpg',
      gallery: [
        '/images/activities/oia-sunset-1.jpg',
        '/images/activities/oia-sunset-2.jpg',
        '/images/activities/oia-sunset-3.jpg'
      ]
    },
    meetingPoint: 'Oia Village Main Square',
    seoMeta: {
      title: 'Oia Sunset Experience - World-Famous Santorini Sunset | Greece Cyclades',
      description: 'Witness the world-renowned sunset of Oia in an exclusive setting.',
      keywords: ['oia sunset', 'santorini sunset tour', 'world-famous sunset', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'santorini-cooking',
    title: 'Traditional Santorini Cooking Class & Wine Pairing',
    slug: 'santorini-cooking',
    shortDescription: 'Learn authentic Santorinian recipes in a traditional setting with wine pairing.',
    description: `Join our master chef for an immersive cooking experience in a traditional Santorinian home. Learn to prepare local specialties like fava, tomatokeftedes, and white eggplant dishes using fresh, local ingredients. The class includes a visit to a local garden, hands-on cooking instruction, and a feast of your creations paired with selected Santorini wines. Take home recipe cards and cooking tips to recreate these dishes.`,
    location: 'Megalochori Village',
    island: 'Santorini',
    duration: '4 hours',
    price: {
      amount: 95,
      currency: 'EUR',
      display: '€95'
    },
    included: [
      'Cooking instruction',
      'All ingredients',
      'Wine pairing',
      'Recipe booklet',
      'Full meal',
      'Garden visit'
    ],
    category: ActivityCategory.Food,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/santorini-cooking-main.jpg',
      gallery: [
        '/images/activities/santorini-cooking-1.jpg',
        '/images/activities/santorini-cooking-2.jpg',
        '/images/activities/santorini-cooking-3.jpg'
      ]
    },
    meetingPoint: 'Megalochori Village Square',
    seoMeta: {
      title: 'Santorini Cooking Class - Traditional Greek Cuisine | Greece Cyclades',
      description: 'Learn authentic Santorinian recipes in a traditional setting with wine pairing.',
      keywords: ['santorini cooking class', 'traditional greek cuisine', 'cooking experience', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'santorini-photo-tour',
    title: 'Santorini Photography Tour - Capture Island Magic',
    slug: 'santorini-photo-tour',
    shortDescription: 'Professional photography tour of Santorini\'s most picturesque locations.',
    description: `Join our professional photographer for a curated tour of Santorini's most photogenic locations. Learn composition techniques while capturing blue domes, whitewashed villages, and dramatic caldera views. The tour includes both famous spots and hidden gems, with expert guidance on camera settings and lighting. Perfect for all skill levels, from smartphone photographers to DSLR enthusiasts.`,
    location: 'Multiple Locations',
    island: 'Santorini',
    duration: '4 hours',
    price: {
      amount: 120,
      currency: 'EUR',
      display: '€120'
    },
    included: [
      'Professional photographer guide',
      'Photography instruction',
      'Location access fees',
      'Digital photo tips guide',
      'Post-processing workshop'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/santorini-photography-main.jpg',
      gallery: [
        '/images/activities/santorini-photography-1.jpg',
        '/images/activities/santorini-photography-2.jpg',
        '/images/activities/santorini-photography-3.jpg'
      ]
    },
    meetingPoint: 'Fira Town Hall',
    seoMeta: {
      title: 'Santorini Photography Tour - Capture Island Magic | Greece Cyclades',
      description: 'Professional photography tour of Santorini\'s most picturesque locations.',
      keywords: ['santorini photography tour', 'capture island magic', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'fira-cable-car',
    title: 'Fira Cable Car Experience - Caldera Views',
    slug: 'fira-cable-car',
    shortDescription: 'Scenic cable car ride from Old Port to Fira with stunning caldera views.',
    description: `Experience breathtaking views of Santorini's caldera during this scenic cable car journey between Fira and the Old Port. The modern cable car system offers safe and comfortable transportation while providing spectacular photo opportunities of the volcano, sea, and surrounding islands. Perfect for cruise ship visitors or anyone wanting to avoid the donkey trail steps.`,
    location: 'Fira',
    island: 'Santorini',
    duration: '30 minutes',
    price: {
      amount: 6,
      currency: 'EUR',
      display: '€6'
    },
    included: [
      'Round-trip cable car ticket',
      'Photo opportunities',
      'Safe transport'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/fira-cable-car-main.jpg',
      gallery: [
        '/images/activities/fira-cable-car-1.jpg',
        '/images/activities/fira-cable-car-2.jpg',
        '/images/activities/fira-cable-car-3.jpg'
      ]
    },
    meetingPoint: 'Fira Old Port',
    seoMeta: {
      title: 'Fira Cable Car Ride - Santorini Port Transfer | Greece Cyclades',
      description: 'Scenic cable car ride from Old Port to Fira with stunning caldera views.',
      keywords: ['fira cable car', 'santorini port transfer', 'caldera views', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'mountain-village-exploration',
    title: 'Mountain Village Exploration - Traditional Naxos Life',
    slug: 'mountain-village-exploration',
    shortDescription: 'Discover the authentic charm of Naxos mountain villages.',
    description: `Explore the hidden gems of Naxos's mountain villages on this guided tour through Halki, Filoti, and Apiranthos. Visit traditional marble workshops, olive oil presses, and local distilleries producing kitron liqueur. Experience authentic village life, meet local artisans, and enjoy traditional meze at a family-run taverna. The tour includes visits to Byzantine churches and panoramic viewpoints.`,
    location: 'Multiple Villages',
    island: 'Naxos',
    duration: '6 hours',
    price: {
      amount: 75,
      currency: 'EUR',
      display: '€75'
    },
    included: [
      'Transportation',
      'Local guide',
      'Village tours',
      'Traditional lunch',
      'Kitron tasting',
      'Workshop visits'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'April to October',
    images: {
      main: '/images/activities/naxos-villages-main.jpg',
      gallery: [
        '/images/activities/naxos-villages-1.jpg',
        '/images/activities/naxos-villages-2.jpg',
        '/images/activities/naxos-villages-3.jpg'
      ]
    },
    meetingPoint: 'Naxos Town Main Square',
    seoMeta: {
      title: 'Naxos Mountain Villages Tour - Authentic Greek Life | Greece Cyclades',
      description: 'Explore the authentic charm of Naxos mountain villages.',
      keywords: ['naxos mountain villages', 'traditional greek life', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'naxos-temple-tour',
    title: 'Naxos Temple Tour - Ancient Greek Heritage',
    slug: 'naxos-temple-tour',
    shortDescription: 'Explore ancient temples and archaeological sites of Naxos.',
    description: `Discover the rich archaeological heritage of Naxos on this comprehensive temple tour. Visit the iconic Portara (Temple of Apollo), the Temple of Demeter, and various Kouros statues. Our expert archaeologist guide shares fascinating insights about ancient Greek history, mythology, and architectural techniques. The tour includes visits to lesser-known sites and spectacular viewpoints.`,
    location: 'Multiple Locations',
    island: 'Naxos',
    duration: '5 hours',
    price: {
      amount: 65,
      currency: 'EUR',
      display: '€65'
    },
    included: [
      'Archaeological expert guide',
      'Transportation',
      'Site entrance fees',
      'Historical booklet',
      'Water and snacks'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'March to November',
    images: {
      main: '/images/activities/naxos-temples-main.jpg',
      gallery: [
        '/images/activities/naxos-temples-1.jpg',
        '/images/activities/naxos-temples-2.jpg',
        '/images/activities/naxos-temples-3.jpg'
      ]
    },
    meetingPoint: 'Naxos Town Main Square',
    seoMeta: {
      title: 'Naxos Temple Tour - Ancient Greek Sites & Portara | Greece Cyclades',
      description: 'Explore ancient temples and archaeological sites of Naxos.',
      keywords: ['naxos temple tour', 'ancient greek heritage', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'naxos-hiking',
    title: 'Naxos Hiking Adventure - Coastal Trails & Mountains',
    slug: 'naxos-hiking',
    shortDescription: 'Experience the diverse landscapes of Naxos on foot.',
    description: `Trek through Naxos's most scenic hiking trails, from coastal paths to mountain routes. This guided hiking experience takes you through ancient marble quarries, traditional villages, and dramatic landscapes. Learn about local flora and fauna, geology, and traditional farming practices. The route includes stops at historical sites and spectacular viewpoints.`,
    location: 'Various Trails',
    island: 'Naxos',
    duration: '6 hours',
    price: {
      amount: 55,
      currency: 'EUR',
      display: '€55'
    },
    included: [
      'Professional hiking guide',
      'Safety equipment',
      'Packed lunch',
      'Walking poles',
      'Trail maps'
    ],
    category: ActivityCategory.Nature,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'March to November',
    images: {
      main: '/images/activities/naxos-hiking-main.jpg',
      gallery: [
        '/images/activities/naxos-hiking-1.jpg',
        '/images/activities/naxos-hiking-2.jpg',
        '/images/activities/naxos-hiking-3.jpg'
      ]
    },
    meetingPoint: 'Naxos Town Main Square',
    seoMeta: {
      title: 'Naxos Hiking Tours - Guided Trail Adventures | Greece Cyclades',
      description: 'Experience the diverse landscapes of Naxos on foot.',
      keywords: ['naxos hiking', 'coastal trails', 'mountain routes', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'zeus-cave-hike',
    title: 'Zeus Cave Hiking Experience - Mythological Journey',
    slug: 'zeus-cave-hike',
    shortDescription: 'Hike to the legendary Cave of Zeus on Mount Zas.',
    description: `Embark on a mythological journey to the Cave of Zeus, where according to legend, Zeus spent his youth. This guided hike takes you up Mount Zas, the highest peak in the Cyclades, offering panoramic views of surrounding islands. Learn about Greek mythology, local geology, and traditional shepherding practices while exploring ancient paths and natural wonders.`,
    location: 'Mount Zas',
    island: 'Naxos',
    duration: '5 hours',
    price: {
      amount: 45,
      currency: 'EUR',
      display: '€45'
    },
    included: [
      'Expert mountain guide',
      'Safety equipment',
      'Cave entrance',
      'Hiking poles',
      'Light refreshments'
    ],
    category: ActivityCategory.Nature,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'April to October',
    images: {
      main: '/images/activities/zeus-cave-hike-main.jpg',
      gallery: [
        '/images/activities/zeus-cave-hike-1.jpg',
        '/images/activities/zeus-cave-hike-2.jpg',
        '/images/activities/zeus-cave-hike-3.jpg'
      ]
    },
    meetingPoint: 'Mount Zas Trailhead',
    seoMeta: {
      title: 'Zeus Cave Hike Naxos - Mount Zas Trail Guide | Greece Cyclades',
      description: 'Hike to the legendary Cave of Zeus on Mount Zas.',
      keywords: ['zeus cave hike', 'naxos hiking', 'mount zás trail', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'mikri-vigla-kitesurfing',
    title: 'Mikri Vigla Kitesurfing - Premier Wind Sports Destination',
    slug: 'mikri-vigla-kitesurfing',
    shortDescription: 'Experience world-class kitesurfing at Naxos\'s premier wind sports beach.',
    description: `Discover why Mikri Vigla is considered one of the best kitesurfing spots in Greece. The unique geography creates perfect wind conditions, with thermal winds providing ideal conditions for both beginners and advanced riders. Professional instructors offer courses for all levels, using the latest equipment and safety gear. The beach's two sides offer different wind conditions, perfect for various skill levels.`,
    location: 'Mikri Vigla Beach',
    island: 'Naxos',
    duration: 'Flexible',
    price: {
      amount: 80,
      currency: 'EUR',
      display: '€80'
    },
    included: [
      'Professional instruction',
      'Equipment rental',
      'Safety gear',
      'Theory lessons',
      'Beach facilities'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to September',
    images: {
      main: '/images/activities/mikri-vigla-kitesurfing-main.jpg',
      gallery: [
        '/images/activities/mikri-vigla-kitesurfing-1.jpg',
        '/images/activities/mikri-vigla-kitesurfing-2.jpg',
        '/images/activities/mikri-vigla-kitesurfing-3.jpg'
      ]
    },
    meetingPoint: 'Mikri Vigla Beach Watersports Center',
    seoMeta: {
      title: 'Mikri Vigla Kitesurfing - Naxos Wind Sports | Greece Cyclades',
      description: 'Experience world-class kitesurfing at Naxos\'s premier wind sports beach.',
      keywords: ['mikri vigla kitesurfing', 'naxos wind sports', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'golden-beach-windsurfing',
    title: 'Golden Beach Windsurfing - World-Class Wind Sports',
    slug: 'golden-beach-windsurfing',
    shortDescription: 'Experience premium windsurfing at Paros\'s famous Golden Beach.',
    description: `Golden Beach (Chryssi Akti) offers world-class windsurfing conditions with consistent Meltemi winds and crystal-clear waters. Our professional instructors provide lessons for all skill levels, from complete beginners to advanced riders. The beach's natural bay creates perfect conditions, while modern equipment and comprehensive safety measures ensure an optimal experience.`,
    location: 'Golden Beach',
    island: 'Paros',
    duration: 'Flexible',
    price: {
      amount: 70,
      currency: 'EUR',
      display: '€70'
    },
    included: [
      'Professional instruction',
      'Equipment rental',
      'Safety briefing',
      'Wetsuit',
      'Storage facilities'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'June to September',
    images: {
      main: '/images/activities/golden-beach-windsurfing-main.jpg',
      gallery: [
        '/images/activities/golden-beach-windsurfing-1.jpg',
        '/images/activities/golden-beach-windsurfing-2.jpg',
        '/images/activities/golden-beach-windsurfing-3.jpg'
      ]
    },
    meetingPoint: 'Golden Beach Windsurfing Center',
    seoMeta: {
      title: 'Golden Beach Windsurfing Paros - Premium Lessons | Greece Cyclades',
      description: 'Experience premium windsurfing at Paros\'s famous Golden Beach.',
      keywords: ['golden beach windsurfing', 'paros wind sports', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'ekatontapiliani',
    title: 'Ekatontapiliani Church Tour - Byzantine Marvel',
    slug: 'ekatontapiliani',
    shortDescription: 'Explore the historic Church of 100 Doors in Parikia, Paros.',
    description: `Discover the architectural and spiritual wonder of Ekatontapiliani, also known as the Church of 100 Doors. This guided tour explores one of the best-preserved Byzantine churches in Greece, dating back to the 4th century. Learn about its fascinating legends, admire ancient icons and relics, and understand its significant role in Orthodox Christianity.`,
    location: 'Parikia',
    island: 'Paros',
    duration: '1.5 hours',
    price: {
      amount: 15,
      currency: 'EUR',
      display: '€15'
    },
    included: [
      'Expert guide',
      'Church entrance',
      'Historical booklet',
      'Icon viewing',
      'Museum access'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/ekatontapiliani-main.jpg',
      gallery: [
        '/images/activities/ekatontapiliani-1.jpg',
        '/images/activities/ekatontapiliani-2.jpg',
        '/images/activities/ekatontapiliani-3.jpg'
      ]
    },
    meetingPoint: 'Ekatontapiliani Church Main Entrance',
    seoMeta: {
      title: 'Ekatontapiliani Church Tour Paros - Byzantine History | Greece Cyclades',
      description: 'Explore the historic Church of 100 Doors in Parikia, Paros.',
      keywords: ['ekatontapiliani church', 'byzantine marvel', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'paros-sailing',
    title: 'Paros Sailing Adventure - Island Hopping Experience',
    slug: 'paros-sailing',
    shortDescription: 'Sail around Paros and nearby islands on a luxury yacht.',
    description: `Embark on an unforgettable sailing adventure around Paros and its neighboring islands. Visit secluded beaches, swim in crystal-clear waters, and explore hidden caves accessible only by boat. Our experienced skipper shares local knowledge while you enjoy freshly prepared Mediterranean lunch on board. Perfect for both experienced sailors and first-time adventurers.`,
    location: 'Parikia Port',
    island: 'Paros',
    duration: '8 hours',
    price: {
      amount: 120,
      currency: 'EUR',
      display: '€120'
    },
    included: [
      'Experienced skipper',
      'Mediterranean lunch',
      'Drinks and snacks',
      'Snorkeling equipment',
      'Safety gear',
      'Port fees'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to October',
    images: {
      main: '/images/activities/paros-sailing-main.jpg',
      gallery: [
        '/images/activities/paros-sailing-1.jpg',
        '/images/activities/paros-sailing-2.jpg',
        '/images/activities/paros-sailing-3.jpg'
      ]
    },
    meetingPoint: 'Parikia Port Marina',
    seoMeta: {
      title: 'Paros Sailing Tours - Luxury Yacht Experience | Greece Cyclades',
      description: 'Sail around Paros and nearby islands on a luxury yacht.',
      keywords: ['paros sailing', 'island hopping experience', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'jackie-o-beach',
    title: 'Jackie O Beach Club Experience - Mykonos Luxury',
    slug: 'jackie-o-beach',
    shortDescription: 'Enjoy the ultimate beach club experience at Super Paradise Beach.',
    description: `Experience the glamour of Mykonos at the iconic Jackie O Beach Club. Located on Super Paradise Beach, this exclusive venue offers premium sunbeds, world-class DJs, and gourmet dining. Enjoy signature cocktails by the infinity pool, watch stunning sunset performances, and dance to the best international music. The venue's restaurant serves Mediterranean fusion cuisine with a focus on fresh seafood.`,
    location: 'Super Paradise Beach',
    island: 'Mykonos',
    duration: 'Full day',
    price: {
      amount: 50,
      currency: 'EUR',
      display: '€50'
    },
    included: [
      'Beach club entry',
      'Sunbed reservation',
      'Welcome drink',
      'Beach towels',
      'Shower facilities'
    ],
    category: ActivityCategory.Entertainment,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'June to September',
    images: {
      main: '/images/activities/jackie-o-beach-main.jpg',
      gallery: [
        '/images/activities/jackie-o-beach-1.jpg',
        '/images/activities/jackie-o-beach-2.jpg',
        '/images/activities/jackie-o-beach-3.jpg'
      ]
    },
    meetingPoint: 'Jackie O Beach Club Entrance',
    seoMeta: {
      title: 'Jackie O Beach Club Mykonos - VIP Experience | Greece Cyclades',
      description: 'Enjoy the ultimate beach club experience at Super Paradise Beach.',
      keywords: ['jackie o beach club', 'mykonos luxury', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'mykonos-windmills-tour',
    title: 'Mykonos Windmills Tour - Iconic Island Landmarks',
    slug: 'mykonos-windmills-tour',
    shortDescription: 'Discover the history of Mykonos\'s famous windmills.',
    description: `Explore the iconic windmills of Mykonos on this fascinating historical tour. Learn about their vital role in the island's economy from the 16th to 20th centuries, visit the Bonis Windmill Museum, and capture perfect photos at sunset. The tour includes stops at Little Venice and other nearby landmarks, with expert commentary on Mykonos's maritime heritage.`,
    location: 'Mykonos Town',
    island: 'Mykonos',
    duration: '2 hours',
    price: {
      amount: 35,
      currency: 'EUR',
      display: '€35'
    },
    included: [
      'Expert guide',
      'Museum entrance',
      'Historical booklet',
      'Photo opportunities',
      'Refreshments'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/mykonos-windmills-main.jpg',
      gallery: [
        '/images/activities/mykonos-windmills-1.jpg',
        '/images/activities/mykonos-windmills-2.jpg',
        '/images/activities/mykonos-windmills-3.jpg'
      ]
    },
    meetingPoint: 'Mykonos Windmills Entrance',
    seoMeta: {
      title: 'Mykonos Windmills Tour - Historical Guide | Greece Cyclades',
      description: 'Discover the history of Mykonos\'s famous windmills.',
      keywords: ['mykonos windmills', 'iconic island landmarks', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'mykonos-town-tour',
    title: 'Mykonos Town Walking Tour - Hidden Gems & History',
    slug: 'mykonos-town-tour',
    shortDescription: 'Discover the secrets of Mykonos Town with local experts.',
    description: `Explore the enchanting maze of Mykonos Town's whitewashed streets with our expert local guide. Visit hidden churches, discover secret viewpoints, and learn about the island's history and culture. The tour includes visits to Little Venice, the famous windmills, Paraportiani Church, and the charming old port. Hear fascinating stories about pirates, merchants, and local traditions.`,
    location: 'Mykonos Town',
    island: 'Mykonos',
    duration: '3 hours',
    price: {
      amount: 45,
      currency: 'EUR',
      display: '€45'
    },
    included: [
      'Local expert guide',
      'Historical commentary',
      'Map of old town',
      'Traditional treats',
      'Photo opportunities'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/mykonos-town-tour-main.jpg',
      gallery: [
        '/images/activities/mykonos-town-tour-1.jpg',
        '/images/activities/mykonos-town-tour-2.jpg',
        '/images/activities/mykonos-town-tour-3.jpg'
      ]
    },
    meetingPoint: 'Mykonos Town Hall',
    seoMeta: {
      title: 'Mykonos Town Walking Tour - Local Guide & History | Greece Cyclades',
      description: 'Discover the secrets of Mykonos Town with local experts.',
      keywords: ['mykonos town tour', 'hidden gems', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'delos-day-trip',
    title: 'Delos Archaeological Site Day Trip',
    slug: 'delos-day-trip',
    shortDescription: 'Visit the sacred island of Delos, birthplace of Apollo and Artemis.',
    description: `Embark on a fascinating journey to the UNESCO World Heritage site of Delos. This guided tour explores one of the most important archaeological sites in Greece, including the Temple of Apollo, the Terrace of the Lions, and ancient residential quarters. Learn about Greek mythology, ancient history, and the island's role as a major religious and commercial center.`,
    location: 'Delos Island',
    island: 'Mykonos',
    duration: '6 hours',
    price: {
      amount: 65,
      currency: 'EUR',
      display: '€65'
    },
    included: [
      'Return boat transfer',
      'Archaeological guide',
      'Site entrance fees',
      'Historical booklet',
      'Audio guide option'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'April to October',
    images: {
      main: '/images/activities/delos-day-trip-main.jpg',
      gallery: [
        '/images/activities/delos-day-trip-1.jpg',
        '/images/activities/delos-day-trip-2.jpg',
        '/images/activities/delos-day-trip-3.jpg'
      ]
    },
    meetingPoint: 'Mykonos Town Port',
    seoMeta: {
      title: 'Delos Day Trip - Ancient Greek History Tour | Greece Cyclades',
      description: 'Visit the sacred island of Delos, birthplace of Apollo and Artemis.',
      keywords: ['delos day trip', 'archaeological site', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'mykonos-beach-hopping',
    title: 'Mykonos Beach Hopping Adventure',
    slug: 'mykonos-beach-hopping',
    shortDescription: 'Discover the best beaches of Mykonos by private transport.',
    description: `Experience the diverse beaches of Mykonos on this comprehensive tour. Visit famous spots like Paradise Beach, Super Paradise, and Elia, as well as hidden coves and secluded shores. Each beach offers unique character and facilities, from peaceful family spots to vibrant party beaches. The tour includes comfortable transportation and local insights about each location.`,
    location: 'Multiple Beaches',
    island: 'Mykonos',
    duration: '7 hours',
    price: {
      amount: 85,
      currency: 'EUR',
      display: '€85'
    },
    included: [
      'Private transportation',
      'Beach equipment',
      'Refreshments',
      'Local guide',
      'Beach club access'
    ],
    category: ActivityCategory.Nature,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to October',
    images: {
      main: '/images/activities/mykonos-beach-hopping-main.jpg',
      gallery: [
        '/images/activities/mykonos-beach-hopping-1.jpg',
        '/images/activities/mykonos-beach-hopping-2.jpg',
        '/images/activities/mykonos-beach-hopping-3.jpg'
      ]
    },
    meetingPoint: 'Mykonos Town Bus Station',
    seoMeta: {
      title: 'Mykonos Beach Hopping Tour - Best Beaches Guide | Greece Cyclades',
      description: 'Discover the best beaches of Mykonos by private transport.',
      keywords: ['mykonos beach hopping', 'best beaches', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'antiparos-cave',
    title: 'Antiparos Cave Exploration - Natural Wonder',
    slug: 'antiparos-cave',
    shortDescription: 'Explore one of the oldest caves in Greece with stunning stalactites.',
    description: `Discover the magnificent Antiparos Cave, a natural wonder featuring the oldest stalagmite in Europe. This guided tour takes you 100 meters deep into the cave, showcasing spectacular formations of stalactites and stalagmites. Learn about the cave's history, including ancient inscriptions dating back to 1673, and its role in local mythology and culture.`,
    location: 'Antiparos Cave',
    island: 'Antiparos',
    duration: '2 hours',
    price: {
      amount: 25,
      currency: 'EUR',
      display: '€25'
    },
    included: [
      'Expert guide',
      'Cave entrance fee',
      'Safety equipment',
      'Geological information',
      'Historical commentary'
    ],
    category: ActivityCategory.Nature,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/antiparos-cave-main.jpg',
      gallery: [
        '/images/activities/antiparos-cave-1.jpg',
        '/images/activities/antiparos-cave-2.jpg',
        '/images/activities/antiparos-cave-3.jpg'
      ]
    },
    meetingPoint: 'Antiparos Cave Entrance',
    seoMeta: {
      title: 'Antiparos Cave Tour - Ancient Stalactites | Greece Cyclades',
      description: 'Explore one of the oldest caves in Greece with stunning stalactites.',
      keywords: ['antiparos cave', 'natural wonder', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'antiparos-boat-tours',
    title: 'Antiparos Boat Tours - Island Discovery',
    slug: 'antiparos-boat-tours',
    shortDescription: 'Sail around Antiparos and discover hidden beaches and coves.',
    description: `Experience the pristine beauty of Antiparos by boat. Visit secluded beaches only accessible by sea, explore hidden caves, and enjoy swimming in crystal-clear waters. The tour includes stops at Despotiko island's ancient sanctuary and the famous Blue Cave. Perfect for photography enthusiasts and nature lovers.`,
    location: 'Antiparos Port',
    island: 'Antiparos',
    duration: '6 hours',
    price: {
      amount: 90,
      currency: 'EUR',
      display: '€90'
    },
    included: [
      'Experienced captain',
      'Snorkeling gear',
      'Light lunch',
      'Refreshments',
      'Beach equipment'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to October',
    images: {
      main: '/images/activities/antiparos-boat-tours-main.jpg',
      gallery: [
        '/images/activities/antiparos-boat-tours-1.jpg',
        '/images/activities/antiparos-boat-tours-2.jpg',
        '/images/activities/antiparos-boat-tours-3.jpg'
      ]
    },
    meetingPoint: 'Antiparos Port',
    seoMeta: {
      title: 'Antiparos Boat Tours - Hidden Beaches & Caves | Greece Cyclades',
      description: 'Sail around Antiparos and discover hidden beaches and coves.',
      keywords: ['antiparos boat tours', 'island discovery', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'antiparos-hiking',
    title: 'Antiparos Hiking Adventure - Coastal Trails',
    slug: 'antiparos-hiking',
    shortDescription: 'Explore Antiparos\'s scenic hiking trails and coastal paths.',
    description: `Discover the natural beauty of Antiparos on foot with this guided hiking experience. Trek along coastal paths offering stunning sea views, visit traditional villages, and explore ancient sites. The route includes stops at viewpoints perfect for photography and breaks at secluded beaches for swimming.`,
    location: 'Various Trails',
    island: 'Antiparos',
    duration: '4 hours',
    price: {
      amount: 40,
      currency: 'EUR',
      display: '€40'
    },
    included: [
      'Professional guide',
      'Trail map',
      'Walking poles',
      'Snacks and water',
      'Safety equipment'
    ],
    category: ActivityCategory.Nature,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'March to November',
    images: {
      main: '/images/activities/antiparos-hiking-main.jpg',
      gallery: [
        '/images/activities/antiparos-hiking-1.jpg',
        '/images/activities/antiparos-hiking-2.jpg',
        '/images/activities/antiparos-hiking-3.jpg'
      ]
    },
    meetingPoint: 'Antiparos Port',
    seoMeta: {
      title: 'Antiparos Hiking Tours - Coastal Trails Guide | Greece Cyclades',
      description: 'Explore Antiparos\'s scenic hiking trails and coastal paths.',
      keywords: ['antiparos hiking', 'coastal trails', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'sifnos-cooking-class',
    title: 'Traditional Sifnos Cooking Class',
    slug: 'sifnos-cooking-class',
    shortDescription: 'Learn authentic Sifnian recipes in a traditional setting.',
    description: `Join a hands-on cooking class in Sifnos, known as the culinary capital of the Cyclades. Learn to prepare traditional dishes using local ingredients and clay pots. Includes market visit, cooking session, and dinner with wine pairing.`,
    location: 'Artemonas, Sifnos',
    island: 'Sifnos',
    duration: '5 hours',
    price: {
      amount: 95,
      currency: 'EUR',
      display: '€95'
    },
    included: [
      'Market tour',
      'Cooking instruction',
      'All ingredients',
      'Wine pairing',
      'Recipe booklet'
    ],
    category: ActivityCategory.Culinary,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/sifnos-cooking-class-main.jpg',
      gallery: [
        '/images/activities/sifnos-cooking-class-1.jpg',
        '/images/activities/sifnos-cooking-class-2.jpg',
        '/images/activities/sifnos-cooking-class-3.jpg'
      ]
    },
    meetingPoint: 'Artemonas Village Square',
    seoMeta: {
      title: 'Sifnos Cooking Class - Traditional Greek Cuisine Workshop',
      description: 'Learn authentic Sifnian recipes in a traditional setting.',
      keywords: ['sifnos cooking class', 'traditional greek cuisine', 'cooking workshop', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'sifnos-churches',
    title: 'Sifnos Churches Tour',
    slug: 'sifnos-churches',
    shortDescription: 'Explore the iconic white churches of Sifnos.',
    description: `Discover Sifnos's remarkable religious heritage through its 365 churches and monasteries. Visit significant sites including Chrysopigi Monastery, Seven Martyrs Church, and Kastro's ancient churches. Learn about local traditions and architecture.`,
    location: 'Various Locations, Sifnos',
    island: 'Sifnos',
    duration: '4 hours',
    price: {
      amount: 55,
      currency: 'EUR',
      display: '€55'
    },
    included: [
      'Expert guide',
      'Transportation',
      'Church visits',
      'Historical commentary',
      'Photo opportunities'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/sifnos-churches-main.jpg',
      gallery: [
        '/images/activities/sifnos-churches-1.jpg',
        '/images/activities/sifnos-churches-2.jpg',
        '/images/activities/sifnos-churches-3.jpg'
      ]
    },
    meetingPoint: 'Apollonia Town Center',
    seoMeta: {
      title: 'Sifnos Churches Tour - Religious Heritage Experience',
      description: 'Explore the iconic white churches of Sifnos.',
      keywords: ['sifnos churches', 'religious heritage', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'pottery-workshop',
    title: 'Traditional Pottery Workshop - Sifnos',
    slug: 'pottery-workshop',
    shortDescription: 'Learn traditional Sifnian pottery techniques.',
    description: `Experience Sifnos's renowned pottery tradition in this hands-on workshop. Learn traditional techniques from master potters, create your own pieces, and discover the island's ceramic heritage. Perfect for all skill levels.`,
    location: 'Artemonas, Sifnos',
    island: 'Sifnos',
    duration: '3 hours',
    price: {
      amount: 65,
      currency: 'EUR',
      display: '€65'
    },
    included: [
      'Materials',
      'Expert instruction',
      'Finished product',
      'Traditional techniques',
      'Historical information'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/pottery-workshop-main.jpg',
      gallery: [
        '/images/activities/pottery-workshop-1.jpg',
        '/images/activities/pottery-workshop-2.jpg',
        '/images/activities/pottery-workshop-3.jpg'
      ]
    },
    meetingPoint: 'Artemonas Village Square',
    seoMeta: {
      title: 'Sifnos Pottery Workshop - Traditional Greek Ceramics',
      description: 'Learn traditional Sifnian pottery techniques.',
      keywords: ['sifnos pottery', 'traditional greek ceramics', 'pottery workshop', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'santa-maria-diving',
    title: 'Santa Maria Diving Experience',
    slug: 'santa-maria-diving',
    shortDescription: 'Discover underwater treasures at Santa Maria Beach.',
    description: `Explore the crystal-clear waters of Santa Maria Beach with professional diving instructors. Perfect for beginners and experienced divers, offering courses and guided dives to discover marine life and underwater caves.`,
    location: 'Santa Maria Beach, Paros',
    island: 'Paros',
    duration: '4 hours',
    price: {
      amount: 85,
      currency: 'EUR',
      display: '€85'
    },
    included: [
      'Equipment rental',
      'Professional instructor',
      'Safety briefing',
      'Guided dive',
      'Certificate (for courses)'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to October',
    images: {
      main: '/images/activities/santa-maria-diving-main.jpg',
      gallery: [
        '/images/activities/santa-maria-diving-1.jpg',
        '/images/activities/santa-maria-diving-2.jpg',
        '/images/activities/santa-maria-diving-3.jpg'
      ]
    },
    meetingPoint: 'Santa Maria Beach Diving Center',
    seoMeta: {
      title: 'Santa Maria Diving Paros - Scuba & Snorkeling',
      description: 'Discover underwater treasures at Santa Maria Beach.',
      keywords: ['santa maria diving', 'paros scuba', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'platis-gialos-beach',
    title: 'Platis Gialos Beach Experience',
    slug: 'platis-gialos-beach',
    shortDescription: 'Enjoy the perfect beach day at Platis Gialos.',
    description: `Experience one of Mykonos' most famous beaches. Platis Gialos offers crystal clear waters, golden sand, and excellent facilities. Enjoy water sports, beachfront dining, and easy access to other south coast beaches.`,
    location: 'Platis Gialos, Mykonos',
    island: 'Mykonos',
    duration: 'Full Day',
    price: {
      amount: 30,
      currency: 'EUR',
      display: '€30'
    },
    included: [
      'Sunbed & Umbrella',
      'Welcome Drink',
      'Beach Service',
      'Shower Facilities',
      'WiFi Access'
    ],
    category: ActivityCategory.Beach,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'June to September',
    images: {
      main: '/images/activities/platis-gialos-main.jpg',
      gallery: [
        '/images/activities/platis-gialos-1.jpg',
        '/images/activities/platis-gialos-2.jpg',
        '/images/activities/platis-gialos-3.jpg'
      ]
    },
    meetingPoint: 'Platis Gialos Beach Entrance',
    seoMeta: {
      title: 'Platis Gialos Beach Mykonos - Premium Beach Experience',
      description: 'Enjoy the perfect beach day at Platis Gialos.',
      keywords: ['platis gialos beach', 'mykonos beaches', 'beach facilities', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'ekatontapiliani',
    title: 'Ekatontapiliani Church Tour',
    slug: 'ekatontapiliani',
    shortDescription: 'Visit the historic Church of 100 Doors in Paros.',
    description: `Explore the magnificent Ekatontapiliani Church, also known as the Church of 100 Doors. This Byzantine architectural marvel dates back to 326 AD. Learn about its fascinating history, religious significance, and unique architectural features.`,
    location: 'Parikia, Paros',
    island: 'Paros',
    duration: '1.5 hours',
    price: {
      amount: 25,
      currency: 'EUR',
      display: '€25'
    },
    included: [
      'Expert Guide',
      'Church Entry',
      'Historical Tour',
      'Byzantine Art Overview',
      'Photo Opportunities'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/ekatontapiliani-main.jpg',
      gallery: [
        '/images/activities/ekatontapiliani-1.jpg',
        '/images/activities/ekatontapiliani-2.jpg',
        '/images/activities/ekatontapiliani-3.jpg'
      ]
    },
    meetingPoint: 'Ekatontapiliani Church Main Entrance',
    seoMeta: {
      title: 'Ekatontapiliani Church Paros - Byzantine Heritage Tour',
      description: 'Visit the historic Church of 100 Doors in Paros.',
      keywords: ['ekatontapiliani church', 'byzantine heritage', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'lefkes-hiking',
    title: 'Lefkes Village Hiking Trail',
    slug: 'lefkes-hiking',
    shortDescription: 'Hike the ancient marble path of Lefkes.',
    description: `Trek the Byzantine Road, an ancient marble-paved path connecting Lefkes to Prodromos. Enjoy panoramic views of the Aegean Sea and surrounding islands while walking through traditional villages and olive groves.`,
    location: 'Lefkes, Paros',
    island: 'Paros',
    duration: '3 hours',
    price: {
      amount: 45,
      currency: 'EUR',
      display: '€45'
    },
    included: [
      'Professional Guide',
      'Trail Map',
      'Water Bottle',
      'Local Snacks',
      'Historical Commentary'
    ],
    category: ActivityCategory.Nature,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'March to November',
    images: {
      main: '/images/activities/lefkes-hiking-main.jpg',
      gallery: [
        '/images/activities/lefkes-hiking-1.jpg',
        '/images/activities/lefkes-hiking-2.jpg',
        '/images/activities/lefkes-hiking-3.jpg'
      ]
    },
    meetingPoint: 'Lefkes Village Square',
    seoMeta: {
      title: 'Lefkes Hiking Trail Paros - Byzantine Path Trek',
      description: 'Hike the ancient marble path of Lefkes.',
      keywords: ['lefkes hiking', 'byzantine path', 'paros trails', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'mikri-vigla-kitesurfing',
    title: 'Kitesurfing at Mikri Vigla',
    slug: 'mikri-vigla-kitesurfing',
    shortDescription: 'Experience world-class kitesurfing at Mikri Vigla Beach.',
    description: `Perfect your kitesurfing skills at one of the best spots in the Cyclades. Mikri Vigla offers ideal wind conditions and professional instruction for all levels. The beach's unique position creates perfect conditions for both beginners and advanced kiters.`,
    location: 'Mikri Vigla Beach, Naxos',
    island: 'Naxos',
    duration: '3 hours',
    price: {
      amount: 80,
      currency: 'EUR',
      display: '€80'
    },
    included: [
      'Equipment Rental',
      'Professional Instructor',
      'Safety Gear',
      'Theory Lesson',
      'Insurance'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'June to September',
    images: {
      main: '/images/activities/mikri-vigla-kitesurfing-main.jpg',
      gallery: [
        '/images/activities/mikri-vigla-kitesurfing-1.jpg',
        '/images/activities/mikri-vigla-kitesurfing-2.jpg',
        '/images/activities/mikri-vigla-kitesurfing-3.jpg'
      ]
    },
    meetingPoint: 'Mikri Vigla Beach Watersports Center',
    seoMeta: {
      title: 'Kitesurfing Mikri Vigla Naxos - Professional Lessons',
      description: 'Experience world-class kitesurfing at Mikri Vigla Beach.',
      keywords: ['mikri vigla kitesurfing', 'naxos water sports', 'kitesurfing lessons', 'greece activities']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'paros-sailing-adventure',
    title: 'Paros Sailing Adventure',
    slug: 'paros-sailing-adventure',
    shortDescription: 'Sail around Paros and neighboring islands.',
    description: `Embark on a sailing adventure around Paros, visiting secluded beaches and hidden coves. Experience the beauty of the Cyclades from the water, with opportunities for swimming, snorkeling, and enjoying local cuisine onboard.`,
    location: 'Parikia Port, Paros',
    island: 'Paros',
    duration: '8 hours',
    price: {
      amount: 120,
      currency: 'EUR',
      display: '€120'
    },
    included: [
      'Experienced Captain',
      'Snorkeling Gear',
      'Light Lunch',
      'Drinks',
      'Safety Equipment'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to October',
    images: {
      main: '/images/activities/paros-sailing-main.jpg',
      gallery: [
        '/images/activities/paros-sailing-1.jpg',
        '/images/activities/paros-sailing-2.jpg',
        '/images/activities/paros-sailing-3.jpg'
      ]
    },
    meetingPoint: 'Parikia Port Marina',
    seoMeta: {
      title: 'Paros Sailing Tours - Island Hopping Adventure',
      description: 'Sail around Paros and neighboring islands.',
      keywords: ['paros sailing', 'island hopping', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'mykonos-windmills-tour',
    title: 'Mykonos Windmills Cultural Tour',
    slug: 'mykonos-windmills-tour',
    shortDescription: 'Discover the iconic windmills of Mykonos.',
    description: `Explore the historic windmills of Mykonos, symbols of the island's rich history. Learn about their role in the island's economy, their architectural significance, and capture stunning photos. Tour includes visits to Kato Mili and nearby cultural sites.`,
    location: 'Mykonos Town',
    island: 'Mykonos',
    duration: '2 hours',
    price: {
      amount: 35,
      currency: 'EUR',
      display: '€35'
    },
    included: [
      'Expert Guide',
      'Historical Commentary',
      'Photo Opportunities',
      'Walking Tour',
      'Local Insights'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/mykonos-windmills-main.jpg',
      gallery: [
        '/images/activities/mykonos-windmills-1.jpg',
        '/images/activities/mykonos-windmills-2.jpg',
        '/images/activities/mykonos-windmills-3.jpg'
      ]
    },
    meetingPoint: 'Mykonos Windmills Entrance',
    seoMeta: {
      title: 'Mykonos Windmills Tour - Historic Cultural Experience',
      description: 'Discover the iconic windmills of Mykonos.',
      keywords: ['mykonos windmills', 'cultural tour', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'antiparos-water-sports',
    title: 'Antiparos Water Sports Adventure',
    slug: 'antiparos-water-sports',
    shortDescription: 'Experience thrilling water sports at Antiparos beaches.',
    description: `Enjoy a variety of water sports activities at the pristine beaches of Antiparos. Try jet skiing, wakeboarding, water skiing, or paddleboarding. Professional instruction available for all levels.`,
    location: 'Various Beaches, Antiparos',
    island: 'Antiparos',
    duration: 'Flexible',
    price: {
      amount: 70,
      currency: 'EUR',
      display: '€70'
    },
    included: [
      'Equipment Rental',
      'Safety Briefing',
      'Professional Instruction',
      'Insurance',
      'Beach Facilities'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to October',
    images: {
      main: '/images/activities/antiparos-watersports-main.jpg',
      gallery: [
        '/images/activities/antiparos-watersports-1.jpg',
        '/images/activities/antiparos-watersports-2.jpg',
        '/images/activities/antiparos-watersports-3.jpg'
      ]
    },
    meetingPoint: 'Antiparos Watersports Center',
    seoMeta: {
      title: 'Antiparos Water Sports - Beach Activities & Adventures',
      description: 'Experience thrilling water sports at Antiparos beaches.',
      keywords: ['antiparos water sports', 'beach activities', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'apollonia-shopping-cultural',
    title: 'Apollonia Shopping & Cultural Tour',
    slug: 'apollonia-shopping-cultural',
    shortDescription: 'Explore the charming shops and culture of Apollonia.',
    description: `Discover the traditional shopping streets of Apollonia, Sifnos's capital. Visit local artisan workshops, jewelry stores, and boutiques while learning about the island's cultural heritage.`,
    location: 'Apollonia, Sifnos',
    island: 'Sifnos',
    duration: '3 hours',
    price: {
      amount: 40,
      currency: 'EUR',
      display: '€40'
    },
    included: [
      'Local Guide',
      'Cultural Commentary',
      'Artisan Visits',
      'Traditional Snack',
      'Shopping Map'
    ],
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    images: {
      main: '/images/activities/apollonia-shopping-main.jpg',
      gallery: [
        '/images/activities/apollonia-shopping-1.jpg',
        '/images/activities/apollonia-shopping-2.jpg',
        '/images/activities/apollonia-shopping-3.jpg'
      ]
    },
    meetingPoint: 'Apollonia Town Center',
    seoMeta: {
      title: 'Apollonia Shopping Tour - Traditional Sifnos Experience',
      description: 'Explore the charming shops and culture of Apollonia.',
      keywords: ['apollonia shopping', 'cultural tour', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined,
    bookingNotice: 'No booking required',
    cancellationPolicy: 'Not applicable - free activity'
  },
  {
    id: 'paros-kitesurfing',
    title: 'Paros Kitesurfing Adventure',
    slug: 'paros-kitesurfing',
    shortDescription: 'Learn kitesurfing at the best spots in Paros.',
    description: `Experience the thrill of kitesurfing at Paros's premier spots. Professional instruction available for all levels, from beginners to advanced riders. Equipment rental and safety gear included.`,
    location: 'New Golden Beach, Paros',
    island: 'Paros',
    duration: '3 hours',
    price: {
      amount: 85,
      currency: 'EUR',
      display: '€85'
    },
    included: [
      'Equipment Rental',
      'Professional Instructor',
      'Safety Gear',
      'Theory Lesson',
      'Practice Session'
    ],
    category: ActivityCategory.WaterSports,
    difficulty: ActivityDifficulty.Intermediate,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'June to September',
    images: {
      main: '/images/activities/paros-kitesurfing-main.jpg',
      gallery: [
        '/images/activities/paros-kitesurfing-1.jpg',
        '/images/activities/paros-kitesurfing-2.jpg',
        '/images/activities/paros-kitesurfing-3.jpg'
      ]
    },
    meetingPoint: 'Pounda Beach Kitesurfing Center',
    seoMeta: {
      title: 'Paros Kitesurfing Lessons - Professional Instruction',
      description: 'Learn kitesurfing at the best spots in Paros.',
      keywords: ['paros kitesurfing', 'kitesurfing lessons', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'mykonos-beach-hopping-tour',
    title: 'Mykonos Beach Hopping Tour',
    slug: 'mykonos-beach-hopping-tour',
    shortDescription: 'Discover the best beaches of Mykonos.',
    description: `Visit the most beautiful beaches of Mykonos in one day. Tour includes stops at Paradise Beach, Super Paradise, Elia, and Agios Ioannis. Transportation, refreshments, and beach facilities included.`,
    location: 'Various Locations, Mykonos',
    island: 'Mykonos',
    duration: '6 hours',
    price: {
      amount: 75,
      currency: 'EUR',
      display: '€75'
    },
    included: [
      'Transportation',
      'Beach Facilities',
      'Refreshments',
      'Local Guide',
      'Beach Map'
    ],
    category: ActivityCategory.Beach,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'May to October',
    images: {
      main: '/images/activities/mykonos-beaches-main.jpg',
      gallery: [
        '/images/activities/mykonos-beaches-1.jpg',
        '/images/activities/mykonos-beaches-2.jpg',
        '/images/activities/mykonos-beaches-3.jpg'
      ]
    },
    meetingPoint: 'Mykonos Town Bus Station',
    seoMeta: {
      title: 'Mykonos Beach Hopping - Best Beaches Tour',
      description: 'Discover the best beaches of Mykonos.',
      keywords: ['mykonos beach hopping', 'best beaches', 'greece activities', 'cyclades']
    },
    rating: undefined,
    reviews: undefined
  },
  {
    id: 'santorini-cooking-class',
    title: 'Traditional Greek Cooking Class in Santorini',
    slug: 'santorini-cooking-class',
    shortDescription: 'Master the art of Greek cuisine in a traditional Santorini setting with spectacular caldera views.',
    description: 'Join our expert local chef for an immersive cooking experience in a traditional Santorini setting. Learn to prepare authentic Greek dishes using fresh, local ingredients while enjoying breathtaking caldera views. You\'ll master classic recipes like moussaka, dolmades, and baklava, discovering the secrets of Mediterranean cooking. The class concludes with a feast of your creations paired with local wines.',
    location: 'Imerovigli, Santorini',
    island: 'Santorini',
    duration: '4 hours',
    price: {
      amount: 95,
      currency: 'EUR',
      display: '€95'
    },
    included: [
      'All cooking ingredients',
      'Recipe booklet',
      'Wine tasting',
      'Full meal of prepared dishes',
      'Cooking apron to take home',
      'Local wine and beverages',
      'Photos of the experience'
    ],
    notIncluded: [
      'Hotel transfer',
      'Additional wine bottles',
      'Gratuities'
    ],
    highlights: [
      'Hands-on cooking experience',
      'Traditional Greek recipes',
      'Caldera view setting',
      'Wine pairing session',
      'Small group size',
      'Take-home recipe booklet',
      'Fresh, local ingredients'
    ],
    images: {
      main: '/images/activities/santorini-cooking-main.jpg',
      gallery: [
        '/images/activities/santorini-cooking-1.jpg',
        '/images/activities/santorini-cooking-2.jpg',
        '/images/activities/santorini-cooking-3.jpg',
        '/images/activities/santorini-cooking-4.jpg'
      ]
    },
    category: ActivityCategory.Food,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    minParticipants: 2,
    maxGroupSize: 8,
    bookingNotice: 'Book at least 48 hours in advance',
    cancellationPolicy: 'Free cancellation up to 48 hours before the start',
    meetingPoint: 'Imerovigli Traditional Kitchen (exact address provided after booking)',
    requirements: [
      'No cooking experience needed',
      'Notify of any dietary restrictions',
      'Comfortable shoes',
      'Bring your camera',
      'Must be 18+ for wine tasting'
    ],
    tags: ['cooking', 'food', 'wine', 'cultural', 'local-cuisine'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Cooking apron',
      'All utensils',
      'Ingredients',
      'Recipe booklet',
      'Safety equipment'
    ],
    startTimes: ['10:00', '16:00'],
    rating: {
      overall: 4.9,
      totalReviews: 245
    },
    reviews: [
      {
        author: 'Maria L.',
        rating: 5,
        date: '2024-12-08',
        comment: 'Amazing experience! The chef was so knowledgeable and the food we made was incredible. The view made it even more special.'
      },
      {
        author: 'James K.',
        rating: 5,
        date: '2024-12-05',
        comment: 'Best activity in Santorini! Learned so much about Greek cooking and the wine pairing was perfect.'
      },
      {
        author: 'Sophie R.',
        rating: 4,
        date: '2024-12-01',
        comment: 'Great class with stunning views. The recipes were easy to follow and I can\'t wait to make them at home.'
      }
    ]
  },
  {
    id: 'naxos-mountain-villages',
    title: 'Naxos Mountain Villages Discovery Tour',
    slug: 'naxos-mountain-villages',
    shortDescription: 'Explore the authentic mountain villages of Naxos and experience traditional Cycladic life.',
    description: 'Journey through the heart of Naxos to discover its picturesque mountain villages, each with its own unique character and charm. Visit Halki, the former capital, with its neoclassical mansions, Apiranthos with its marble streets, and other hidden gems. Experience local culture, taste traditional products, and learn about village life from residents. This tour offers an authentic glimpse into the island\'s rich cultural heritage.',
    location: 'Mountain Villages, Naxos',
    island: 'Naxos',
    duration: '8 hours',
    price: {
      amount: 75,
      currency: 'EUR',
      display: '€75'
    },
    included: [
      'Expert local guide',
      'Transportation between villages',
      'Traditional lunch',
      'Local product tastings',
      'Village maps',
      'Bottled water',
      'Cultural demonstrations'
    ],
    notIncluded: [
      'Hotel pickup and drop-off',
      'Additional food and drinks',
      'Personal purchases',
      'Gratuities',
      'Museum entrance fees'
    ],
    highlights: [
      'Visit historic Halki village',
      'Explore marble-built Apiranthos',
      'Traditional product tastings',
      'Meet local artisans',
      'Visit Byzantine churches',
      'Mountain landscapes',
      'Authentic village lunch'
    ],
    images: {
      main: '/images/activities/naxos-villages-main.jpg',
      gallery: [
        '/images/activities/naxos-villages-1.jpg',
        '/images/activities/naxos-villages-2.jpg',
        '/images/activities/naxos-villages-3.jpg',
        '/images/activities/naxos-villages-4.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    minParticipants: 2,
    maxGroupSize: 8,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Naxos Town Main Square',
    requirements: [
      'Comfortable walking shoes',
      'Sun protection',
      'Light jacket (in spring/autumn)',
      'Camera recommended',
      'Suitable for all ages'
    ],
    tags: ['villages', 'culture', 'food', 'history', 'traditional'],
    languages: ['English', 'Greek', 'French'],
    providedEquipment: [
      'Village maps',
      'Information booklet',
      'Bottled water',
      'Audio guide system'
    ],
    startTimes: ['09:00'],
    rating: {
      overall: 4.9,
      totalReviews: 167
    },
    reviews: [
      {
        author: 'Catherine D.',
        rating: 5,
        date: '2024-11-18',
        comment: 'A wonderful way to experience authentic Greek village life. The local interactions and food were highlights!'
      },
      {
        author: 'Stefan M.',
        rating: 5,
        date: '2024-11-13',
        comment: 'Fascinating tour of traditional villages. Apiranthos was particularly beautiful with its marble streets.'
      },
      {
        author: 'Anna P.',
        rating: 4,
        date: '2024-11-08',
        comment: 'Great cultural experience. The guide was very knowledgeable and the village lunch was delicious.'
      }
    ]
  },
  {
    id: 'santorini-wine-tasting',
    title: 'Santorini Wine Tasting & Vineyard Tour',
    slug: 'santorini-wine-tasting',
    shortDescription: 'Discover Santorini\'s unique wine heritage with visits to traditional wineries and volcanic vineyards.',
    description: 'Experience the unique wine culture of Santorini on this comprehensive wine tour. Visit three of the island\'s most prestigious wineries and learn about the unique viticulture methods that have been practiced here for centuries. Discover how Santorini\'s volcanic soil and special "kouloura" vine-training system create distinctive wines, especially the famous Assyrtiko variety.',
    location: 'Various locations in Santorini',
    island: 'Santorini',
    duration: '4.5 hours',
    price: {
      amount: 135,
      currency: 'EUR',
      display: '€135'
    },
    included: [
      'Wine tasting at 3 wineries',
      'Professional sommelier guide',
      'Local cheese and snacks',
      'Hotel pickup and drop-off',
      'All tasting fees',
      'Bottled water'
    ],
    notIncluded: [
      'Additional food',
      'Personal purchases',
      'Gratuities'
    ],
    highlights: [
      'Visit 3 traditional wineries',
      'Learn about volcanic viticulture',
      'Taste rare indigenous varieties',
      'Traditional wine-making methods',
      'Spectacular vineyard views',
      'Expert sommelier guidance',
      'Local food pairings'
    ],
    images: {
      main: '/images/activities/santorini-wine-main.jpg',
      gallery: [
        '/images/activities/santorini-wine-1.jpg',
        '/images/activities/santorini-wine-2.jpg',
        '/images/activities/santorini-wine-3.jpg',
        '/images/activities/santorini-wine-4.jpg'
      ]
    },
    category: ActivityCategory.Food,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    minParticipants: 2,
    maxGroupSize: 8,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Your Santorini hotel',
    requirements: [
      'Must be 18+ to participate',
      'Comfortable walking shoes',
      'Sunscreen recommended',
      'Camera optional'
    ],
    tags: ['wine', 'food', 'cultural', 'tasting', 'vineyard'],
    languages: ['English', 'Greek', 'French', 'German'],
    providedEquipment: [
      'Wine tasting glasses',
      'Tasting notes',
      'Bottled water'
    ],
    startTimes: ['10:00', '15:00'],
    rating: {
      overall: 4.8,
      totalReviews: 312
    },
    reviews: [
      {
        author: 'Michael R.',
        rating: 5,
        date: '2024-12-10',
        comment: 'Exceptional wine tour! The sommelier was incredibly knowledgeable and the wines were outstanding.'
      },
      {
        author: 'Lisa K.',
        rating: 5,
        date: '2024-12-07',
        comment: 'Learned so much about Santorini\'s unique wine-making methods. The Assyrtiko was amazing!'
      },
      {
        author: 'David M.',
        rating: 4,
        date: '2024-12-05',
        comment: 'Great experience with delicious wines. The vineyard views were spectacular.'
      }
    ]
  },
  {
    id: 'oia-sunset-photography',
    title: 'Oia Sunset & Photography Tour',
    slug: 'oia-sunset-photography',
    shortDescription: 'Capture the world-famous Oia sunset and learn photography techniques from a professional.',
    description: 'Join a professional photographer for an unforgettable evening capturing the magic of Oia\'s legendary sunset. Learn composition techniques, camera settings, and the best spots for stunning photos. This tour combines photography instruction with cultural insights about Oia\'s unique architecture and history.',
    location: 'Oia, Santorini',
    island: 'Santorini',
    duration: '3 hours',
    price: {
      amount: 120,
      currency: 'EUR',
      display: '€120'
    },
    included: [
      'Professional photographer guide',
      'Photography instruction',
      'Location guidance',
      'Digital photo tips',
      'Best viewpoint access'
    ],
    notIncluded: [
      'Camera equipment',
      'Transportation',
      'Food and drinks',
      'Gratuities'
    ],
    highlights: [
      'Professional photography guidance',
      'Iconic Oia sunset views',
      'Blue dome churches',
      'Hidden photo spots',
      'Small group size',
      'Technical camera advice',
      'Cultural insights'
    ],
    images: {
      main: '/images/activities/oia-sunset-main.jpg',
      gallery: [
        '/images/activities/oia-sunset-1.jpg',
        '/images/activities/oia-sunset-2.jpg',
        '/images/activities/oia-sunset-3.jpg',
        '/images/activities/oia-sunset-4.jpg'
      ]
    },
    category: ActivityCategory.Cultural,
    difficulty: ActivityDifficulty.Easy,
    availableSeasons: ['Spring', 'Summer', 'Fall'],
    bestTime: 'Year-round',
    minParticipants: 2,
    maxGroupSize: 6,
    bookingNotice: 'Book at least 24 hours in advance',
    cancellationPolicy: 'Free cancellation up to 24 hours before the start',
    meetingPoint: 'Oia Post Office',
    requirements: [
      'Camera (DSLR, mirrorless, or smartphone)',
      'Comfortable walking shoes',
      'Light jacket (evening can be cool)',
      'Water bottle'
    ],
    tags: ['photography', 'sunset', 'cultural', 'sightseeing'],
    languages: ['English', 'Greek'],
    providedEquipment: [
      'Photography guide book',
      'Location map'
    ],
    startTimes: ['17:00'],
    rating: {
      overall: 4.9,
      totalReviews: 245
    },
    reviews: [
      {
        author: 'Sarah P.',
        rating: 5,
        date: '2024-12-09',
        comment: 'Amazing experience! Got the best sunset photos I\'ve ever taken thanks to our guide\'s expertise.'
      },
      {
        author: 'John D.',
        rating: 5,
        date: '2024-12-06',
        comment: 'Worth every penny! The guide knew all the perfect spots away from the crowds.'
      },
      {
        author: 'Emma L.',
        rating: 4,
        date: '2024-12-03',
        comment: 'Great photography tips and a beautiful sunset. Highly recommend!'
      }
    ]
  }
];

// Ensure all activities have proper images and SEO metadata
activities.forEach(activity => {
  if (!activity.images || !activity.images.main) {
    activity.images = {
      main: DEFAULT_ACTIVITY_IMAGE,
      gallery: DEFAULT_GALLERY_IMAGES
    };
  }
  
  // Ensure SEO metadata exists
  if (!activity.seoMeta) {
    activity.seoMeta = {
      title: `${activity.title} | Greece Cyclades`,
      description: activity.shortDescription,
      keywords: [
        activity.island.toLowerCase(),
        ...activity.tags || [],
        'greek islands',
        'cyclades',
        'greece activities'
      ]
    };
  }
});

export default activities;
