import { useState } from 'react';
import { MapPin, ChevronRight, UtensilsCrossed, Star } from 'lucide-react';
import { culinaryData } from '../data/culinaryData';
import { CulinaryCategory } from '../types/culinary';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function Culinary() {
  const [selectedCategory, setSelectedCategory] = useState<CulinaryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Experiences', count: culinaryData.length },
    ...Object.values(CulinaryCategory).map(category => ({
      id: category,
      name: category,
      count: culinaryData.filter(exp => exp.category === category).length
    }))
  ];

  const filteredExperiences = culinaryData.filter((experience) => {
    const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory;
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO 
        title={`Cyclades Food & Dining Guide ${SITE_TAGLINE}`}
        description="Discover the rich culinary heritage of the Cyclades islands. Find the best restaurants, local dishes, cooking classes, and food experiences."
        ogImage="/images/culinary-hero.jpg"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/culinary/hero.jpg"
            alt="Cyclades Culinary Experiences"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/80 to-blue-800/70" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
              {/* Left Column - Text (30%) */}
              <div className="w-full lg:w-[30%] text-center lg:text-left space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                  Taste the Cyclades
                </h1>
                <p className="text-base md:text-lg text-blue-100/90 leading-relaxed">
                  Discover authentic Greek flavors and culinary experiences. From traditional tavernas to cooking classes, savor the best of Cycladic cuisine.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start text-sm">
                  <div className="flex items-center gap-2 text-blue-100/80">
                    <UtensilsCrossed className="w-5 h-5 text-blue-400" />
                    <span>Local Experiences</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100/80">
                    <Star className="w-5 h-5 text-blue-400" />
                    <span>Expert Guides</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Search Form (70%) */}
              <div className="w-full lg:w-[70%] mt-8 lg:mt-0">
                <div className="bg-white/[0.08] backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                  <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search culinary experiences..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-5 pl-14 bg-white/[0.06] rounded-2xl border border-white/10 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-shadow text-lg"
                      />
                    </div>

                    {/* Category Pills */}
                    <div>
                      <h3 className="text-blue-200/70 text-sm font-medium mb-4 uppercase tracking-wider">Filter by Category</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id as CulinaryCategory | 'all')}
                            className={`px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                              selectedCategory === category.id
                                ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                                : 'bg-white/[0.06] text-blue-100/70 border border-white/10 hover:bg-white/[0.1]'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Introduction */}
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Discover Authentic Greek Cuisine in the Cyclades
            </h2>
            
            <div className="prose prose-lg prose-blue">
              <p>
                Embark on an unforgettable culinary journey through the Cyclades islands, where centuries-old Greek cooking traditions meet the Mediterranean's finest ingredients. Our carefully curated experiences offer you the chance to explore the authentic flavors, cooking methods, and cultural significance of Cycladic cuisine.
              </p>
              
              <p>
                From hands-on cooking classes led by local chefs to wine tasting tours in traditional vineyards, each experience is designed to immerse you in the rich gastronomic heritage of the Greek islands.
              </p>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Why Choose Our Culinary Experiences?
            </h3>
            <div className="grid gap-6">
              {[
                {
                  title: "Expert Local Chefs",
                  description: "Learn authentic Greek recipes from experienced local chefs who share their family traditions and secrets."
                },
                {
                  title: "Traditional Markets",
                  description: "Visit local markets to discover and learn about fresh, seasonal ingredients used in Cycladic cuisine."
                },
                {
                  title: "Small Groups",
                  description: "Enjoy personalized attention in small groups, ensuring an intimate and engaging experience."
                },
                {
                  title: "Cultural Immersion",
                  description: "Combine cooking with cultural insights, learning about the history and traditions behind each dish."
                },
                {
                  title: "Take Home Skills",
                  description: "Receive recipes and techniques to recreate authentic Greek dishes in your own kitchen."
                }
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2.5"></div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-1">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {selectedCategory === 'all' 
              ? 'All Experiences' 
              : `${selectedCategory} Experiences`}
          </h2>
          <p className="mt-2 text-gray-600">
            {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'} available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((experience) => (
            <div 
              key={experience.id} 
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Image Container */}
              <div className="aspect-w-16 aspect-h-10 bg-gray-100 relative overflow-hidden">
                <img
                  src={`/images/culinary/${experience.slug}.jpg`}
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-sm font-medium rounded-full">
                    {experience.category}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full">
                    {experience.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {experience.shortDescription}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>

                {/* Included Items */}
                <div className="space-y-2 mb-6">
                  {experience.included.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      {item}
                    </div>
                  ))}
                  {experience.included.length > 3 && (
                    <div className="text-sm text-blue-600 font-medium">
                      +{experience.included.length - 3} more included
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-sm text-gray-500">from</span>
                    <span className="ml-1 text-xl font-semibold text-blue-600">
                      {experience.price.display}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group/btn">
                    Book Now
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100">
            <UtensilsCrossed className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">No experiences found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* FAQs Section */}
      <div className="max-w-[1400px] mx-auto px-4 py-16 lg:py-24">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            {
              question: "What's included in the culinary experiences?",
              answer: "Our culinary experiences typically include hands-on cooking instruction, all necessary ingredients and equipment, recipes to take home, tastings, and in most cases, a full meal. Some experiences also include local market visits, wine tastings, and cultural activities."
            },
            {
              question: "Do I need prior cooking experience?",
              answer: "No prior cooking experience is necessary! Our experiences are designed for all skill levels, from beginners to experienced home cooks. Our expert instructors will guide you through every step."
            },
            {
              question: "Can you accommodate dietary restrictions?",
              answer: "Yes, we can accommodate various dietary restrictions including vegetarian, vegan, and gluten-free options. Please inform us of any dietary requirements when booking."
            },
            {
              question: "What is the group size for cooking classes?",
              answer: "To ensure a personalized experience, our cooking classes typically have a maximum of 8-10 participants. Private classes are also available upon request."
            },
            {
              question: "How should I prepare for a culinary experience?",
              answer: "Come with an appetite and enthusiasm! Wear comfortable clothing and closed-toe shoes. All necessary equipment and ingredients will be provided. We recommend bringing a camera to capture your culinary journey."
            },
            {
              question: "Can I book a private culinary experience?",
              answer: "Yes! We offer private cooking classes and customized culinary experiences for special occasions, team building, or groups. Contact us for more information about private bookings."
            }
          ].map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Start Your Culinary Journey?
          </h3>
          <p className="text-gray-600 mb-8">
            Book your experience today and discover the authentic flavors of the Cyclades
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-medium">
            Browse All Experiences
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
