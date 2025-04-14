import { IslandActivity, AvailableMonth, IslandVibe, Island, IslandGuide, STAY_DURATION } from '../types/island';

export const mainPorts = [
  'Piraeus (Athens)',
  'Rafina',
  'Lavrio'
];

// This array is used for the port selection dropdown
export const cyclades: Partial<Island>[] = [
  {
    id: '1',
    name: 'Santorini',
    description: 'Santorini, the crown jewel of the Cyclades, is a masterpiece of natural beauty and human architecture. Rising dramatically from the Aegean Sea, its iconic caldera was formed by one of the largest volcanic eruptions in history. The island\'s whitewashed, cubic buildings perch dramatically on multicolored cliffs, creating a stunning contrast against the deep blue sea. Beyond its famous sunsets and caldera views, Santorini offers unique experiences like swimming in volcanic hot springs, exploring ancient Akrotiri (a prehistoric city preserved in volcanic ash), and tasting distinctive wines from grapes grown in volcanic soil. The island\'s unique architecture, with cave houses carved into the cliffs, reflects centuries of adaptation to the volcanic landscape. From the bustling capital of Fira to the romantic village of Oia, each settlement offers its own charm while maintaining the island\'s distinctive Cycladic character.',
    shortDescription: 'Iconic sunsets and caldera views',
    quote: 'Where romance meets volcanic beauty',
    metaDescription: 'Plan your perfect Santorini vacation with our comprehensive guide to the best sunset spots, beaches, and activities.',
    image: '/images/islands/santorini.jpg',
    heroImage: '/images/islands/santorini.jpg',
    highlights: [
      'Caldera views',
      'Sunset in Oia',
      'Volcanic beaches',
      'Wine tasting',
      'Ancient Akrotiri'
    ],
    weather: {
      temp: 27,
      condition: 'sunny',
      summer: 'Hot and dry with temperatures around 27-32°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    activities: [
      'sunset-watching',
      'wine-tasting',
      'swimming',
      'photography',
      'hiking',
      'boat-tours'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect weather with fewer crowds'
    },
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Oia Sunset',
      'Caldera View',
      'Red Beach',
      'Ancient Akrotiri',
      'Fira to Oia Hike'
    ],
    vibes: [
      IslandVibe.ROMANTIC,
      IslandVibe.SCENIC,
      IslandVibe.LUXURIOUS
    ],
    size: 'MAJOR',
    slug: 'santorini',
    ports: ['Athinios Port', 'Old Port'],
    idealFor: [
      'Couples',
      'Photographers',
      'Wine lovers',
      'Luxury travelers'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Every 30 minutes in peak season',
        routes: [
          'Fira - Oia',
          'Fira - Perissa',
          'Fira - Akrotiri',
          'Airport - Fira'
        ]
      },
      facilities: {
        atm: 'Available in all major towns',
        medicalCenter: 'Santorini General Hospital in Fira',
        miniMarket: 'Available in all villages',
        postOffice: 'Main office in Fira, branches in Oia and Emporio'
      }
    },
    contacts: {
      portAuthority: '+30 22860 22239',
      medicalCenter: '+30 22860 35300',
      municipality: '+30 22863 60100',
      policeStation: '+30 22860 22649',
      localBus: '+30 22860 25404',
      citizenService: '+30 22860 23823'
    },
    connectedIslands: {
      direct: [
        'Mykonos',
        'Naxos',
        'Paros',
        'Ios',
        'Milos',
        'Thirasia'
      ],
      nearby: [
        'Anafi',
        'Folegandros',
        'Sikinos'
      ]
    }
  } as Island,
  { 
    id: '2',
    name: 'Mykonos',
    description: 'Mykonos, the glamorous star of the Aegean, seamlessly blends traditional Cycladic charm with cosmopolitan luxury. The island\'s landscape is a captivating mix of windswept hills, iconic windmills, and pristine beaches. Its main town, Chora, is a picturesque maze of narrow marble streets, whitewashed houses with colorful doors, and purple bougainvillea cascading from balconies. The island\'s legendary nightlife and beach clubs attract celebrities and party-lovers, while its quieter corners still preserve authentic Greek island life. Little Venice, with its medieval houses built right on the sea\'s edge, offers some of the most romantic sunset views in the Cyclades. The island\'s beaches range from popular party spots to secluded coves, while its restaurants serve everything from traditional Greek cuisine to world-class fine dining. Despite its reputation for luxury and nightlife, Mykonos maintains its traditional soul through its historic churches, local crafts, and warm island hospitality.',
    shortDescription: 'Cosmopolitan paradise with vibrant nightlife',
    quote: 'The island that never sleeps',
    metaDescription: 'Experience the magic of Mykonos. From pristine beaches and vibrant nightlife to traditional charm.',
    image: '/images/islands/mykonos.jpg',
    heroImage: '/images/islands/mykonos.jpg',
    highlights: [
      'Little Venice',
      'Windmills',
      'Paradise Beach',
      'Chora nightlife',
      'Beach clubs'
    ],
    weather: {
      temp: 28,
      condition: 'sunny',
      summer: 'Hot and dry with temperatures around 28-32°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    activities: [
      'swimming',
      'nightlife',
      'beach-clubs',
      'water-sports',
      'shopping',
      'sightseeing'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.JUNE,
        AvailableMonth.JULY,
        AvailableMonth.AUGUST,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Peak season for beach clubs and nightlife'
    },
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Little Venice',
      'Windmills',
      'Paradise Beach',
      'Super Paradise Beach',
      'Delos Island'
    ],
    vibes: [
      IslandVibe.COSMOPOLITAN,
      IslandVibe.PARTY,
      IslandVibe.LUXURIOUS
    ],
    size: 'MAJOR',
    slug: 'mykonos',
    ports: ['New Port', 'Old Port'],
    idealFor: [
      'Party lovers',
      'Luxury travelers',
      'Beach club enthusiasts',
      'Shopping fans'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Every 30 minutes in peak season',
        routes: [
          'Mykonos Town - Paradise Beach',
          'Mykonos Town - Super Paradise',
          'Mykonos Town - Platis Gialos',
          'Mykonos Town - Ornos',
          'Airport - Mykonos Town'
        ]
      },
      facilities: {
        atm: 'Available throughout Mykonos Town and major beaches',
        medicalCenter: 'Mykonos Health Center in Mykonos Town',
        miniMarket: 'Available in all tourist areas',
        postOffice: 'Main office in Mykonos Town'
      }
    },
    contacts: {
      portAuthority: '+30 22890 22218',
      medicalCenter: '+30 22890 23998',
      municipality: '+30 22890 23261',
      policeStation: '+30 22890 22716',
      localBus: '+30 22890 23360',
      citizenService: '+30 22890 28933'
    },
    connectedIslands: {
      direct: [
        'Santorini',
        'Naxos',
        'Paros',
        'Syros',
        'Tinos'
      ],
      nearby: [
        'Delos',
        'Rhenia',
        'Andros'
      ]
    }
  } as Island,
  { 
    id: '3',
    name: 'Naxos',
    description: 'Naxos, the largest and most fertile of the Cyclades, is a diverse island that perfectly balances traditional Greek life with modern tourism. The island\'s rich mythology claims it as the childhood home of Zeus and the place where Theseus abandoned Ariadne. Its most iconic landmark, the Portara (Apollo\'s Gate), stands as a massive marble doorway to nowhere, greeting visitors as they enter the harbor. The island\'s interior is a tapestry of olive groves, vineyards, and traditional mountain villages, each preserving its unique customs and architecture. The western coast boasts some of the finest beaches in the Cyclades, with golden sand and crystal-clear waters perfect for windsurfing. Naxos\'s culinary scene is renowned for its local products, including its famous potatoes, kitron liqueur, and various cheeses. The island\'s medieval Kastro area in Naxos Town offers a fascinating glimpse into the island\'s Venetian past, while the ancient kouros statues lying unfinished in ancient quarries tell tales of the island\'s ancient marble-working heritage.',
    shortDescription: 'Largest Cycladic island with diverse attractions',
    quote: 'Where mountains meet beaches',
    metaDescription: 'Discover the largest Cycladic island. From pristine beaches to mountain villages, experience the authentic Greek island life.',
    image: '/images/islands/naxos.jpg',
    heroImage: '/images/islands/naxos.jpg',
    highlights: [
      'Portara',
      'St. George Beach',
      'Mountain villages',
      'Ancient temples',
      'Local products'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and pleasant around 26-30°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    activities: [
      'swimming',
      'hiking',
      'windsurfing',
      'village-exploring',
      'local-cuisine'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect weather for both beaches and hiking'
    },
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Portara',
      'Plaka Beach',
      'Halki Village',
      'Temple of Demeter',
      'Mount Zeus'
    ],
    vibes: [
      IslandVibe.TRADITIONAL,
      IslandVibe.ACTIVE,
      IslandVibe.FAMILY_FRIENDLY
    ],
    size: 'MAJOR',
    slug: 'naxos',
    ports: ['Naxos Port'],
    idealFor: [
      'Families',
      'Active travelers',
      'Food lovers',
      'Beach enthusiasts'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Regular service during peak season',
        routes: [
          'Naxos Town - Plaka Beach',
          'Naxos Town - Agia Anna',
          'Naxos Town - Apollonas',
          'Naxos Town - Halki',
          'Airport - Naxos Town'
        ]
      },
      facilities: {
        atm: 'Available in Naxos Town and major villages',
        medicalCenter: 'Naxos General Hospital',
        miniMarket: 'Available in most villages',
        postOffice: 'Main office in Naxos Town, branches in larger villages'
      }
    },
    contacts: {
      portAuthority: '+30 22850 22300',
      medicalCenter: '+30 22853 60500',
      municipality: '+30 22853 60100',
      policeStation: '+30 22850 22100',
      localBus: '+30 22850 24910',
      citizenService: '+30 22850 29165'
    },
    connectedIslands: {
      direct: [
        'Santorini',
        'Mykonos',
        'Paros',
        'Ios',
        'Small Cyclades'
      ],
      nearby: [
        'Koufonisia',
        'Iraklia',
        'Schinoussa',
        'Donousa'
      ]
    }
  } as Island,
  { 
    id: '4',
    name: 'Paros',
    description: 'Paros, sitting at the heart of the Cyclades, is an island that masterfully balances cosmopolitan flair with traditional Greek island life. Famous since antiquity for its fine white marble, used in masterpieces like the Venus de Milo and Napoleon\'s tomb, the island continues to charm visitors with its elegant architecture and golden beaches. The main town of Parikia, built around an impressive Venetian castle, welcomes visitors with its vibrant waterfront and maze-like old town. In the island\'s interior, the mountain village of Lefkes offers a glimpse into traditional Cycladic life with its white-washed houses and marble-paved paths. The fishing village of Naoussa, with its picturesque old port and Venetian fortress, has evolved into one of the most sophisticated destinations in the Cyclades, offering high-end dining and shopping while maintaining its authentic character. The island is a watersports paradise, particularly for windsurfing and kitesurfing at Golden Beach and New Golden Beach. The island\'s network of walking trails, including old miners\' paths, leads to hidden chapels, abandoned mines, and breathtaking viewpoints. Despite growing tourism, Paros maintains its authentic character, with traditional tavernas serving local specialties like wine from the Moraitis winery and traditional dishes such as gouna (sun-dried mackerel). The island\'s commitment to sustainable tourism and preservation of its natural beauty makes it a perfect destination for those seeking an authentic Cycladic experience.',
    shortDescription: 'Perfect blend of tradition and modernity',
    quote: 'The heart of the Cyclades',
    metaDescription: 'Explore Paros island, offering the perfect mix of traditional charm and modern amenities.',
    image: '/images/islands/paros.jpg',
    heroImage: '/images/islands/paros.jpg',
    highlights: [
      'Naoussa town',
      'Golden Beach',
      'Parikia old town',
      'Water sports',
      'Byzantine route'
    ],
    weather: {
      temp: 27,
      condition: 'sunny',
      summer: 'Warm and sunny around 27-31°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    activities: [
      'swimming',
      'windsurfing',
      'kitesurfing',
      'hiking',
      'nightlife'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect conditions for water sports and sightseeing'
    },
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Naoussa',
      'Golden Beach',
      'Panagia Ekatontapiliani',
      'Lefkes',
      'Santa Maria'
    ],
    vibes: [
      IslandVibe.ACTIVE,
      IslandVibe.TRADITIONAL,
      IslandVibe.VIBRANT
    ],
    size: 'MAJOR',
    slug: 'paros',
    ports: ['Parikia Port'],
    idealFor: [
      'Water sports enthusiasts',
      'Young couples',
      'Families',
      'Active travelers'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Regular service every hour in peak season',
        routes: [
          'Parikia - Naoussa',
          'Parikia - Golden Beach',
          'Parikia - Lefkes',
          'Parikia - Aliki',
          'Airport - Parikia'
        ]
      },
      facilities: {
        atm: 'Available in Parikia, Naoussa, and major tourist areas',
        medicalCenter: 'Paros Health Center in Parikia',
        miniMarket: 'Available in all villages',
        postOffice: 'Main office in Parikia, branch in Naoussa'
      }
    },
    contacts: {
      portAuthority: '+30 22840 21240',
      medicalCenter: '+30 22840 22000',
      municipality: '+30 22843 60100',
      policeStation: '+30 22840 23333',
      localBus: '+30 22840 21530',
      citizenService: '+30 22840 21751'
    },
    connectedIslands: {
      direct: [
        'Santorini',
        'Mykonos',
        'Naxos',
        'Ios',
        'Antiparos'
      ],
      nearby: [
        'Syros',
        'Sifnos',
        'Small Cyclades'
      ]
    }
  } as Island,
  { 
    id: '5',
    name: 'Milos',
    description: 'Milos, the island of colors, is a volcanic wonderland that captivates visitors with its otherworldly landscapes and rich history. Famous as the discovery site of the Venus de Milo statue, the island boasts over 70 unique beaches, each with its own character and geological formation. The island\'s lunar-like Sarakiniko beach, with its smooth white volcanic rocks, stands as one of the most photographed locations in the Cyclades. The island\'s volcanic past has blessed it with a spectacular coastline of colorful cliffs, hot springs, and unique formations like the Kleftiko caves, once a pirates\' hideout. Traditional fishing villages like Klima, with their "syrmata" (boat garages with living quarters above), paint a picturesque scene with their multicolored doors reflecting in the sea. The island\'s mining history is evident in the abandoned mines and loading bridges at Megalo Livadi, telling stories of its industrial past. Milos\'s 72 beaches, many accessible only by boat or foot, range from the organized Livadi Beach to secluded coves like Ganema and Kalo Ambeli. The island\'s network of walking trails, including old miners\' paths, leads to hidden chapels, abandoned mines, and breathtaking viewpoints. Despite growing tourism, Milos maintains its authentic character, with traditional tavernas serving local specialties like "pitarakia" (cheese pies) and fresh seafood, making it a paradise for both adventure seekers and food lovers.',
    shortDescription: 'Volcanic island with colorful beaches',
    quote: 'Where colors meet the sea',
    metaDescription: 'Explore the volcanic island of Milos. Discover its colorful beaches, ancient catacombs, and traditional fishing villages.',
    activities: [
      'swimming',
      'boat-tours',
      'kayaking',
      'photography',
      'geological-tours',
      'local-cuisine'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect for beach exploration and boat tours'
    },
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Sarakiniko Beach',
      'Kleftiko',
      'Plaka',
      'Catacombs',
      'Firiplaka Beach'
    ],
    image: '/images/islands/milos.jpg',
    heroImage: '/images/islands/milos.jpg',
    vibes: [
      IslandVibe.SCENIC,
      IslandVibe.ROMANTIC,
      IslandVibe.AUTHENTIC,
      IslandVibe.ADVENTUROUS
    ],
    size: 'MAJOR',
    slug: 'milos',
    ports: ['Adamas Port'],
    highlights: [
      'Lunar landscapes',
      'Colorful fishing villages',
      'Unique volcanic beaches',
      'Ancient history'
    ],
    weather: {
      temp: 26,
      condition: 'Sunny with sea breeze',
      summer: 'Hot and dry with temperatures around 26-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and warm, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    idealFor: [
      'Couples',
      'Photographers',
      'Beach lovers',
      'Adventure seekers'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Regular service during summer season',
        routes: [
          'Adamas - Plaka',
          'Adamas - Pollonia',
          'Adamas - Paliochori',
          'Adamas - Provatas',
          'Airport - Adamas'
        ]
      },
      facilities: {
        atm: 'Available in Adamas and Plaka',
        medicalCenter: 'Milos Health Center in Plaka',
        miniMarket: 'Available in main villages',
        postOffice: 'Main office in Adamas'
      }
    },
    contacts: {
      portAuthority: '+30 22870 23360',
      medicalCenter: '+30 22870 22700',
      municipality: '+30 22873 60100',
      policeStation: '+30 22870 21378',
      localBus: '+30 22870 21427',
      citizenService: '+30 22870 28210'
    },
    connectedIslands: {
      direct: [
        'Santorini',
        'Piraeus',
        'Kimolos',
        'Sifnos'
      ],
      nearby: [
        'Folegandros',
        'Serifos',
        'Kimolos'
      ]
    }
  } as Island,
  { 
    id: '6',
    name: 'Ios',
    description: 'Ios, a vibrant island in the Cyclades, is known for its stunning beaches, vibrant nightlife, and picturesque whitewashed houses. The island\'s main village, Chora, is a maze of narrow streets and alleys, filled with shops, restaurants, and bars. The island\'s beaches, such as Mylopotas and Maganari, are popular spots for swimming and water sports. Ios is also home to the famous Homer\'s Tomb, a historic site that attracts visitors from all over the world.',
    shortDescription: 'Vibrant island with stunning beaches and nightlife',
    quote: 'Where the party never stops',
    metaDescription: 'Experience the vibrant island of Ios. From stunning beaches to vibrant nightlife, discover the best of the Cyclades.',
    image: '/images/islands/ios.jpg',
    heroImage: '/images/islands/ios.jpg',
    highlights: [
      'Mylopotas Beach',
      'Maganari Beach',
      'Homer\'s Tomb',
      'Chora Village',
      'Nightlife'
    ],
    weather: {
      temp: 27,
      condition: 'sunny',
      summer: 'Hot and dry with temperatures around 27-32°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    activities: [
      'swimming',
      'water-sports',
      'nightlife',
      'sightseeing',
      'beach-hopping'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.JUNE,
        AvailableMonth.JULY,
        AvailableMonth.AUGUST,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Peak season for beach activities and nightlife'
    },
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Mylopotas Beach',
      'Maganari Beach',
      'Homer\'s Tomb',
      'Chora Village',
      'Skarkos Hill'
    ],
    vibes: [
      IslandVibe.PARTY,
      IslandVibe.VIBRANT,
      IslandVibe.YOUTHFUL,
      IslandVibe.LIVELY
    ],
    size: 'MAJOR',
    slug: 'ios',
    ports: ['Ios Port'],
    idealFor: [
      'Young travelers',
      'Party lovers',
      'Beach enthusiasts',
      'History buffs'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Regular service during summer season',
        routes: [
          'Ios Port - Chora',
          'Chora - Mylopotas Beach',
          'Chora - Manganari Beach',
          'Port - Far Out Beach Club'
        ]
      },
      facilities: {
        atm: 'Available in Chora and Port area',
        medicalCenter: 'Regional Medical Center in Chora',
        miniMarket: 'Available in Chora and beach areas',
        postOffice: 'Main office in Chora'
      }
    },
    contacts: {
      portAuthority: '+30 22860 91264',
      medicalCenter: '+30 22860 91227',
      municipality: '+30 22863 60400',
      policeStation: '+30 22860 91222',
      localBus: '+30 22860 91223',
      citizenService: '+30 22860 91239'
    },
    connectedIslands: {
      direct: [
        'Santorini',
        'Naxos',
        'Paros',
        'Milos'
      ],
      nearby: [
        'Sikinos',
        'Folegandros',
        'Small Cyclades'
      ]
    }
  } as Island,
  { 
    id: '7',
    name: 'Sifnos',
    description: 'Sifnos, the gastronomic capital of the Cyclades, is an island where culinary tradition meets architectural elegance. The island\'s rich clay deposits have fostered a long tradition of pottery making, evident in its distinctive chimney pots and the earthenware casseroles used in its famous slow-cooked recipes. The medieval village of Kastro, built on top of an ancient acropolis, stands as a remarkable example of continuous habitation from ancient times, with its walls incorporating ancient marble columns and architectural elements. The island\'s 227 churches, many with blue domes and whitewashed walls, dot the landscape and come alive during traditional festivals. Apollonia, the island\'s capital, comes alive at night with its string of bars and restaurants along the "Steno" (narrow street). The island\'s network of ancient stone paths, recently restored, connects traditional settlements through a landscape of olive groves, almond trees, and wild herbs. Sifnos\'s beaches range from organized sandy stretches to secluded coves, while its pottery workshops and cooking classes offer visitors a chance to engage with local traditions. The island\'s culinary heritage, featuring dishes like revithada (chickpea soup) and mastelo (lamb or goat baked in red wine), has influenced Greek cuisine far beyond its shores.',
    shortDescription: 'Culinary paradise with traditional charm',
    quote: 'Where flavors meet tradition',
    metaDescription: 'Discover the culinary capital of the Cyclades. From traditional pottery to exquisite local cuisine, experience the authentic Greek island life.',
    activities: [
      'cooking-classes',
      'hiking',
      'swimming',
      'pottery-workshops',
      'cultural-tours',
      'local-cuisine'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect for culinary experiences and hiking'
    },
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Kastro',
      'Apollonia',
      'Chrysopigi Monastery',
      'Vathi Beach',
      'Traditional Pottery Workshops'
    ],
    image: '/images/islands/sifnos.jpg',
    heroImage: '/images/islands/sifnos.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.CULTURAL,
      IslandVibe.ROMANTIC,
      IslandVibe.CULINARY
    ],
    size: 'MEDIUM',
    slug: 'sifnos',
    ports: ['Kamares Port'],
    highlights: [
      'Exceptional local cuisine',
      'Traditional pottery',
      'Medieval villages',
      'Hiking trails'
    ],
    weather: {
      temp: 25,
      condition: 'Sunny with mild winds',
      summer: 'Warm and pleasant with temperatures around 25-29°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and green, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    idealFor: [
      'Food lovers',
      'Culture enthusiasts',
      'Hikers',
      'Couples'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Regular service connecting main villages',
        routes: [
          'Kamares - Apollonia',
          'Apollonia - Platis Gialos',
          'Apollonia - Vathi',
          'Apollonia - Kastro',
          'Apollonia - Cherronisos'
        ]
      },
      facilities: {
        atm: 'Available in Apollonia and Kamares',
        medicalCenter: 'Regional Medical Center in Apollonia',
        miniMarket: 'Available in main villages',
        postOffice: 'Main office in Apollonia'
      }
    },
    contacts: {
      portAuthority: '+30 22840 31617',
      medicalCenter: '+30 22840 31315',
      municipality: '+30 22843 60325',
      policeStation: '+30 22840 31210',
      localBus: '+30 22840 31364',
      citizenService: '+30 22840 31213'
    },
    connectedIslands: {
      direct: [
        'Milos',
        'Piraeus',
        'Serifos',
        'Kimolos'
      ],
      nearby: [
        'Paros',
        'Folegandros',
        'Antiparos'
      ]
    }
  } as Island,
  { 
    id: '8',
    name: 'Amorgos',
    description: 'A dramatic island of steep cliffs and traditional villages, offering a perfect blend of natural beauty and authentic Greek charm',
    shortDescription: 'Dramatic cliffs and traditional charm',
    quote: 'Where cliffs meet clouds',
    metaDescription: 'Experience the dramatic beauty of Amorgos. From clifftop villages to pristine beaches, discover this hidden Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'cultural-tours',
      'local-cuisine',
      'photography',
      'cliff-walking'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect for hiking and beach activities'
    },
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Chora',
      'Church of Panagia',
      'Katergo Beach',
      'Chrysospilia Cave',
      'Ano Meria Village'
    ],
    image: '/images/islands/amorgos.jpg',
    heroImage: '/images/islands/amorgos.jpg',
    vibes: [
      IslandVibe.SCENIC,
      IslandVibe.ROMANTIC,
      IslandVibe.AUTHENTIC,
      IslandVibe.PEACEFUL
    ],
    size: 'MEDIUM',
    slug: 'amorgos',
    ports: ['Katapola Port'],
    highlights: [
      'Clifftop Chora',
      'Dramatic landscapes',
      'Pristine beaches',
      'Traditional villages'
    ],
    weather: {
      temp: 26,
      condition: 'Sunny with sea breeze',
      summer: 'Warm and dry with temperatures around 26-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and warm, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    idealFor: [
      'Couples',
      'Nature lovers',
      'Photographers',
      'Peace seekers'
    ]
  } as Island,
  { 
    id: '9',
    name: 'Syros',
    description: 'Syros, the administrative capital of the Cyclades, stands unique among its siblings with its remarkable blend of Cycladic and neoclassical architecture. The island\'s capital, Ermoupolis, was once the main commercial port of Greece and remains one of the most elegant towns in the Mediterranean. Its central square, Miaouli Square, is dominated by the grand Town Hall, while the nearby Apollo Theater, a miniature version of La Scala, reflects the island\'s rich cultural heritage. The island\'s industrial heritage is preserved in the Neorion Shipyards and the Industrial Museum, while its cultural present thrives in art galleries, theaters, and the famous Syros International Film Festival. Unlike its more tourism-dependent neighbors, Syros maintains a vibrant year-round life, with its university, judiciary, and administrative functions creating a cosmopolitan atmosphere. The island\'s culinary scene is famous for local specialties like loukoumi (Turkish delight), halva pie, and San Michali cheese, while its beaches offer a perfect mix of organized facilities and secluded coves.',
    shortDescription: 'Neoclassical elegance meets island charm',
    quote: 'Where elegance meets tradition',
    metaDescription: 'Experience the unique blend of neoclassical and Cycladic architecture in Syros. Discover its rich culture, beautiful beaches, and vibrant arts scene.',
    activities: [
      'cultural-tours',
      'swimming',
      'theater',
      'local-cuisine',
      'architecture-tours',
      'shopping'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect for cultural activities and sightseeing'
    },
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Ermoupolis',
      'Ano Syros',
      'Apollo Theater',
      'Vaporia District',
      'Galissas Beach'
    ],
    image: '/images/islands/syros.jpg',
    heroImage: '/images/islands/syros.jpg',
    vibes: [
      IslandVibe.CULTURAL,
      IslandVibe.ELEGANT,
      IslandVibe.AUTHENTIC,
      IslandVibe.COSMOPOLITAN
    ],
    size: 'MEDIUM',
    slug: 'syros',
    ports: ['Ermoupolis Port'],
    highlights: [
      'Neoclassical architecture',
      'Rich cultural life',
      'Historic theaters',
      'Beautiful beaches'
    ],
    weather: {
      temp: 26,
      condition: 'Sunny and pleasant',
      summer: 'Warm and dry with temperatures around 26-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and warm, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    idealFor: [
      'Culture enthusiasts',
      'Architecture lovers',
      'Theater fans',
      'History buffs'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Regular service throughout the day',
        routes: [
          'Ermoupolis - Ano Syros',
          'Ermoupolis - Galissas',
          'Ermoupolis - Kini',
          'Ermoupolis - Poseidonia',
          'Airport - Ermoupolis'
        ]
      },
      facilities: {
        atm: 'Available throughout Ermoupolis and major villages',
        medicalCenter: 'Syros General Hospital',
        miniMarket: 'Available in all major areas',
        postOffice: 'Main office in Ermoupolis, branches in larger villages'
      }
    },
    contacts: {
      portAuthority: '+30 22810 88888',
      medicalCenter: '+30 22813 60500',
      municipality: '+30 22813 61000',
      policeStation: '+30 22810 96100',
      localBus: '+30 22810 82575',
      citizenService: '+30 22810 85250'
    },
    connectedIslands: {
      direct: [
        'Mykonos',
        'Tinos',
        'Paros',
        'Piraeus'
      ],
      nearby: [
        'Andros',
        'Kea',
        'Kythnos'
      ]
    }
  } as Island,
  { 
    id: '10',
    name: 'Tinos',
    description: 'A spiritual island known for its religious significance, traditional marble craftsmanship, and picturesque villages.',
    shortDescription: 'Religious heritage and marble artistry',
    quote: 'Where faith meets artistry',
    metaDescription: 'Explore the spiritual heart of the Cyclades. Discover religious sites, marble villages, and authentic Greek culture on Tinos.',
    activities: [
      'pilgrimage',
      'village-exploring',
      'art-viewing',
      'local-cuisine',
      'hiking'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect weather for exploring with fewer pilgrims'
    },
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Church of Panagia Evangelistria',
      'Volax Village',
      'Pyrgos Village',
      'Museum of Marble Crafts'
    ],
    image: '/images/islands/tinos.jpg',
    heroImage: '/images/islands/tinos.jpg',
    vibes: [
      IslandVibe.CULTURAL,
      IslandVibe.TRADITIONAL,
      IslandVibe.SPIRITUAL
    ],
    size: 'MAJOR',
    slug: 'tinos',
    highlights: [
      'Religious pilgrimage site',
      'Marble villages',
      'Traditional crafts',
      'Dovecotes',
      'Local gastronomy'
    ],
    ports: ['Tinos Port'],
    weather: {
      temp: 25,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    idealFor: [
      'Religious travelers',
      'Art lovers',
      'Culture enthusiasts',
      'Food lovers'
    ]
  } as Island,
  { 
    id: '11',
    name: 'Serifos',
    description: 'Serifos, an island of wild beauty and mythological significance, rises dramatically from the Aegean Sea with its rugged landscapes and pristine beaches. According to mythology, it was here that Perseus turned King Polydektes and his courtiers to stone, a legend that seems fitting given the island\'s dramatic rocky terrain. The island\'s main town, Chora, is one of the most impressive in the Cyclades, amphitheatrically built on a rocky hill crowned by a Venetian castle. The island\'s mining heritage is evident in the abandoned mines and loading bridges at Megalo Livadi, telling stories of its industrial past. Serifos\'s 72 beaches, many accessible only by boat or foot, range from the organized Livadi Beach to secluded coves like Ganema and Kalo Ambeli. The island\'s network of walking trails, including old miners\' paths, leads to hidden chapels, abandoned mines, and breathtaking viewpoints. Despite growing tourism, Serifos maintains its authentic character, with traditional tavernas serving local specialties like marathotiganites (fennel fritters) and revithada. The island\'s commitment to sustainable tourism and preservation of its natural beauty makes it a perfect destination for those seeking an authentic Cycladic experience.',
    shortDescription: 'Rugged beauty and authentic charm',
    quote: 'Where wild meets tradition',
    metaDescription: 'Discover the authentic charm of Serifos. From pristine beaches to traditional villages, experience the untouched beauty of this Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'cultural-tours',
      'local-cuisine',
      'beach-hopping',
      'photography'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect for hiking and beach activities'
    },
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Chora',
      'Livadi Beach',
      'Mining Museum',
      'Psili Ammos Beach',
      'Cyclops Cave'
    ],
    image: '/images/islands/serifos.jpg',
    heroImage: '/images/islands/serifos.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.SCENIC,
      IslandVibe.PEACEFUL,
      IslandVibe.ADVENTUROUS
    ],
    size: 'MEDIUM',
    slug: 'serifos',
    ports: ['Livadi Port'],
    highlights: [
      'Stunning Chora',
      'Mining heritage',
      'Pristine beaches',
      'Hiking trails'
    ],
    weather: {
      temp: 25,
      condition: 'Sunny with occasional winds',
      summer: 'Warm and dry with temperatures around 25-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and green, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    idealFor: [
      'Nature lovers',
      'Hikers',
      'Peace seekers',
      'Photography enthusiasts'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Regular service during summer season',
        routes: [
          'Livadi - Chora',
          'Livadi - Livadakia',
          'Livadi - Psili Ammos',
          'Livadi - Megalo Livadi'
        ]
      },
      facilities: {
        atm: 'Available in Livadi and Chora',
        medicalCenter: 'Regional Medical Center in Livadi',
        miniMarket: 'Available in main villages',
        postOffice: 'Main office in Livadi'
      }
    },
    contacts: {
      portAuthority: '+30 22810 51470',
      medicalCenter: '+30 22810 51202',
      municipality: '+30 22810 51210',
      policeStation: '+30 22810 51444',
      localBus: '+30 22810 51581',
      citizenService: '+30 22810 51290'
    },
    connectedIslands: {
      direct: [
        'Sifnos',
        'Milos',
        'Piraeus',
        'Kythnos'
      ],
      nearby: [
        'Kimolos',
        'Folegandros',
        'Syros'
      ]
    }
  } as Island,
  { 
    id: '12',
    name: 'Andros',
    description: 'The greenest of the Cyclades, known for its neoclassical mansions, pristine beaches, and extensive network of hiking trails,',
    shortDescription: 'Green paradise with hiking trails',
    quote: 'Where nature meets nobility',
    metaDescription: 'Discover the green island of Andros. From hiking trails to neoclassical architecture, experience the unique charm of this Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'cultural-tours',
      'museum-visits',
      'water-sports',
      'local-cuisine'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect for hiking and cultural activities'
    },
    averageStay: STAY_DURATION.MAJOR,
    mustSee: [
      'Chora',
      'Museum of Contemporary Art',
      'Tis Grias Castle',
      'Achla Beach',
      'Menites Springs'
    ],
    image: '/images/islands/andros.jpg',
    heroImage: '/images/islands/andros.jpg',
    vibes: [
      IslandVibe.CULTURAL,
      IslandVibe.ACTIVE,
      IslandVibe.ELEGANT,
      IslandVibe.SCENIC
    ],
    size: 'MAJOR',
    slug: 'andros',
    highlights: [
      'Extensive hiking network',
      'Neoclassical architecture',
      'Contemporary art scene',
      'Natural springs'
    ],
    ports: ['Gavrio Port'],
    weather: {
      temp: 25,
      condition: 'Sunny with greenery',
      summer: 'Warm and pleasant with temperatures around 25-29°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and green, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    idealFor: [
      'Hikers',
      'Art lovers',
      'Nature enthusiasts',
      'Culture seekers'
    ]
  } as Island,
  { 
    id: '13',
    name: 'Kea',
    description: 'Kea, also known as Tzia, is the closest Cycladic island to Athens yet remains refreshingly authentic and undiscovered. The island\'s landscape differs from the typical Cycladic scenery, with its terracotta-colored houses blending into rolling hills covered in ancient oak forests and almond groves. The main town, Ioulida, is a maze of stepped alleys and traditional architecture, watched over by the island\'s mascot - an ancient stone lion carved from the native rock. Kea\'s rich maritime history is evident in its numerous shipwrecks, including the famous HMHS Britannic, making it a paradise for diving enthusiasts. The island\'s extensive network of ancient paths, recently restored and well-marked, connects four ancient city-states through landscapes of dramatic variety. The coastline alternates between sandy beaches like Koundouros and rocky coves perfect for snorkeling. Kea\'s culinary tradition is renowned for its local products, including thyme honey, acorn cookies, and the famous "loza" (cured pork). The island\'s proximity to Athens has made it a favorite weekend retreat for Athenians, who appreciate its laid-back atmosphere and excellent tavernas, yet it remains uncrowded even in peak season.',
    shortDescription: 'Hiking paradise close to Athens',
    quote: 'Where ancient paths lead to secret beaches',
    metaDescription: 'Discover Kea, the hikers paradise of the Cyclades. Find the best trails, beaches, and local experiences on this authentic Greek island.',
    activities: [
      'hiking',
      'swimming',
      'diving',
      'local-cuisine',
      'beach-hopping'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect weather for hiking and exploring'
    },
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Ancient Karthaia',
      'Vourkari Village',
      'Lion of Kea',
      'Otzias Beach'
    ],
    image: '/images/islands/kea.webp',
    heroImage: '/images/islands/kea.webp',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.SCENIC,
      IslandVibe.ACTIVE
    ],
    size: 'MEDIUM',
    slug: 'kea',
    ports: ['Korissia Port'],
    highlights: [
      'Ancient ruins',
      'Hiking trails',
      'Traditional villages',
      'Pristine beaches',
      'Local gastronomy'
    ],
    weather: {
      temp: 24,
      condition: 'Sunny with mild winds',
      summer: 'Warm and dry with temperatures around 24-28°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and green, 18-22°C',
      autumn: 'Warm and clear, 20-24°C'
    },
    idealFor: [
      'Hikers',
      'History buffs',
      'Nature lovers',
      'Peace seekers'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Limited service connecting main villages',
        routes: [
          'Korissia - Ioulida',
          'Ioulida - Otzias',
          'Ioulida - Vourkari',
          'Korissia - Koundouros'
        ]
      },
      facilities: {
        atm: 'Available in Ioulida and Korissia',
        medicalCenter: 'Regional Medical Center in Ioulida',
        miniMarket: 'Available in main villages',
        postOffice: 'Main office in Ioulida'
      }
    },
    contacts: {
      portAuthority: '+30 22880 21344',
      medicalCenter: '+30 22880 22200',
      municipality: '+30 22880 22345',
      policeStation: '+30 22880 21100',
      localBus: '+30 22880 21240',
      citizenService: '+30 22880 22388'
    },
    connectedIslands: {
      direct: [
        'Lavrio',
        'Kythnos',
        'Syros'
      ],
      nearby: [
        'Andros',
        'Tinos',
        'Gyaros'
      ]
    }
  } as Island,
  { 
    id: '14',
    name: 'Sikinos',
    description: 'A hidden gem in the Cyclades, Sikinos offers unspoiled beauty, traditional architecture, and a peaceful escape from modern life.',
    shortDescription: 'Untouched traditional island life',
    quote: 'Where time stands still',
    metaDescription: 'Discover the untouched beauty of Sikinos. Experience authentic Greek island life away from mass tourism.',
    activities: [
      'hiking',
      'swimming',
      'wine-tasting',
      'local-cuisine',
      'cultural-visits'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect weather for exploring with fewer tourists'
    },
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Episkopi Monastery',
      'Chora Village',
      'Malta Beach',
      'Ancient Winery'
    ],
    image: '/images/islands/sikinos.jpg',
    heroImage: '/images/islands/sikinos.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.PEACEFUL,
      IslandVibe.TRADITIONAL
    ],
    size: 'MINOR',
    slug: 'sikinos',
    ports: ['Alopronia Port'],
    highlights: [
      'Ancient monastery',
      'Traditional villages',
      'Secluded beaches',
      'Local winery',
      'Hiking trails'
    ],
    weather: {
      temp: 25,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    idealFor: [
      'Peace seekers',
      'Culture enthusiasts',
      'Hikers',
      'Wine lovers'
    ]
  } as Island,
  { 
    id: '15',
    name: 'Kimolos',
    description: 'Kimolos, a small volcanic island next to Milos, is a hidden treasure of the Western Cyclades that captivates visitors with its unspoiled beauty and genuine island character. Named after the chalk (kimolia) that was once extracted here, the island\'s geological heritage is evident in its stunning white cliffs and thermal springs. The main village, Chorio, is a perfect example of Cycladic architecture, with its narrow alleys, white-washed houses, and the medieval castle quarter known as Kastro. The island\'s coastline is a geological wonderland, featuring the spectacular Skiadi rock formation, a natural mushroom-shaped monument formed by wind erosion. Kimolos\'s beaches, like the stunning Prassa with its white sand and turquoise waters, remain wonderfully undeveloped. The island is a paradise for nature lovers, offering excellent hiking opportunities along ancient paths that connect its scattered settlements and lead to hidden coves and archaeological sites. The island\'s isolation has preserved not only its natural beauty but also its traditions, evident in local festivals and cuisine featuring dishes like ladenia (a local pizza-like specialty) and traditional sweets made with local almonds. The absence of mass tourism has attracted a loyal following of visitors who appreciate its peaceful atmosphere and crystal-clear waters, making it an ideal destination for those seeking to experience authentic Greek island culture.',
    shortDescription: 'Volcanic beauty with pristine beaches',
    quote: 'Where white cliffs meet turquoise waters',
    metaDescription: 'Experience the untouched beauty of Kimolos. Discover volcanic landscapes, secluded beaches, and authentic Greek island life.',
    activities: [
      'swimming',
      'hiking',
      'snorkeling',
      'beach-hopping',
      'local-cuisine'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect beach weather with fewer tourists'
    },
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Skiadi Rock',
      'Prassa Beach',
      'Chorio Village',
      'Dekas Beach'
    ],
    image: '/images/islands/kimolos.jpg',
    heroImage: '/images/islands/kimolos.jpg',
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.SCENIC,
      IslandVibe.AUTHENTIC
    ],
    size: 'MINOR',
    slug: 'kimolos',
    ports: ['Psathi Port'],
    highlights: [
      'Volcanic landscapes',
      'White rock formations',
      'Pristine beaches',
      'Traditional village life',
      'Crystal-clear waters'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    idealFor: [
      'Peace seekers',
      'Nature lovers',
      'Beach enthusiasts',
      'Couples'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Limited service during summer season',
        routes: [
          'Psathi - Chorio',
          'Chorio - Prassa Beach',
          'Chorio - Kalamitsi',
          'Psathi - Aliki'
        ]
      },
      facilities: {
        atm: 'Available in Chorio',
        medicalCenter: 'Regional Medical Center in Chorio',
        miniMarket: 'Available in main village',
        postOffice: 'Main office in Chorio'
      }
    },
    contacts: {
      portAuthority: '+30 22870 51207',
      medicalCenter: '+30 22870 51222',
      municipality: '+30 22870 51338',
      policeStation: '+30 22870 51205',
      localBus: '+30 22870 51237',
      citizenService: '+30 22870 51338'
    },
    connectedIslands: {
      direct: [
        'Milos',
        'Piraeus',
        'Sifnos',
        'Folegandros'
      ],
      nearby: [
        'Serifos',
        'Polyaigos',
        'Sikinos'
      ]
    }
  } as Island,
  { 
    id: '16',
    name: 'Kythnos',
    description: 'Known for its thermal springs, beautiful beaches, and traditional villages, Kythnos offers an authentic Greek island experience.',
    shortDescription: 'Thermal springs and traditional charm',
    quote: 'Where healing waters meet golden beaches',
    metaDescription: 'Experience the healing thermal springs and authentic charm of Kythnos. Discover traditional villages, pristine beaches, and local culture.',
    activities: [
      'swimming',
      'thermal-springs',
      'hiking',
      'local-cuisine',
      'beach-hopping'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect weather for thermal springs and beaches'
    },
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Loutra Hot Springs',
      'Kolona Beach',
      'Chora Village',
      'Dryopida Cave'
    ],
    image: '/images/islands/kythnos.jpg',
    heroImage: '/images/islands/kythnos.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.PEACEFUL,
      IslandVibe.TRADITIONAL
    ],
    size: 'MEDIUM',
    slug: 'kythnos',
    ports: ['Merichas Port'],
    highlights: [
      'Thermal springs',
      'Double-sided beach',
      'Traditional villages',
      'Cave exploration',
      'Local festivals'
    ],
    weather: {
      temp: 25,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    idealFor: [
      'Wellness seekers',
      'Beach lovers',
      'Culture enthusiasts',
      'Couples'
    ]
  } as Island,
  { 
    id: '17',
    name: 'Folegandros',
    description: 'Folegandros, a small but dramatic island between Milos and Santorini, captures the essence of Cycladic beauty with its stunning cliff-top Chora and unspoiled landscapes. The island\'s main town, perched on the edge of a 200-meter cliff, is one of the oldest traditional settlements in the Cyclades, featuring three connected squares with distinct character - a rare architectural feature in the islands. The medieval Kastro district, still inhabited, preserves the island\'s Venetian heritage with its defensive architecture and ancient walls. The path to the church of Panagia, zigzagging up a steep cliff, offers breathtaking views and leads to one of the most significant ecclesiastical museums in the Cyclades. The island\'s wild beauty is evident in its rugged coastline, where beaches like Katergo are accessible only by boat or foot, preserving their natural charm. Despite its small size, Folegandros offers excellent hiking opportunities along ancient paths that connect its scattered settlements and lead to hidden coves and archaeological sites. The island\'s cuisine is distinctly local, featuring specialties like matsata (handmade pasta) and souroto cheese. The absence of an airport and limited ferry connections have helped Folegandros maintain its authentic character while attracting discerning visitors who appreciate its wild beauty and peaceful atmosphere.',
    shortDescription: 'Dramatic cliffs and traditional charm',
    quote: 'Where cliffs meet clouds',
    metaDescription: 'Experience the dramatic beauty of Folegandros. From clifftop villages to pristine beaches, discover this hidden Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'cultural-tours',
      'local-cuisine',
      'photography',
      'cliff-walking'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER,
        AvailableMonth.OCTOBER
      ],
      description: 'Perfect for hiking and beach activities'
    },
    averageStay: STAY_DURATION.MEDIUM,
    mustSee: [
      'Chora',
      'Church of Panagia',
      'Katergo Beach',
      'Chrysospilia Cave',
      'Ano Meria Village'
    ],
    image: '/images/islands/folegandros.jpg',
    heroImage: '/images/islands/folegandros.jpg',
    vibes: [
      IslandVibe.SCENIC,
      IslandVibe.ROMANTIC,
      IslandVibe.AUTHENTIC,
      IslandVibe.PEACEFUL
    ],
    size: 'MEDIUM',
    slug: 'folegandros',
    ports: ['Karavostasis Port'],
    highlights: [
      'Clifftop Chora',
      'Dramatic landscapes',
      'Pristine beaches',
      'Traditional villages'
    ],
    weather: {
      temp: 26,
      condition: 'Sunny with sea breeze',
      summer: 'Warm and dry with temperatures around 26-30°C',
      winter: 'Mild with some rain, 12-16°C',
      spring: 'Pleasant and warm, 18-22°C',
      autumn: 'Warm and clear, 20-25°C'
    },
    idealFor: [
      'Couples',
      'Nature lovers',
      'Photographers',
      'Peace seekers'
    ],
    transportation: {
      localBus: {
        available: true,
        frequency: 'Regular service during summer season',
        routes: [
          'Karavostasis - Chora',
          'Chora - Ano Meria',
          'Karavostasis - Agali Beach',
          'Chora - Agali Beach'
        ]
      },
      facilities: {
        atm: 'Available in Chora',
        medicalCenter: 'Regional Medical Center in Chora',
        miniMarket: 'Available in main villages',
        postOffice: 'Main office in Chora'
      }
    },
    contacts: {
      portAuthority: '+30 22860 41244',
      medicalCenter: '+30 22860 41222',
      municipality: '+30 22860 41285',
      policeStation: '+30 22860 41249',
      localBus: '+30 22860 41252',
      citizenService: '+30 22860 41283'
    },
    connectedIslands: {
      direct: [
        'Milos',
        'Santorini',
        'Ios',
        'Sikinos'
      ],
      nearby: [
        'Sifnos',
        'Kimolos',
        'Paros'
      ]
    }
  } as Island,
  { 
    id: '18',
    name: 'Anafi',
    slug: 'anafi',
    description: 'Anafi, a hidden gem in the southeastern Cyclades, is a testament to untouched Greek island beauty. This small paradise rises dramatically from the Aegean Sea, crowned by Mount Kalamos, one of the largest monoliths in the Mediterranean. The island\'s history stretches back to ancient mythology, where Apollo made it emerge from the waves to shelter the Argonauts. Today, Anafi offers a perfect escape for those seeking authentic Greek island life away from mass tourism. The island\'s main settlement, Chora, is a pristine example of Cycladic architecture, with its white-washed houses, narrow winding paths, and blue-domed churches cascading down the hillside. The island\'s beaches, particularly the golden sands of Roukounas, are among the most serene in the Cyclades, while the ancient temple of Apollo Aegletes stands as a reminder of the island\'s classical heritage. Hiking enthusiasts will find paradise in the network of ancient paths that crisscross the island, leading to hidden chapels, abandoned monasteries, and breathtaking viewpoints. Despite its small size, Anafi offers diverse experiences from exploring Byzantine chapels and Venetian ruins to enjoying fresh local cuisine in traditional tavernas. The island\'s relative isolation has preserved not only its natural beauty but also its authentic way of life, making it a perfect destination for those seeking to experience the true essence of the Cyclades.',
    quote: 'Where wild landscapes meet tranquil beaches, and ancient history meets vibrant island life',
    image: '/images/islands/anafi.jpg',
    heroImage: '/images/islands/anafi.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: {
      months: [
        AvailableMonth.JUNE,
        AvailableMonth.JULY,
        AvailableMonth.AUGUST,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect weather for swimming, hiking, and enjoying outdoor activities'
    },
    idealFor: [
      'Peace seekers',
      'Adventure enthusiasts',
      'History buffs',
      'Hikers',
      'Beach lovers'
    ],
    highlights: [
      'Monolith of Kalamos - Second highest in Europe',
      'Venetian Castle Ruins',
      'Monastery of Zoodochos Pigi',
      'Chora - Traditional Cycladic Village',
      'Pristine Beaches with Turquoise Waters',
      'Scenic Hiking Trails'
    ],
    mustSee: [
      'Kalamos Monolith',
      'Monastery of Panagia Kalamiotissa',
      'Kasteli Ancient City',
      'Chora Traditional Village',
      'Roukounas Beach',
      'Monastery of Zoodochos Pigi'
    ],
    ports: [
      'Santorini',
      'Thirasia',
      'Mykonos',
      'Naxos',
      'Paros',
      'Folegandros',
      'Sikinos',
      'Ios',
      'Milos',
      'Kythnos',
      'Syros',
      'Kea',
      'Chalki',
      'Kasos',
      'Rhodes',
      'Karpathos',
      'Heraklion',
      'Sitia'
    ],
    connectedIslands: {
      direct: [
        'santorini',
        'thirasia',
        'mykonos',
        'naxos',
        'paros',
        'folegandros',
        'sikinos',
        'ios',
        'milos',
        'kythnos',
        'syros',
        'kea'
      ],
      nearby: [
        'amorgos',
        'andros'
      ],
      other: [
        'chalki',
        'kasos',
        'rhodes',
        'karpathos'
      ]
    },
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.ADVENTUROUS,
      IslandVibe.AUTHENTIC,
      IslandVibe.HISTORIC,
      IslandVibe.NATURAL,
      IslandVibe.OFF_THE_BEATEN_PATH
    ],
    size: 'MINOR',
    metaDescription: 'Discover Anafi, a hidden gem in the Cyclades with spectacular views, hiking trails, pristine beaches, and rich history. Plan your perfect Greek island getaway.',
    activities: [
      'swimming',
      'beach-hopping',
      'hiking',
      'rock-climbing',
      'monastery-visits',
      'traditional-villages',
      'nightlife',
      'local-cuisine'
    ] as IslandActivity[],
    contacts: {
      portAuthority: '+302286061220',
      medicalCenter: '+302286061215',
      municipality: '+302286061266',
      policeStation: '+302286061216',
      localBus: '+302286061266',
      citizenService: '+302286061390'
    },
    transportation: {
      localBus: {
        available: true,
        frequency: 'Infrequent during summer',
        routes: ['Chora - Port', 'Main Villages']
      },
      facilities: {
        atm: 'Available at the port',
        medicalCenter: 'Located in Chora',
        miniMarket: 'Available in Chora',
        postOffice: 'Located in Chora'
      }
    }
  },
  { 
    id: '19',
    name: 'Thirasia',
    description: 'Thirasia, once part of ancient Thera before the devastating volcanic eruption that shaped Santorini, offers visitors a glimpse of how the Cyclades were before mass tourism. This small island, facing the famous caldera of Santorini, preserves an authentic way of life that has largely disappeared from its more famous neighbor. The island\'s main settlement, Manolas, perched on the caldera\'s edge, offers equally spectacular views as Santorini but in peaceful solitude. The island\'s architecture features traditional cave houses carved into the volcanic rock, while abandoned settlements like Agrilia tell stories of past prosperity. Despite its small size, Thirasia boasts several important Byzantine churches and monasteries, including the monastery of the Assumption of the Virgin Mary. The island\'s few beaches, accessible by boat or donkey paths, remain wonderfully undeveloped, while local tavernas serve authentic Cycladic dishes using ingredients from the island\'s terraced gardens. The absence of hotels (most accommodation is in traditional guest houses) and limited tourist facilities has preserved Thirasia\'s traditional character, making it a perfect escape for those seeking to experience the authentic Cyclades.',
    shortDescription: 'Authentic caldera views without crowds',
    quote: 'Santorini\'s hidden sister',
    metaDescription: 'Experience the authentic side of the Santorini caldera on Thirasia. Discover traditional villages, quiet beaches, and stunning views.',
    activities: [
      'hiking',
      'swimming',
      'photography',
      'local-cuisine',
      'village-exploring'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect weather with fewer tourists'
    },
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Manolas Village',
      'Korfos Port',
      'Agia Irini Church',
      'Potamos Settlement'
    ],
    image: '/images/islands/thirasia.jpg',
    heroImage: '/images/islands/thirasia.jpg',
    vibes: [
      IslandVibe.AUTHENTIC,
      IslandVibe.SCENIC,
      IslandVibe.PEACEFUL
    ],
    size: 'MINOR',
    slug: 'thirasia',
    ports: ['Riva Port'],
    highlights: [
      'Caldera views',
      'Traditional villages',
      'Volcanic beaches',
      'Cave houses',
      'Sunset spots'
    ],
    weather: {
      temp: 25,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    idealFor: [
      'Peace seekers',
      'Photographers',
      'Culture enthusiasts',
      'Off-the-beaten-path travelers'
    ],
    transportation: {
      localBus: {
        available: false,
        frequency: 'No public bus service',
        routes: []
      },
      facilities: {
        atm: 'Not available on the island',
        medicalCenter: 'Small medical station in Manolas',
        miniMarket: 'Few small shops in Manolas',
        postOffice: 'Small post office in Manolas'
      }
    },
    contacts: {
      portAuthority: '+30 22860 22239',
      medicalCenter: '+30 22860 29340',
      municipality: '+30 22860 29341',
      policeStation: '+30 22860 22649',
      localBus: 'N/A',
      citizenService: '+30 22860 29342'
    },
    connectedIslands: {
      direct: [
        'Santorini',
        'Ios'
      ],
      nearby: [
        'Folegandros',
        'Sikinos',
        'Anafi'
      ]
    }
  } as Island,
  { 
    id: '20',
    name: 'Antiparos',
    description: 'A charming island known for its beautiful beaches, impressive cave, and laid-back atmosphere, perfect for a relaxing Greek island experience.',
    shortDescription: 'Laid-back charm and natural wonders',
    quote: 'Where simplicity meets natural beauty',
    metaDescription: 'Discover the laid-back charm of Antiparos. Experience stunning beaches, explore the famous cave, and enjoy authentic island life.',
    activities: [
      'swimming',
      'cave-exploring',
      'beach-hopping',
      'local-cuisine',
      'water-sports'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect beach weather with fewer tourists'
    },
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Antiparos Cave',
      'Sifneikos Beach',
      'Chora Village',
      'Despotiko Island'
    ],
    image: '/images/islands/antiparos.jpg',
    heroImage: '/images/islands/antiparos.jpg',
    vibes: [
      IslandVibe.RELAXED,
      IslandVibe.SCENIC,
      IslandVibe.AUTHENTIC
    ],
    size: 'MINOR',
    slug: 'antiparos',
    ports: ['Antiparos Port'],
    highlights: [
      'Famous cave',
      'Golden beaches',
      'Traditional village',
      'Water sports',
      'Sunset views'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    idealFor: [
      'Beach lovers',
      'Families',
      'Nature enthusiasts',
      'Water sports fans'
    ]
  } as Island,
  { 
    id: '21',
    name: 'Donousa',
    description: 'Donousa, the northernmost of the Small Cyclades, is a tiny paradise that embodies the essence of island solitude and natural beauty. This remote gem, mentioned in Greek mythology as the place where Dionysus hid Ariadne from Theseus, maintains an unspoiled charm that increasingly rare in the Aegean. The island\'s main village, Stavros, is a picturesque settlement of white-washed houses and narrow paths that lead to windswept hills and pristine beaches. The island\'s coastline features some of the clearest waters in the Cyclades, with beaches like Kedros and Livadi offering different shades of blue against golden or white sand. Despite its small size, Donousa offers excellent hiking opportunities along ancient paths that connect its scattered settlements and lead to hidden coves and archaeological sites. The island\'s isolation has preserved not only its natural beauty but also its traditions, evident in local festivals and cuisine featuring dishes like patatato (goat with potatoes) and hand-made pasta. The lack of mass tourism has attracted a loyal following of visitors who appreciate its peaceful atmosphere and crystal-clear waters, making it a perfect destination for those seeking to disconnect from the modern world.',
    shortDescription: 'Pristine beaches and tranquility',
    quote: 'Where time stands still and nature reigns supreme',
    metaDescription: 'Discover the untouched beauty of this Small Cyclades gem.',
    image: '/images/islands/donousa.jpg',
    heroImage: '/images/islands/donousa.jpg',
    highlights: [
      'Kedros Beach',
      'Donousa Village',
      'Cave of the Wall',
      'Hiking Trails',
      'Local Festivals'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    activities: [
      'swimming',
      'hiking',
      'snorkeling',
      'beach-hopping',
      'local-culture'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.JUNE,
        AvailableMonth.JULY,
        AvailableMonth.AUGUST,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect beach weather with fewer tourists'
    },
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Kedros Beach',
      'Donousa Village',
      'Cave of the Wall'
    ],
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.AUTHENTIC,
      IslandVibe.TRADITIONAL
    ],
    size: 'MINOR',
    slug: 'donousa',
    transportation: {
      localBus: {
        available: false,
        frequency: 'No public bus service',
        routes: []
      },
      facilities: {
        atm: 'Not available on the island',
        medicalCenter: 'Small medical station in Stavros',
        miniMarket: 'Few small shops in Stavros',
        postOffice: 'Small post office in Stavros'
      }
    },
    contacts: {
      portAuthority: '+30 22850 51228',
      medicalCenter: '+30 22850 51516',
      municipality: '+30 22850 51600',
      policeStation: 'Serviced by Naxos',
      localBus: 'N/A',
      citizenService: '+30 22850 51338'
    },
    connectedIslands: {
      direct: [
        'Naxos',
        'Amorgos',
        'Koufonisia'
      ],
      nearby: [
        'Schinoussa',
        'Iraklia',
        'Paros'
      ]
    }
  } as Island,
  { 
    id: '22',
    name: 'Iraklia',
    description: 'The smallest of the Small Cyclades, Iraklia is a tranquil haven perfect for those seeking an authentic, off-the-beaten-path Greek island experience.',
    shortDescription: 'Peaceful island with untouched nature',
    quote: 'A hidden treasure of serenity',
    metaDescription: 'Discover the untouched beauty of Iraklia. Experience pristine beaches, hiking trails, and authentic Greek hospitality in this peaceful Cycladic gem.',
    activities: [
      'hiking',
      'swimming',
      'snorkeling',
      'local-cuisine',
      'village-exploring',
      'beach-hopping'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect weather for hiking and swimming with very few tourists'
    },
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Cave of Saint John',
      'Livadi Beach',
      'Agios Georgios Beach',
      'Tourkopigado Spring',
      'Panagia Church',
      'Agios Athanasios Summit',
      'Traditional Settlements'
    ],
    image: '/images/islands/iraklia.jpg',
    heroImage: '/images/islands/iraklia.jpg',
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.TRADITIONAL,
      IslandVibe.ADVENTUROUS
    ],
    size: 'MINOR',
    slug: 'iraklia',
    ports: ['Iraklia Port'],
    highlights: [
      'Cave of Saint John',
      'Hiking trails',
      'Secluded beaches',
      'Traditional settlements',
      'Natural springs'
    ],
    weather: {
      temp: 25,
      condition: 'clear',
      summer: 'Warm and dry with temperatures around 25-28°C',
      winter: 'Mild with some rain, 12-15°C',
      spring: 'Pleasant and mild, 17-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    idealFor: [
      'Nature lovers',
      'Hikers',
      'Peace seekers',
      'Adventure travelers'
    ],
    transportation: {
      localBus: {
        available: false,
        frequency: 'No public bus service',
        routes: []
      },
      facilities: {
        atm: 'Not available on the island',
        medicalCenter: 'Small medical station in Agios Georgios',
        miniMarket: 'Few small shops in Agios Georgios',
        postOffice: 'Small post office in Agios Georgios'
      }
    },
    contacts: {
      portAuthority: '+30 22850 71394',
      medicalCenter: '+30 22850 71388',
      municipality: '+30 22850 71170',
      policeStation: 'Serviced by Naxos',
      localBus: 'N/A',
      citizenService: '+30 22850 71338'
    },
    connectedIslands: {
      direct: [
        'Naxos',
        'Amorgos',
        'Koufonisia'
      ],
      nearby: [
        'Schinoussa',
        'Donousa',
        'Paros'
      ]
    }
  } as Island,
  { 
    id: '23',
    name: 'Schinoussa',
    description: 'Schinoussa, one of the smallest inhabited islands in the Cyclades, is a hidden paradise that proves that great things come in small packages. This tiny island, part of the Small Cyclades, offers an authentic escape where time seems to slow down and simple pleasures take center stage. The island\'s main village, Chora, sits on a hill offering panoramic views of the surrounding islands and the Aegean Sea. Despite its small size, Schinoussa boasts 18 beaches of exceptional beauty, many accessible only by foot or boat, ensuring privacy even in peak season. The island\'s walking trails connect traditional settlements through a landscape of cedar trees, wild herbs, and dramatic coastlines. Local life centers around the island\'s few tavernas, where visitors can taste authentic Cycladic cuisine featuring fresh fish, local cheeses, and vegetables from nearby gardens. The absence of mass tourism has preserved traditional customs and ways of life, evident in the warm hospitality of locals and the continued practice of traditional farming and fishing. Schinoussa\'s small size and limited facilities make it perfect for those seeking to experience island life at its most authentic, where the biggest decision of the day might be which secluded beach to explore.',
    shortDescription: 'Small island with beautiful beaches',
    quote: 'Where time slows down to island pace',
    metaDescription: 'Experience the authentic charm of Schinoussa. Find pristine beaches, traditional villages, and peaceful corners in this small but beautiful Cycladic island.',
    activities: [
      'swimming',
      'beach-hopping',
      'hiking',
      'local-cuisine',
      'village-exploring',
      'boat-tours'
    ] as IslandActivity[],
    bestTime: {
      months: [
        AvailableMonth.MAY,
        AvailableMonth.JUNE,
        AvailableMonth.SEPTEMBER
      ],
      description: 'Perfect beach weather with fewer tourists'
    },
    averageStay: STAY_DURATION.MINOR,
    mustSee: [
      'Tsigouri Beach',
      'Chora Village',
      'Lioliou Beach',
      'Psili Ammos Beach',
      'Mersini Port',
      'Panagia Church',
      'Sunset Point'
    ],
    image: '/images/islands/schinoussa.jpg',
    heroImage: '/images/islands/schinoussa.jpg',
    vibes: [
      IslandVibe.PEACEFUL,
      IslandVibe.TRADITIONAL,
      IslandVibe.SCENIC
    ],
    size: 'MINOR',
    slug: 'schinoussa',
    ports: ['Schinoussa Port'],
    highlights: [
      'Golden beaches',
      'Traditional villages',
      'Scenic hiking paths',
      'Fresh seafood tavernas',
      'Peaceful coves'
    ],
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    idealFor: [
      'Beach lovers',
      'Peace seekers',
      'Couples',
      'Nature enthusiasts'
    ],
    transportation: {
      localBus: {
        available: false,
        frequency: 'No public bus service',
        routes: []
      },
      facilities: {
        atm: 'Not available on the island',
        medicalCenter: 'Small medical station in Chora',
        miniMarket: 'Few small shops in Chora',
        postOffice: 'Small post office in Chora'
      }
    },
    contacts: {
      portAuthority: '+30 22850 71394',
      medicalCenter: '+30 22850 71388',
      municipality: '+30 22850 71170',
      policeStation: 'Serviced by Naxos',
      localBus: 'N/A',
      citizenService: '+30 22850 71338'
    },
    connectedIslands: {
      direct: [
        'Naxos',
        'Amorgos',
        'Koufonisia'
      ],
      nearby: [
        'Iraklia',
        'Donousa',
        'Paros'
      ]
    }
  } as Island
];

export const islandGuides: IslandGuide[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    description: 'Discover the magic of Santorini with our comprehensive guide. From the best sunset spots to hidden gems.',
    image: '/images/islands/santorini.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to October',
    idealFor: ['Couples', 'Photographers', 'Wine Lovers']
  },
  {
    id: 'mykonos',
    name: 'Mykonos',
    description: 'Everything you need to know about Mykonos - from beach clubs to traditional tavernas.',
    image: '/images/islands/mykonos.jpg',
    weather: {
      summer: 'Hot with strong meltemi winds, 25-30°C',
      winter: 'Mild with some rain, 12-15°C',
      spring: 'Warm and pleasant, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'June to September',
    idealFor: ['Party Lovers', 'Beach Goers', 'Luxury Travelers']
  },
  {
    id: 'naxos',
    name: 'Naxos',
    description: 'Explore the largest Cycladic island with pristine beaches and mountain villages.',
    image: '/images/islands/naxos.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to October',
    idealFor: ['Families', 'Beach Lovers', 'History Buffs']
  },
  {
    id: 'paros',
    name: 'Paros',
    description: 'Your guide to Paros - traditional villages, water sports, and local culture.',
    image: '/images/islands/paros.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to October',
    idealFor: ['Water Sports', 'Culture', 'Relaxation']
  },
  {
    id: 'milos',
    name: 'Milos',
    description: 'Discover the volcanic island of Milos with its unique beaches and landscapes.',
    image: '/images/islands/milos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to September',
    idealFor: ['Photographers', 'Beach Explorers', 'Nature Lovers']
  },
  {
    id: 'ios',
    name: 'Ios',
    description: 'Your complete guide to Ios - beaches, nightlife, and hidden gems.',
    image: '/images/islands/ios.jpg',
    weather: {
      summer: 'Hot and sunny with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'June to September',
    idealFor: ['Young Travelers', 'Party Lovers', 'Beach Goers']
  },
  {
    id: 'sifnos',
    name: 'Sifnos',
    description: 'Your guide to the culinary capital of the Cyclades.',
    image: '/images/islands/sifnos.jpg',
    weather: {
      temp: 27,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to September',
    idealFor: ['Food Lovers', 'Culture', 'Relaxation']
  },
  {
    id: 'antiparos',
    name: 'Antiparos',
    description: 'A charming island known for its beautiful beaches, impressive cave, and laid-back atmosphere.',
    image: '/images/islands/antiparos.jpg',
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Beach Lovers', 'Families', 'Nature Enthusiasts']
  },
  {
    id: 'folegandros',
    name: 'Folegandros',
    description: 'Experience authentic Greek island life in untouched Folegandros.',
    image: '/images/islands/folegandros.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Hikers', 'Authentic Experience']
  },
  {
    id: 'syros',
    name: 'Syros',
    description: 'Explore the capital of Cyclades with its unique architecture and culture.',
    image: '/images/islands/syros.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'April to October',
    idealFor: ['Culture', 'Architecture', 'Local Life']
  },
  {
    id: 'amorgos',
    name: 'Amorgos',
    description: 'Discover the dramatic landscapes and spiritual atmosphere of Amorgos.',
    image: '/images/islands/amorgos.jpg',
    weather: {
      summer: 'Hot and dry with temperatures around 25-30°C',
      winter: 'Mild with occasional rain, 10-15°C',
      spring: 'Pleasant and warm, 15-20°C',
      autumn: 'Warm with occasional rain, 20-25°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Nature Lovers', 'Peace Seekers']
  },
  {
    id: 'koufonisia',
    name: 'Koufonisia',
    description: 'Experience the turquoise waters and laid-back charm of Koufonisia. Your guide to this hidden Cycladic paradise.',
    image: '/images/islands/koufonisia.jpg',
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Beach Lovers', 'Peace Seekers', 'Nature Enthusiasts']
  },
  {
    id: 'iraklia',
    name: 'Iraklia',
    description: 'Discover the untouched beauty of Iraklia, the smallest of the Small Cyclades. A perfect escape for nature lovers.',
    image: '/images/islands/iraklia.jpg',
    weather: {
      temp: 25,
      condition: 'clear',
      summer: 'Warm and dry with temperatures around 25-28°C',
      winter: 'Mild with some rain, 12-15°C',
      spring: 'Pleasant and mild, 17-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Nature Lovers', 'Peace Seekers']
  },
  {
    id: 'kea',
    name: 'Kea',
    description: 'Discover the hiking paradise of Kea, with its ancient trails and authentic charm.',
    image: '/images/islands/kea.webp',
    weather: {
      summer: 'Warm and pleasant with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Nature Lovers', 'Weekend Travelers']
  },
  {
    id: 'kimolos',
    name: 'Kimolos',
    description: 'Explore the volcanic beauty and pristine beaches of Kimolos.',
    image: '/images/islands/kimolos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Nature Lovers', 'Beach Enthusiasts']
  },
  {
    id: 'kythnos',
    name: 'Kythnos',
    description: 'Experience the healing thermal springs and traditional charm of Kythnos.',
    image: '/images/islands/kythnos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Wellness Seekers', 'Beach Lovers', 'Culture Enthusiasts']
  },
  {
    id: 'sikinos',
    name: 'Sikinos',
    description: 'Discover the untouched beauty and authentic charm of Sikinos.',
    image: '/images/islands/sikinos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Culture Enthusiasts', 'Hikers']
  },
  {
    id: 'anafi',
    name: 'Anafi',
    image: '/images/islands/anafi.jpg',
    heroImage: '/images/islands/anafi.jpg',
    description: 'Experience the untouched beauty of Anafi, a remote paradise in the Cyclades.',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Hikers', 'Nature Lovers']
  },
  {
    id: 'serifos',
    name: 'Serifos',
    description: 'Discover the rugged beauty and pristine beaches of Serifos.',
    image: '/images/islands/serifos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Beach Lovers', 'Photographers']
  },
  {
    id: 'tinos',
    name: 'Tinos',
    description: 'Discover the spiritual heart of the Cyclades with its religious heritage and marble artistry.',
    image: '/images/islands/tinos.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Religious Travelers', 'Art Lovers', 'Culture Enthusiasts']
  },
  {
    id: 'andros',
    name: 'Andros',
    description: 'The greenest island of the Cyclades, where lush valleys, flowing streams, and pristine beaches create a paradise for nature lovers.',
    image: '/images/islands/andros.jpg',
    heroImage: '/images/islands/andros.jpg',
    weather: {
      summer: 'Warm and pleasant with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Hikers', 'Nature Lovers', 'Weekend Travelers']
  },
  {
    id: 'donousa',
    name: 'Donousa',
    description: 'Experience the untouched beauty of this Small Cyclades gem.',
    image: '/images/islands/donousa.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Beach Lovers', 'Peace Seekers', 'Nature Enthusiasts']
  },
  {
    id: 'thirasia',
    name: 'Thirasia',
    description: 'Discover Santorini\'s quiet sister island with authentic village life and stunning caldera views.',
    image: '/images/islands/thirasia.jpg',
    weather: {
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Peace Seekers', 'Photographers', 'Culture Enthusiasts']
  },
  {
    id: 'schinoussa',
    name: 'Schinoussa',
    description: 'Your complete guide to Schinoussa, a tiny paradise with golden beaches and authentic island charm.',
    image: '/images/islands/schinoussa.jpg',
    weather: {
      temp: 26,
      condition: 'sunny',
      summer: 'Warm and sunny with temperatures around 25-28°C',
      winter: 'Mild with occasional rain, 12-15°C',
      spring: 'Pleasant and mild, 18-22°C',
      autumn: 'Warm with occasional rain, 20-24°C'
    },
    bestTime: 'May to September',
    idealFor: ['Beach Lovers', 'Peace Seekers', 'Nature Enthusiasts']
  }
];

export const allPorts = [
  ...mainPorts,
  ...cyclades.flatMap(island => island.ports || [])
];

export const months: AvailableMonth[] = [
  AvailableMonth.APRIL,
  AvailableMonth.MAY,
  AvailableMonth.JUNE,
  AvailableMonth.JULY,
  AvailableMonth.AUGUST,
  AvailableMonth.SEPTEMBER,
  AvailableMonth.OCTOBER
];

export const allVibes = [
  IslandVibe.ROMANTIC,
  IslandVibe.PEACEFUL,
  IslandVibe.LIVELY,
  IslandVibe.ADVENTUROUS,
  IslandVibe.TRADITIONAL,
  IslandVibe.LUXURIOUS,
  IslandVibe.CULTURAL,
  IslandVibe.SCENIC
];

export const paces = [
  {
    value: 'relaxed',
    label: 'Relaxed',
    description: 'Take it easy, spend more time in each location',
    icon: '🌅'
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Balance between activities and relaxation',
    icon: '⚖️'
  },
  {
    value: 'active',
    label: 'Active',
    description: 'Pack in as many experiences as possible',
    icon: '🏃'
  }
];
