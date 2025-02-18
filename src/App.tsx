import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Contact from './pages/Contact';
import IslandGuides from './pages/IslandGuides';
import IslandGuidePage from './pages/IslandGuidePage';
import SantoriniGuide from './pages/SantoriniGuide';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import RentACar from './pages/RentACar';
import TripPlanner from './pages/TripPlanner';
import MyTrips from './pages/MyTrips';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import Culinary from './pages/Culinary';
import Islands from './pages/Islands';
import IslandDetail from './pages/IslandDetail';
import VehicleDetail from './pages/VehicleDetail';
import FerryTickets from './pages/FerryTickets';
import FerrySearchResults from './pages/FerrySearchResults';
import FerryTracking from './pages/FerryTracking';
import NotFound from './pages/NotFound';
import BackToTop from './components/BackToTop';
import About from './pages/About';
import TestMap from './pages/TestMap';
import Transfers from './pages/Transfers';
import HelpDesk from './pages/HelpDesk';
import NearBy from './pages/NearBy';
import UserSignUp from './pages/auth/UserSignUp';
import UserSignIn from './pages/auth/UserSignIn';
import BusinessSignUp from './pages/auth/BusinessSignUp';
import BusinessSignIn from './pages/auth/BusinessSignIn';
import ForgotPassword from './pages/auth/ForgotPassword';

import { ToastProvider } from './contexts/ToastContext';
import { businessRoutes } from './routes/business.routes';

import './styles/fonts.css';
import './i18n';

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CookieConsent />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/test-map" element={<TestMap />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/islands" element={<Islands />} />
            <Route path="/islands/:slug" element={<IslandDetail />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:slug" element={<HotelDetail />} />
            <Route path="/ferry-tickets" element={<FerryTickets />} />
            <Route path="/ferry-tickets-search" element={<FerrySearchResults />} />
            <Route path="/ferry-tickets/tracking" element={<FerryTracking />} />
            <Route path="/rent-a-car" element={<RentACar />} />
            <Route path="/rent-a-car/:id" element={<VehicleDetail />} />
            <Route path="/culinary" element={<Culinary />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/guides" element={<IslandGuides />} />
            <Route path="/guides/santorini" element={<SantoriniGuide />} />
            <Route path="/guides/:slug" element={<IslandGuidePage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/help" element={<HelpDesk />} />
            <Route path="/trip-planner" element={<TripPlanner />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/nearby" element={<NearBy />} />
            
            {/* Auth Routes */}
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/signin" element={<UserSignIn />} />
            <Route path="/business/signup" element={<BusinessSignUp />} />
            <Route path="/business/signin" element={<BusinessSignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Business routes */}
            {businessRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </HelmetProvider>
  );
}

export default App;