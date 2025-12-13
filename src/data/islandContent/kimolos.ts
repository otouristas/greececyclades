// Kimolos Island Content Data
// Following Hub & Spoke SEO Strategy

export const kimolosData = {
    // Meta & SEO
    seo: {
        title: "Kimolos Travel Guide 2026 - Complete Island Guide | Discover Cyclades",
        description: "Discover Kimolos, Greece's hidden Cycladic gem. Explore pristine beaches like Prassa, the medieval Kastro, Skiadi rock formation, and authentic local cuisine. Plan your ferry trip now!",
        keywords: [
            'Kimolos travel guide', 'Kimolos beaches', 'Kimolos ferry',
            'Western Cyclades', 'Prassa beach', 'Skiadi rock', 'Chorio village',
            'Greek islands', 'Kimolos restaurants', 'best time to visit Kimolos'
        ]
    },

    // Quick Facts
    quickFacts: {
        location: 'Western Cyclades (1km from Milos)',
        population: '~700 residents',
        bestTime: 'May-September',
        ferryFromMilos: '25-50 minutes',
        ferryFromAthens: '5-7 hours',
        ferryCost: '€4.50-€130+',
        accessibility: 'Only by ferry (no airport)',
        mainTown: 'Chorio',
        famousFor: 'Pristine beaches, Skiadi rock, authentic island life'
    },

    // Introduction
    introduction: {
        short: `Right next to the famous island of Milos lies a gorgeous, lesser-known neighbor: Kimolos Island. This volcanic gem in the Aegean Sea showcases turquoise waters, charming villages, and a laid-back vibe that feels like stepping back in time.`,
        full: `Right next to the famous island of Milos lies a gorgeous, lesser-known neighbor: Kimolos Island. This volcanic gem in the Aegean Sea showcases turquoise waters, charming villages, and a laid-back vibe that feels like stepping back in time. Whether you're looking for a day trip from Milos or a quiet vacation spot to escape the crowds, Kimolos is an easy-going destination perfect for nature lovers and those seeking authentic Greek hospitality.

    Often described as Milos's "younger, quieter sister," Kimolos has retained its authentic charm, avoiding the commercialism that plagues larger Greek islands. The island combines rugged natural beauty, pristine beaches, rich history dating back to Neolithic times, and the warmth of Greek island hospitality—what locals call "Filotimo"—making it a truly unique Mediterranean destination.`
    },

    // Ferry Information
    ferry: {
        fromAthens: {
            duration: '5-7 hours',
            frequency: '2-3 ferries per week',
            operators: ['Aegean Sea Lines', 'SeaJets', 'Zante Ferries'],
            cost: '€42-€130+ per adult',
            carCost: '~€60 per vehicle'
        },
        fromMilos: {
            duration: '25-50 minutes',
            frequency: '3-6 daily (summer)',
            cost: '€4.50-€6 per adult',
            carCost: '€63+ per vehicle'
        },
        fromLavrio: {
            cost: 'From €20 (most affordable)',
            carCost: '€118+ per vehicle'
        }
    },

    // Seasons
    seasons: {
        peak: {
            period: 'Late June - Early September',
            temp: '28-32°C',
            sea: 'Ideal for swimming',
            crowds: 'Busiest, book in advance',
            pros: ['Perfect weather', 'All facilities open'],
            cons: ['Higher prices', 'Limited availability']
        },
        ideal: {
            period: 'May-June & September',
            temp: '22-27°C',
            crowds: 'Moderate',
            recommendation: 'September is excellent—warm sea, fewer crowds'
        },
        shoulder: {
            period: 'April & October',
            notes: 'Cool mornings, some facilities closed'
        },
        winter: {
            period: 'October-April',
            temp: '10-18°C',
            notes: 'Most facilities closed'
        }
    },

    // Beaches - Top 4 for Hub, All 15+ for Guide
    beaches: {
        featured: [
            {
                name: 'Prassa (Agios Georgios)',
                rating: 5,
                tagline: 'The Jewel Crown',
                features: ['White sand', 'Turquoise water', 'Sea caves', 'Beach bar'],
                bestFor: 'Photography, swimming, full-day relaxation',
                bestTime: 'Early morning (7-9 AM)',
                duration: 'Half to full day'
            },
            {
                name: 'Bonatsa',
                rating: 4,
                tagline: 'The Family Favorite',
                features: ['Large sandy beach', 'Shallow calm waters', 'Wind protected'],
                bestFor: 'Families with children',
                restaurant: 'Sardis (fresh fish, lobster pasta)'
            },
            {
                name: 'Mavrospilia',
                rating: 4,
                tagline: 'Sunset Paradise',
                features: ['White rock formations', 'Best sunset views', 'Sandy beach'],
                bestTime: '1-2 hours before sunset'
            }
        ],
        all: [
            // Full list of 15+ beaches for comprehensive guide
            'Prassa', 'Bonatsa', 'Mavrospilia', 'Aliki', 'Goupa', 'Karras',
            'Rema (Elephant Beach)', 'Agios Georgios', 'Ellinika', 'Agioklima',
            'Gerakia Cave', 'Klima', 'Monastiria', 'Kalamitsi', 'Soufi'
        ]
    },

    // Attractions
    attractions: {
        chorio: {
            name: 'Chorio (The Capital)',
            features: ['Whitewashed buildings', 'Blue doors', 'Cobblestone streets', 'Bougainvillea courtyards'],
            museums: ['Archaeological Museum', 'Folklore & Maritime Museum'],
            duration: '2-3 hours'
        },
        kastro: {
            name: 'Medieval Kastro',
            description: 'Fortification with Mesa (inner) and Exo (outer) sections',
            features: ['Narrow alleys', 'Churches', 'Panoramic views'],
            history: 'Protection against pirates during medieval period'
        },
        skiadi: {
            name: 'Skiadi Rock',
            description: 'Giant mushroom-shaped rock (UNESCO recognized)',
            location: 'Northwestern Kimolos',
            formation: 'Created by Meltemi wind erosion over thousands of years',
            bestTime: 'Late afternoon for sunset views',
            routes: [
                { name: 'Short Route', duration: '35-40 minutes', from: 'Lebounia' },
                { name: 'Long Route', duration: '60-90 minutes', from: 'Agios Minas Church' }
            ]
        },
        ellinika: {
            name: 'Ellinika (Sunken City)',
            description: 'Hellenistic-era city submerged underwater',
            bestFor: 'Snorkeling, scuba diving',
            features: ['Ancient houses', 'Wells', 'Mycenaean walls', 'Tombs']
        },
        polyaigos: {
            name: 'Polyaigos Island',
            tagline: 'Largest uninhabited Mediterranean island',
            features: ['Pristine beaches', 'Sea caves', 'Monk seal colonies', 'Ancient shipwreck'],
            excursion: 'Half-day or full-day boat trips'
        }
    },

    // Restaurants
    restaurants: [
        {
            name: 'Sardis',
            location: 'Bonatsa Beach',
            specialties: ['Fresh fish', 'Lobster pasta', 'Goat stew'],
            ambiance: 'Beachfront, casual',
            phone: null
        },
        {
            name: 'Kali Kardia "Bohoris"',
            location: 'Chorio',
            specialties: ['Goat stew (stifado)', 'Meatballs', 'Local vegetables'],
            clientele: 'Local favorite'
        },
        {
            name: 'To Kyma',
            location: 'Psathi Port',
            specialties: ['Gourmet seafood'],
            pricePoint: 'Premium',
            ambiance: 'Waterfront'
        },
        {
            name: 'Prassonissi',
            location: 'Prassa Beach',
            specialties: ['Grouper carpaccio', 'Cheese doughnuts', 'Steamed mussels', 'Seafood risotto'],
            phone: '+30 694 862 0224',
            view: 'Sea balcony'
        },
        {
            name: 'Stavento',
            location: 'Chorio',
            specialties: ['Homemade gelato', 'Desserts']
        }
    ],

    // Local Cuisine
    cuisine: {
        dishes: [
            { name: 'Ladenia', description: 'Traditional flatbread with tomatoes, onions, oregano' },
            { name: 'Tyrenia', description: 'Savory cheese pie with local Manoura cheese' },
            { name: 'Manoura Cheese', description: 'Unique cheese only from Kimolos/Milos region' },
            { name: 'Dried Figs (Ischades)', description: 'Famous since antiquity' }
        ]
    },

    // Accommodation
    accommodation: {
        luxury: [
            { name: 'Azure Kimolos', location: 'Chorio', features: ['Modern', 'Studios with balconies'] },
            { name: 'Alisea Resort', location: 'Beachfront', features: ['Oceanfront', 'Garden setting'] }
        ],
        midRange: [
            { name: 'Kimolia Gi', location: 'Prassa', features: ['Beach access', 'Donkey rides'] },
            { name: 'To Rantevou tis Alykis', location: 'Aliki', features: ['Spacious rooms', 'Excellent hospitality'] }
        ],
        budget: [
            { name: 'Nianiari House', location: 'Chorio', features: ['Air-conditioned', 'Great value'] },
            { name: 'Tressos Maisons', location: 'Chorio', features: ['New, very clean'] }
        ]
    },

    // FAQs
    faqs: [
        {
            question: 'Is Kimolos worth visiting?',
            answer: 'Absolutely! Perfect for those seeking authentic Greek island culture without mass tourism. If you prioritize tranquility over nightlife, YES.'
        },
        {
            question: 'How do I get to Kimolos from Athens?',
            answer: 'Ferry from Piraeus (5-7 hours) or Lavrio (longer, cheaper). Book in advance during summer.'
        },
        {
            question: 'Do I need a car in Kimolos?',
            answer: 'While a small bus exists, renting a car (€25-€35/day) is recommended for exploring remote beaches and Skiadi.'
        },
        {
            question: 'What is the best beach in Kimolos?',
            answer: 'Prassa (Agios Georgios) - pristine white sand, turquoise water. Rated among the best in the Cyclades.'
        },
        {
            question: 'When is the best time to visit?',
            answer: 'May-September. Best month: September (warm sea, fewer tourists, better prices).'
        },
        {
            question: 'Can I visit Kimolos as a day trip?',
            answer: 'Yes from Milos (ferry 25-50 min), but staying overnight lets you experience true island life.'
        }
    ],

    // Car Rentals
    carRentals: [
        { name: 'RAC.SA', phone: '2287 051116', vehicles: 'Cars, 4x4s, luxury' },
        { name: 'Kimolos Moto', phone: '6984278789', vehicles: 'Cars, ATVs, Scooters', season: 'May 1 - Nov 1' },
        { name: 'PS Car Rental', phone: '6980055320', features: ['Free port pickup', 'Unlimited km'] }
    ]
};
