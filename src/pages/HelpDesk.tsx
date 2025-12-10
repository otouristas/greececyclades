import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Plane, 
  Ship, 
  Hotel as HotelIcon, 
  Car, 
  Map,
  Compass,
  Search
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General Category
  {
    category: "General",
    question: "What is Greece Cyclades?",
    answer: "Greece Cyclades is your comprehensive travel guide to exploring the beautiful Cyclades islands in Greece. We provide detailed information about islands, accommodations, transportation, and activities to help you plan your perfect Greek island adventure."
  },
  {
    category: "General",
    question: "Which islands are part of the Cyclades?",
    answer: "The Cyclades include popular islands like Santorini, Mykonos, Naxos, Paros, Milos, and many others. Each island has its unique character, from cosmopolitan destinations to peaceful retreats."
  },
  {
    category: "General",
    question: "Do you offer personalized trip planning?",
    answer: "Yes! Our AI-powered trip planner can create a customized itinerary based on your preferences, travel dates, and interests. You can also modify and save your itineraries."
  },

  // Planning Category
  {
    category: "Planning",
    question: "What's the best time to visit the Cyclades?",
    answer: "The best time to visit is from late April to early October. Peak season is July and August, but May-June and September-October offer great weather with fewer crowds and better prices."
  },
  {
    category: "Planning",
    question: "How do I get around the islands?",
    answer: "The main transportation between islands is by ferry. Each island also has local buses, taxis, and car rental services. We provide detailed transportation information for each island in our guides."
  },
  {
    category: "Planning",
    question: "How many days should I spend on each island?",
    answer: "We recommend 2-4 days per island depending on its size and attractions. Major islands like Santorini and Mykonos deserve 3-4 days, while smaller islands can be explored in 1-2 days."
  },
  {
    category: "Planning",
    question: "What should I pack for my trip?",
    answer: "Essential items include: comfortable walking shoes, swimwear, sun protection, light clothing, a light jacket for evenings, and any necessary medications. Don't forget your camera and travel adapters!"
  },

  // Booking Category
  {
    category: "Booking",
    question: "How can I book ferry tickets?",
    answer: "You can book ferry tickets directly through our website. We partner with major ferry companies to provide easy booking and competitive prices. Early booking is recommended during peak season."
  },
  {
    category: "Booking",
    question: "Can I book hotels through your website?",
    answer: "Yes! We offer a curated selection of hotels, apartments, and villas across all Cyclades islands. Our platform provides secure booking with best price guarantees."
  },
  {
    category: "Booking",
    question: "What's your cancellation policy?",
    answer: "Cancellation policies vary by service provider. Most hotel bookings can be cancelled up to 24-48 hours before check-in. Ferry tickets typically have different cancellation terms based on the operator and ticket type."
  },
  {
    category: "Booking",
    question: "Do you offer travel insurance?",
    answer: "Yes, we partner with reputable travel insurance providers. You can add travel insurance during the booking process to protect your trip investment."
  },

  // Transportation Category
  {
    category: "Transportation",
    question: "How reliable are the ferries?",
    answer: "Greek ferries are generally reliable, but can be affected by weather conditions, especially in winter. We recommend building some flexibility into your schedule during off-season travel."
  },
  {
    category: "Transportation",
    question: "Should I rent a car on the islands?",
    answer: "It depends on the island and your plans. Some islands like Milos benefit from having a car, while others like Mykonos have good public transportation. We provide specific recommendations in each island guide."
  },
  {
    category: "Transportation",
    question: "How do I get from Athens to the islands?",
    answer: "You can reach the Cyclades from Athens either by ferry from Piraeus/Rafina ports or by flight to islands with airports (Santorini, Mykonos, Paros, etc.). We can help you book both options."
  },

  // Account Category
  {
    category: "Account",
    question: "How do I create an account?",
    answer: "Click the 'Sign in' button in the top right corner and select 'Create account'. You can sign up using your email or Google account."
  },
  {
    category: "Account",
    question: "What are the benefits of having an account?",
    answer: "With an account, you can save your favorite islands, create trip plans, book accommodations and ferries, and receive personalized travel recommendations."
  },
  {
    category: "Account",
    question: "How do I reset my password?",
    answer: "Click 'Sign in', then 'Forgot password?'. Enter your email address and follow the instructions sent to reset your password."
  }
];

const quickLinks = [
  { icon: <Plane className="w-6 h-6" />, title: "Flight Booking", link: "/flights" },
  { icon: <Ship className="w-6 h-6" />, title: "Ferry Tickets", link: "/ferry-tickets" },
  { icon: <HotelIcon className="w-6 h-6" />, title: "Hotels", link: "/hotels" },
  { icon: <Car className="w-6 h-6" />, title: "Car Rentals", link: "/rent-a-car" },
  { icon: <Map className="w-6 h-6" />, title: "Island Guides", link: "/islands" },
  { icon: <Compass className="w-6 h-6" />, title: "Activities", link: "/activities" },
];

const supportHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM (GMT+3)" },
  { day: "Saturday", hours: "10:00 AM - 6:00 PM (GMT+3)" },
  { day: "Sunday", hours: "Closed" }
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

export default function HelpDesk() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (question: string) => {
    setOpenItems(prev => ({
      ...prev,
      [question]: !prev[question]
    }));
  };

  const filteredFAQs = faqData
    .filter(item => 
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (searchQuery === "" || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions, browse our guides, or contact our support team for assistance with your Greek islands adventure
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              to={link.link}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 mb-2">{link.icon}</div>
              <span className="text-sm font-medium text-gray-900">{link.title}</span>
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => (
              <div
                key={item.question}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.question)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="text-gray-900 font-medium">{item.question}</span>
                  {openItems[item.question] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openItems[item.question] && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No results found for your search. Try different keywords or browse all categories.</p>
            </div>
          )}
        </div>

        {/* Support Hours & Contact Options */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          {/* Support Hours */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Support Hours</h3>
            </div>
            <div className="space-y-3">
              {supportHours.map(({ day, hours }) => (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-600">{day}</span>
                  <span className="text-gray-900 font-medium">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Contact Options</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">+30 210 1234567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">support@discovercyclades.gr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Need more help? Our support team is here for you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
