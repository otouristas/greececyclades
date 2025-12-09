import { ExternalLink, BookOpen, Map, Phone, Globe, FileText, Shield, Landmark, Wallet } from 'lucide-react';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';

// Resource categories and links
const resourceCategories = [
  {
    title: 'Official Travel Resources',
    icon: <Landmark className="h-6 w-6 text-blue-600" />,
    resources: [
      { 
        name: 'Greek National Tourism Organization', 
        description: 'Official tourism website with comprehensive information about Greece',
        url: 'https://www.visitgreece.gr/'
      },
      { 
        name: 'Ministry of Tourism', 
        description: 'Official government site with travel regulations and policies',
        url: 'https://mintour.gov.gr/en/'
      },
      { 
        name: 'South Aegean Region', 
        description: 'Official website for the South Aegean region including the Cyclades',
        url: 'https://www.pnai.gov.gr/'
      }
    ]
  },
  {
    title: 'Transportation',
    icon: <Globe className="h-6 w-6 text-green-600" />,
    resources: [
      { 
        name: 'Athens International Airport', 
        description: 'Official website for Athens International Airport "Eleftherios Venizelos"',
        url: 'https://www.aia.gr/traveler/'
      },
      { 
        name: 'Ferry Schedules & Booking', 
        description: 'Search and book ferry tickets for all Greek islands',
        url: '/ferry-tickets'
      },
      { 
        name: 'KTEL Buses', 
        description: 'Intercity bus services in Greece',
        url: 'https://www.ktelattikis.gr/en/'
      }
    ]
  },
  {
    title: 'Health & Safety',
    icon: <Shield className="h-6 w-6 text-red-600" />,
    resources: [
      { 
        name: 'European Health Insurance Card', 
        description: 'Information about healthcare coverage for EU citizens',
        url: 'https://ec.europa.eu/social/main.jsp?catId=559'
      },
      { 
        name: 'Travel.gov.gr', 
        description: 'Official travel protocols and entry requirements for Greece',
        url: 'https://travel.gov.gr/'
      },
      { 
        name: 'Emergency Numbers', 
        description: 'List of important emergency contact numbers in Greece',
        url: '/emergency-contacts'
      }
    ]
  },
  {
    title: 'Maps & Guides',
    icon: <Map className="h-6 w-6 text-amber-600" />,
    resources: [
      { 
        name: 'Interactive Cyclades Map', 
        description: 'Explore our detailed map of all Cyclades islands',
        url: '/islands'
      },
      { 
        name: 'Weather Information', 
        description: 'Detailed weather guide for the Cyclades islands',
        url: '/weather'
      },
      { 
        name: 'Ferry Routes Guide', 
        description: 'Comprehensive guide to ferry travel in the Cyclades',
        url: '/ferry-guide'
      }
    ]
  },
  {
    title: 'Practical Information',
    icon: <FileText className="h-6 w-6 text-purple-600" />,
    resources: [
      { 
        name: 'Greek Embassies Worldwide', 
        description: 'Find Greek embassy or consulate contact information',
        url: 'https://www.mfa.gr/en/appendix/foreign-diplomatic-missions-in-greece/'
      },
      { 
        name: 'Currency & Money', 
        description: 'Information about the Euro, ATMs, and payment methods in Greece',
        url: '/budget-calculator'
      },
      { 
        name: 'Greek Phrases for Travelers', 
        description: 'Essential Greek phrases to help you during your trip',
        url: '/greek-phrases'
      }
    ]
  }
];

// Emergency contact information
const emergencyContacts = [
  { service: 'European Emergency Number', number: '112' },
  { service: 'Police', number: '100' },
  { service: 'Ambulance', number: '166' },
  { service: 'Fire Department', number: '199' },
  { service: 'Coast Guard', number: '108' },
  { service: 'Tourist Police', number: '171' }
];

export default function Resources() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      <SEO 
        title="Cyclades Travel Resources - Useful Links & Information"
        description="Essential resources for planning your trip to the Cyclades islands. Find official websites, transportation information, health & safety tips, and practical guides."
      />
      
      {/* Hero Section */}
      <div className={`relative pt-24 pb-16 md:pt-32 md:pb-24 ${isDark ? 'bg-gradient-to-r from-cyclades-deep-blue to-cyclades-caldera' : 'bg-gradient-to-r from-cyclades-deep-blue to-cyclades-sea-blue'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
            <BookOpen className="h-8 w-8 text-cyclades-turquoise" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Travel Resources
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Essential information and useful links to help you plan your perfect Cyclades vacation
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Introduction */}
        <div className="mb-12">
          <p className={`text-lg max-w-3xl ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            We've compiled a comprehensive collection of resources to help you plan and enjoy your trip to the Cyclades islands. From official tourism websites to practical travel information, you'll find everything you need here.
          </p>
        </div>
        
        {/* Resource Categories */}
        <div className="space-y-12 mb-16">
          {resourceCategories.map((category) => (
            <div key={category.title}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {category.icon}
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.resources.map((resource) => (
                  <div key={resource.name} className={`rounded-2xl p-6 transition-all duration-300 ${isDark ? 'bg-dark-card border border-dark-border hover:border-cyclades-turquoise/50' : 'bg-white shadow-sm border hover:shadow-md'}`}>
                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{resource.name}</h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{resource.description}</p>
                    <a 
                      href={resource.url}
                      target={resource.url.startsWith('http') ? "_blank" : "_self"}
                      rel={resource.url.startsWith('http') ? "noopener noreferrer" : ""}
                      className="inline-flex items-center text-cyclades-turquoise hover:underline text-sm font-medium"
                    >
                      {resource.url.startsWith('http') ? 'Visit Website' : 'View Page'}
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Emergency Contacts */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Phone className="h-6 w-6 text-red-500" />
            Emergency Contacts
          </h2>
          <div className={`rounded-2xl p-6 ${isDark ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-100'}`}>
            <p className={`mb-4 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
              Keep these important emergency numbers handy during your stay in Greece:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyContacts.map((contact) => (
                <div key={contact.service} className={`rounded-xl p-4 ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white shadow-sm'}`}>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{contact.service}</p>
                  <p className="text-xl font-bold text-red-500">{contact.number}</p>
                </div>
              ))}
            </div>
            <p className={`text-sm mt-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              Note: The European Emergency Number (112) works throughout Greece and operators speak English.
            </p>
          </div>
        </div>
        
        {/* Travel Planning Tools */}
        <div>
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <BookOpen className="h-6 w-6 text-cyclades-turquoise" />
            Travel Planning Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-cyclades-turquoise/10 border border-cyclades-turquoise/30' : 'bg-blue-50 border border-blue-100'}`}>
              <div className="mb-4">
                <Map className="h-8 w-8 text-cyclades-turquoise" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Island Guides</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Detailed guides for each Cyclades island with attractions, beaches, dining recommendations, and more.
              </p>
              <a 
                href="/islands"
                className="inline-flex items-center text-cyclades-turquoise hover:underline text-sm font-medium"
              >
                Explore Island Guides
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-100'}`}>
              <div className="mb-4">
                <Wallet className="h-8 w-8 text-green-500" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Budget Calculator</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Plan your travel budget with our interactive calculator. Estimate costs for accommodation, food, activities, and transportation.
              </p>
              <a 
                href="/budget-calculator"
                className="inline-flex items-center text-green-500 hover:underline text-sm font-medium"
              >
                Calculate Your Budget
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-amber-50 border border-amber-100'}`}>
              <div className="mb-4">
                <Globe className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Ferry Guide</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Everything you need to know about traveling by ferry between the Greek islands, including companies, routes, and tips.
              </p>
              <a 
                href="/ferry-guide"
                className="inline-flex items-center text-amber-500 hover:underline text-sm font-medium"
              >
                Read Ferry Guide
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
