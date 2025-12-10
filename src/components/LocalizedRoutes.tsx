import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LanguageRouter from './LanguageRouter';
import ProtectedRoute from './ProtectedRoute';

// Critical pages loaded immediately
import HomeNew from '../pages/HomeNew';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';

// Lazy loaded pages
const Contact = lazy(() => import('../pages/Contact'));
const IslandsNew = lazy(() => import('../pages/IslandsNew'));
const GuidesNew = lazy(() => import('../pages/GuidesNew'));
const IslandGuidePage = lazy(() => import('../pages/IslandGuidePage'));
const Activities = lazy(() => import('../pages/Activities'));
const ActivityDetail = lazy(() => import('../pages/ActivityDetail'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const RentACar = lazy(() => import('../pages/RentACar'));
const Profile = lazy(() => import('../pages/Profile'));
const TripPlanner = lazy(() => import('../pages/TripPlannerNew'));
const MyTrips = lazy(() => import('../pages/MyTrips'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Hotels = lazy(() => import('../pages/Hotels'));
const HotelDetail = lazy(() => import('../pages/HotelDetail'));
const Privacy = lazy(() => import('../pages/Privacy'));
const Terms = lazy(() => import('../pages/Terms'));
const Sitemap = lazy(() => import('../pages/Sitemap'));
const Culinary = lazy(() => import('../pages/Culinary'));
const IslandDetail = lazy(() => import('../pages/IslandDetail'));
const VehicleDetail = lazy(() => import('../pages/VehicleDetail'));
const FerryTickets = lazy(() => import('../pages/FerryTickets'));
const FerrySearchResults = lazy(() => import('../pages/FerrySearchResults'));
const FerryTracking = lazy(() => import('../pages/FerryTracking'));
const About = lazy(() => import('../pages/About'));
const Transfers = lazy(() => import('../pages/Transfers'));
const HelpDesk = lazy(() => import('../pages/HelpDeskNew'));
const NearBy = lazy(() => import('../pages/NearBy'));
const Flights = lazy(() => import('../pages/Flights'));
const Weather = lazy(() => import('../pages/Weather'));
const BudgetCalculator = lazy(() => import('../pages/BudgetCalculator'));
const FerryGuide = lazy(() => import('../pages/FerryGuide'));
const Resources = lazy(() => import('../pages/Resources'));
const ListProperty = lazy(() => import('../pages/ListProperty'));
const TouristasAILanding = lazy(() => import('../pages/TouristasAILandingNew'));
const TouristasAIChat = lazy(() => import('../pages/TouristasAIChatNew'));
const BusinessSignUp = lazy(() => import('../pages/BusinessSignUp'));
const BusinessDashboard = lazy(() => import('../pages/BusinessDashboard'));
const Directory = lazy(() => import('../pages/Directory'));
const HotelMarketplace = lazy(() => import('../pages/HotelMarketplace'));
const GreekPhrases = lazy(() => import('../pages/GreekPhrases'));

// New Mega Features
const IslandHoppingPlannerPage = lazy(() => import('../pages/IslandHoppingPlannerPage'));
const PackingListPage = lazy(() => import('../pages/PackingListPage'));
const PriceAlertsPage = lazy(() => import('../pages/PriceAlertsPage'));
const CommunityPage = lazy(() => import('../pages/CommunityPage'));
const GroupTripPage = lazy(() => import('../pages/GroupTripPage'));
const TravelStatsPage = lazy(() => import('../pages/TravelStatsPage'));
const InspirationFeedPage = lazy(() => import('../pages/InspirationFeedPage'));
const RestaurantBookingPage = lazy(() => import('../pages/RestaurantBookingPage'));
const TransferComparisonPage = lazy(() => import('../pages/TransferComparisonPage'));
const MicroclimateWeatherPage = lazy(() => import('../pages/MicroclimateWeatherPage'));
const BusinessAnalyticsPage = lazy(() => import('../pages/BusinessAnalyticsPage'));
const TouristasEnhancedPage = lazy(() => import('../pages/TouristasEnhancedPage'));

// Booking pages
const BookingPage = lazy(() => import('../pages/BookingPage'));
const BookingResultsPage = lazy(() => import('../pages/BookingResultsPage'));
const BookingHotelPage = lazy(() => import('../pages/BookingHotelPage'));
const BookingCheckoutPage = lazy(() => import('../pages/BookingCheckoutPage'));
const BookingConfirmationPage = lazy(() => import('../pages/BookingConfirmationPage'));

// Loading fallback
const PageLoader = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
            <div className="w-8 h-8 border-2 border-cyclades-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-white/60">Loading...</p>
        </div>
    </div>
);

// Core routes that are language-aware
const CoreRoutes: React.FC = () => (
    <>
        <Route index element={<HomeNew />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="islands" element={<IslandsNew />} />
        <Route path="islands/:slug" element={<IslandDetail />} />
        <Route path="activities" element={<Activities />} />
        <Route path="activities/:id" element={<ActivityDetail />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="hotels/:slug" element={<HotelDetail />} />
        <Route path="ferry-tickets" element={<FerryTickets />} />
        <Route path="ferry-tickets-search" element={<FerrySearchResults />} />
        <Route path="ferry-tickets/tracking" element={<FerryTracking />} />
        <Route path="ferry-tracking" element={<FerryTracking />} />
        <Route path="ferry-guide" element={<FerryGuide />} />
        <Route path="flights" element={<Flights />} />
        <Route path="guides" element={<GuidesNew />} />
        <Route path="guides/:slug" element={<IslandGuidePage />} />
        <Route path="rent-a-car" element={<RentACar />} />
        <Route path="rent-a-car/:id" element={<VehicleDetail />} />
        <Route path="culinary" element={<Culinary />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="weather" element={<Weather />} />
        <Route path="budget-calculator" element={<BudgetCalculator />} />
        <Route path="resources" element={<Resources />} />
        <Route path="transfers" element={<Transfers />} />
        <Route path="help" element={<HelpDesk />} />
        <Route path="greek-phrases" element={<GreekPhrases />} />
        <Route path="directory" element={<Directory />} />
        <Route path="hotel-marketplace" element={<HotelMarketplace />} />

        {/* Booking System */}
        <Route path="book" element={<BookingPage />} />
        <Route path="book/search" element={<BookingResultsPage />} />
        <Route path="book/hotel/:hotelId" element={<BookingHotelPage />} />
        <Route path="book/checkout" element={<BookingCheckoutPage />} />
        <Route path="book/confirmation" element={<BookingConfirmationPage />} />

        {/* AI & Planners */}
        <Route path="trip-planner" element={<TripPlanner />} />
        <Route path="plan-trip" element={<TripPlanner />} />
        <Route path="planner" element={<IslandHoppingPlannerPage />} />
        <Route path="island-hopper" element={<IslandHoppingPlannerPage />} />
        <Route path="touristas-ai" element={<TouristasAILanding />} />
        <Route path="touristas-ai/chat" element={<TouristasAIChat />} />
        <Route path="touristas" element={<TouristasEnhancedPage />} />
        <Route path="ai-assistant" element={<TouristasEnhancedPage />} />

        {/* New Mega Features */}
        <Route path="packing-list" element={<PackingListPage />} />
        <Route path="price-alerts" element={<PriceAlertsPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="group/:id" element={<GroupTripPage />} />
        <Route path="my-stats" element={<TravelStatsPage />} />
        <Route path="inspiration" element={<InspirationFeedPage />} />
        <Route path="restaurants" element={<RestaurantBookingPage />} />
        <Route path="restaurant-booking" element={<RestaurantBookingPage />} />
        <Route path="transfer-comparison" element={<TransferComparisonPage />} />
        <Route path="taxi" element={<TransferComparisonPage />} />
        <Route path="microclimate-weather" element={<MicroclimateWeatherPage />} />
        <Route path="beach-weather" element={<MicroclimateWeatherPage />} />

        {/* Auth */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        {/* Business */}
        <Route path="list-property" element={<ListProperty />} />
        <Route path="business/signup" element={<BusinessSignUp />} />
        <Route path="business/analytics" element={<BusinessAnalyticsPage />} />
        <Route path="business/dashboard" element={
            <ProtectedRoute>
                <BusinessDashboard />
            </ProtectedRoute>
        } />

        {/* Protected */}
        <Route path="profile" element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        } />
        <Route path="my-trips" element={
            <ProtectedRoute>
                <MyTrips />
            </ProtectedRoute>
        } />
        <Route path="nearby" element={
            <ProtectedRoute>
                <NearBy />
            </ProtectedRoute>
        } />

        {/* Legal */}
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="sitemap" element={<Sitemap />} />
    </>
);

// Supported language paths
const LANG_PATHS = ['en', 'gr', 'it', 'fr', 'de', 'es', 'nl', 'zh', 'ru'];

const LocalizedRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Language-prefixed routes */}
            {LANG_PATHS.map(lang => (
                <Route key={lang} path={`/${lang}`} element={<LanguageRouter />}>
                    <Route element={<Outlet />}>
                        {CoreRoutes({})}
                    </Route>
                </Route>
            ))}

            {/* Redirect root to default language based on browser */}
            <Route path="/" element={<LanguageRedirect />} />

            {/* Legacy routes without language prefix - redirect to /en/ */}
            <Route path="/hotels" element={<Navigate to="/en/hotels" replace />} />
            <Route path="/islands" element={<Navigate to="/en/islands" replace />} />
            <Route path="/guides" element={<Navigate to="/en/guides" replace />} />
            <Route path="/ferry-tickets" element={<Navigate to="/en/ferry-tickets" replace />} />
            <Route path="/flights" element={<Navigate to="/en/flights" replace />} />
            <Route path="/about" element={<Navigate to="/en/about" replace />} />
            <Route path="/contact" element={<Navigate to="/en/contact" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

// Redirect to appropriate language
const LanguageRedirect: React.FC = () => {
    // Get browser language
    const browserLang = navigator.language.slice(0, 2).toLowerCase();

    // Map browser language to supported paths
    const langMap: Record<string, string> = {
        'en': 'en',
        'el': 'gr',
        'it': 'it',
        'fr': 'fr',
        'de': 'de',
        'es': 'es',
        'nl': 'nl',
        'zh': 'zh',
        'ru': 'ru',
    };

    const targetLang = langMap[browserLang] || 'en';

    return <Navigate to={`/${targetLang}`} replace />;
};

export default LocalizedRoutes;
export { CoreRoutes, PageLoader };
