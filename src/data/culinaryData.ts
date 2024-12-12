import { CulinaryExperience, CulinaryCategory } from '../types/culinary';

export const culinaryData: CulinaryExperience[] = [
  {
    id: 'naxos-cheese',
    title: 'Naxos Cheese Tasting Experience',
    slug: 'naxos-cheese',
    shortDescription: 'Discover the rich dairy tradition of Naxos through artisanal cheese tasting.',
    description: `Experience the renowned cheese-making tradition of Naxos island. Visit local dairy farms and learn about the production of famous Naxos cheeses including graviera, arseniko, and xinotyro. This guided tasting includes visits to traditional cheese-making facilities and sampling of various aged cheeses paired with local wines.`,
    location: 'Various locations in Naxos',
    duration: '3 hours',
    price: {
      amount: 65,
      currency: 'EUR',
      display: '€65'
    },
    category: CulinaryCategory.Tasting,
    included: [
      'Professional guide',
      'Cheese tasting',
      'Wine pairing',
      'Local dairy farm visit',
      'Traditional cheese-making demonstration'
    ],
    bestTime: 'Year-round',
    seoMeta: {
      title: 'Naxos Cheese Tasting Tour - Traditional Greek Dairy Experience',
      description: 'Discover authentic Naxos cheese-making traditions. Taste award-winning local cheeses and learn about traditional production methods.',
      keywords: ['Naxos cheese', 'Greek cheese tasting', 'traditional dairy farm', 'graviera cheese']
    }
  },
  {
    id: 'naxos-potatoes',
    title: 'Naxos Potato Farm Experience',
    slug: 'naxos-potatoes',
    shortDescription: 'Learn about the famous Naxos potatoes and traditional farming methods.',
    description: `Discover why Naxos potatoes are considered the best in Greece. Visit local potato farms, learn about traditional farming methods, and participate in seasonal activities. The experience includes a cooking demonstration using fresh Naxos potatoes and a tasting of various potato-based dishes.`,
    location: 'Naxos Agricultural Region',
    duration: '4 hours',
    price: {
      amount: 55,
      currency: 'EUR',
      display: '€55'
    },
    category: CulinaryCategory.FarmVisit,
    included: [
      'Farm tour',
      'Cooking demonstration',
      'Potato dish tasting',
      'Local products sampling',
      'Traditional recipes'
    ],
    bestTime: 'March to November',
    seoMeta: {
      title: 'Naxos Potato Farm Tour - Traditional Greek Agriculture',
      description: 'Experience traditional potato farming in Naxos. Learn about cultivation methods and taste authentic potato dishes.',
      keywords: ['Naxos potatoes', 'Greek farming', 'agricultural tourism', 'traditional farming']
    }
  },
  {
    id: 'kitron',
    title: 'Kitron Liqueur Experience',
    slug: 'kitron',
    shortDescription: 'Discover the unique citrus liqueur of Naxos.',
    description: `Learn about Kitron, the traditional citrus liqueur unique to Naxos. Visit the Vallindras Distillery, discover the production process of this PDO product, and enjoy a guided tasting of different Kitron varieties. The experience includes historical information about this traditional drink and its significance in Naxian culture.`,
    location: 'Vallindras Distillery, Halki',
    duration: '2 hours',
    price: {
      amount: 35,
      currency: 'EUR',
      display: '€35'
    },
    category: CulinaryCategory.Tasting,
    included: [
      'Distillery tour',
      'Kitron tasting',
      'Historical presentation',
      'Production demonstration',
      'Take-home recipe booklet'
    ],
    bestTime: 'Year-round',
    seoMeta: {
      title: 'Kitron Liqueur Tasting - Traditional Naxos Spirit',
      description: 'Experience Naxos\'s traditional Kitron liqueur at Vallindras Distillery. Learn about production and taste various varieties.',
      keywords: ['Kitron liqueur', 'Naxos spirits', 'Vallindras Distillery', 'Greek drinks']
    }
  },
  {
    id: 'sifnos-cheese',
    title: 'Sifnos Cheese Making Workshop',
    slug: 'sifnos-cheese',
    shortDescription: 'Learn traditional cheese-making techniques in Sifnos.',
    description: `Immerse yourself in the traditional cheese-making culture of Sifnos. Learn how to make local cheese varieties including manoura and xino, using age-old techniques passed down through generations. The workshop includes hands-on cheese-making experience and tasting of various local cheese products.`,
    location: 'Traditional Farm, Sifnos',
    duration: '4 hours',
    price: {
      amount: 75,
      currency: 'EUR',
      display: '€75'
    },
    category: CulinaryCategory.Workshop,
    included: [
      'Cheese-making workshop',
      'All ingredients',
      'Traditional recipes',
      'Cheese tasting',
      'Take-home cheese sample'
    ],
    bestTime: 'April to October',
    seoMeta: {
      title: 'Sifnos Cheese Making Workshop - Traditional Greek Dairy',
      description: 'Learn traditional Greek cheese-making in Sifnos. Hands-on workshop with local cheese varieties and tasting.',
      keywords: ['Sifnos cheese', 'Greek cheese making', 'traditional dairy workshop', 'manoura cheese']
    }
  },
  {
    id: 'naoussa-food-tour',
    title: 'Naoussa Food & Wine Tour',
    slug: 'naoussa-food-tour',
    shortDescription: 'Discover the culinary treasures of Naoussa, Paros.',
    description: `Explore the gastronomic delights of Naoussa's charming streets. Visit traditional tavernas, sample local wines, and learn about Parian cuisine. Includes stops at local markets, wine tastings, and traditional Greek meze.`,
    location: 'Naoussa, Paros',
    duration: '4 hours',
    price: {
      amount: 85,
      currency: 'EUR',
      display: '€85'
    },
    category: CulinaryCategory.FoodTour,
    included: [
      'Food Tastings',
      'Wine Sampling',
      'Local Guide',
      'Market Visit',
      'Recipe Booklet'
    ],
    bestTime: 'Year-round',
    seoMeta: {
      title: 'Naoussa Food Tour - Paros Culinary Experience',
      description: 'Join a guided food tour in Naoussa, Paros. Sample local cuisine, wines, and traditional Greek dishes.',
      keywords: ['Naoussa food tour', 'Paros cuisine', 'Greek food tasting', 'wine tour Greece']
    }
  },
  {
    id: 'sifnos-cooking-class',
    title: 'Traditional Sifnos Cooking Class',
    slug: 'sifnos-cooking-class',
    shortDescription: 'Learn authentic Sifnian recipes in a traditional setting.',
    description: `Master the art of Sifnian cuisine in this hands-on cooking class. Learn traditional recipes using local ingredients and clay pots. Includes market visit, cooking session, and dinner with wine pairing.`,
    location: 'Artemonas, Sifnos',
    duration: '5 hours',
    price: {
      amount: 95,
      currency: 'EUR',
      display: '€95'
    },
    category: CulinaryCategory.Workshop,
    included: [
      'Market Tour',
      'Cooking Instruction',
      'All Ingredients',
      'Wine Pairing',
      'Recipe Collection'
    ],
    bestTime: 'Year-round',
    seoMeta: {
      title: 'Sifnos Cooking Class - Traditional Greek Cuisine',
      description: 'Learn traditional Greek cooking in Sifnos. Hands-on classes with local chefs and authentic recipes.',
      keywords: ['Sifnos cooking class', 'Greek cuisine workshop', 'cooking lessons Greece', 'traditional recipes']
    }
  }
];
