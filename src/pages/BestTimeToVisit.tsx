import { useParams, Link } from 'react-router-dom';
import { Calendar, Sun, Umbrella, Users, ThermometerSun, Waves } from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import FAQSchema from '../components/FAQSchema';

// Island weather and travel data
const islandData: Record<string, {
    name: string;
    bestMonths: string[];
    peakSeason: string;
    shoulderSeason: string;
    offSeason: string;
    avgTempSummer: number;
    avgTempWinter: number;
    seaTempSummer: number;
    crowdLevel: { summer: string; shoulder: string; winter: string };
    priceLevel: { summer: string; shoulder: string; winter: string };
    highlights: { month: string; event: string }[];
    description: string;
    whyVisit: string[];
}> = {
    santorini: {
        name: 'Santorini',
        bestMonths: ['May', 'June', 'September', 'October'],
        peakSeason: 'July-August',
        shoulderSeason: 'April-May, September-October',
        offSeason: 'November-March',
        avgTempSummer: 28,
        avgTempWinter: 14,
        seaTempSummer: 25,
        crowdLevel: { summer: 'Very High', shoulder: 'Moderate', winter: 'Low' },
        priceLevel: { summer: '€€€€', shoulder: '€€€', winter: '€€' },
        highlights: [
            { month: 'April', event: 'Orthodox Easter celebrations' },
            { month: 'May', event: 'Wildflowers bloom across the caldera' },
            { month: 'July', event: 'Ifestia Festival - volcano celebrations' },
            { month: 'September', event: 'Wine harvest season begins' },
            { month: 'October', event: 'Perfect weather, fewer crowds' }
        ],
        description: 'Santorini enjoys a Mediterranean climate with hot, dry summers and mild winters. The famous sunsets are visible year-round, but the best weather for swimming and outdoor activities is from May to October.',
        whyVisit: [
            'Iconic caldera sunsets from Oia',
            'World-class volcanic wines',
            'Unique black and red sand beaches',
            'Ancient Akrotiri archaeological site',
            'Romantic atmosphere perfect for couples'
        ]
    },
    mykonos: {
        name: 'Mykonos',
        bestMonths: ['May', 'June', 'September', 'October'],
        peakSeason: 'July-August',
        shoulderSeason: 'May-June, September-October',
        offSeason: 'November-April',
        avgTempSummer: 27,
        avgTempWinter: 13,
        seaTempSummer: 24,
        crowdLevel: { summer: 'Extremely High', shoulder: 'High', winter: 'Low' },
        priceLevel: { summer: '€€€€€', shoulder: '€€€', winter: '€€' },
        highlights: [
            { month: 'May', event: 'Beach clubs open for the season' },
            { month: 'June', event: 'Pride celebrations' },
            { month: 'July', event: 'Peak party season begins' },
            { month: 'August', event: 'International DJs, celebrity sightings' },
            { month: 'September', event: 'More relaxed beach atmosphere' }
        ],
        description: 'Mykonos is famous for its vibrant nightlife and beautiful beaches. The meltemi winds in July-August can be strong but keep temperatures comfortable. Best for beach lovers and party-goers.',
        whyVisit: [
            'World-famous beach clubs and nightlife',
            'Picturesque Little Venice waterfront',
            'Iconic windmills and white-washed streets',
            'Luxury shopping and dining',
            'Crystal-clear beaches like Paradise and Psarou'
        ]
    },
    naxos: {
        name: 'Naxos',
        bestMonths: ['May', 'June', 'September', 'October'],
        peakSeason: 'July-August',
        shoulderSeason: 'April-June, September-October',
        offSeason: 'November-March',
        avgTempSummer: 27,
        avgTempWinter: 13,
        seaTempSummer: 24,
        crowdLevel: { summer: 'Moderate', shoulder: 'Low', winter: 'Very Low' },
        priceLevel: { summer: '€€€', shoulder: '€€', winter: '€' },
        highlights: [
            { month: 'April', event: 'Greek Easter with local traditions' },
            { month: 'July', event: 'Fish festival in Apollonas' },
            { month: 'August', event: 'Festival of the Dormition' },
            { month: 'September', event: 'Grape harvest, local wine festivals' },
            { month: 'October', event: 'Potato festival in the villages' }
        ],
        description: 'Naxos is the largest Cyclades island with diverse landscapes from beaches to mountains. It enjoys longer seasons than other islands and is excellent for families with its shallow, sandy beaches.',
        whyVisit: [
            'Best beaches in the Cyclades (Plaka, Agios Prokopios)',
            'Family-friendly with calm, shallow waters',
            'Rich history with the Portara temple gate',
            'Authentic village life in the interior',
            'Local cheese, potatoes, and wine production'
        ]
    },
    paros: {
        name: 'Paros',
        bestMonths: ['May', 'June', 'September', 'October'],
        peakSeason: 'July-August',
        shoulderSeason: 'May-June, September-October',
        offSeason: 'November-April',
        avgTempSummer: 27,
        avgTempWinter: 13,
        seaTempSummer: 24,
        crowdLevel: { summer: 'High', shoulder: 'Moderate', winter: 'Low' },
        priceLevel: { summer: '€€€', shoulder: '€€', winter: '€' },
        highlights: [
            { month: 'May', event: 'Wildflower season in the countryside' },
            { month: 'July', event: 'Windsurfing championship season' },
            { month: 'August', event: 'Festival of the Assumption' },
            { month: 'August', event: 'Pirate festival in Naoussa' },
            { month: 'September', event: 'Perfect windsurfing conditions' }
        ],
        description: 'Paros offers a perfect balance between lively towns and peaceful beaches. Known as the windsurfing capital of Greece, it has excellent conditions from June to September.',
        whyVisit: [
            'World-class windsurfing at Golden Beach',
            'Charming Naoussa fishing village',
            'Easy day trips to Antiparos',
            'Traditional marble quarries',
            'Great nightlife without Mykonos prices'
        ]
    },
    milos: {
        name: 'Milos',
        bestMonths: ['May', 'June', 'September'],
        peakSeason: 'July-August',
        shoulderSeason: 'May-June, September-October',
        offSeason: 'November-April',
        avgTempSummer: 27,
        avgTempWinter: 13,
        seaTempSummer: 24,
        crowdLevel: { summer: 'Moderate', shoulder: 'Low', winter: 'Very Low' },
        priceLevel: { summer: '€€€', shoulder: '€€', winter: '€' },
        highlights: [
            { month: 'May', event: 'Perfect for hiking and exploration' },
            { month: 'June', event: 'Sea caves accessible by boat' },
            { month: 'July', event: 'Sarakiniko beach at its best' },
            { month: 'August', event: 'Traditional festivals in villages' },
            { month: 'September', event: 'Still warm, significantly fewer crowds' }
        ],
        description: 'Milos is famous for having the most beaches of any Cyclades island - over 70! Its volcanic origins create stunning rock formations. The island is relatively less touristy than Santorini or Mykonos.',
        whyVisit: [
            '70+ unique beaches with lunar landscapes',
            'Famous Sarakiniko white rock beach',
            'Colorful fishing village of Klima',
            'Ancient catacombs and Venus de Milo origins',
            'Excellent seafood and local cuisine'
        ]
    },
    ios: {
        name: 'Ios',
        bestMonths: ['May', 'June', 'September'],
        peakSeason: 'July-August',
        shoulderSeason: 'May-June, September',
        offSeason: 'October-April',
        avgTempSummer: 27,
        avgTempWinter: 13,
        seaTempSummer: 24,
        crowdLevel: { summer: 'Very High', shoulder: 'Moderate', winter: 'Very Low' },
        priceLevel: { summer: '€€€', shoulder: '€€', winter: '€' },
        highlights: [
            { month: 'June', event: 'Beach clubs and bars open' },
            { month: 'July', event: 'Peak party season' },
            { month: 'August', event: 'Full moon parties at Mylopotas' },
            { month: 'September', event: 'More relaxed atmosphere returns' }
        ],
        description: 'Ios is known for its vibrant nightlife and beautiful beaches. While famous as a party destination, it also has quieter spots and a charming hilltop Chora worth exploring.',
        whyVisit: [
            'Epic nightlife in Chora',
            'Beautiful Mylopotas beach',
            'Homers Tomb archaeological site',
            'Budget-friendly compared to neighbors',
            'Mix of party and peaceful areas'
        ]
    },
    folegandros: {
        name: 'Folegandros',
        bestMonths: ['May', 'June', 'September', 'October'],
        peakSeason: 'July-August',
        shoulderSeason: 'May-June, September-October',
        offSeason: 'November-April',
        avgTempSummer: 26,
        avgTempWinter: 13,
        seaTempSummer: 23,
        crowdLevel: { summer: 'Moderate', shoulder: 'Low', winter: 'Very Low' },
        priceLevel: { summer: '€€€', shoulder: '€€', winter: '€' },
        highlights: [
            { month: 'May', event: 'Wildflowers cover the cliffs' },
            { month: 'June', event: 'Perfect hiking weather' },
            { month: 'August', event: 'Assumption festivities' },
            { month: 'September', event: 'Grape harvest in villages' }
        ],
        description: 'Folegandros is a hidden gem famous for its dramatic cliff-top Chora and lack of mass tourism. Its rugged landscape and traditional atmosphere attract travelers seeking authentic Greek island life.',
        whyVisit: [
            'Dramatic cliff-top Chora village',
            'Unspoiled, authentic atmosphere',
            'Excellent hiking trails',
            'No cruise ship crowds',
            'Authentic Greek tavernas'
        ]
    },
    sifnos: {
        name: 'Sifnos',
        bestMonths: ['May', 'June', 'September', 'October'],
        peakSeason: 'July-August',
        shoulderSeason: 'May-June, September-October',
        offSeason: 'November-April',
        avgTempSummer: 26,
        avgTempWinter: 13,
        seaTempSummer: 23,
        crowdLevel: { summer: 'Moderate', shoulder: 'Low', winter: 'Very Low' },
        priceLevel: { summer: '€€€', shoulder: '€€', winter: '€' },
        highlights: [
            { month: 'May', event: 'Spring flowers and hiking' },
            { month: 'July', event: 'Pottery workshops active' },
            { month: 'September', event: 'Panagia Chrissopigi festival' },
            { month: 'September', event: 'Cyclades gastronomy festival' }
        ],
        description: 'Sifnos is the culinary capital of the Cyclades, famous for its pottery tradition and gourmet restaurants. The island has beautiful hiking trails connecting traditional villages.',
        whyVisit: [
            'Best food in the Cyclades',
            'Famous pottery tradition',
            '100km of marked hiking trails',
            'Peaceful, sophisticated atmosphere',
            'Beautiful traditional villages'
        ]
    }
};

const monthlyWeather = [
    { month: 'January', temp: 13, rain: 70, sea: 16, crowd: 'Very Low', summary: 'Cool and quiet - great for hiking' },
    { month: 'February', temp: 13, rain: 55, sea: 15, crowd: 'Very Low', summary: 'Short days but beautiful light' },
    { month: 'March', temp: 14, rain: 45, sea: 16, crowd: 'Low', summary: 'Spring arrives, wildflowers bloom' },
    { month: 'April', temp: 17, rain: 20, sea: 17, crowd: 'Low', summary: 'Easter celebrations, perfect hiking' },
    { month: 'May', temp: 21, rain: 10, sea: 19, crowd: 'Moderate', summary: 'Ideal! Warm, not crowded' },
    { month: 'June', temp: 25, rain: 3, sea: 22, crowd: 'High', summary: 'Beach season begins, great weather' },
    { month: 'July', temp: 27, rain: 1, sea: 24, crowd: 'Very High', summary: 'Hot! Peak season, busy everywhere' },
    { month: 'August', temp: 28, rain: 1, sea: 25, crowd: 'Very High', summary: 'Hottest month, meltemi winds' },
    { month: 'September', temp: 25, rain: 10, sea: 24, crowd: 'High', summary: 'Perfect! Warm sea, fewer crowds' },
    { month: 'October', temp: 21, rain: 35, sea: 22, crowd: 'Moderate', summary: 'Still warm, some rain possible' },
    { month: 'November', temp: 17, rain: 50, sea: 20, crowd: 'Low', summary: 'Shoulder season ends, cooling down' },
    { month: 'December', temp: 14, rain: 65, sea: 17, crowd: 'Very Low', summary: 'Quiet and cool, holiday atmosphere' }
];

export default function BestTimeToVisit() {
    const { island } = useParams<{ island: string }>();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const data = island ? islandData[island.toLowerCase()] : null;

    if (!data) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Island not found</h1>
                    <Link to="/islands" className="text-cyclades-turquoise hover:underline mt-4 inline-block">
                        View all islands →
                    </Link>
                </div>
            </div>
        );
    }

    const faqs = [
        {
            question: `What is the best time to visit ${data.name}?`,
            answer: `The best time to visit ${data.name} is ${data.bestMonths.join(', ')}. These months offer ideal weather (${data.avgTempSummer - 2}°C average), warm sea temperatures, and fewer crowds than peak season. ${data.shoulderSeason} are excellent shoulder season options.`
        },
        {
            question: `Is ${data.name} worth visiting in winter?`,
            answer: `${data.name} in winter (${data.offSeason}) offers a completely different experience. Expect cooler temperatures (${data.avgTempWinter}°C average), some rain, and many businesses closed. However, you'll enjoy authentic local life, lower prices, and no crowds.`
        },
        {
            question: `How crowded is ${data.name} in summer?`,
            answer: `During ${data.peakSeason}, ${data.name} experiences ${data.crowdLevel.summer} crowd levels. Expect higher prices (${data.priceLevel.summer}), full hotels, and busy beaches. Book accommodation and ferries well in advance.`
        },
        {
            question: `What is the sea temperature in ${data.name}?`,
            answer: `Sea temperature in ${data.name} peaks at ${data.seaTempSummer}°C in August. Swimming is comfortable from June through October. In May, the sea is around 19°C - refreshing but swimmable.`
        },
        {
            question: `What events happen in ${data.name}?`,
            answer: `${data.name} hosts various events throughout the year including: ${data.highlights.map(h => `${h.event} (${h.month})`).join(', ')}.`
        },
        {
            question: `Is September a good time to visit ${data.name}?`,
            answer: `September is one of the best times to visit ${data.name}! You get warm weather (25°C average), warm sea for swimming (24°C), significantly fewer crowds than August, and better prices. Many consider it the sweet spot for Greek island travel.`
        }
    ];

    return (
        <>
            <BreadcrumbSchema items={[
                { name: 'Weather', url: 'https://discovercyclades.gr/weather' },
                { name: `Best Time ${data.name}`, url: `https://discovercyclades.gr/best-time-to-visit/${island}` }
            ]} />
            <FAQSchema faqs={faqs} pageUrl={`https://discovercyclades.gr/best-time-to-visit/${island}`} />
            <SEO
                title={`Best Time to Visit ${data.name} 2026 | Month-by-Month Weather Guide`}
                description={`When to visit ${data.name}? Complete 2026 guide: weather by month, crowd levels, prices, events & festivals. Best months: ${data.bestMonths.join(', ')}. Plan your perfect trip!`}
                pageType="guides"
                breadcrumbs={[
                    { name: 'Home', url: '/' },
                    { name: 'Weather', url: '/weather' },
                    { name: `Best Time to Visit ${data.name}`, url: `/best-time-to-visit/${island}` }
                ]}
            />

            <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                {/* Hero */}
                <div className="relative h-[50vh] min-h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500" />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative z-10 h-full flex items-center">
                        <div className="max-w-4xl mx-auto px-4 text-center text-white">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">2026 Travel Guide</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Best Time to Visit {data.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Summary Cards */}
                <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-20 mb-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Sun, label: 'Best Months', value: data.bestMonths.slice(0, 2).join(' & '), color: 'bg-yellow-500' },
                            { icon: ThermometerSun, label: 'Summer Temp', value: `${data.avgTempSummer}°C`, color: 'bg-orange-500' },
                            { icon: Waves, label: 'Sea Temp', value: `${data.seaTempSummer}°C`, color: 'bg-cyan-500' },
                            { icon: Users, label: 'Peak Crowds', value: data.crowdLevel.summer, color: 'bg-red-500' }
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

                {/* Month by Month */}
                <div className="max-w-6xl mx-auto px-4 mb-16">
                    <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Month-by-Month Weather Guide
                    </h2>
                    <div className="grid gap-4">
                        {monthlyWeather.map((month, idx) => (
                            <div
                                key={month.month}
                                className={`rounded-xl p-4 ${isDark ? 'bg-dark-card' : 'bg-white'} shadow ${data.bestMonths.includes(month.month) ? 'ring-2 ring-green-500' : ''
                                    }`}
                            >
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="w-24">
                                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {month.month}
                                        </span>
                                        {data.bestMonths.includes(month.month) && (
                                            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Best</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-6 flex-wrap flex-1">
                                        <div className="flex items-center gap-2">
                                            <ThermometerSun className={`w-4 h-4 ${isDark ? 'text-orange-400' : 'text-orange-500'}`} />
                                            <span className={isDark ? 'text-white/80' : 'text-gray-700'}>{month.temp}°C</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Waves className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-500'}`} />
                                            <span className={isDark ? 'text-white/80' : 'text-gray-700'}>{month.sea}°C sea</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Umbrella className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                                            <span className={isDark ? 'text-white/80' : 'text-gray-700'}>{month.rain}mm rain</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
                                            <span className={isDark ? 'text-white/80' : 'text-gray-700'}>{month.crowd}</span>
                                        </div>
                                    </div>
                                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'} hidden md:block`}>
                                        {month.summary}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seasonal Comparison */}
                <div className={`py-16 ${isDark ? 'bg-dark-card/50' : 'bg-white'}`}>
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Season Comparison
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { season: 'Peak Season', period: data.peakSeason, crowd: data.crowdLevel.summer, price: data.priceLevel.summer, color: 'red' },
                                { season: 'Shoulder Season', period: data.shoulderSeason, crowd: data.crowdLevel.shoulder, price: data.priceLevel.shoulder, color: 'yellow' },
                                { season: 'Off Season', period: data.offSeason, crowd: data.crowdLevel.winter, price: data.priceLevel.winter, color: 'blue' }
                            ].map((s) => (
                                <div key={s.season} className={`rounded-xl p-6 ${isDark ? 'bg-dark-card' : 'bg-gray-50'}`}>
                                    <div className={`text-${s.color}-500 font-bold text-lg mb-2`}>{s.season}</div>
                                    <p className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.period}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className={isDark ? 'text-white/60' : 'text-gray-500'}>Crowds</span>
                                            <span className={isDark ? 'text-white' : 'text-gray-900'}>{s.crowd}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className={isDark ? 'text-white/60' : 'text-gray-500'}>Prices</span>
                                            <span className={isDark ? 'text-white' : 'text-gray-900'}>{s.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Events & Highlights */}
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Events & Highlights in {data.name}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.highlights.map((h, idx) => (
                            <div key={idx} className={`rounded-xl p-4 ${isDark ? 'bg-dark-card' : 'bg-white'} shadow`}>
                                <div className={`text-sm font-bold ${isDark ? 'text-cyclades-turquoise' : 'text-blue-600'} mb-1`}>
                                    {h.month}
                                </div>
                                <p className={isDark ? 'text-white' : 'text-gray-900'}>{h.event}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Visit */}
                <div className={`py-16 ${isDark ? 'bg-dark-card/50' : 'bg-gray-100'}`}>
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Why Visit {data.name}?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {data.whyVisit.map((reason, idx) => (
                                <div key={idx} className={`flex items-center gap-3 p-4 rounded-lg ${isDark ? 'bg-dark-card' : 'bg-white'}`}>
                                    <Sun className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-cyclades-turquoise' : 'text-blue-500'}`} />
                                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{reason}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTAs */}
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link
                            to={`/guides/${island}`}
                            className={`group p-6 rounded-xl ${isDark ? 'bg-dark-card hover:bg-dark-card/80' : 'bg-white hover:shadow-lg'} transition-all`}
                        >
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                📖 {data.name} Complete Guide
                            </h3>
                            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                Beaches, villages, restaurants & everything you need to know
                            </p>
                        </Link>
                        <Link
                            to={`/ferry-tickets?to=${island}`}
                            className={`group p-6 rounded-xl ${isDark ? 'bg-dark-card hover:bg-dark-card/80' : 'bg-white hover:shadow-lg'} transition-all`}
                        >
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                🚢 Ferry to {data.name}
                            </h3>
                            <p className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                Book ferry tickets from Athens or other islands
                            </p>
                        </Link>
                    </div>
                </div>

                {/* Related Islands */}
                <div className="max-w-6xl mx-auto px-4 pb-16">
                    <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Explore Other Islands
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(islandData)
                            .filter(([key]) => key !== island?.toLowerCase())
                            .slice(0, 6)
                            .map(([key, d]) => (
                                <Link
                                    key={key}
                                    to={`/best-time-to-visit/${key}`}
                                    className={`px-4 py-2 rounded-full ${isDark ? 'bg-dark-card hover:bg-white/10 text-white' : 'bg-white hover:bg-gray-100 text-gray-900'
                                        } shadow transition-colors`}
                                >
                                    Best Time to Visit {d.name}
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
