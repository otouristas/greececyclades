import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Building, Calendar, MapPin } from 'lucide-react';
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
      script.src = 'https://tp.media/content?trs=376419&shmarker=595305&locale=en&default_pick_up_location=Santorini%20Port&default_drop_off_location=Santorini%20Airport&powered_by=true&border_radius=0&plain=true&show_logo=true&color_background=%23286BFFff&color_button=%232681ff&color_text=%23000000&color_input_text=%23000000&color_button_text=%23ffffff&promo_id=4480&campaign_id=10';
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

  // Car rental companies
  const rentalCompanies = [
    { name: 'Hertz', logo: 'https://logos-world.net/wp-content/uploads/2021/09/Hertz-Logo.png' },
    { name: 'Avis', logo: 'https://logos-world.net/wp-content/uploads/2021/09/Avis-Logo.png' },
    { name: 'Enterprise', logo: 'https://logos-world.net/wp-content/uploads/2021/09/Enterprise-Logo.png' },
    { name: 'Budget', logo: 'https://logos-world.net/wp-content/uploads/2021/09/Budget-Logo.png' },
    { name: 'Sixt', logo: 'https://logos-world.net/wp-content/uploads/2021/09/Sixt-Logo.png' },
    { name: 'Europcar', logo: 'https://logos-world.net/wp-content/uploads/2021/09/Europcar-Logo.png' },
    { name: 'Thrifty', logo: 'https://logos-world.net/wp-content/uploads/2021/09/Thrifty-Logo.png' },
    { name: 'Alamo', logo: 'https://logos-world.net/wp-content/uploads/2021/09/Alamo-Logo.png' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Rent a Car in Greek Islands | Greece Cyclades</title>
        <meta name="description" content="Find the best car rental deals in the Greek Islands. Compare prices from top rental companies for your trip to Santorini, Mykonos, Paros, and other Cyclades islands." />
        <link rel="canonical" href="https://greececyclades.com/rent-a-car" />
      </Helmet>
      
      {/* Hero Section with Search Widget */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{ backgroundImage: "url('/images/rent-a-car/rent-a-car-hero.jpg')" }}
        ></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rent a Car in Cyclades Islands</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">Find the perfect rental car and explore Santorini, Mykonos, Naxos, Paros, and other beautiful Greek islands at your own pace</p>
          </div>
          
          {/* Search Widget */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6">
            <div ref={searchContainerRef} id="car-rental-search-container" className="min-h-[400px] flex justify-center items-center">
              <div className="text-center text-gray-700">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
                <p>Loading car rental search widget...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Why Rent with Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <Car className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Free Cancellation</h3>
              <p className="text-gray-600">Plans change? No problem. Cancel up to 48 hours before pickup with no fees or penalties.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <Calendar className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Hidden Charges</h3>
              <p className="text-gray-600">Our prices include all necessary insurance, taxes, and fees. What you see is what you pay.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <Building className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Island Hopping Friendly</h3>
              <p className="text-gray-600">Take your rental car on ferries between islands with our flexible rental policies.</p>
            </div>
          </div>
        </div>
        
        {/* Popular Locations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Popular Rental Locations</h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">Check out the most popular car rental pickup locations in the Cyclades islands with estimated prices</p>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price From</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {popularLocations.map((location, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.carType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{location.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">* Prices are estimates and may vary based on season, availability, and booking time</p>
        </div>
        
        {/* Rental Companies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Car Rental Companies</h2>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">We partner with top rental companies to offer you the best selection of vehicles</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {rentalCompanies.map((company, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center h-24">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  className="max-h-12 max-w-full" 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Car Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Popular Car Types for Island Exploration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541899481282-94459d278660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Economy Cars</h3>
                <p className="text-gray-600 mb-4">Perfect for couples or solo travelers. Easy to park and navigate narrow island roads.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Car className="mr-2" /> 
                  <span>From €25/day</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Compact SUVs</h3>
                <p className="text-gray-600 mb-4">Great for families or groups. Better handling on unpaved roads and more storage space.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Car className="mr-2" /> 
                  <span>From €45/day</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617373310678-e3ef4632b9fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Convertibles</h3>
                <p className="text-gray-600 mb-4">Experience the island breeze and stunning views. Perfect for scenic coastal drives.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Car className="mr-2" /> 
                  <span>From €60/day</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621252179027-94459d278660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Jeeps & Off-Road</h3>
                <p className="text-gray-600 mb-4">Access remote beaches and rugged terrain. Ideal for adventure seekers.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Car className="mr-2" /> 
                  <span>From €55/day</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Luxury Cars</h3>
                <p className="text-gray-600 mb-4">Travel in style with premium vehicles. Enhanced comfort for longer island drives.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Car className="mr-2" /> 
                  <span>From €80/day</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606159068539-43f36b99d1b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Scooters & ATVs</h3>
                <p className="text-gray-600 mb-4">Fun alternatives to cars. Perfect for short distances and small islands.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Car className="mr-2" /> 
                  <span>From €20/day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Driving Tips */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                <MapPin className="text-6xl mx-auto md:mx-0" />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Driving Tips for the Cyclades</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Drive on the right side of the road and always wear seatbelts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Be prepared for narrow roads and tight turns, especially in villages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Watch for pedestrians, especially in tourist areas and near beaches</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Parking can be limited in popular areas - arrive early or use designated lots</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Gas stations may have limited hours - fill up when you can</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore the Cyclades?</h2>
              <p className="text-white text-lg mb-6">Book your rental car today and start planning your dream island-hopping adventure in Greece.</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a href="#car-rental-search-container" className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">Search Rental Cars</a>
                <Link to="/ferry-tickets" className="inline-block bg-transparent text-white border-2 border-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300">Check Ferry Options</Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};