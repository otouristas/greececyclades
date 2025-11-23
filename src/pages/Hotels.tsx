import { useEffect, useState } from 'react';
import { Star, MapPin, Building2, Bed, Wifi, Coffee, Utensils, Calendar, Search, Users, Shield, CheckCircle, Clock, Euro, Award, Heart, Phone, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_TAGLINE } from '../constants/seo';

export default function Hotels() {
  // State for the custom search form
  const [destination, setDestination] = useState('Santorini');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Set default dates (check-in: tomorrow, check-out: 3 days from tomorrow)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + 4);
    
    setCheckIn(formatDate(tomorrow));
    setCheckOut(formatDate(checkOutDate));
  }, []);

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Redirect to the provided URL
    window.open('https://trip.tp.st/F29Ncvt6', '_blank');
  };

  // Popular destinations with location images only
  const popularDestinations = [
    { 
      name: 'Santorini', 
      hotels: 245, 
      image: '/images/islands/santorini.jpg',
      description: 'Iconic caldera views and luxury cave hotels',
      link: '/guides/santorini'
    },
    { 
      name: 'Mykonos', 
      hotels: 187, 
      image: '/images/islands/mykonos.jpg',
      description: 'Vibrant nightlife and beachfront resorts',
      link: '/guides/mykonos'
    },
    { 
      name: 'Paros', 
      hotels: 132, 
      image: '/images/islands/paros.jpg',
      description: 'Family-friendly resorts and traditional villages',
      link: '/guides/paros'
    },
    { 
      name: 'Naxos', 
      hotels: 98, 
      image: '/images/islands/naxos.jpg',
      description: 'Authentic Greek culture and beach hotels',
      link: '/guides/naxos'
    },
    { 
      name: 'Milos', 
      hotels: 76, 
      image: '/images/islands/milos.jpg',
      description: 'Volcanic landscapes and boutique properties',
      link: '/guides/milos'
    },
    { 
      name: 'Ios', 
      hotels: 64, 
      image: '/images/islands/ios.jpg',
      description: 'Beach clubs and modern accommodations',
      link: '/guides/ios'
    },
    { 
      name: 'Syros', 
      hotels: 42, 
      image: '/images/islands/syros.jpg',
      description: 'Neoclassical architecture and cultural heritage',
      link: '/guides/syros'
    },
    { 
      name: 'Sifnos', 
      hotels: 38, 
      image: '/images/islands/sifnos.jpg',
      description: 'Gastronomy capital with charming villages',
      link: '/guides/sifnos'
    },
    { 
      name: 'Folegandros', 
      hotels: 28, 
      image: '/images/islands/folegandros.jpg',
      description: 'Dramatic cliffs and romantic sunsets',
      link: '/guides/folegandros'
    },
  ];

  // Hotel types with icons instead of images
  const hotelTypes = [
    {
      title: 'Luxury Resorts',
      description: 'Five-star properties with world-class amenities, private pools, and premium locations.',
      price: 'From €300/night',
      icon: Award,
      gradient: 'from-primary-100 to-primary-200',
      features: ['Private pools', 'Spa services', 'Concierge']
    },
    {
      title: 'Boutique Hotels',
      description: 'Charming properties with unique character, personalized service, and local charm.',
      price: 'From €150/night',
      icon: Heart,
      gradient: 'from-secondary-100 to-secondary-200',
      features: ['Unique design', 'Personal service', 'Local character']
    },
    {
      title: 'Cave Hotels',
      description: 'Traditional Cycladic architecture carved into cliffsides with stunning views.',
      price: 'From €200/night',
      icon: Building2,
      gradient: 'from-primary-100 to-primary-200',
      features: ['Caldera views', 'Traditional style', 'Unique rooms']
    },
    {
      title: 'Beach Resorts',
      description: 'Waterfront properties with direct beach access and water sports facilities.',
      price: 'From €180/night',
      icon: Utensils,
      gradient: 'from-secondary-100 to-secondary-200',
      features: ['Beach access', 'Water sports', 'Sea views']
    },
    {
      title: 'Family Hotels',
      description: 'Child-friendly accommodations with family rooms and kid-oriented amenities.',
      price: 'From €120/night',
      icon: Users,
      gradient: 'from-primary-100 to-primary-200',
      features: ['Family rooms', 'Kids club', 'Play areas']
    },
    {
      title: 'Budget Hotels',
      description: 'Comfortable and affordable accommodations without compromising on cleanliness.',
      price: 'From €60/night',
      icon: Bed,
      gradient: 'from-secondary-100 to-secondary-200',
      features: ['Great value', 'Clean rooms', 'Good location']
    },
  ];

  // Hotel amenities with enhanced descriptions
  const amenities = [
    { name: 'Free WiFi', icon: <Wifi className="h-5 w-5" />, description: 'High-speed internet throughout property' },
    { name: 'Breakfast Included', icon: <Coffee className="h-5 w-5" />, description: 'Complimentary breakfast buffet' },
    { name: 'Restaurant', icon: <Utensils className="h-5 w-5" />, description: 'On-site dining with local cuisine' },
    { name: 'Pool Access', icon: <MapPin className="h-5 w-5" />, description: 'Swimming pool and sunbathing area' },
    { name: 'Spa Services', icon: <Star className="h-5 w-5" />, description: 'Wellness treatments and massages' },
    { name: 'Beach Access', icon: <Users className="h-5 w-5" />, description: 'Direct access to private beach' },
  ];

  // Enhanced FAQs with more comprehensive content
  const faqs = [
    {
      question: 'What is the best time to book hotels in the Cyclades islands?',
      answer: 'For peak season (July-August), book 4-6 months in advance, especially for Santorini and Mykonos. For shoulder seasons (May-June, September-October), 2-3 months ahead is sufficient. The best deals are often available during early booking periods or last-minute offers in off-season.'
    },
    {
      question: 'What types of accommodation are available in the Cyclades?',
      answer: 'The Cyclades offer diverse accommodations: luxury cave hotels in Santorini, beach resorts in Mykonos, traditional guesthouses in Naxos and Paros, boutique properties in Milos, and budget-friendly options across all islands. Each island has its unique accommodation style reflecting local architecture and culture.'
    },
    {
      question: 'Are Cyclades hotels family-friendly?',
      answer: 'Many hotels cater to families, especially in Naxos, Paros, and Crete. Look for properties with family rooms, kids clubs, shallow pools, and child-friendly dining options. Santorini and Mykonos tend to be more adult-oriented, but family options are available.'
    },
    {
      question: 'What amenities should I expect in Cyclades hotels?',
      answer: 'Most hotels include free WiFi, air conditioning, and breakfast. Higher-end properties offer pools, spa services, restaurants, and beach access. Traditional cave hotels may have unique features like private terraces with caldera views. Always check specific amenities when booking.'
    },
    {
      question: 'How do I get from the airport/port to my hotel?',
      answer: 'Most hotels offer transfer services (sometimes included). You can also book private transfers, use local buses, or rent a car. In Santorini, many hotels provide complimentary transfers due to the challenging terrain. Check with your hotel about transfer options when booking.'
    }
  ];

  // Customer testimonials for CRO
  const testimonials = [
    {
      name: 'Sarah & Mike Thompson',
      location: 'UK',
      rating: 5,
      comment: 'Found the perfect cave hotel in Santorini through this service. The caldera views were breathtaking and the booking process was seamless.',
      hotel: 'Santorini Cave Hotel'
    },
    {
      name: 'Maria Rodriguez',
      location: 'Spain',
      rating: 5,
      comment: 'Excellent family resort in Naxos. Kids loved the pool and beach access. Great value for money and very helpful staff.',
      hotel: 'Naxos Family Resort'
    },
    {
      name: 'James Chen',
      location: 'Australia',
      rating: 5,
      comment: 'Boutique hotel in Mykonos exceeded expectations. Perfect location near the nightlife but quiet enough for rest. Highly recommended!',
      hotel: 'Mykonos Boutique Hotel'
    }
  ];

  return (
    <>
      <SEO 
        title={`Hotels in Cyclades Islands Greece | Best Accommodation Deals ${SITE_TAGLINE}`}
        description="Book the best hotels in Greek Islands. Luxury resorts, boutique hotels, cave accommodations in Santorini, Mykonos, Naxos, Paros, Syros, Sifnos, Folegandros. Best prices, free cancellation. Find your perfect Cyclades accommodation today!"
        keywords={["hotels greece", "cyclades accommodation", "greek island hotels", "santorini hotels", "mykonos hotels", "naxos hotels", "paros hotels", "greece accommodation booking"]}
        canonicalUrl="https://greececyclades.com/hotels"
        pageType="hotels"
        jsonLD={{
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          "name": "Greece Cyclades Hotels",
          "description": "Premium hotel booking service for Cyclades islands including Santorini, Mykonos, Naxos, and Paros",
          "url": "https://greececyclades.com/hotels",
          "areaServed": ["Santorini", "Mykonos", "Naxos", "Paros", "Milos", "Ios", "Syros", "Sifnos", "Folegandros", "Cyclades Islands"],
          "priceRange": "€60-€500"
        }}
      />
      
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: 'Hotels', path: '/hotels' }
            ]}
          />
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Search Widget */}
        <div className="relative min-h-[85vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="relative h-full w-full">
              <img
                src="/images/islands/santorini.jpg"
                alt="Cyclades Hotels"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          </div>
        
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Hotels in the <span className="text-blue-400">Cyclades</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover luxury resorts, boutique hotels, and authentic accommodations across <Link to="/guides/santorini" className="underline hover:text-blue-300">Santorini</Link>, <Link to="/guides/mykonos" className="underline hover:text-blue-300">Mykonos</Link>, <Link to="/guides/naxos" className="underline hover:text-blue-300">Naxos</Link>, and all Greek islands
              </p>
            </div>
          
          {/* Search Widget */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6" id="hotel-search-container">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Destination */}
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="destination" className="block text-sm font-medium text-primary-600 mb-1">
                    Destination
                  </label>
                  <div className="relative">
                    <select
                      id="destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-4 py-3 pl-10 bg-white border border-secondary-300 rounded-lg text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="Santorini">Santorini</option>
                      <option value="Mykonos">Mykonos</option>
                      <option value="Paros">Paros</option>
                      <option value="Naxos">Naxos</option>
                      <option value="Milos">Milos</option>
                      <option value="Ios">Ios</option>
                      <option value="Syros">Syros</option>
                      <option value="Sifnos">Sifnos</option>
                      <option value="Folegandros">Folegandros</option>
                      <option value="Amorgos">Amorgos</option>
                      <option value="Tinos">Tinos</option>
                      <option value="Serifos">Serifos</option>
                      <option value="Kea">Kea</option>
                      <option value="Antiparos">Antiparos</option>
                    </select>
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>
                
                {/* Check-in Date */}
                <div>
                  <label htmlFor="check-in" className="block text-sm font-medium text-primary-600 mb-1">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={formatDate(new Date())}
                      className="w-full px-4 py-3 pl-10 bg-white border border-secondary-300 rounded-lg text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>
                
                {/* Check-out Date */}
                <div>
                  <label htmlFor="check-out" className="block text-sm font-medium text-primary-600 mb-1">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn}
                      className="w-full px-4 py-3 pl-10 bg-white border border-secondary-300 rounded-lg text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                  </div>
                </div>
                
                {/* Guests & Rooms */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-primary-600 mb-1">
                      Guests
                    </label>
                    <div className="relative">
                      <select
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full px-4 py-3 pl-10 bg-white border border-secondary-300 rounded-lg text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                    </div>
                  </div>
                  
                  {/* Rooms */}
                  <div>
                    <label htmlFor="rooms" className="block text-sm font-medium text-primary-600 mb-1">
                      Rooms
                    </label>
                    <div className="relative">
                      <select
                        id="rooms"
                        value={rooms}
                        onChange={(e) => setRooms(parseInt(e.target.value))}
                        className="w-full px-4 py-3 pl-10 bg-white border border-secondary-300 rounded-lg text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                        ))}
                      </select>
                      <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                    </div>
                  </div>
                </div>
                
                {/* Search Button */}
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    Search Hotels Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* SEO Introduction Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-secondary-200">
            <h2 className="text-3xl font-bold text-primary-600 mb-6 text-center">Why Choose Cyclades Islands for Your Perfect Stay?</h2>
            <div className="prose prose-lg max-w-none text-primary-400 leading-relaxed">
              <p className="mb-4">
                The <strong>Cyclades islands</strong> offer some of the world's most unique and memorable accommodations. From luxury <Link to="/guides/santorini" className="text-primary-600 hover:text-primary-700 font-medium">cave hotels in Santorini</Link> with breathtaking caldera views to charming boutique properties in <Link to="/guides/naxos" className="text-primary-600 hover:text-primary-700 font-medium">Naxos</Link> and <Link to="/guides/paros" className="text-primary-600 hover:text-primary-700 font-medium">Paros</Link>, and from cultural heritage hotels in <Link to="/guides/syros" className="text-primary-600 hover:text-primary-700 font-medium">Syros</Link> to gastronomic retreats in <Link to="/guides/sifnos" className="text-primary-600 hover:text-primary-700 font-medium">Sifnos</Link>, each island provides distinct accommodation experiences that reflect authentic Greek hospitality.
              </p>
              <p className="mb-4">
                Our <strong>hotel booking service</strong> specializes in the Cyclades, ensuring you find the perfect accommodation for your Greek island adventure. Whether you're seeking a romantic honeymoon suite in <Link to="/guides/mykonos" className="text-primary-600 hover:text-primary-700 font-medium">Mykonos</Link>, a family-friendly resort in Naxos, or a secluded retreat in <Link to="/guides/milos" className="text-primary-600 hover:text-primary-700 font-medium">Milos</Link>, we provide expert recommendations and unbeatable prices.
              </p>
              <p>
                Combine your perfect accommodation with our <Link to="/ferry-tickets" className="text-primary-600 hover:text-primary-700 font-medium">ferry booking service</Link> for seamless island hopping, and don't forget to arrange your <Link to="/rent-a-car" className="text-primary-600 hover:text-primary-700 font-medium">car rental</Link> for exploring each island at your own pace.
              </p>
            </div>
          </div>
        </div>

        {/* Why Book With Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-4">Why Choose Our Hotel Booking Service</h2>
          <p className="text-primary-400 text-center mb-10 max-w-3xl mx-auto">
            We provide the most comprehensive and reliable hotel booking experience for the Cyclades islands, with expert local knowledge and unmatched customer service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-primary-500">
              <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                <Building2 className="text-primary-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Curated Selection of Properties</h3>
              <p className="text-primary-400">We handpick the finest hotels across the Cyclades islands, ensuring quality accommodations that meet our high standards for every budget and travel style.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-secondary-400">
              <div className="inline-block p-3 bg-secondary-100 rounded-full mb-4">
                <Star className="text-secondary-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Best Price Guarantee</h3>
              <p className="text-primary-400">Find a lower price elsewhere? We'll match it and provide an additional 10% discount. Transparent pricing with no hidden booking fees or surprises.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-primary-500">
              <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                <Shield className="text-primary-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Free Cancellation & Support</h3>
              <p className="text-primary-400">Most bookings offer free cancellation up to 48 hours before arrival. 24/7 customer support for any questions or changes to your reservation.</p>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-4">Popular Cyclades Islands for Your Perfect Stay</h2>
          <p className="text-primary-400 text-center mb-10 max-w-3xl mx-auto">
            Each Cyclades island offers unique accommodation experiences, from luxury resorts to traditional guesthouses. Explore our detailed island guides to find your perfect destination.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <Link 
                key={index}
                to={destination.link}
                className="group relative h-64 overflow-hidden rounded-lg shadow-md border border-secondary-200 hover:shadow-xl transition-all"
              >
                <img 
                  src={destination.image} 
                  alt={`${destination.name}, Cyclades hotels and accommodations`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-800/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-white/90 text-sm mb-2">{destination.hotels} hotels available</p>
                  <p className="text-white/80 text-xs">{destination.description}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Hotel Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-6">Types of Accommodation in the Cyclades</h2>
          <p className="text-primary-400 text-center mb-10 max-w-3xl mx-auto">
            From luxury resorts to budget-friendly guesthouses, the Cyclades offer diverse accommodation options to suit every traveler's needs and preferences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelTypes.map((hotelType, index) => {
              const IconComponent = hotelType.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-secondary-200 hover:shadow-lg transition-shadow">
                  <div className={`h-32 bg-gradient-to-br ${hotelType.gradient} flex items-center justify-center`}>
                    <IconComponent className="w-16 h-16 text-primary-600" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary-600 mb-2">{hotelType.title}</h3>
                    <p className="text-primary-400 mb-4">{hotelType.description}</p>
                    <div className="flex items-center text-sm text-primary-500 mb-3">
                      <Euro className="mr-2 w-4 h-4" /> 
                      <span className="font-medium">{hotelType.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hotelType.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO Content Section - Comprehensive Guide */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 border border-secondary-200">
            <h2 className="text-3xl font-bold text-primary-600 mb-6">Complete Guide to Booking Hotels in Greek Islands</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-4">Planning Your Cyclades Accommodation</h3>
                <p className="text-primary-400 mb-4">
                  When booking <strong>hotels in the Cyclades</strong>, consider your travel style and island preferences. <Link to="/guides/santorini" className="text-primary-600 hover:text-primary-700 font-medium">Santorini</Link> offers luxury cave hotels with iconic views, while <Link to="/guides/naxos" className="text-primary-600 hover:text-primary-700 font-medium">Naxos</Link> and <Link to="/guides/paros" className="text-primary-600 hover:text-primary-700 font-medium">Paros</Link> provide excellent family-friendly options.
                </p>
                <p className="text-primary-400 mb-4">
                  Combine your hotel booking with our <Link to="/ferry-tickets" className="text-primary-600 hover:text-primary-700 font-medium">ferry ticket service</Link> for seamless island hopping. Many hotels offer transfer services from ports and airports - always inquire when booking.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-4">Best Times to Book Cyclades Hotels</h3>
                <ul className="text-primary-400 space-y-2">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />Peak season (July-August): Book 4-6 months in advance</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />Shoulder season (May-June, September): Book 2-3 months ahead</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />Off-season (October-April): Book 3-4 weeks in advance</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />Last-minute deals: Available during off-peak periods</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-secondary-200">
              <h3 className="text-xl font-semibold text-primary-600 mb-4">Essential Hotel Booking Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-block p-3 bg-primary-100 rounded-full mb-3">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-primary-600 mb-2">Check-in/Check-out</h4>
                  <p className="text-sm text-primary-400">Standard times: Check-in 3 PM, Check-out 11 AM. Many hotels offer luggage storage</p>
                </div>
                <div className="text-center">
                  <div className="inline-block p-3 bg-secondary-100 rounded-full mb-3">
                    <Shield className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="font-semibold text-primary-600 mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-primary-400">Most hotels offer free cancellation 24-48 hours before arrival during non-peak periods</p>
                </div>
                <div className="text-center">
                  <div className="inline-block p-3 bg-primary-100 rounded-full mb-3">
                    <Euro className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-primary-600 mb-2">Payment Options</h4>
                  <p className="text-sm text-primary-400">Credit cards accepted, some properties require deposit, city tax may apply</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hotel Amenities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-4">Standard Hotel Amenities in the Cyclades</h2>
          <p className="text-primary-400 text-center mb-10 max-w-3xl mx-auto">
            Most hotels in the Cyclades offer these popular amenities to enhance your Greek island experience and ensure a comfortable stay.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center border border-secondary-200 hover:shadow-lg transition-shadow">
                <div className="inline-block p-3 bg-primary-100 rounded-full mb-4 text-primary-600">
                  {amenity.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary-600 mb-2">{amenity.name}</h3>
                <p className="text-sm text-primary-400">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-10">What Our Guests Say About Cyclades Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-secondary-200">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-primary-400">{testimonial.rating}.0 rating</span>
                </div>
                <p className="text-primary-400 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="border-t border-secondary-200 pt-4">
                  <p className="text-sm text-primary-600 font-medium">{testimonial.name}</p>
                  <p className="text-xs text-primary-400">{testimonial.location} • {testimonial.hotel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-10">Frequently Asked Questions About Cyclades Hotels</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-secondary-200">
                  <h3 className="text-lg font-semibold text-primary-600 mb-3 flex items-start">
                    <Building2 className="h-6 w-6 text-primary-600 flex-shrink-0 mr-2 mt-0.5" />
                    {faq.question}
                  </h3>
                  <div className="ml-8">
                    <p className="text-primary-400">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg shadow-md overflow-hidden border border-primary-500">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Book Your Dream Hotel in the Cyclades?</h2>
              <p className="text-white/90 text-lg mb-6">
                Find the perfect accommodation for your Greek island getaway today. 
                Combine with our <Link to="/ferry-tickets" className="underline hover:text-secondary-200">ferry booking service</Link> and 
                <Link to="/rent-a-car" className="underline hover:text-secondary-200"> car rental options</Link> for the complete travel solution.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a href="#hotel-search-container" className="inline-block bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-secondary-50 transition duration-300">
                  Search Hotels Now
                </a>
                <Link to="/flights" className="inline-block bg-transparent text-white border-2 border-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition duration-300">
                  Check Flights
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-secondary-200 to-secondary-300 flex items-center justify-center p-12">
              <div className="text-center">
                <Building2 className="w-24 h-24 text-primary-600 mx-auto mb-4" />
                <p className="text-primary-600 font-medium text-lg">Find Your Perfect Stay</p>
                <p className="text-primary-500 text-sm mt-2">Best prices • Free cancellation • 24/7 support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services Section */}
        <div className="mt-16 bg-secondary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary-600 text-center mb-6">Complete Your Greek Island Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link to="/ferry-tickets" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-200">
              <Building2 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-primary-600 mb-1">Ferry Tickets</h3>
              <p className="text-sm text-primary-400">Island hopping made easy</p>
            </Link>
            
            <Link to="/rent-a-car" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-200">
              <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-primary-600 mb-1">Car Rental</h3>
              <p className="text-sm text-primary-400">Explore at your own pace</p>
            </Link>
            
            <Link to="/activities" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-200">
              <Star className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-primary-600 mb-1">Activities</h3>
              <p className="text-sm text-primary-400">Tours and experiences</p>
            </Link>
            
            <Link to="/flights" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-200">
              <Plane className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-primary-600 mb-1">Flights</h3>
              <p className="text-sm text-primary-400">Best flight deals to Greece</p>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}