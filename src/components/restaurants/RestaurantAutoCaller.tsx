import React, { useState, useEffect, useRef } from 'react';
import { Utensils, Phone, Calendar, Clock, Users, MapPin, Star, Mic, MicOff, Volume2, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// Types for the restaurant system
interface Restaurant {
  id: string;
  name: string;
  phone: string;
  location: string;
  cuisine: string;
  priceRange: '€' | '€€' | '€€€' | '€€€€';
  rating: number;
  specialties: string[];
  features: string[];
  description: string;
  isAvailable: boolean;
}

interface ReservationResponse {
  success: boolean;
  message: string;
  reservationId?: string;
  restaurant?: Restaurant;
  confirmationDetails?: {
    date: string;
    time: string;
    partySize: number;
    specialRequests?: string;
  };
}

interface BookingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  icon: React.ReactNode;
}

// Real Sifnos Restaurants Database
const sifnosRestaurants: Restaurant[] = [
  {
    id: 'drimoni_sifnos',
    name: 'Drimoni Restaurant',
    phone: '+30228403xxxx',
    location: 'Plathys Gialos, Sifnos',
    cuisine: 'Traditional Greek & Seafood',
    priceRange: '€€€',
    rating: 4.8,
    specialties: [
      'Fresh Lobster Pasta',
      'Grilled Octopus',
      'Sifnian Chickpea Soup',
      'Sea Bass Carpaccio',
      'Sunset Views'
    ],
    features: [
      'Beachfront Location',
      'Sunset Views',
      'Fresh Seafood',
      'Wine Selection',
      'Romantic Atmosphere'
    ],
    description: 'Elegant beachfront restaurant at Plathys Gialos with stunning sunset views and exceptional seafood cuisine.',
    isAvailable: true
  },
  {
    id: 'meropi_sifnos',
    name: 'Meropi Restaurant',
    phone: '+30228402xxxx',
    location: 'Apollonia, Sifnos',
    cuisine: 'Traditional Sifnian & Mediterranean',
    priceRange: '€€',
    rating: 4.7,
    specialties: [
      'Sifnian Mastelo (Lamb)',
      'Chickpea Fritters',
      'Local Cheese Selection',
      'Traditional Revithada',
      'Homemade Desserts'
    ],
    features: [
      'Traditional Recipes',
      'Local Ingredients',
      'Family Atmosphere',
      'Vegetarian Options',
      'Authentic Sifnian Cuisine'
    ],
    description: 'Authentic Sifnian taverna in the heart of Apollonia, serving traditional recipes passed down through generations.',
    isAvailable: true
  },
  {
    id: 'cantina_sifnos',
    name: 'Cantina Sifnos',
    phone: '+30228401xxxx',
    location: 'Apollonia, Sifnos',
    cuisine: 'Modern Greek & International',
    priceRange: '€€',
    rating: 4.6,
    specialties: [
      'Gourmet Burgers',
      'Creative Salads',
      'Craft Cocktails',
      'Fusion Dishes',
      'Late Night Menu'
    ],
    features: [
      'Late Night Dining',
      'Craft Cocktails',
      'Modern Atmosphere',
      'International Menu',
      'Young Crowd'
    ],
    description: 'Trendy restaurant and bar in Apollonia offering modern Greek cuisine with international influences and creative cocktails.',
    isAvailable: true
  },
  {
    id: 'omega3_sifnos',
    name: 'Omega3 Restaurant',
    phone: '+30228405xxxx',
    location: 'Kamares, Sifnos',
    cuisine: 'Seafood & Mediterranean',
    priceRange: '€€€',
    rating: 4.5,
    specialties: [
      'Fresh Fish Daily',
      'Seafood Risotto',
      'Grilled Prawns',
      'Fish Soup',
      'Harbor Views'
    ],
    features: [
      'Harbor Views',
      'Fresh Daily Catch',
      'Lunch & Dinner',
      'Family Friendly',
      'Port Location'
    ],
    description: 'Waterfront seafood restaurant at Kamares port, specializing in fresh daily catch and Mediterranean flavors.',
    isAvailable: true
  }
];

// Mock restaurant service functions
const parseNaturalLanguageRequest = (input: string) => {
  const lowerInput = input.toLowerCase();
  let restaurantId = '';
  
  // Find restaurant
  for (const restaurant of sifnosRestaurants) {
    const names = [
      restaurant.name.toLowerCase(),
      restaurant.name.toLowerCase().replace(' restaurant', ''),
      restaurant.name.toLowerCase().replace(' sifnos', ''),
      restaurant.id.replace('_sifnos', '')
    ];
    
    if (names.some(name => lowerInput.includes(name))) {
      restaurantId = restaurant.id;
      break;
    }
  }

  // Extract date
  let date = '';
  if (lowerInput.includes('today') || lowerInput.includes('σήμερα')) {
    date = new Date().toISOString().split('T')[0];
  } else if (lowerInput.includes('tomorrow') || lowerInput.includes('αύριο')) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    date = tomorrow.toISOString().split('T')[0];
  }

  // Extract time
  let time = '';
  if (lowerInput.includes('sunset') || lowerInput.includes('ηλιοβασίλεμα')) {
    time = '20:00';
  } else if (lowerInput.includes('lunch') || lowerInput.includes('μεσημεριανό')) {
    time = '13:30';
  } else if (lowerInput.includes('dinner') || lowerInput.includes('δείπνο')) {
    time = '20:30';
  }

  // Extract party size
  let partySize = 2;
  const sizeMatch = input.match(/(\d+)\s*(?:people|persons|άτομα|άνθρωπους)/i);
  if (sizeMatch) {
    partySize = parseInt(sizeMatch[1]);
  }

  return { restaurantId, date, time, partySize };
};

const mockBookRestaurant = async (input: string, phone: string): Promise<ReservationResponse> => {
  const parsed = parseNaturalLanguageRequest(input);
  
  if (!parsed.restaurantId) {
    return {
      success: false,
      message: 'Δεν βρέθηκε εστιατόριο στο αίτημά σας. Δοκιμάστε: Drimoni, Meropi, Cantina, ή Omega3.'
    };
  }

  const restaurant = sifnosRestaurants.find(r => r.id === parsed.restaurantId);
  if (!restaurant) {
    return {
      success: false,
      message: 'Το εστιατόριο δεν είναι διαθέσιμο.'
    };
  }

  if (!parsed.date || !parsed.time) {
    return {
      success: false,
      message: 'Παρακαλώ προσδιορίστε την ημερομηνία και ώρα για την κράτησή σας.'
    };
  }

  const reservationId = `RES_${Date.now()}`;

  return {
    success: true,
    message: `Η κράτησή σας στο ${restaurant.name} έχει σταλεί! Θα σας καλέσουμε σύντομα για επιβεβαίωση.`,
    reservationId,
    restaurant,
    confirmationDetails: {
      date: parsed.date,
      time: parsed.time,
      partySize: parsed.partySize
    }
  };
};

interface RestaurantAutoCallerProps {
  className?: string;
}

export function RestaurantAutoCaller({ className = '' }: RestaurantAutoCallerProps) {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingResult, setBookingResult] = useState<ReservationResponse | null>(null);
  const [availableRestaurants, setAvailableRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [bookingSteps, setBookingSteps] = useState<BookingStep[]>([]);

  const recognitionRef = useRef<any>(null);

  // Initialize available restaurants
  useEffect(() => {
    setAvailableRestaurants(sifnosRestaurants.filter(r => r.isAvailable));
  }, []);

  // Initialize booking steps
  const initializeBookingSteps = (): BookingStep[] => [
    {
      id: 'parse',
      title: 'Ανάλυση Αιτήματος',
      description: 'Επεξεργασία φυσικής γλώσσας',
      status: 'pending',
      icon: <Utensils className="h-5 w-5" />
    },
    {
      id: 'restaurant',
      title: 'Εύρεση Εστιατορίου',
      description: 'Επιλογή καταλληλότερου εστιατορίου',
      status: 'pending',
      icon: <MapPin className="h-5 w-5" />
    },
    {
      id: 'script',
      title: 'Δημιουργία Σεναρίου',
      description: 'Παραγωγή ελληνικού κειμένου κλήσης',
      status: 'pending',
      icon: <Volume2 className="h-5 w-5" />
    },
    {
      id: 'call',
      title: 'Κλήση Εστιατορίου',
      description: 'Φωνητική κλήση με ελληνική TTS',
      status: 'pending',
      icon: <Phone className="h-5 w-5" />
    },
    {
      id: 'confirmation',
      title: 'Επιβεβαίωση SMS',
      description: 'Αποστολή επιβεβαίωσης στον πελάτη',
      status: 'pending',
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'el-GR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const updateStepStatus = (stepId: string, status: BookingStep['status']) => {
    setBookingSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ));
  };

  const handleBookRestaurant = async () => {
    if (!inputText.trim() || !userPhone.trim()) {
      alert('Παρακαλώ συμπληρώστε όλα τα πεδία');
      return;
    }

    setIsProcessing(true);
    setBookingResult(null);
    const steps = initializeBookingSteps();
    setBookingSteps(steps);

    try {
      // Step 1: Parse request
      updateStepStatus('parse', 'active');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const parsedRequest = parseNaturalLanguageRequest(inputText);
      console.log('📝 Parsed request:', parsedRequest);
      
      if (!parsedRequest.restaurantId) {
        updateStepStatus('parse', 'error');
        throw new Error('Δεν βρέθηκε εστιατόριο στο αίτημά σας');
      }
      
      updateStepStatus('parse', 'completed');

      // Step 2: Find restaurant
      updateStepStatus('restaurant', 'active');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const restaurant = sifnosRestaurants.find(r => r.id === parsedRequest.restaurantId);
      if (restaurant) {
        setSelectedRestaurant(restaurant);
        updateStepStatus('restaurant', 'completed');
      } else {
        updateStepStatus('restaurant', 'error');
        throw new Error('Το εστιατόριο δεν είναι διαθέσιμο');
      }

      // Step 3: Generate script
      updateStepStatus('script', 'active');
      await new Promise(resolve => setTimeout(resolve, 1200));
      updateStepStatus('script', 'completed');

      // Step 4: Make call (demo mode)
      updateStepStatus('call', 'active');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate booking API call
      const bookingResponse = await mockBookRestaurant(inputText, userPhone);

      if (bookingResponse.success) {
        updateStepStatus('call', 'completed');

        // Step 5: Send confirmation
        updateStepStatus('confirmation', 'active');
        await new Promise(resolve => setTimeout(resolve, 1000));
        updateStepStatus('confirmation', 'completed');

        setBookingResult(bookingResponse);
      } else {
        updateStepStatus('call', 'error');
        throw new Error(bookingResponse.message);
      }

    } catch (error) {
      console.error('Booking error:', error);
      setBookingResult({
        success: false,
        message: error instanceof Error ? error.message : 'Παρουσιάστηκε σφάλμα'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepStatusIcon = (status: BookingStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'active':
        return <Loader className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Utensils className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Restaurant Auto-Booker</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Κάντε κράτηση σε εστιατόρια της Σίφνου με φυσική γλώσσα! 🍽️
        </p>
      </div>

      {/* Available Restaurants */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Διαθέσιμα Εστιατόρια Σίφνου
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {availableRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRestaurant?.id === restaurant.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <div className="flex items-center mb-2">
                <h3 className="font-semibold text-sm">{restaurant.name}</h3>
                <div className="ml-auto flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm ml-1">{restaurant.rating}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2">{restaurant.location}</p>
              <p className="text-xs text-gray-500">{restaurant.cuisine}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-green-600">
                  {restaurant.priceRange}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Κάντε την Κράτησή σας</h2>
        
        <div className="space-y-4">
          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Τηλέφωνο Επικοινωνίας *
            </label>
            <input
              type="tel"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="+30 6XX XXX XXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Natural Language Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Περιγράψτε την κράτησή σας (Ελληνικά ή Αγγλικά)
            </label>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="π.χ. 'Θέλω τραπέζι για 4 άτομα στο Drimoni αύριο στις 8 το βράδυ με θέα στη θάλασσα'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <button
                onClick={isListening ? stopListening : startListening}
                className={`absolute right-3 top-3 p-2 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isListening ? 'Σταματήστε την ηχογράφηση' : 'Ξεκινήστε την ηχογράφηση'}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Example Requests */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Παραδείγματα αιτημάτων:</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• "Book a table for 2 at Drimoni tomorrow at 8pm with sunset view"</p>
              <p>• "Θέλω τραπέζι για 4 στη Meropi σήμερα στις 9 το βράδυ"</p>
              <p>• "Table for 6 at Cantina tonight, vegetarian options needed"</p>
              <p>• "Κράτηση για 3 άτομα στο Omega3 αύριο μεσημέρι"</p>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookRestaurant}
            disabled={isProcessing || !inputText.trim() || !userPhone.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Επεξεργασία κράτησης...
              </>
            ) : (
              <>
                <Phone className="h-5 w-5 mr-2" />
                Κάντε Κράτηση Τώρα
              </>
            )}
          </button>
        </div>
      </div>

      {/* Booking Process Steps */}
      {bookingSteps.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Πρόοδος Κράτησης</h3>
          <div className="space-y-4">
            {bookingSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  step.status === 'active' ? 'bg-blue-50 border border-blue-200' :
                  step.status === 'completed' ? 'bg-green-50 border border-green-200' :
                  step.status === 'error' ? 'bg-red-50 border border-red-200' :
                  'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  {getStepStatusIcon(step.status)}
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  {index + 1}/5
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Restaurant Details */}
      {selectedRestaurant && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Επιλεγμένο Εστιατόριο</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">{selectedRestaurant.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{selectedRestaurant.location}</span>
                </div>
                <div className="flex items-center">
                  <Utensils className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{selectedRestaurant.cuisine}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                  <span>{selectedRestaurant.rating} / 5.0</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-2">Ειδικότητες:</h5>
              <div className="flex flex-wrap gap-1">
                {selectedRestaurant.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {bookingResult && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className={`flex items-center mb-4 ${
            bookingResult.success ? 'text-green-600' : 'text-red-600'
          }`}>
            {bookingResult.success ? (
              <CheckCircle className="h-6 w-6 mr-2" />
            ) : (
              <AlertCircle className="h-6 w-6 mr-2" />
            )}
            <h3 className="text-lg font-semibold">
              {bookingResult.success ? 'Επιτυχής Κράτηση!' : 'Σφάλμα Κράτησης'}
            </h3>
          </div>
          
          <p className="text-gray-700 mb-4">{bookingResult.message}</p>
          
          {bookingResult.success && bookingResult.confirmationDetails && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Στοιχεία Κράτησης:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{bookingResult.confirmationDetails.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{bookingResult.confirmationDetails.time}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{bookingResult.confirmationDetails.partySize} άτομα</span>
                </div>
                {bookingResult.reservationId && (
                  <div className="col-span-2">
                    <strong>Κωδικός: </strong>{bookingResult.reservationId}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 