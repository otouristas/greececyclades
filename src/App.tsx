import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AuthStateHandler from './components/AuthStateHandler';
import CookieConsent from './components/CookieConsent';
import { useAuthStore } from './stores/authStore';

// Immediate load components (critical for initial render)
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

// Lazy load components (loaded on demand)
const Contact = lazy(() => import('./pages/Contact'));
const IslandGuides = lazy(() => import('./pages/IslandGuides'));
const IslandGuidePage = lazy(() => import('./pages/IslandGuidePage'));
const SantoriniGuide = lazy(() => import('./pages/SantoriniGuide'));
const MykonosGuide = lazy(() => import('./pages/MykonosGuide'));
const NaxosGuide = lazy(() => import('./pages/NaxosGuide'));
const ParosGuide = lazy(() => import('./pages/ParosGuide'));
const AndrosGuide = lazy(() => import('./pages/AndrosGuide'));
const SifnosGuide = lazy(() => import('./pages/SifnosGuide'));
const IosGuide = lazy(() => import('./pages/IosGuide'));
const MilosGuide = lazy(() => import('./pages/MilosGuide'));
const SerifosGuide = lazy(() => import('./pages/SerifosGuide'));
const FolegandrosGuide = lazy(() => import('./pages/FolegandrosGuide'));
const SyrosGuide = lazy(() => import('./pages/SyrosGuide'));
const KoufonisiaGuide = lazy(() => import('./pages/KoufonisiaGuide'));
const AmorgosGuide = lazy(() => import('./pages/AmorgosGuide'));
const IrakliaGuide = lazy(() => import('./pages/IrakliaGuide'));
const AntiparosGuide = lazy(() => import('./pages/AntiparosGuide'));
const SchinoussaGuide = lazy(() => import('./pages/SchinoussaGuide'));
const KeaGuide = lazy(() => import('./pages/KeaGuide'));
const KimolosGuide = lazy(() => import('./pages/KimolosGuide'));
const KythnosGuide = lazy(() => import('./pages/KythnosGuide'));
const SikinosGuide = lazy(() => import('./pages/SikinosGuide'));
const AnafiGuide = lazy(() => import('./pages/AnafiGuide'));
const TinosGuide = lazy(() => import('./pages/TinosGuide'));
const DonousaGuide = lazy(() => import('./pages/DonousaGuide'));
const ThirasiaGuide = lazy(() => import('./pages/ThirasiaGuide'));
const Activities = lazy(() => import('./pages/Activities'));
const ActivityDetail = lazy(() => import('./pages/ActivityDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const RentACar = lazy(() => import('./pages/RentACar'));
const Profile = lazy(() => import('./pages/Profile'));
const TripPlanner = lazy(() => import('./pages/TripPlanner'));
const EnhancedTripPlanner = lazy(() => import('./pages/EnhancedTripPlanner'));
const MyTrips = lazy(() => import('./pages/MyTrips'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Hotels = lazy(() => import('./pages/Hotels'));
const HotelDetail = lazy(() => import('./pages/HotelDetail'));
const HotelsTest = lazy(() => import('./pages/HotelsTest'));
const GreekPhrases = lazy(() => import('./pages/GreekPhrases'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const Culinary = lazy(() => import('./pages/Culinary'));
const Islands = lazy(() => import('./pages/Islands'));
const IslandDetail = lazy(() => import('./pages/IslandDetail'));
const VehicleDetail = lazy(() => import('./pages/VehicleDetail'));
const FerryTickets = lazy(() => import('./pages/FerryTickets'));
const FerrySearchResults = lazy(() => import('./pages/FerrySearchResults'));
const FerryTracking = lazy(() => import('./pages/FerryTracking'));
const BackToTop = lazy(() => import('./components/BackToTop'));
const About = lazy(() => import('./pages/About'));
const TestMap = lazy(() => import('./pages/TestMap'));
const Transfers = lazy(() => import('./pages/Transfers'));
const HelpDesk = lazy(() => import('./pages/HelpDesk'));
const NearBy = lazy(() => import('./pages/NearBy'));
const Flights = lazy(() => import('./pages/Flights'));
const Weather = lazy(() => import('./pages/Weather'));
const BudgetCalculator = lazy(() => import('./pages/BudgetCalculator'));
const FerryGuide = lazy(() => import('./pages/FerryGuide'));
const Resources = lazy(() => import('./pages/Resources'));
const ListProperty = lazy(() => import('./pages/ListProperty'));
const TouristasAILanding = lazy(() => import('./pages/TouristasAILanding'));
const TouristasAIChat = lazy(() => import('./pages/TouristasAIChat'));
const TouristasAIChatFloating = lazy(() => import('./components/touristas-ai/TouristasAIChat'));
const BusinessSignUp = lazy(() => import('./pages/BusinessSignUp'));
const BusinessSignIn = lazy(() => import('./pages/BusinessSignIn'));
const BusinessDashboard = lazy(() => import('./pages/BusinessDashboard'));

import { ToastProvider } from './contexts/ToastContext';

import './styles/fonts.css';
import './i18n';

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Component to handle trip-planner redirect with query parameters
function TripPlannerRedirect() {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const to = queryString ? `/touristas-ai?${queryString}` : '/touristas-ai';
  return <Navigate to={to} replace />;
}

function AppContent() {
  const navigate = useNavigate();
  const { initialize, initialized } = useAuthStore();
  
  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);
  
  const handleAuthClick = () => {
    navigate('/signin');
  };

  return (
    <>
      <ScrollToTop />
      <AuthStateHandler />
      <div className="min-h-screen bg-gray-50">
        <Navbar onAuthClick={handleAuthClick} />
        <CookieConsent />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Redirect Routes - Handle legacy URLs */}
              <Route path="/vehicles" element={<Navigate to="/rent-a-car" replace />} />
              <Route path="/car-rentals" element={<Navigate to="/rent-a-car" replace />} />
              <Route path="/ferries" element={<Navigate to="/ferry-tickets" replace />} />
              <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
              <Route path="/faq" element={<Navigate to="/help" replace />} />
              <Route path="/map" element={<Navigate to="/islands" replace />} />
              <Route path="/cookie-policy" element={<Navigate to="/privacy" replace />} />
              <Route path="/cookies" element={<Navigate to="/privacy" replace />} />
              <Route path="/gdpr" element={<Navigate to="/privacy" replace />} />
              <Route path="/emergency-contacts" element={<Navigate to="/help" replace />} />
              <Route path="/business/signup" element={<Navigate to="/list-property" replace />} />
              <Route path="/travel-insurance" element={<Navigate to="/resources" replace />} />
              
              {/* Tips redirects to guides */}
              <Route path="/tips/santorini" element={<Navigate to="/guides/santorini#tips" replace />} />
              <Route path="/tips/mykonos" element={<Navigate to="/guides/mykonos#tips" replace />} />
              <Route path="/tips/naxos" element={<Navigate to="/guides/naxos#tips" replace />} />
              <Route path="/tips/paros" element={<Navigate to="/guides/paros#tips" replace />} />
              <Route path="/tips/andros" element={<Navigate to="/guides/andros#tips" replace />} />
              <Route path="/tips/sifnos" element={<Navigate to="/guides/sifnos#tips" replace />} />
              <Route path="/tips/ios" element={<Navigate to="/guides/ios#tips" replace />} />
              <Route path="/tips/milos" element={<Navigate to="/guides/milos#tips" replace />} />
              <Route path="/tips/serifos" element={<Navigate to="/guides/serifos#tips" replace />} />
              <Route path="/tips/folegandros" element={<Navigate to="/guides/folegandros#tips" replace />} />
              <Route path="/tips/syros" element={<Navigate to="/guides/syros#tips" replace />} />
              <Route path="/tips/koufonisia" element={<Navigate to="/guides/koufonisia#tips" replace />} />
              <Route path="/tips/amorgos" element={<Navigate to="/guides/amorgos#tips" replace />} />
              <Route path="/tips/antiparos" element={<Navigate to="/guides/antiparos#tips" replace />} />
              <Route path="/tips/kea" element={<Navigate to="/guides/kea#tips" replace />} />
              <Route path="/tips/kythnos" element={<Navigate to="/guides/kythnos#tips" replace />} />
              <Route path="/tips/sikinos" element={<Navigate to="/guides/sikinos#tips" replace />} />
              <Route path="/tips/anafi" element={<Navigate to="/guides/anafi#tips" replace />} />
              <Route path="/tips/tinos" element={<Navigate to="/guides/tinos#tips" replace />} />
              <Route path="/tips/kimolos" element={<Navigate to="/guides/kimolos#tips" replace />} />
              <Route path="/tips/schinoussa" element={<Navigate to="/guides/schinoussa#tips" replace />} />
              <Route path="/tips/iraklia" element={<Navigate to="/guides/iraklia#tips" replace />} />
              <Route path="/tips/donousa" element={<Navigate to="/guides/donousa#tips" replace />} />
              <Route path="/tips/thirasia" element={<Navigate to="/guides/thirasia#tips" replace />} />
              
              {/* Photo galleries redirect to island pages */}
              <Route path="/photos/santorini" element={<Navigate to="/islands/santorini" replace />} />
              <Route path="/photos/mykonos" element={<Navigate to="/islands/mykonos" replace />} />
              <Route path="/photos/naxos" element={<Navigate to="/islands/naxos" replace />} />
              <Route path="/photos/paros" element={<Navigate to="/islands/paros" replace />} />
              <Route path="/photos/milos" element={<Navigate to="/islands/milos" replace />} />
              
              {/* Additional redirects */}
              <Route path="/schinoussa-guide" element={<Navigate to="/guides/schinoussa" replace />} />
              <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
              <Route path="/transportation" element={<Navigate to="/transfers" replace />} />
              <Route path="/business/signin" element={<Navigate to="/signin" replace />} />
              <Route path="/planner" element={<Navigate to="/trip-planner" replace />} />
              
              {/* Travel guide redirects */}
              <Route path="/travel-guide/santorini" element={<Navigate to="/guides/santorini" replace />} />
              <Route path="/travel-guide/mykonos" element={<Navigate to="/guides/mykonos" replace />} />
              <Route path="/travel-guide/naxos" element={<Navigate to="/guides/naxos" replace />} />
              <Route path="/travel-guide/paros" element={<Navigate to="/guides/paros" replace />} />
              <Route path="/travel-guide/sifnos" element={<Navigate to="/guides/sifnos" replace />} />
              <Route path="/travel-guide/koufonisia" element={<Navigate to="/guides/koufonisia" replace />} />
              <Route path="/travel-guide/antiparos" element={<Navigate to="/guides/antiparos" replace />} />
              <Route path="/travel-guide/kimolos" element={<Navigate to="/guides/kimolos" replace />} />
              
              {/* Hotel redirects */}
              <Route path="/hotels/cavo-tagoo" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/belvedere-mykonos-mykonos" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/kouros-village-mykonos" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/summer-senses-resort-paros" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/verina-astra-sifnos" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/mystique-hotel-santorini" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/kavos-naxos-naxos" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/paros-agnanti-paros" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/mykonos-breeze-mykonos" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/caldera-villas-santorini" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/skinopi-lodge-milos" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/milos-hideaway-milos" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/paros-luxury-resort-paros" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/yria-boutique-hotel-paros" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/absolute-bliss-santorini" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/katikies" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/parilio-hotel" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/paros-agnanti" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/yria-boutique-hotel" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/belvedere-mykonos" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/kouros-village" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/verina-astra" element={<Navigate to="/hotels" replace />} />
              <Route path="/hotels/kamaroti-suites" element={<Navigate to="/hotels" replace />} />
              
              {/* Activity redirects */}
              <Route path="/activities/paros-sup" element={<Navigate to="/activities" replace />} />
              <Route path="/activities/kamari-diving" element={<Navigate to="/activities" replace />} />
              <Route path="/activities/caldera-cruise" element={<Navigate to="/activities" replace />} />
              
              {/* Restaurant/nightlife redirects */}
              <Route path="/restaurants/santorini-caldera" element={<Navigate to="/culinary" replace />} />
              <Route path="/restaurants/kikis-tavern" element={<Navigate to="/culinary" replace />} />
              <Route path="/restaurants/nammos" element={<Navigate to="/culinary" replace />} />
              <Route path="/restaurants/naoussa" element={<Navigate to="/culinary" replace />} />
              <Route path="/restaurants/naxos" element={<Navigate to="/culinary" replace />} />
              <Route path="/nightlife/galleraki" element={<Navigate to="/culinary" replace />} />
              <Route path="/nightlife/caprice" element={<Navigate to="/culinary" replace />} />
              <Route path="/nightlife/scarpa" element={<Navigate to="/culinary" replace />} />
              
              {/* Culinary specific redirects */}
              <Route path="/culinary/naxos-potatoes" element={<Navigate to="/culinary" replace />} />
              <Route path="/culinary/naxos-cheese" element={<Navigate to="/culinary" replace />} />
              <Route path="/culinary/sifnos-cheese" element={<Navigate to="/culinary" replace />} />
              <Route path="/culinary/kitron" element={<Navigate to="/culinary" replace />} />
              
              {/* Ferry specific routes */}
              <Route path="/ferry-tickets/piraeus-naxos" element={<Navigate to="/ferry-tickets" replace />} />
              <Route path="/ferry-tickets/piraeus-mykonos" element={<Navigate to="/ferry-tickets" replace />} />
              <Route path="/ferry-tickets/piraeus-milos" element={<Navigate to="/ferry-tickets" replace />} />
              <Route path="/ferry-tickets/piraeus-paros" element={<Navigate to="/ferry-tickets" replace />} />
              <Route path="/ferry-tickets/piraeus-santorini" element={<Navigate to="/ferry-tickets" replace />} />
              
              <Route path="/test-map" element={<TestMap />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/islands" element={<Islands />} />
              
              {/* Case-sensitive island redirects */}
              <Route path="/islands/Paros" element={<Navigate to="/islands/paros" replace />} />
              <Route path="/islands/Milos" element={<Navigate to="/islands/milos" replace />} />
              <Route path="/islands/Naxos" element={<Navigate to="/islands/naxos" replace />} />
              <Route path="/islands/Ios" element={<Navigate to="/islands/ios" replace />} />
              <Route path="/islands/Mykonos" element={<Navigate to="/islands/mykonos" replace />} />
              <Route path="/islands/Santorini" element={<Navigate to="/islands/santorini" replace />} />
              <Route path="/islands/Syros" element={<Navigate to="/islands/syros" replace />} />
              <Route path="/islands/Andros" element={<Navigate to="/islands/andros" replace />} />
              <Route path="/islands/Sifnos" element={<Navigate to="/islands/sifnos" replace />} />
              <Route path="/islands/Serifos" element={<Navigate to="/islands/serifos" replace />} />
              <Route path="/islands/Folegandros" element={<Navigate to="/islands/folegandros" replace />} />
              <Route path="/islands/Amorgos" element={<Navigate to="/islands/amorgos" replace />} />
              <Route path="/islands/Koufonisia" element={<Navigate to="/islands/koufonisia" replace />} />
              <Route path="/islands/Antiparos" element={<Navigate to="/islands/antiparos" replace />} />
              <Route path="/islands/Kea" element={<Navigate to="/islands/kea" replace />} />
              <Route path="/islands/Kythnos" element={<Navigate to="/islands/kythnos" replace />} />
              <Route path="/islands/Sikinos" element={<Navigate to="/islands/sikinos" replace />} />
              <Route path="/islands/Anafi" element={<Navigate to="/islands/anafi" replace />} />
              <Route path="/islands/Kimolos" element={<Navigate to="/islands/kimolos" replace />} />
              <Route path="/islands/Schinoussa" element={<Navigate to="/islands/schinoussa" replace />} />
              <Route path="/islands/Iraklia" element={<Navigate to="/islands/iraklia" replace />} />
              <Route path="/islands/Donousa" element={<Navigate to="/islands/donousa" replace />} />
              <Route path="/islands/Thirasia" element={<Navigate to="/islands/thirasia" replace />} />
              <Route path="/islands/Tinos" element={<Navigate to="/islands/tinos" replace />} />
              
              <Route path="/islands/:slug" element={<IslandDetail />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:slug" element={<HotelDetail />} />
              <Route path="/hotels-test" element={<HotelsTest />} />
              <Route path="/greek-phrases" element={<GreekPhrases />} />
              <Route path="/ferry-tickets" element={<FerryTickets />} />
              <Route path="/ferry-tickets-search" element={<FerrySearchResults />} />
              <Route path="/ferry-tickets/tracking" element={<FerryTracking />} />
              <Route path="/ferry-guide" element={<FerryGuide />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/rent-a-car" element={<RentACar />} />
              <Route path="/rent-a-car/:id" element={<VehicleDetail />} />
              <Route path="/culinary" element={<Culinary />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/guides" element={<IslandGuides />} />
              <Route path="/guides/santorini" element={<SantoriniGuide />} />
              <Route path="/guides/mykonos" element={<MykonosGuide />} />
              <Route path="/guides/naxos" element={<NaxosGuide />} />
              <Route path="/guides/paros" element={<ParosGuide />} />
              <Route path="/guides/andros" element={<AndrosGuide />} />
              <Route path="/guides/sifnos" element={<SifnosGuide />} />
              <Route path="/guides/ios" element={<IosGuide />} />
              <Route path="/guides/milos" element={<MilosGuide />} />
              <Route path="/guides/serifos" element={<SerifosGuide />} />
              <Route path="/guides/folegandros" element={<FolegandrosGuide />} />
              <Route path="/guides/syros" element={<SyrosGuide />} />
              <Route path="/guides/koufonisia" element={<KoufonisiaGuide />} />
              <Route path="/guides/amorgos" element={<AmorgosGuide />} />
              <Route path="/guides/iraklia" element={<IrakliaGuide />} />
              <Route path="/guides/antiparos" element={<AntiparosGuide />} />
              <Route path="/guides/schinoussa" element={<SchinoussaGuide />} />
              <Route path="/guides/kea" element={<KeaGuide />} />
              <Route path="/guides/kimolos" element={<KimolosGuide />} />
              <Route path="/guides/kythnos" element={<KythnosGuide />} />
              <Route path="/guides/sikinos" element={<SikinosGuide />} />
              <Route path="/guides/anafi" element={<AnafiGuide />} />
              <Route path="/guides/tinos" element={<TinosGuide />} />
              <Route path="/guides/donousa" element={<DonousaGuide />} />
              <Route path="/guides/thirasia" element={<ThirasiaGuide />} />
              <Route path="/guides/:slug" element={<IslandGuidePage />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/budget-calculator" element={<BudgetCalculator />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/business/signup" element={<BusinessSignUp />} />
              <Route path="/business/signin" element={<BusinessSignIn />} />
              <Route path="/list-property" element={<ListProperty />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth" element={<Navigate to="/signin" replace />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/help" element={<HelpDesk />} />
              
              {/* Redirect old trip-planner to new Touristas AI (preserve query params) */}
              <Route 
                path="/trip-planner" 
                element={<TripPlannerRedirect />} 
              />

              {/* Legacy Enhanced Trip Planner - keeping for backward compatibility */}
              <Route 
                path="/trip-planner-legacy" 
                element={<EnhancedTripPlanner />} 
              />

              {/* Legacy Original Trip Planner - keeping for backward compatibility */}
              <Route 
                path="/trip-planner-original" 
                element={<TripPlanner />} 
              />

              {/* Touristas AI - Revolutionary Landing Page */}
              <Route 
                path="/touristas-ai" 
                element={<TouristasAILanding />} 
              />

              {/* Touristas AI Chat - Enhanced Chat Interface */}
              <Route 
                path="/touristas-ai/chat" 
                element={<TouristasAIChat />} 
              />
              
              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/nearby" element={
                <ProtectedRoute>
                  <NearBy />
                </ProtectedRoute>
              } />
              <Route path="/my-trips" element={
                <ProtectedRoute>
                  <MyTrips />
                </ProtectedRoute>
              } />
              <Route path="/business/dashboard" element={
                <ProtectedRoute>
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/ferry-tracking" element={<FerryTracking />} />
              <Route path="/about" element={<About />} />
              <Route path="/test-map" element={<TestMap />} />
              <Route path="/transfers" element={<Transfers />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>
        
        {/* Global Floating Touristas AI Chat */}
        <Suspense fallback={null}>
          <TouristasAIChatFloating />
        </Suspense>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <HelmetProvider>
        <Router>
          <AppContent />
        </Router>
      </HelmetProvider>
    </ToastProvider>
  );
}
