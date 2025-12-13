import { useParams, Link } from 'react-router-dom';
import { Ship, Clock, Euro, Calendar, Anchor, ChevronRight, ArrowRight, Info, Waves } from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import FAQSchema from '../components/FAQSchema';

// Ferry route data for programmatic SEO
interface FerryRoute {
    from: string;
    to: string;
    duration: string;
    minDuration: string;
    maxDuration: string;
    price: { economy: string; business: string };
    frequency: string;
    operators: string[];
    distance: string;
    ferryTypes: string[];
    peakSeasonTips: string;
    bookingAdvice: string;
}

const ferryRoutes: Record<string, FerryRoute> = {
    'piraeus-santorini': {
        from: 'Piraeus (Athens)',
        to: 'Santorini',
        duration: '4.5-8 hours',
        minDuration: '4h 30min',
        maxDuration: '8h',
        price: { economy: '€35-65', business: '€55-95' },
        frequency: '3-5 daily',
        operators: ['Blue Star Ferries', 'SeaJets', 'Golden Star'],
        distance: '200 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Book 2-3 weeks ahead in July-August. High-speed ferries sell out first.',
        bookingAdvice: 'Morning departures arrive before sunset - perfect for famous Santorini sunsets!'
    },
    'santorini-mykonos': {
        from: 'Santorini',
        to: 'Mykonos',
        duration: '2-3 hours',
        minDuration: '1h 45min',
        maxDuration: '3h',
        price: { economy: '€45-75', business: '€65-110' },
        frequency: '4-6 daily',
        operators: ['SeaJets', 'Golden Star', 'Minoan Lines'],
        distance: '110 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Most popular route! Book 1-2 weeks ahead minimum.',
        bookingAdvice: 'Early morning ferries let you maximize your day on both islands.'
    },
    'piraeus-mykonos': {
        from: 'Piraeus (Athens)',
        to: 'Mykonos',
        duration: '2.5-5 hours',
        minDuration: '2h 30min',
        maxDuration: '5h 30min',
        price: { economy: '€35-60', business: '€50-85' },
        frequency: '4-6 daily',
        operators: ['Blue Star Ferries', 'SeaJets', 'Hellenic Seaways'],
        distance: '150 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Extremely popular in summer. Book early!',
        bookingAdvice: 'High-speed ferries are worth the extra cost for comfort.'
    },
    'santorini-naxos': {
        from: 'Santorini',
        to: 'Naxos',
        duration: '1.5-2.5 hours',
        minDuration: '1h 30min',
        maxDuration: '2h 30min',
        price: { economy: '€30-50', business: '€45-70' },
        frequency: '3-4 daily',
        operators: ['Blue Star Ferries', 'SeaJets', 'Golden Star'],
        distance: '65 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Less crowded than Mykonos route but still book ahead.',
        bookingAdvice: 'Consider the slower ferry for sea views and lower prices.'
    },
    'mykonos-naxos': {
        from: 'Mykonos',
        to: 'Naxos',
        duration: '30min-1.5 hours',
        minDuration: '30min',
        maxDuration: '1h 30min',
        price: { economy: '€25-45', business: '€40-60' },
        frequency: '3-5 daily',
        operators: ['SeaJets', 'Blue Star Ferries', 'Express Skopelitis'],
        distance: '40 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Short route - even peak season tickets are manageable.',
        bookingAdvice: 'High-speed ferry is so quick, it\'s worth the premium.'
    },
    'piraeus-naxos': {
        from: 'Piraeus (Athens)',
        to: 'Naxos',
        duration: '4-6 hours',
        minDuration: '3h 45min',
        maxDuration: '6h',
        price: { economy: '€35-55', business: '€50-75' },
        frequency: '3-4 daily',
        operators: ['Blue Star Ferries', 'SeaJets', 'Hellenic Seaways'],
        distance: '175 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Good availability usually. Family-friendly island.',
        bookingAdvice: 'Overnight ferries available - arrive fresh in the morning!'
    },
    'piraeus-paros': {
        from: 'Piraeus (Athens)',
        to: 'Paros',
        duration: '3.5-5 hours',
        minDuration: '3h 30min',
        maxDuration: '5h',
        price: { economy: '€35-55', business: '€50-75' },
        frequency: '4-5 daily',
        operators: ['Blue Star Ferries', 'SeaJets', 'Golden Star'],
        distance: '160 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Central hub island - well-served with ferries.',
        bookingAdvice: 'Paros connects to most islands - perfect first stop!'
    },
    'paros-naxos': {
        from: 'Paros',
        to: 'Naxos',
        duration: '30-50 minutes',
        minDuration: '25min',
        maxDuration: '50min',
        price: { economy: '€10-20', business: '€20-35' },
        frequency: '8-12 daily',
        operators: ['Blue Star Ferries', 'Small ferries'],
        distance: '12 km',
        ferryTypes: ['High-speed catamaran', 'Small ferry', 'Car ferry'],
        peakSeasonTips: 'So many departures, no need to book ahead.',
        bookingAdvice: 'Shortest route - can even do a day trip!'
    },
    'santorini-ios': {
        from: 'Santorini',
        to: 'Ios',
        duration: '35-60 minutes',
        minDuration: '35min',
        maxDuration: '1h',
        price: { economy: '€20-40', business: '€35-55' },
        frequency: '3-4 daily',
        operators: ['SeaJets', 'Blue Star Ferries', 'Golden Star'],
        distance: '35 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Popular with younger travelers - book ahead in summer.',
        bookingAdvice: 'Quick hop - great for island hopping!'
    },
    'piraeus-milos': {
        from: 'Piraeus (Athens)',
        to: 'Milos',
        duration: '4-7 hours',
        minDuration: '4h',
        maxDuration: '7h',
        price: { economy: '€35-55', business: '€50-75' },
        frequency: '2-3 daily',
        operators: ['SeaJets', 'Blue Star Ferries', 'Zante Ferries'],
        distance: '150 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Milos is trending! Book early, especially August.',
        bookingAdvice: 'Western Cyclades route - different than Santorini/Mykonos.'
    },
    'santorini-paros': {
        from: 'Santorini',
        to: 'Paros',
        duration: '2-3.5 hours',
        minDuration: '2h',
        maxDuration: '3h 30min',
        price: { economy: '€35-55', business: '€50-80' },
        frequency: '3-4 daily',
        operators: ['Blue Star Ferries', 'SeaJets', 'Golden Star'],
        distance: '100 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Good connections. Paros is a central hub.',
        bookingAdvice: 'Use Paros as your base for island hopping!'
    },
    'mykonos-paros': {
        from: 'Mykonos',
        to: 'Paros',
        duration: '45min-1.5 hours',
        minDuration: '45min',
        maxDuration: '1h 30min',
        price: { economy: '€25-45', business: '€40-60' },
        frequency: '3-5 daily',
        operators: ['SeaJets', 'Blue Star Ferries', 'Golden Star'],
        distance: '45 km',
        ferryTypes: ['High-speed catamaran', 'Conventional ferry'],
        peakSeasonTips: 'Popular route but well-served.',
        bookingAdvice: 'High-speed ferry makes this a quick hop!'
    }
};

export default function FerryRoute() {
    const { route } = useParams<{ route: string }>();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const routeData = route ? ferryRoutes[route.toLowerCase()] : null;

    if (!routeData) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Ferry route not found</h1>
                    <Link to="/ferry-tickets" className="text-cyclades-turquoise hover:underline mt-4 inline-block">
                        Search all ferry routes →
                    </Link>
                </div>
            </div>
        );
    }

    const routeTitle = `${routeData.from} to ${routeData.to}`;
    const routeSlug = route?.toLowerCase() || '';

    const faqs = [
        {
            question: `How long is the ferry from ${routeData.from} to ${routeData.to}?`,
            answer: `The ferry from ${routeData.from} to ${routeData.to} takes ${routeData.duration}. High-speed ferries are fastest at ${routeData.minDuration}, while conventional ferries take up to ${routeData.maxDuration}.`
        },
        {
            question: `How much does the ${routeData.from} to ${routeData.to} ferry cost?`,
            answer: `Ferry tickets from ${routeData.from} to ${routeData.to} cost ${routeData.price.economy} for economy class and ${routeData.price.business} for business class. Prices vary by season and how far in advance you book.`
        },
        {
            question: `How many ferries run daily from ${routeData.from} to ${routeData.to}?`,
            answer: `There are ${routeData.frequency} ferries running from ${routeData.from} to ${routeData.to}. Frequency is highest in summer (June-September) and reduced in winter.`
        },
        {
            question: `Which ferry companies operate the ${routeData.from} to ${routeData.to} route?`,
            answer: `The ${routeData.from} to ${routeData.to} route is served by ${routeData.operators.join(', ')}. Each offers different schedules, speeds, and amenities.`
        },
        {
            question: `Should I book the ${routeData.from} to ${routeData.to} ferry in advance?`,
            answer: `${routeData.peakSeasonTips} ${routeData.bookingAdvice}`
        },
        {
            question: `Is there a high-speed ferry from ${routeData.from} to ${routeData.to}?`,
            answer: `Yes! Ferry types available on this route include: ${routeData.ferryTypes.join(', ')}. High-speed catamarans are faster but may be affected by rough seas.`
        }
    ];

    return (
        <>
            <BreadcrumbSchema items={[
                { name: 'Ferry Tickets', url: 'https://discovercyclades.gr/ferry-tickets' },
                { name: routeTitle, url: `https://discovercyclades.gr/ferry/${routeSlug}` }
            ]} />
            <FAQSchema faqs={faqs} pageUrl={`https://discovercyclades.gr/ferry/${routeSlug}`} />
            <SEO
                title={`${routeData.from} to ${routeData.to} Ferry 2026 | Schedules, Prices & Tickets`}
                description={`Book ${routeData.from} to ${routeData.to} ferry tickets. Duration: ${routeData.duration}. From ${routeData.price.economy}. ${routeData.frequency} departures daily. Compare ${routeData.operators.slice(0, 2).join(' vs ')}.`}
                pageType="ferry-tickets"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Ferry Tickets', url: '/ferry-tickets' },
                    { name: routeTitle, url: `/ferry/${routeSlug}` }
                ]}
            />

            <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                {/* Hero */}
                <div className="relative h-[45vh] min-h-[350px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 h-full flex items-center">
                        <div className="max-w-6xl mx-auto px-4 w-full">
                            <div className="text-white">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                                    <Ship className="w-4 h-4" />
                                    <span className="text-sm">Ferry Route Guide 2026</span>
                                </div>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    {routeData.from} → {routeData.to}
                                </h1>
                                <p className="text-xl md:text-2xl text-white/90 mb-6">
                                    {routeData.duration} • {routeData.frequency} daily • from {routeData.price.economy}
                                </p>
                                <Link
                                    to={`/ferry-tickets?from=${routeData.from.split(' ')[0].toLowerCase()}&to=${routeData.to.toLowerCase()}`}
                                    className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    Search Available Ferries
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 mb-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Clock, label: 'Duration', value: routeData.duration, color: 'bg-blue-500' },
                            { icon: Euro, label: 'From', value: routeData.price.economy, color: 'bg-green-500' },
                            { icon: Calendar, label: 'Frequency', value: routeData.frequency, color: 'bg-purple-500' },
                            { icon: Anchor, label: 'Distance', value: routeData.distance, color: 'bg-orange-500' }
                        ].map((item, idx) => (
                            <div key={idx} className={`rounded-xl p-4 ${isDark ? 'bg-dark-card' : 'bg-white'} shadow-lg`}>
                                <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                                    <item.icon className="w-5 h-5 text-white" />
                                </div>
                                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{item.label}</p>
                                <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ferry Operators */}
                <div className="max-w-6xl mx-auto px-4 mb-12">
                    <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Ferry Operators
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {routeData.operators.map((operator, idx) => (
                            <div key={operator} className={`rounded-xl p-6 ${isDark ? 'bg-dark-card' : 'bg-white'} shadow`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center`}>
                                        <Ship className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{operator}</h3>
                                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                                            {idx === 0 ? 'Most popular' : idx === 1 ? 'Best value' : 'Alternative'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Comparison */}
                <div className={`py-12 ${isDark ? 'bg-dark-card/50' : 'bg-white'}`}>
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Ticket Prices
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className={`rounded-xl p-6 ${isDark ? 'bg-dark-card' : 'bg-gray-50'}`}>
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Economy Class</h3>
                                <p className={`text-3xl font-bold text-blue-600 mb-4`}>{routeData.price.economy}</p>
                                <ul className={`space-y-2 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                        Standard seating
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                        Access to deck and lounges
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                        Luggage included
                                    </li>
                                </ul>
                            </div>
                            <div className={`rounded-xl p-6 ${isDark ? 'bg-dark-card' : 'bg-gray-50'} ring-2 ring-blue-500`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Business Class</h3>
                                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Recommended</span>
                                </div>
                                <p className={`text-3xl font-bold text-blue-600 mb-4`}>{routeData.price.business}</p>
                                <ul className={`space-y-2 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                        Reserved comfortable seating
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                        Priority boarding
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                        Quiet lounge access
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                        Power outlets & WiFi
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ferry Types */}
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Ferry Types on This Route
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {routeData.ferryTypes.map((type, idx) => (
                            <div key={type} className={`rounded-xl p-6 ${isDark ? 'bg-dark-card' : 'bg-white'} shadow flex items-start gap-4`}>
                                <div className={`w-12 h-12 rounded-lg ${idx === 0 ? 'bg-blue-500' : 'bg-gray-500'} flex items-center justify-center flex-shrink-0`}>
                                    {idx === 0 ? <Waves className="w-6 h-6 text-white" /> : <Ship className="w-6 h-6 text-white" />}
                                </div>
                                <div>
                                    <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{type}</h3>
                                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                                        {idx === 0
                                            ? `Fastest option: ${routeData.minDuration}. Modern, comfortable, may be affected by rough seas.`
                                            : `Slower but steadier: up to ${routeData.maxDuration}. More spacious, better for families.`
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tips Section */}
                <div className={`py-12 ${isDark ? 'bg-dark-card/50' : 'bg-blue-50'}`}>
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Booking Tips
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className={`rounded-xl p-6 ${isDark ? 'bg-dark-card' : 'bg-white'} shadow`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <Info className="w-6 h-6 text-blue-500" />
                                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Peak Season Advice</h3>
                                </div>
                                <p className={isDark ? 'text-white/70' : 'text-gray-600'}>{routeData.peakSeasonTips}</p>
                            </div>
                            <div className={`rounded-xl p-6 ${isDark ? 'bg-dark-card' : 'bg-white'} shadow`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <Anchor className="w-6 h-6 text-green-500" />
                                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Pro Tip</h3>
                                </div>
                                <p className={isDark ? 'text-white/70' : 'text-gray-600'}>{routeData.bookingAdvice}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-6xl mx-auto px-4 py-12 text-center">
                    <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Ready to Book?
                    </h2>
                    <p className={`mb-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                        Compare all {routeData.operators.length} operators and find the best schedule for your trip.
                    </p>
                    <Link
                        to={`/ferry-tickets?from=${routeData.from.split(' ')[0].toLowerCase()}&to=${routeData.to.toLowerCase()}`}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
                    >
                        <Ship className="w-5 h-5" />
                        Search Ferry Tickets
                    </Link>
                </div>

                {/* Related Routes */}
                <div className="max-w-6xl mx-auto px-4 pb-12">
                    <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Related Ferry Routes
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(ferryRoutes)
                            .filter(([key]) => key !== routeSlug)
                            .slice(0, 6)
                            .map(([key, r]) => (
                                <Link
                                    key={key}
                                    to={`/ferry/${key}`}
                                    className={`px-4 py-2 rounded-full ${isDark ? 'bg-dark-card hover:bg-white/10 text-white' : 'bg-white hover:bg-gray-100 text-gray-900'
                                        } shadow transition-colors text-sm`}
                                >
                                    {r.from.split(' ')[0]} → {r.to}
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
