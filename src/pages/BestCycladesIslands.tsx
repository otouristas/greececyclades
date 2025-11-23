import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { generateKeywordsWithLSI, optimizeMetaDescription } from '../utils/seo';
import { PRIORITY_KEYWORDS } from '../constants/seo';
import { MapPin, Ship, Hotel, Calendar, Star, ArrowRight } from 'lucide-react';

const BestCycladesIslands: React.FC = () => {
  const faqItems = [
    {
      question: 'Which Cyclades island is the most beautiful?',
      answer: 'Beauty is subjective, but Santorini is widely considered the most visually stunning with its dramatic caldera, whitewashed cliffside villages, and world-famous sunsets. However, each island has unique beauty - Milos offers geological wonders, Naxos has diverse landscapes, and Folegandros has unspoiled charm. The "most beautiful" depends on what you seek: romance (Santorini), beaches (Naxos, Paros), or authenticity (Sifnos, Folegandros).'
    },
    {
      question: 'Which Cyclades islands should I visit first?',
      answer: 'For first-time visitors, we recommend starting with Santorini, Mykonos, and Naxos. These three islands offer the perfect introduction: Santorini for its iconic views, Mykonos for cosmopolitan atmosphere, and Naxos for authentic Greek culture. They have excellent infrastructure, diverse experiences, and good ferry connections. Paros is also an excellent first choice as it offers a perfect balance of everything Greek islands have to offer.'
    },
    {
      question: 'What is the least touristy Cyclades island?',
      answer: 'The least touristy islands include Folegandros, Amorgos, Sikinos, Anafi, and the Small Cyclades (Koufonisia, Schinoussa, Iraklia). These islands maintain authentic Greek island life with fewer crowds, lower prices, and genuine local culture. Sifnos and Serifos also offer authentic experiences while having good tourist infrastructure. For a truly off-the-beaten-path experience, consider Donoussa or Kythnos.'
    },
    {
      question: 'How many Cyclades islands can you visit in a week?',
      answer: 'In one week, you can comfortably visit 2-3 islands. With travel time between islands and check-in/check-out logistics, visiting more than 3 islands would feel rushed. We recommend: 2-3 nights per island for a relaxed pace, or 1-2 nights if you prefer to see more islands quickly. A perfect 7-day itinerary might be: Mykonos (2 nights) → Naxos (2 nights) → Santorini (3 nights).'
    },
    {
      question: 'Which is better: Paros or Naxos?',
      answer: 'Both are excellent choices! Naxos is larger with more diverse landscapes (mountains, beaches, villages) and better value for money. Paros is more centrally located for island hopping, has a more developed tourist scene, and offers better nightlife. Choose Naxos for authentic culture, hiking, and family-friendly beaches. Choose Paros for water sports, nightlife, and easier island hopping connections. Many travelers visit both as they\'re only 30 minutes apart by ferry.'
    },
    {
      question: 'What are the best Cyclades islands for couples?',
      answer: 'Santorini is the ultimate romantic destination with its caldera views and luxury accommodations. Folegandros offers intimate clifftop villages and secluded beaches. Milos provides unique geological beauty perfect for couples seeking something different. Sifnos combines excellent dining with authentic charm. Paros offers a romantic balance of beaches, villages, and good restaurants. For honeymooners, Santorini is unmatched, while couples seeking authenticity might prefer Folegandros or Sifnos.'
    },
    {
      question: 'Which Cyclades islands have the best beaches?',
      answer: 'Naxos has the longest and most diverse beaches (Plaka, Agios Prokopios). Paros offers excellent beaches with water sports (Golden Beach, Kolymbithres). Milos has over 70 unique beaches including the famous Sarakiniko. Mykonos has beautiful beaches with vibrant beach clubs (Paradise, Super Paradise). For pristine, less-crowded beaches, consider Koufonisia, Schinoussa, or Milos. Each island offers different beach experiences from organized to completely natural.'
    }
  ];

  const islands = [
    {
      name: 'Santorini',
      slug: 'santorini',
      description: 'The crown jewel with dramatic caldera views, iconic sunsets, and luxury accommodations.',
      bestFor: 'Honeymooners, luxury travelers, photographers',
      highlights: ['Caldera views', 'Wine culture', 'Ancient Akrotiri', 'Unique beaches'],
      budget: '€€€€',
      link: '/guides/santorini'
    },
    {
      name: 'Mykonos',
      slug: 'mykonos',
      description: 'Cosmopolitan paradise with world-class nightlife, luxury beach clubs, and iconic architecture.',
      bestFor: 'Party enthusiasts, luxury travelers, beach lovers',
      highlights: ['World-class nightlife', 'Beach clubs', 'Little Venice', 'Delos day trip'],
      budget: '€€€€',
      link: '/guides/mykonos'
    },
    {
      name: 'Naxos',
      slug: 'naxos',
      description: 'The largest island offering authentic culture, diverse landscapes, and excellent value.',
      bestFor: 'Families, budget travelers, culture enthusiasts',
      highlights: ['The Portara', 'Mountain villages', 'Long beaches', 'Local products'],
      budget: '€€',
      link: '/guides/naxos'
    },
    {
      name: 'Paros',
      slug: 'paros',
      description: 'Perfect balance of everything - beautiful beaches, charming villages, and great connections.',
      bestFor: 'Couples, families, water sports enthusiasts',
      highlights: ['Naoussa harbor', 'Windsurfing', 'Central location', 'Balanced atmosphere'],
      budget: '€€€',
      link: '/guides/paros'
    },
    {
      name: 'Milos',
      slug: 'milos',
      description: 'Geological wonder with over 70 unique beaches and dramatic volcanic landscapes.',
      bestFor: 'Photographers, geology enthusiasts, couples',
      highlights: ['Sarakiniko Beach', 'Kleftiko caves', 'Colored villages', '70+ beaches'],
      budget: '€€',
      link: '/guides/milos'
    },
    {
      name: 'Sifnos',
      slug: 'sifnos',
      description: 'Culinary capital with exceptional gastronomy, pottery tradition, and authentic charm.',
      bestFor: 'Food enthusiasts, culture lovers, hikers',
      highlights: ['Culinary excellence', 'Pottery workshops', 'Hiking trails', 'Authentic atmosphere'],
      budget: '€€',
      link: '/guides/sifnos'
    },
    {
      name: 'Ios',
      slug: 'ios',
      description: 'Golden beach paradise with vibrant nightlife and stunning natural beauty.',
      bestFor: 'Young travelers, beach lovers, party enthusiasts',
      highlights: ['32 beaches', 'Vibrant nightlife', 'Homer\'s Tomb', 'Golden sand'],
      budget: '€€',
      link: '/guides/ios'
    },
    {
      name: 'Amorgos',
      slug: 'amorgos',
      description: 'Dramatic beauty with towering cliffs, spiritual retreats, and unspoiled nature.',
      bestFor: 'Nature lovers, hikers, spiritual seekers',
      highlights: ['Dramatic landscapes', 'Monastery', 'Diving paradise', 'Authentic culture'],
      budget: '€€',
      link: '/guides/amorgos'
    },
    {
      name: 'Folegandros',
      slug: 'folegandros',
      description: 'Unspoiled gem with clifftop villages, pristine beaches, and authentic atmosphere.',
      bestFor: 'Romantic getaways, photographers, peace seekers',
      highlights: ['Clifftop Chora', 'Pristine beaches', 'Authentic atmosphere', 'Perfect size'],
      budget: '€€',
      link: '/guides/folegandros'
    },
    {
      name: 'Tinos',
      slug: 'tinos',
      description: 'Sacred island with religious significance, artistic heritage, and beautiful dovecotes.',
      bestFor: 'Cultural travelers, art enthusiasts, families',
      highlights: ['Religious pilgrimage', 'Artistic heritage', 'Dovecotes', 'Traditional villages'],
      budget: '€€',
      link: '/guides/tinos'
    },
    {
      name: 'Antiparos',
      slug: 'antiparos',
      description: 'Charming small island with famous cave, beautiful beaches, and laid-back atmosphere.',
      bestFor: 'Day trippers, peace seekers, beach lovers',
      highlights: ['Antiparos Cave', 'Soros Beach', 'Venetian Castle', 'Relaxed vibe'],
      budget: '€€',
      link: '/guides/antiparos'
    },
    {
      name: 'Serifos',
      slug: 'serifos',
      description: 'Traditional island with mining heritage, quiet beaches, and authentic charm.',
      bestFor: 'Peace seekers, families, authentic experience seekers',
      highlights: ['Mining heritage', 'Quiet beaches', 'Traditional villages', 'Authentic charm'],
      budget: '€€',
      link: '/guides/serifos'
    },
    {
      name: 'Kimolos',
      slug: 'kimolos',
      description: 'Hidden gem with remote beaches, traditional lifestyle, and peaceful atmosphere.',
      bestFor: 'Peace seekers, nature lovers, authentic experience seekers',
      highlights: ['Remote beaches', 'Traditional lifestyle', 'Peaceful atmosphere', 'Near Milos'],
      budget: '€€',
      link: '/guides/kimolos'
    },
    {
      name: 'Koufonisia',
      slug: 'koufonisia',
      description: 'Small Cyclades paradise with pristine beaches, crystal waters, and slow travel vibe.',
      bestFor: 'Beach lovers, peace seekers, slow travelers',
      highlights: ['Pristine beaches', 'Crystal waters', 'Slow travel', 'Small island charm'],
      budget: '€€',
      link: '/guides/koufonisia'
    },
    {
      name: 'Schinoussa',
      slug: 'schinoussa',
      description: 'Tiny peaceful island perfect for complete relaxation and authentic Greek island life.',
      bestFor: 'Peace seekers, slow travelers, authentic experience seekers',
      highlights: ['Peaceful beaches', 'Authentic life', 'Tiny island', 'Complete relaxation'],
      budget: '€€',
      link: '/guides/schinoussa'
    }
  ];

  const seoData = {
    title: '15 Best Cyclades Islands to Visit in 2025 (Local Guide)',
    description: optimizeMetaDescription(
      'Discover the 15 best Greek islands in the Cyclades from hidden gems to famous favorites. Updated 2025 travel guide with maps, tips & island hopping routes. Compare Santorini, Mykonos, Naxos, Paros, Milos, Sifnos, and more to plan your perfect Greek island adventure.'
    ),
    keywords: generateKeywordsWithLSI(
      ['best cyclades islands to visit', 'best cyclades islands', 'top cyclades islands'],
      PRIORITY_KEYWORDS['best-cyclades-islands'].lsi,
      ['Greek islands', 'Cyclades travel guide', 'island hopping', 'Greece vacation']
    ),
    ogImage: '/images/islands/santorini/blue-domes.jpg',
    ogType: 'article' as const,
    faq: faqItems,
    pageType: 'guides' as const,
    canonicalUrl: '/best-cyclades-islands-to-visit'
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/islands/santorini/blue-domes.jpg')" }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                15 Best Cyclades Islands to Visit in 2025
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Your complete guide to the most beautiful Greek islands in the Cyclades archipelago. 
                From world-famous Santorini to hidden gems, discover your perfect island paradise.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/blog/cyclades-7-day-island-hopping-itinerary"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
                >
                  Plan Your Itinerary
                </Link>
                <Link 
                  to="/ferry-tickets"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
                >
                  Book Ferry Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              The Cyclades archipelago, scattered like pearls across the azure Aegean Sea, represents the quintessential 
              Greek island experience. With their iconic whitewashed villages, blue-domed churches, crystal-clear waters, 
              and ancient history, these islands offer an intoxicating blend of natural beauty, cultural heritage, and 
              Mediterranean charm.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you're dreaming of Santorini's dramatic volcanic landscapes, Mykonos' cosmopolitan nightlife, or 
              the authentic charm of lesser-known gems like Sifnos and Folegandros, this comprehensive guide will help 
              you discover the 15 most spectacular islands in the Cyclades.
            </p>
          </div>

          {/* Islands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {islands.map((island) => (
              <div key={island.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <Link to={island.link}>
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={`/images/islands/${island.slug}/hero.jpg`}
                      alt={`${island.name} island in the Cyclades Greece`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{island.name}</h3>
                      <span className="text-sm font-semibold text-blue-600">{island.budget}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{island.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Best For:</p>
                      <p className="text-sm text-gray-600">{island.bestFor}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {island.highlights.slice(0, 3).map((highlight, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-800 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={island.link}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition"
                    >
                      Read Full Guide <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <section id="faq" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Internal Links Section */}
          <section className="mb-16 bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Plan Your Cyclades Adventure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                to="/blog/cyclades-7-day-island-hopping-itinerary" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-blue-800 mb-2">7-Day Cyclades Itinerary</h3>
                <p className="text-sm text-gray-600">Plan your perfect week-long island hopping adventure through the Cyclades.</p>
              </Link>
              <Link 
                to="/blog/cyclades-10-day-itinerary-guide" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-blue-800 mb-2">10-Day Cyclades Itinerary</h3>
                <p className="text-sm text-gray-600">Extended island hopping route covering more islands with a relaxed pace.</p>
              </Link>
              <Link 
                to="/ferry-guide" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-blue-800 mb-2">Cyclades Ferry Guide</h3>
                <p className="text-sm text-gray-600">Complete guide to ferry routes, schedules, and booking tips for island hopping.</p>
              </Link>
              <Link 
                to="/blog/best-time-visit-cyclades" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-blue-800 mb-2">Best Time to Visit Cyclades</h3>
                <p className="text-sm text-gray-600">Learn when to visit for the best weather, prices, and experiences.</p>
              </Link>
              <Link 
                to="/blog/cyclades-budget-travel-guide" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-blue-800 mb-2">Cyclades Budget Guide</h3>
                <p className="text-sm text-gray-600">Money-saving tips and budget planning for your Cyclades vacation.</p>
              </Link>
              <Link 
                to="/hotels" 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-blue-800 mb-2">Find Accommodations</h3>
                <p className="text-sm text-gray-600">Browse hotels, villas, and accommodations across all Cyclades islands.</p>
              </Link>
            </div>
          </section>

          {/* Related Resources Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Plan Your Cyclades Adventure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                to="/ferry-tickets" 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600"
              >
                <Ship className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Book Ferry Tickets</h3>
                <p className="text-sm text-gray-600">Find the best ferry routes and prices for island hopping in the Cyclades.</p>
              </Link>
              <Link 
                to="/hotels" 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600"
              >
                <Hotel className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Find Hotels</h3>
                <p className="text-sm text-gray-600">Discover the best accommodations across all Cyclades islands.</p>
              </Link>
              <Link 
                to="/blog/cyclades-7-day-island-hopping-itinerary" 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600"
              >
                <Calendar className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Island Hopping Itineraries</h3>
                <p className="text-sm text-gray-600">7-day, 10-day, and 2-week island hopping routes.</p>
              </Link>
              <Link 
                to="/guides" 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-600"
              >
                <MapPin className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">All Island Guides</h3>
                <p className="text-sm text-gray-600">Complete travel guides for every Cyclades island.</p>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore the Cyclades?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start planning your perfect Greek island adventure. Book ferries, find accommodations, and discover 
              amazing activities across all the Cyclades islands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/ferry-tickets"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Book Ferry Tickets
              </Link>
              <Link 
                to="/hotels"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                Find Hotels
              </Link>
              <Link 
                to="/touristas-ai"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                Plan with AI
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BestCycladesIslands;

