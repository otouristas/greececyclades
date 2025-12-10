import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Car, MapPin, Shield, Zap, Truck, Wind, Award, Star, CheckCircle, Clock, ArrowRight, Fuel } from 'lucide-react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';

export default function RentACar() {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchContainerRef.current && !document.getElementById('tp-car-widget-script')) {
      searchContainerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.id = 'tp-car-widget-script';
      script.src = 'https://tp.media/content?trs=376419&shmarker=595305&locale=en&default_pick_up_location=Santorini%20Port&default_drop_off_location=Santorini%20Airport&powered_by=true&border_radius=0&plain=true&show_logo=true&color_background=%231E2E48&color_button=%231E2E48&color_text=%23000000&color_input_text=%23000000&color_button_text=%23ffffff&promo_id=4480&campaign_id=10';
      script.async = true;
      script.charset = 'utf-8';
      searchContainerRef.current.appendChild(script);
    }

    return () => {
      const script = document.getElementById('tp-car-widget-script');
      if (script?.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const carTypes = [
    { title: 'Economy', price: '€25/day', icon: Car, desc: 'Perfect for couples, easy to park' },
    { title: 'Compact SUV', price: '€45/day', icon: Truck, desc: 'Great for families, more storage' },
    { title: 'Convertible', price: '€60/day', icon: Wind, desc: 'Experience island breeze' },
    { title: 'Jeep 4x4', price: '€55/day', icon: Shield, desc: 'Access remote beaches' },
    { title: 'Luxury', price: '€80/day', icon: Award, desc: 'Travel in ultimate comfort' },
    { title: 'Scooter/ATV', price: '€20/day', icon: Zap, desc: 'Fun for short distances' },
  ];

  const locations = [
    { name: 'Santorini Airport', price: '€35/day', slug: 'santorini' },
    { name: 'Mykonos Port', price: '€40/day', slug: 'mykonos' },
    { name: 'Naxos Town', price: '€30/day', slug: 'naxos' },
    { name: 'Paros Airport', price: '€32/day', slug: 'paros' },
    { name: 'Milos Port', price: '€28/day', slug: 'milos' },
    { name: 'Ios Port', price: '€25/day', slug: 'ios' },
  ];

  const features = [
    { icon: CheckCircle, title: 'Free Cancellation', desc: 'Up to 48 hours before pickup' },
    { icon: Shield, title: 'Full Insurance', desc: 'Comprehensive coverage included' },
    { icon: Fuel, title: 'Flexible Fuel', desc: 'Pick up full, return full' },
    { icon: Clock, title: '24/7 Support', desc: 'Help whenever you need it' },
  ];

  return (
    <>
      <SEO
        title="Rent a Car in Cyclades 2025: Best Deals by Island [Compared]"
        description="Car & ATV rental on every Cyclades island. Compare local vs international companies, prices by island. Driving tips, license requirements & insider advice."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Rent a Car', url: '/rent-a-car' }
        ]}
        faqs={[
          { question: 'Do I need a car in Cyclades?', answer: 'Depends on the island. Larger islands (Naxos, Paros, Andros) benefit from a car. Smaller islands have good buses. Santorini/Mykonos get congested - consider ATV or bus.' },
          { question: 'Can I rent a car with US license in Greece?', answer: 'Yes, most rental companies accept US/Canadian licenses. An International Driving Permit is recommended but rarely required. EU licenses accepted everywhere.' },
          { question: 'What about driving in Cyclades?', answer: 'Roads are generally good but narrow and winding. Drive defensively, watch for scooters. Parking in main towns is limited in summer.' }
        ]}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-600 to-cyclades-turquoise text-white pt-24 md:pt-32 pb-16 md:pb-24">
          <div className="absolute inset-0 bg-[url('/images/rent-a-car-hero.jpg')] bg-cover bg-center opacity-10" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
                Rent a Car in the <span className="text-yellow-300">Cyclades</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
                Explore Santorini, Mykonos, Naxos and more at your own pace. Compare deals from top rental companies.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                {[
                  { icon: Shield, text: 'Full Insurance' },
                  { icon: Zap, text: 'Instant Confirmation' },
                  { icon: Star, text: 'Best Price Guarantee' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 md:px-4 py-2">
                    <item.icon className="h-4 w-4 md:h-5 md:w-5 text-yellow-300" />
                    <span className="text-white text-xs md:text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Widget */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden p-6">
              <div ref={searchContainerRef} id="car-rental-search-container" className="min-h-[350px] flex justify-center items-center">
                <div className="text-center text-gray-700 dark:text-white/60">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600 mb-2"></div>
                  <p>Loading car search...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-12 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-cyan-600 dark:text-cyclades-turquoise" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-white/60">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Car Types */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">Choose Your Vehicle</h2>
            <p className="text-gray-600 dark:text-white/60 text-center mb-12 max-w-2xl mx-auto">From economy cars to luxury convertibles, find the perfect vehicle for your island adventure</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carTypes.map((car, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-shadow group">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-xl flex items-center justify-center mb-4">
                    <car.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{car.title}</h3>
                  <p className="text-gray-600 dark:text-white/60 text-sm mb-4">{car.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-cyan-600 dark:text-cyclades-turquoise">{car.price}</span>
                    <a href="#car-rental-search-container" className="text-sm font-medium text-cyan-600 dark:text-cyclades-turquoise hover:underline inline-flex items-center gap-1">
                      Book <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pickup Locations */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">Popular Pickup Locations</h2>
            <p className="text-gray-600 dark:text-white/60 text-center mb-12 max-w-2xl mx-auto">Pick up your car at airports, ports, or town centers across the Cyclades</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc, idx) => (
                <Link key={idx} to={`/islands/${loc.slug}`} className="group bg-gray-50 dark:bg-white/5 rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100 dark:border-white/10 hover:border-cyan-600/30 dark:hover:border-cyclades-turquoise/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-600/10 dark:bg-cyclades-turquoise/20 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-cyan-600 dark:text-cyclades-turquoise" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyclades-turquoise transition-colors">{loc.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-white/50">From {loc.price}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyclades-turquoise group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Driving Tips */}
        <div className="py-20 bg-gray-50 dark:bg-dark-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Driving Tips for the Cyclades</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Drive on the right, always wear seatbelts',
                  'Narrow roads in villages - drive carefully',
                  'Fill up fuel - stations limited on small islands',
                  'Download offline maps for remote areas',
                  'Arrive early at popular destinations for parking',
                  'Book early for peak season (July-August)',
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                    <span className="text-white/90">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="py-20 bg-white dark:bg-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">What Travelers Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah M.', location: 'UK', text: 'Perfect car rental experience in Santorini! Smooth pickup, spotless car.' },
                { name: 'Marco R.', location: 'Italy', text: 'Island hopping with the car was seamless. Outstanding service!' },
                { name: 'Anna K.', location: 'Germany', text: 'Great value, no hidden fees. SUV was perfect for Paros beaches.' },
              ].map((review, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-white/80 mb-4 italic">"{review.text}"</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{review.name} - {review.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Explore the Islands?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Book your rental car and discover hidden beaches, traditional villages, and breathtaking views.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#car-rental-search-container" className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                <Car className="mr-2 h-5 w-5" />
                Search Cars
              </a>
              <Link to="/ferry-tickets" className="inline-flex items-center px-8 py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                Book Ferries
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection
          faqs={[
            { question: 'Do I need a car in Cyclades?', answer: 'Depends on the island. Larger islands (Naxos, Paros, Andros) benefit from a car. Smaller islands have good buses. Santorini/Mykonos get congested - consider ATV or bus.' },
            { question: 'Can I rent a car with US license in Greece?', answer: 'Yes, most rental companies accept US/Canadian licenses. An International Driving Permit is recommended but rarely required. EU licenses accepted everywhere.' },
            { question: 'What about driving in Cyclades?', answer: 'Roads are generally good but narrow and winding. Drive defensively, watch for scooters. Parking in main towns is limited in summer.' },
            { question: 'Should I rent a car or ATV?', answer: 'Cars are better for families and longer trips. ATVs are fun for couples and short distances. On Santorini/Mykonos, ATVs handle narrow streets better.' }
          ]}
          title="Car Rental FAQ"
          subtitle="Common questions about renting a car in the Cyclades"
        />

        {/* Related Links */}
        <RelatedLinks variant="cards" pageType="general" title="Continue Planning" />
      </div>
    </>
  );
}
