import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AuthStateHandler from './components/AuthStateHandler';
import Home from './pages/Home';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import Hotels from './pages/Hotels';
import HotelLanding from './pages/HotelLanding';
import IslandGuides from './pages/IslandGuides';
import IslandGuide from './pages/IslandGuide';
import RentACar from './pages/RentACar';
import RentACarLanding from './pages/RentACarLanding';
import ListingForm from './components/ListingForm';
import Islands from './pages/Islands';
import Island from './pages/Island';
import Sitemap from './pages/Sitemap';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import CycladesTripPlanner from './pages/CycladesTripPlanner';
import MyTrips from './pages/MyTrips';
import NaxosGuide from './pages/NaxosGuide';
import AntiparosGuide from './pages/AntiparosGuide';
import KoufonisiaGuide from './pages/KoufonisiaGuide';
import KimolosGuide from './pages/KimolosGuide';
import SyrosGuide from './pages/SyrosGuide';
import AndrosGuide from './pages/AndrosGuide';
import TinosGuide from './pages/TinosGuide';
import KeaGuide from './pages/KeaGuide';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import SantoriniGuide from './pages/SantoriniGuide';
import MykonosGuide from './pages/MykonosGuide';
import ParosGuide from './pages/ParosGuide';
import SifnosGuide from './pages/SifnosGuide';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthStateHandler />
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      <Navbar onAuthClick={handleAuthClick} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/my-trips" element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          } />
          <Route path="/islands" element={<Islands />} />
          <Route path="/islands/:slug" element={<Island />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:slug" element={<HotelLanding />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:slug" element={<ActivityDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/guides" element={<IslandGuides />} />
          <Route path="/guides/:slug" element={<IslandGuide />} />
          <Route path="/guides/naxos" element={<NaxosGuide />} />
          <Route path="/guides/antiparos" element={<AntiparosGuide />} />
          <Route path="/guides/koufonisia" element={<KoufonisiaGuide />} />
          <Route path="/guides/kimolos" element={<KimolosGuide />} />
          <Route path="/guides/syros" element={<SyrosGuide />} />
          <Route path="/guides/andros" element={<AndrosGuide />} />
          <Route path="/guides/tinos" element={<TinosGuide />} />
          <Route path="/guides/kea" element={<KeaGuide />} />
          <Route path="/guides/santorini" element={<SantoriniGuide />} />
          <Route path="/guides/mykonos" element={<MykonosGuide />} />
          <Route path="/guides/paros" element={<ParosGuide />} />
          <Route path="/guides/sifnos" element={<SifnosGuide />} />
          <Route path="/rent-a-car" element={<RentACar />} />
          <Route path="/rent-a-car/:id" element={<RentACarLanding />} />
          <Route path="/trip-planner" element={<CycladesTripPlanner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list-property" element={
            <ProtectedRoute>
              <ListingForm />
            </ProtectedRoute>
          } />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}