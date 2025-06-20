import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Phone, MessageSquare, MapPin, Clock, Users, 
  Send, Mic, MicOff, CheckCircle, XCircle, AlertCircle,
  Navigation, Euro, Star, Languages, Zap, Shield
} from 'lucide-react';
import { TaxiService, TaxiDriver, TaxiBookingResponse } from '../../services/taxiService';

interface TaxiAutoCallerProps {
  onClose?: () => void;
}

export default function TaxiAutoCaller({ onClose }: TaxiAutoCallerProps) {
  const [step, setStep] = useState<'input' | 'processing' | 'result'>('input');
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [bookingResult, setBookingResult] = useState<TaxiBookingResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [availableDrivers, setAvailableDrivers] = useState<TaxiDriver[]>([]);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Load available drivers
    setAvailableDrivers(TaxiService.getAvailableDrivers());

    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'el-GR'; // Greek language
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleBooking = async () => {
    if (!userInput.trim()) return;
    
    setIsProcessing(true);
    setStep('processing');
    
    try {
      // For demo purposes, simulate the booking process
      await new Promise(resolve => setTimeout(resolve, 1000)); // Parse request
      
      // Use the TaxiService directly for demo (in production, this would call the API)
      const result = await TaxiService.bookTaxi(userInput);
      setBookingResult(result);
      
      // Simulate the backend processes
      if (result.success && result.driverInfo) {
        console.log('🚕 Demo: Voice call would be made to:', result.driverInfo.phone);
        console.log('📱 Demo: SMS would be sent to user and driver');
        
        // Simulate call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('✅ Demo: Booking process completed successfully');
      }
      
    } catch (error) {
      console.error('Booking error:', error);
      setBookingResult({
        success: false,
        message: 'Παρουσιάστηκε σφάλμα κατά την κράτηση'
      });
    } finally {
      setIsProcessing(false);
      setStep('result');
    }
  };

  const resetForm = () => {
    setStep('input');
    setUserInput('');
    setBookingResult(null);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
            <Car className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Sifnos Taxi Auto-Caller</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Πείτε μας που θέλετε να πάτε και εμείς θα καλέσουμε αυτόματα ένα τοπικό ταξί για εσάς. 
          Χωρίς εφαρμογές, χωρίς περιμένω - απλά φυσική ομιλία.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Quick Examples */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Παραδείγματα χρήσης:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Θέλω ταξί από το Narlis Hotel στην Apollonia στις 8μμ. Το τηλέφωνό μου είναι 694XXXXXXX",
                  "Can you call me a taxi from Kamares port to Plathys Gialos beach? My number is 697XXXXXXX",
                  "Χρειάζομαι ταξί για 4 άτομα από Artemonas στο Kastro αύριο το πρωί",
                  "Taxi from my hotel to Chrissopigi monastery at 6pm please. Phone: 698XXXXXXX"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setUserInput(example)}
                    className="text-left p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors text-sm"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Πείτε μας τι χρειάζεστε (ελληνικά ή αγγλικά):
                </label>
                <div className="relative">
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="π.χ. Θέλω ταξί από το ξενοδοχείο μου στην Apollonia στις 8μμ. Το τηλέφωνό μου είναι 694XXXXXXX"
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                  <button
                    onClick={handleVoiceInput}
                    className={`absolute bottom-3 right-3 p-2 rounded-lg transition-colors ${
                      isListening 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={isListening ? 'Σταματήστε την ηχογράφηση' : 'Ξεκινήστε την ηχογράφηση'}
                  >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                </div>
                {isListening && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-sm">Ακούω...</span>
                  </div>
                )}
              </div>
              
              <div className="px-6 pb-6">
                <button
                  onClick={handleBooking}
                  disabled={!userInput.trim() || isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Καλέστε Ταξί Αυτόματα
                </button>
              </div>
            </div>

            {/* Available Drivers */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Διαθέσιμοι Οδηγοί ({availableDrivers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableDrivers.map((driver) => (
                  <div key={driver.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{driver.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{driver.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{driver.vehicle}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">€{driver.pricePerKm}/km</span>
                      <span className="text-green-600 font-medium">{driver.location}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <Languages className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {driver.languages.join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Επεξεργασία Αιτήματος...</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <span>Ανάλυση αιτήματος...</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span>Εύρεση διαθέσιμου οδηγού...</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <span>Κλήση οδηγού...</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                <span>Αποστολή SMS επιβεβαίωσης...</span>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'result' && bookingResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className={`rounded-xl p-6 ${
              bookingResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                {bookingResult.success ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
                <h3 className={`text-xl font-semibold ${
                  bookingResult.success ? 'text-green-900' : 'text-red-900'
                }`}>
                  {bookingResult.success ? 'Επιτυχής Κράτηση!' : 'Αποτυχία Κράτησης'}
                </h3>
              </div>
              
              <p className={`mb-4 ${
                bookingResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {bookingResult.message}
              </p>

              {bookingResult.success && bookingResult.driverInfo && (
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-gray-900">Στοιχεία Οδηγού:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Όνομα:</span>
                      <p className="font-medium">{bookingResult.driverInfo.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Όχημα:</span>
                      <p className="font-medium">{bookingResult.driverInfo.vehicle}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Εκτιμώμενη Άφιξη:</span>
                      <p className="font-medium">{bookingResult.estimatedArrival}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Εκτιμώμενο Κόστος:</span>
                      <p className="font-medium">€{bookingResult.estimatedPrice}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Κωδικός Κράτησης:</span>
                    <p className="font-mono text-lg font-bold text-blue-600">{bookingResult.requestId}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Νέα Κράτηση
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Κλείσιμο
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Footer */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h4 className="font-semibold text-gray-900">Ασφαλές</h4>
          <p className="text-sm text-gray-600">Μόνο εγκεκριμένοι τοπικοί οδηγοί</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Zap className="h-8 w-8 text-blue-600" />
          <h4 className="font-semibold text-gray-900">Γρήγορο</h4>
          <p className="text-sm text-gray-600">Αυτόματη κλήση σε δευτερόλεπτα</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          <h4 className="font-semibold text-gray-900">Εύκολο</h4>
          <p className="text-sm text-gray-600">Απλή φυσική ομιλία</p>
        </div>
      </div>
    </div>
  );
} 