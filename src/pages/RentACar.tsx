import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Building, Calendar, MapPin, Shield, Zap, Truck, Wind, Award, Fuel, Star, CheckCircle, Users, Clock, Euro } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RentACar() {
  // Reference for the search widget container
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Load the car rental search widget
  useEffect(() => {
    // Only add the script if it doesn't already exist
    if (searchContainerRef.current && !document.getElementById('tp-car-widget-script')) {
      // Clear any existing content in the container
      searchContainerRef.current.innerHTML = '';
      
      // Create a new script element
      const script = document.createElement('script');
      script.id = 'tp-car-widget-script';
      script.src = 'https://tp.media/content?trs=376419&shmarker=595305&locale=en&default_pick_up_location=Santorini%20Port&default_drop_off_location=Santorini%20Airport&powered_by=true&border_radius=0&plain=true&show_logo=true&color_background=%231E2E48&color_button=%231E2E48&color_text=%23000000&color_input_text=%23000000&color_button_text=%23ffffff&promo_id=4480&campaign_id=10';
      script.async = true;
      script.charset = 'utf-8';
      
      // Append the script to the container
      searchContainerRef.current.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      const script = document.getElementById('tp-car-widget-script');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Popular car rental locations
  const popularLocations = [
    { location: 'Santorini Airport', price: '€35/day', company: 'Hertz', carType: 'Economy' },
    { location: 'Mykonos Port', price: '€40/day', company: 'Avis', carType: 'Compact' },
    { location: 'Naxos Town', price: '€30/day', company: 'Sixt', carType: 'Economy' },
    { location: 'Paros Airport', price: '€32/day', company: 'Enterprise', carType: 'Compact' },
    { location: 'Milos Port', price: '€28/day', company: 'Budget', carType: 'Economy' },
    { location: 'Ios Port', price: '€25/day', company: 'Europcar', carType: 'Mini' },
  ];

  // Car rental companies with icons
  const rentalCompanies = [
    { name: 'Hertz', icon: Car },
    { name: 'Avis', icon: Building },
    { name: 'Enterprise', icon: Truck },
    { name: 'Budget', icon: Shield },
    { name: 'Sixt', icon: Zap },
    { name: 'Europcar', icon: Award },
    { name: 'Thrifty', icon: Fuel },
    { name: 'Alamo', icon: MapPin },
  ];

  // Car types with icons instead of images
  const carTypes = [
    {
      title: 'Economy Cars',
      description: 'Perfect for couples or solo travelers. Easy to park and navigate narrow island roads.',
      price: 'From €25/day',
      icon: Car,
      gradient: 'from-primary-100 to-primary-200',
      features: ['Fuel efficient', 'Easy parking', 'City driving']
    },
    {
      title: 'Compact SUVs',
      description: 'Great for families or groups. Better handling on unpaved roads and more storage space.',
      price: 'From €45/day',
      icon: Truck,
      gradient: 'from-secondary-100 to-secondary-200',
      features: ['More space', 'Off-road capable', 'Family friendly']
    },
    {
      title: 'Convertibles',
      description: 'Experience the island breeze and stunning views. Perfect for scenic coastal drives.',
      price: 'From €60/day',
      icon: Wind,
      gradient: 'from-primary-100 to-primary-200',
      features: ['Open-top driving', 'Scenic routes', 'Luxury feel']
    },
    {
      title: 'Jeeps & Off-Road',
      description: 'Access remote beaches and rugged terrain. Ideal for adventure seekers.',
      price: 'From €55/day',
      icon: Shield,
      gradient: 'from-secondary-100 to-secondary-200',
      features: ['4WD capability', 'Beach access', 'Adventure ready']
    },
    {
      title: 'Luxury Cars',
      description: 'Travel in style with premium vehicles. Enhanced comfort for longer island drives.',
      price: 'From €80/day',
      icon: Award,
      gradient: 'from-primary-100 to-primary-200',
      features: ['Premium comfort', 'Latest tech', 'VIP experience']
    },
    {
      title: 'Scooters & ATVs',
      description: 'Fun alternatives to cars. Perfect for short distances and small islands.',
      price: 'From €20/day',
      icon: Zap,
      gradient: 'from-secondary-100 to-secondary-200',
      features: ['Economical', 'Easy maneuver', 'Local experience']
    },
  ];

  // Island destinations for internal linking
  const popularIslands = [
    { name: 'Santorini', link: '/guides/santorini', description: 'Famous for sunsets and volcanic landscapes' },
    { name: 'Mykonos', link: '/guides/mykonos', description: 'Known for nightlife and beautiful beaches' },
    { name: 'Naxos', link: '/guides/naxos', description: 'Perfect for family vacations and authentic Greek culture' },
    { name: 'Paros', link: '/guides/paros', description: 'Traditional villages and crystal-clear waters' },
    { name: 'Milos', link: '/guides/milos', description: 'Volcanic landscapes and unique beaches' },
    { name: 'Ios', link: '/guides/ios', description: 'Vibrant nightlife and pristine beaches' }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <Helmet>
        <title>Car Rental Greece Islands | Best Deals Santorini, Mykonos, Naxos | Greece Cyclades</title>
        <meta name="description" content="Rent a car in Greek Islands with the best prices. Compare deals from top rental companies for Santorini, Mykonos, Naxos, Paros. Free cancellation, no hidden fees. Book your Cyclades car rental today!" />
        <meta name="keywords" content="car rental greece, rent car santorini, mykonos car rental, naxos car hire, cyclades islands car rental, greek islands transportation, rent a car greece" />
        <link rel="canonical" href="https://greececyclades.com/rent-a-car" />
        <meta property="og:title" content="Car Rental Greece Islands | Best Deals Santorini, Mykonos, Naxos" />
        <meta property="og:description" content="Find the best car rental deals in Greek Islands. Compare prices from top companies. Free cancellation, no hidden fees." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greececyclades.com/rent-a-car" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RentACarAgency",
            "name": "Greece Cyclades Car Rental",
            "description": "Car rental services in Greek Islands including Santorini, Mykonos, Naxos, and other Cyclades islands",
            "url": "https://greececyclades.com/rent-a-car",
            "areaServed": ["Santorini", "Mykonos", "Naxos", "Paros", "Milos", "Ios", "Cyclades Islands"],
            "priceRange": "€20-€80"
          })}
        </script>
      </Helmet>
      
      {/* Hero Section with Search Widget */}
      <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white">
        <div className="absolute inset-0 bg-primary-800/20"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Car Rental in Cyclades Islands Greece</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Discover the freedom to explore <Link to="/guides/santorini" className="underline hover:text-secondary-200">Santorini</Link>, <Link to="/guides/mykonos" className="underline hover:text-secondary-200">Mykonos</Link>, <Link to="/guides/naxos" className="underline hover:text-secondary-200">Naxos</Link>, and all Greek islands at your own pace with our premium car rental service
            </p>
          </div>
          
          {/* Search Widget */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6">
            <div ref={searchContainerRef} id="car-rental-search-container" className="min-h-[400px] flex justify-center items-center">
              <div className="text-center text-primary-600">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mb-2"></div>
                <p>Loading car rental search widget...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        
        {/* SEO Introduction Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-secondary-200">
            <h2 className="text-3xl font-bold text-primary-600 mb-6 text-center">Why Choose Car Rental for Your Greek Island Adventure?</h2>
            <div className="prose prose-lg max-w-none text-primary-400 leading-relaxed">
              <p className="mb-4">
                Exploring the <strong>Cyclades Islands</strong> by car offers unparalleled freedom and flexibility for your Greek vacation. From the iconic sunsets of <Link to="/guides/santorini" className="text-primary-600 hover:text-primary-700 font-medium">Santorini</Link> to the vibrant nightlife of <Link to="/guides/mykonos" className="text-primary-600 hover:text-primary-700 font-medium">Mykonos</Link>, having your own vehicle allows you to discover hidden beaches, traditional villages, and breathtaking viewpoints that tour buses simply cannot reach.
              </p>
              <p className="mb-4">
                Our <strong>car rental service in Greece</strong> covers all major Cyclades islands including <Link to="/guides/naxos" className="text-primary-600 hover:text-primary-700 font-medium">Naxos</Link>, <Link to="/guides/paros" className="text-primary-600 hover:text-primary-700 font-medium">Paros</Link>, <Link to="/guides/milos" className="text-primary-600 hover:text-primary-700 font-medium">Milos</Link>, and <Link to="/guides/ios" className="text-primary-600 hover:text-primary-700 font-medium">Ios</Link>. Whether you're planning a romantic getaway, family vacation, or adventure trip, we have the perfect vehicle for your needs.
              </p>
              <p>
                Book your <strong>Greek island car rental</strong> today and experience the authentic beauty of the Cyclades at your own pace. Don't forget to check our <Link to="/ferry-tickets" className="text-primary-600 hover:text-primary-700 font-medium">ferry booking service</Link> for seamless island hopping with your rental car.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-4">Why Choose Our Car Rental Service in Greece</h2>
          <p className="text-primary-400 text-center mb-10 max-w-3xl mx-auto">
            We provide the most reliable and affordable car rental solutions across all Cyclades islands with unmatched customer service and vehicle quality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-primary-500">
              <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                <Car className="text-primary-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Free Cancellation & Modifications</h3>
              <p className="text-primary-400">Plans change? No problem. Cancel or modify your booking up to 48 hours before pickup with no fees or penalties. Complete flexibility for your Greek island vacation.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-secondary-400">
              <div className="inline-block p-3 bg-secondary-100 rounded-full mb-4">
                <Calendar className="text-secondary-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">No Hidden Charges Policy</h3>
              <p className="text-primary-400">Transparent pricing with all insurance, taxes, and fees included upfront. What you see is exactly what you pay - no surprises at pickup or return.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-primary-500">
              <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                <Building className="text-primary-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">Island Hopping Friendly Rentals</h3>
              <p className="text-primary-400">Take your rental car on ferries between islands with our flexible policies. Perfect for exploring multiple Cyclades destinations in one trip.</p>
            </div>
          </div>
        </div>

        {/* Popular Destinations Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-4">Explore Popular Cyclades Islands by Car</h2>
          <p className="text-primary-400 text-center mb-10 max-w-3xl mx-auto">
            Each Cyclades island offers unique experiences best discovered with the freedom of your own rental car. Explore our detailed island guides for the perfect itinerary.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularIslands.map((island, index) => (
              <Link 
                key={index} 
                to={island.link}
                className="bg-white rounded-lg shadow-md p-6 border border-secondary-200 hover:shadow-lg hover:border-primary-300 transition-all group"
              >
                <div className="flex items-center mb-3">
                  <MapPin className="w-6 h-6 text-primary-600 mr-3" />
                  <h3 className="text-xl font-semibold text-primary-600 group-hover:text-primary-700">{island.name}</h3>
                </div>
                <p className="text-primary-400 text-sm">{island.description}</p>
                <div className="mt-4 text-sm text-primary-600 font-medium">
                  Explore {island.name} Guide →
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Popular Locations Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-4">Car Rental Pickup Locations & Prices</h2>
          <p className="text-primary-400 text-center mb-10 max-w-3xl mx-auto">
            Compare rental prices across the most popular pickup locations in the Cyclades islands. All prices include basic insurance and unlimited mileage.
          </p>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-secondary-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-primary-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">Pickup Location</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">Vehicle Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">Rental Company</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider">Starting Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {popularLocations.map((location, index) => (
                    <tr key={index} className="hover:bg-secondary-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-700 font-medium">{location.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-700">{location.carType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-700">{location.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">{location.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-primary-300 mt-3 text-center">
            * Prices are estimates for peak season. Actual rates may vary based on availability, booking time, and rental duration. 
            Book early for the best deals on your <strong>Greek island car rental</strong>.
          </p>
        </div>
        
        {/* Rental Companies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-4">Trusted Car Rental Partners in Greece</h2>
          <p className="text-primary-400 text-center mb-10 max-w-3xl mx-auto">
            We work exclusively with established, reliable car rental companies to ensure you receive quality vehicles and professional service throughout your Greek island adventure.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {rentalCompanies.map((company, index) => {
              const IconComponent = company.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-24 border border-secondary-200 hover:border-primary-300 transition-colors group">
                  <IconComponent className="w-8 h-8 text-primary-500 group-hover:text-primary-600 transition-colors mb-2" />
                  <span className="text-sm font-medium text-primary-600">{company.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Car Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-6">Best Car Types for Greek Island Exploration</h2>
          <p className="text-primary-400 text-center mb-10 max-w-3xl mx-auto">
            Choose the perfect vehicle for your Cyclades adventure. From economy cars for city exploration to off-road vehicles for hidden beaches, we have options for every travel style and budget.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carTypes.map((carType, index) => {
              const IconComponent = carType.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-secondary-200 hover:shadow-lg transition-shadow">
                  <div className={`h-32 bg-gradient-to-br ${carType.gradient} flex items-center justify-center`}>
                    <IconComponent className="w-16 h-16 text-primary-600" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary-600 mb-2">{carType.title}</h3>
                    <p className="text-primary-400 mb-4">{carType.description}</p>
                    <div className="flex items-center text-sm text-primary-500 mb-3">
                      <Car className="mr-2 w-4 h-4" /> 
                      <span className="font-medium">{carType.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {carType.features.map((feature, idx) => (
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
            <h2 className="text-3xl font-bold text-primary-600 mb-6">Complete Guide to Car Rental in Greek Islands</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-4">Planning Your Greek Island Road Trip</h3>
                <p className="text-primary-400 mb-4">
                  Renting a car in the <strong>Cyclades islands</strong> opens up endless possibilities for exploration. Start your journey by booking <Link to="/ferry-tickets" className="text-primary-600 hover:text-primary-700 font-medium">ferry tickets</Link> to transport your rental car between islands, allowing you to experience multiple destinations in one trip.
                </p>
                <p className="text-primary-400 mb-4">
                  Consider staying at our recommended <Link to="/hotels" className="text-primary-600 hover:text-primary-700 font-medium">hotels in Greece</Link> that offer secure parking for your rental vehicle. Many properties provide complimentary parking and are strategically located near major attractions.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-4">Best Times to Rent a Car in Greece</h3>
                <ul className="text-primary-400 space-y-2">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />Peak season (July-August): Book 2-3 months in advance</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />Shoulder season (May-June, September): Best balance of weather and prices</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />Off-season (October-April): Lowest prices but limited ferry schedules</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />Easter period: High demand, book well in advance</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-secondary-200">
              <h3 className="text-xl font-semibold text-primary-600 mb-4">Essential Information for Car Rental in Greece</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-block p-3 bg-primary-100 rounded-full mb-3">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-primary-600 mb-2">Driver Requirements</h4>
                  <p className="text-sm text-primary-400">Valid license for 1+ years, minimum age 21, international permit recommended</p>
                </div>
                <div className="text-center">
                  <div className="inline-block p-3 bg-secondary-100 rounded-full mb-3">
                    <Clock className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h4 className="font-semibold text-primary-600 mb-2">Booking Flexibility</h4>
                  <p className="text-sm text-primary-400">Free cancellation up to 48 hours, easy modifications, 24/7 customer support</p>
                </div>
                <div className="text-center">
                  <div className="inline-block p-3 bg-primary-100 rounded-full mb-3">
                    <Euro className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-primary-600 mb-2">Transparent Pricing</h4>
                  <p className="text-sm text-primary-400">All taxes included, comprehensive insurance options, fuel policies clearly stated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Driving Tips */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-md p-8 text-white border border-primary-400">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                <div className="bg-white/10 rounded-full p-6 inline-block">
                  <MapPin className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Essential Driving Tips for the Cyclades Islands</h2>
                <p className="mb-4 opacity-90">Navigate Greek island roads safely and confidently with these insider tips from local experts.</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-200">•</span>
                    <span>Drive on the right side and always wear seatbelts - road safety is strictly enforced in Greece</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-200">•</span>
                    <span>Prepare for narrow, winding roads especially in traditional villages like those in <Link to="/guides/naxos" className="underline hover:text-secondary-200">Naxos</Link> and <Link to="/guides/paros" className="underline hover:text-secondary-200">Paros</Link></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-200">•</span>
                    <span>Watch for pedestrians and cyclists, particularly in tourist hotspots and near popular beaches</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-200">•</span>
                    <span>Parking is limited in city centers - arrive early at popular destinations or use designated parking areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-200">•</span>
                    <span>Gas stations may have limited hours on smaller islands - always keep your tank above half full</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-200">•</span>
                    <span>Download offline maps before traveling as mobile coverage can be spotty in remote areas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews/Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-600 text-center mb-10">What Our Customers Say About Greek Island Car Rentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-secondary-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-primary-400">5.0 rating</span>
              </div>
              <p className="text-primary-400 mb-4 italic">
                "Perfect car rental experience in Santorini! The pickup was smooth, car was spotless, and having our own transport made exploring the island so much easier."
              </p>
              <p className="text-sm text-primary-600 font-medium">Sarah M. - UK Tourist</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-secondary-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-primary-400">5.0 rating</span>
              </div>
              <p className="text-primary-400 mb-4 italic">
                "Booked for our Mykonos-Naxos island hopping trip. The ferry transportation process was seamless and customer service was outstanding."
              </p>
              <p className="text-sm text-primary-600 font-medium">Marco R. - Italian Family</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-secondary-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-primary-400">5.0 rating</span>
              </div>
              <p className="text-primary-400 mb-4 italic">
                "Great value for money! No hidden fees, transparent pricing, and the SUV was perfect for exploring Paros' hidden beaches and mountain villages."
              </p>
              <p className="text-sm text-primary-600 font-medium">Anna K. - German Couple</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg shadow-md overflow-hidden border border-primary-500">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore the Cyclades Islands?</h2>
              <p className="text-white/90 text-lg mb-6">
                Book your rental car today and start planning your dream island-hopping adventure in Greece. 
                Combine with our <Link to="/ferry-tickets" className="underline hover:text-secondary-200">ferry booking service</Link> and 
                <Link to="/hotels" className="underline hover:text-secondary-200"> accommodation options</Link> for the complete travel solution.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a href="#car-rental-search-container" className="inline-block bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-secondary-50 transition duration-300">
                  Search Rental Cars Now
                </a>
                <Link to="/ferry-tickets" className="inline-block bg-transparent text-white border-2 border-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition duration-300">
                  Book Ferry Tickets
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-secondary-200 to-secondary-300 flex items-center justify-center p-12">
              <div className="text-center">
                <Car className="w-24 h-24 text-primary-600 mx-auto mb-4" />
                <p className="text-primary-600 font-medium text-lg">Start Your Island Adventure</p>
                <p className="text-primary-500 text-sm mt-2">Free cancellation • No hidden fees • 24/7 support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services Section */}
        <div className="mt-16 bg-secondary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary-600 text-center mb-6">Complete Your Greek Island Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link to="/ferry-tickets" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-200">
              <Building className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-primary-600 mb-1">Ferry Tickets</h3>
              <p className="text-sm text-primary-400">Island hopping made easy</p>
            </Link>
            
            <Link to="/hotels" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-200">
              <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-primary-600 mb-1">Hotels</h3>
              <p className="text-sm text-primary-400">Best accommodation deals</p>
            </Link>
            
            <Link to="/activities" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-200">
              <Star className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-primary-600 mb-1">Activities</h3>
              <p className="text-sm text-primary-400">Tours and experiences</p>
            </Link>
            
            <Link to="/trip-planner" className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-200">
              <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-primary-600 mb-1">Trip Planner</h3>
              <p className="text-sm text-primary-400">Plan your perfect itinerary</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}