import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AuthStateHandler from './components/AuthStateHandler';
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
import Profile from './pages/Profile';
import TripPlanner from './pages/TripPlanner';
import MyTrips from './pages/MyTrips';
import Auth from './pages/Auth';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
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

import { ToastProvider } from './contexts/ToastContext';

import './styles/fonts.css';
import './i18n';

function AppContent() {
  const navigate = useNavigate();
  
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
          <Routes>
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
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/help" element={<HelpDesk />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/trip-planner" element={
              <ProtectedRoute>
                <TripPlanner />
              </ProtectedRoute>
            } />
            <Route path="/my-trips" element={
              <ProtectedRoute>
                <MyTrips />
              </ProtectedRoute>
            } />
            
            <Route path="/ferry-tracking" element={<FerryTracking />} />
            <Route path="/about" element={<About />} />
            <Route path="/test-map" element={<TestMap />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
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