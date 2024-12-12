import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AuthStateHandler from './components/AuthStateHandler';
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
import CycladesTripPlanner from './pages/CycladesTripPlanner';
import MyTrips from './pages/MyTrips';
import Auth from './pages/Auth';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import Culinary from './pages/Culinary';
import Islands from './pages/Islands';
import IslandDetail from './pages/IslandDetail';
import VehicleDetail from './pages/VehicleDetail';

export default function App() {
  const handleAuthClick = () => {
    window.location.href = '/signin';
  };

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AuthStateHandler />
        <div className="flex flex-col min-h-screen">
          <Navbar onAuthClick={handleAuthClick} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/islands" element={<Islands />} />
              <Route path="/islands/:slug" element={<IslandDetail />} />
              <Route path="/guides" element={<IslandGuides />} />
              <Route path="/guides/santorini" element={<SantoriniGuide />} />
              <Route path="/guides/:slug" element={<IslandGuidePage />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/rent-a-car" element={<RentACar />} />
              <Route path="/rent-a-car/:slug" element={<VehicleDetail />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:slug" element={<HotelDetail />} />
              <Route path="/culinary" element={<Culinary />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/trip-planner" element={<ProtectedRoute><CycladesTripPlanner /></ProtectedRoute>} />
              <Route path="/my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/sitemap" element={<Sitemap />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}