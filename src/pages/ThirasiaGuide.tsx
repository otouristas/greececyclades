import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUmbrellaBeach, FaShip, FaUtensils, FaHiking, FaLandmark, FaHotel } from 'react-icons/fa';
import SEO from '../components/SEO';
import IslandGuideHero from '../components/guides/IslandGuideHero';
import { cyclades } from '../data/islandsData';

const ThirasiaGuide: React.FC = () => {
  const { t } = useTranslation();
  const thirasia = cyclades.find(island => island.name === 'Thirasia');

  if (!thirasia) {
    return <div>Island data not found</div>;
  }

  return (
    <>
      <SEO
        title="Thirasia Island Guide | Greece Cyclades"
        description="Discover the authentic beauty of Thirasia, a hidden gem with caldera views and traditional villages without the crowds. Plan your perfect Thirasia vacation."
        canonicalUrl="/guides/thirasia"
        ogType="article"
      />

      <div className="bg-gray-100">
        <IslandGuideHero
          name={thirasia.name || "Thirasia"}
          description={thirasia.shortDescription || "Authentic caldera views without crowds"}
          image={thirasia.heroImage || thirasia.image || '/images/islands/thirasia/hero.jpg'}
          bestTime={thirasia.bestTime?.description || "Summer months (June to September)"}
          idealFor={thirasia.idealFor || ["Nature lovers", "Tranquility seekers", "Authentic experiences"]}
        />

        <div className="container mx-auto px-4 py-12">
          {/* Introduction Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Discover Thirasia</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  Thirasia, once part of ancient Thera before the devastating volcanic eruption that shaped
                  Santorini, offers visitors a glimpse of how the Cyclades were before mass tourism. This small
                  island, facing the famous caldera of Santorini, preserves an authentic way of life that has
                  largely disappeared from its more famous neighbor.
                </p>
                <p className="text-gray-700 mb-4">
                  The island's main settlement, Manolas, perched on the caldera's edge, offers equally
                  spectacular views as Santorini but in peaceful solitude. The island's architecture features
                  traditional cave houses carved into the volcanic rock, while abandoned settlements like
                  Agrilia tell stories of past prosperity.
                </p>
                <p className="text-gray-700 dark:text-white/80">
                  Despite its small size, Thirasia boasts several important Byzantine churches and monasteries,
                  including the monastery of the Assumption of the Virgin Mary. The island's few beaches,
                  accessible by boat or donkey paths, remain wonderfully undeveloped, while local tavernas
                  serve authentic Cycladic dishes using ingredients from the island's terraced gardens.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/islands/thirasia/village.jpg"
                  alt="Thirasia village"
                  className="w-full h-48 object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
                <img
                  src="/images/islands/thirasia/church.jpg"
                  alt="Traditional church in Thirasia"
                  className="w-full h-48 object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
                <img
                  src="/images/islands/thirasia/caldera.jpg"
                  alt="Caldera view from Thirasia"
                  className="w-full h-48 object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
                <img
                  src="/images/islands/thirasia/beach.jpg"
                  alt="Thirasia beach"
                  className="w-full h-48 object-cover rounded-lg shadow-md border border-gray-100 dark:border-white/10"
                />
              </div>
            </div>
          </section>

          {/* Quick Navigation Section */}
          <section id="quick-nav" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Explore Thirasia</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <a href="#transport" className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-4">
                  <FaShip className="text-4xl text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <h3 className="font-semibold text-gray-800">How to Get There?</h3>
              </a>
              <a href="#beaches" className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-4">
                  <FaUmbrellaBeach className="text-4xl text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <h3 className="font-semibold text-gray-800">Where to Swim?</h3>
              </a>
              <a href="#activities" className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-4">
                  <FaHiking className="text-4xl text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <h3 className="font-semibold text-gray-800">What to Do?</h3>
              </a>
              <a href="#dining" className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-4">
                  <FaUtensils className="text-4xl text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <h3 className="font-semibold text-gray-800">Where to Eat?</h3>
              </a>
              <a href="#history" className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-4">
                  <FaLandmark className="text-4xl text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <h3 className="font-semibold text-gray-800">History & Culture</h3>
              </a>
              <a href="#accommodation" className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-4">
                  <FaHotel className="text-4xl text-cyan-600 dark:text-cyclades-turquoise" />
                </div>
                <h3 className="font-semibold text-gray-800">Where to Stay?</h3>
              </a>
            </div>
          </section>

          {/* Transportation Section */}
          <section id="transport" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Getting to Thirasia</h2>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Ferry Connections</h3>
                <p className="text-gray-700 mb-6">
                  Thirasia is primarily accessible by boat from Santorini. There are several options:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">From Ammoudi Bay (Oia, Santorini)</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Small boats depart several times daily</li>
                      <li>Journey time: 15-20 minutes</li>
                      <li>Arrive at Riva port (Korfos) on Thirasia</li>
                      <li>Operates mainly during summer season</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">From Athinios Port (Santorini)</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Ferry connections 2-3 times daily</li>
                      <li>Journey time: 30 minutes</li>
                      <li>Arrive at Riva port (Korfos) on Thirasia</li>
                      <li>Year-round service, but reduced in winter</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">From Old Port (Fira, Santorini)</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Tourist boats as part of caldera cruises</li>
                      <li>Journey time: 20-25 minutes</li>
                      <li>Usually a short stop as part of a tour</li>
                      <li>Seasonal service (April to October)</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">Direct from Piraeus (Athens)</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Very limited connections (1-2 weekly)</li>
                      <li>Journey time: 8-9 hours</li>
                      <li>Usually as part of routes to Santorini</li>
                      <li>Check schedules in advance as they change seasonally</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Getting Around Thirasia</h3>
                <p className="text-gray-700 mb-6">
                  Thirasia is a small island with limited transportation options:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">On Foot</h4>
                    <p className="text-gray-700 dark:text-white/80">
                      The most common way to explore Thirasia. Walking paths connect the main villages,
                      though some are steep with many steps climbing up from the port.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">Donkey Taxi</h4>
                    <p className="text-gray-700 dark:text-white/80">
                      Traditional transportation from the port of Korfos up to Manolas village.
                      A unique experience and practical solution for the steep climb.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-cyan-600/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">Limited Bus Service</h4>
                    <p className="text-gray-700 dark:text-white/80">
                      A mini-bus operates during summer months connecting the port with Manolas village
                      and Potamos. Very limited schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beaches Section */}
          <section id="beaches" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Beaches in Thirasia</h2>
            <p className="text-gray-700 mb-8">
              Thirasia offers a few unspoiled beaches with crystal-clear waters. Unlike Santorini,
              these beaches remain wonderfully undeveloped and peaceful.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/korfos.jpg"
                    alt="Korfos Beach"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Korfos Beach</h3>
                  <p className="text-gray-700 mb-4">
                    Located at the main port of Thirasia, this small pebble beach offers
                    easy access and basic facilities. There are a few tavernas nearby where
                    you can enjoy fresh seafood after swimming.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Pebbled</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Easy Access</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Tavernas</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/riva.jpg"
                    alt="Riva Beach"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Riva Beach</h3>
                  <p className="text-gray-700 mb-4">
                    A small, secluded beach with dark volcanic sand and pebbles.
                    The beach offers stunning views of the caldera and Santorini.
                    There are no facilities, so bring everything you need.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Volcanic Sand</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Secluded</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Unorganized</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/agia-irini.jpg"
                    alt="Agia Irini Beach"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Agia Irini Beach</h3>
                  <p className="text-gray-700 mb-4">
                    Located on the southern side of the island, this remote beach
                    offers peace and tranquility. It's accessible by a hiking path
                    or by boat. The crystal clear waters are perfect for snorkeling.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Remote</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Hiking Required</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Snorkeling</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/potamos.jpg"
                    alt="Potamos Beach"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Potamos Beach</h3>
                  <p className="text-gray-700 mb-4">
                    A quiet beach near the village of Potamos with a mix of sand and pebbles.
                    The beach offers natural shade from some trees and is a good option for
                    families. There's a small canteen during summer months.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Mixed Sand/Pebbles</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Natural Shade</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Family-friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activities Section */}
          <section id="activities" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Things to Do in Thirasia</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Hiking</h3>
                  <p className="text-gray-700 mb-4">
                    Thirasia offers excellent hiking opportunities with paths connecting villages
                    and leading to panoramic viewpoints. The island's small size makes it perfect
                    for day hikes with stunning views of the caldera and Santorini.
                  </p>
                  <h4 className="font-semibold text-blue-600 mb-2">Popular Hiking Routes:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Korfos Port to Manolas (30 minutes uphill)</li>
                    <li>Manolas to Potamos (45 minutes)</li>
                    <li>Potamos to Agrilia abandoned settlement (1 hour)</li>
                    <li>Circular route around the island (3-4 hours)</li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/hiking.jpg"
                    alt="Hiking in Thirasia"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Caldera Views</h3>
                  <p className="text-gray-700 mb-4">
                    Thirasia offers some of the most spectacular views of the Santorini caldera,
                    but from a unique perspective that few tourists experience. The best viewpoints
                    are in Manolas village and along the caldera edge.
                  </p>
                  <h4 className="font-semibold text-blue-600 mb-2">Best Viewpoints:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Manolas village main square</li>
                    <li>Prophet Elias chapel at the highest point</li>
                    <li>The path between Manolas and Potamos</li>
                    <li>Monastery of the Assumption of the Virgin Mary</li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/caldera-view.jpg"
                    alt="Caldera view from Thirasia"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">Visit Traditional Villages</h3>
                <p className="text-gray-700 dark:text-white/80">
                  Explore the main villages of Manolas, Potamos, and Agrilia (abandoned).
                  Each offers a glimpse into traditional Cycladic architecture and way of life,
                  with narrow streets, blue-domed churches, and cave houses.
                </p>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">Explore Byzantine Churches</h3>
                <p className="text-gray-700 dark:text-white/80">
                  Visit the island's historic churches, including the Church of the Dormition
                  of the Virgin Mary, the Monastery of the Assumption, and the Chapel of Prophet Elias,
                  each with unique architecture and religious significance.
                </p>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">Boat Tours</h3>
                <p className="text-gray-700 dark:text-white/80">
                  Take a boat tour around Thirasia's coastline to discover hidden coves and
                  beaches inaccessible by land. Many tours also include visits to the volcanic
                  islands of Nea Kameni and Palea Kameni in the caldera.
                </p>
              </div>
            </div>
          </section>

          {/* Dining Section */}
          <section id="dining" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Where to Eat in Thirasia</h2>
            <p className="text-gray-700 mb-8">
              Thirasia offers authentic Greek cuisine in a handful of family-run tavernas.
              The food is fresh, locally sourced, and prepared with traditional recipes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Tavernas in Korfos Port</h3>
                  <p className="text-gray-700 mb-4">
                    The port area has several tavernas serving fresh seafood and traditional Greek dishes.
                    These restaurants cater to both locals and day-trippers from Santorini.
                  </p>
                  <h4 className="font-semibold text-blue-600 mb-2">Local Specialties:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Fresh fish and seafood</li>
                    <li>Fava (yellow split pea puree)</li>
                    <li>Tomatokeftedes (tomato fritters)</li>
                    <li>Greek salad with local capers</li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/port-taverna.jpg"
                    alt="Taverna in Korfos Port"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">Dining in Manolas</h3>
                  <p className="text-gray-700 mb-4">
                    The main village has a few traditional tavernas with spectacular caldera views.
                    These establishments offer a more authentic experience away from the day-trippers.
                  </p>
                  <h4 className="font-semibold text-blue-600 mb-2">Recommended Dishes:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Ntomatokeftedes (tomato fritters)</li>
                    <li>Chloro cheese (local specialty)</li>
                    <li>Lamb with potatoes</li>
                    <li>Melitinia (sweet cheese pastries)</li>
                  </ul>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/manolas-taverna.jpg"
                    alt="Taverna in Manolas"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Dining Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Best Times to Dine</h4>
                  <p className="text-gray-700 dark:text-white/80">
                    Lunch: 1:00 PM - 3:00 PM<br />
                    Dinner: 8:00 PM - 10:00 PM<br />
                    Restaurants in the port area close earlier in off-season.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Reservations</h4>
                  <p className="text-gray-700 dark:text-white/80">
                    Generally not needed except in peak summer months for restaurants with caldera views.
                    If you're visiting as part of a large group, calling ahead is recommended.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Local Products</h4>
                  <p className="text-gray-700 dark:text-white/80">
                    Look for dishes featuring local products like capers, fava beans, white eggplants,
                    and cherry tomatoes. Local wine is also worth trying.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* History & Culture Section */}
          <section id="history" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">History & Culture of Thirasia</h2>
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">Ancient History</h3>
                  <p className="text-gray-700 mb-4">
                    Thirasia was once part of ancient Thera (Santorini) before the catastrophic
                    Minoan eruption around 1600 BCE that created the current caldera. Archaeological
                    findings suggest that the island was inhabited during the Late Cycladic period.
                  </p>
                  <p className="text-gray-700 mb-6">
                    In 2018, archaeologists discovered an ancient cemetery on Thirasia dating back
                    to the 8th century BCE, providing valuable insights into the island's early history.
                  </p>

                  <h3 className="text-2xl font-semibold mb-4">Byzantine & Modern Era</h3>
                  <p className="text-gray-700 mb-4">
                    During the Byzantine period, Thirasia was home to several important religious
                    establishments, including the Monastery of the Assumption of the Virgin Mary.
                  </p>
                  <p className="text-gray-700 dark:text-white/80">
                    In more recent history, Thirasia was primarily a farming and fishing community.
                    The island experienced significant population decline in the 20th century as
                    residents moved to Santorini and Athens for better economic opportunities. Today,
                    the island maintains its traditional character while developing sustainable tourism.
                  </p>
                </div>
                <div className="bg-gray-100 p-8">
                  <h3 className="text-2xl font-semibold mb-4">Cultural Heritage</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Traditional Architecture</h4>
                      <p className="text-gray-700 dark:text-white/80">
                        Thirasia features authentic Cycladic architecture with white-washed houses,
                        blue-domed churches, and cave dwellings carved into the volcanic rock. The
                        abandoned settlement of Agrilia offers a glimpse into the island's past.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Religious Traditions</h4>
                      <p className="text-gray-700 dark:text-white/80">
                        The island celebrates several religious festivals throughout the year, with
                        the Dormition of the Virgin Mary on August 15th being the most important. These
                        celebrations feature traditional music, dancing, and local cuisine.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Local Crafts</h4>
                      <p className="text-gray-700 dark:text-white/80">
                        Traditional crafts include weaving, pottery, and woodcarving. Though less common
                        today, some local artisans still practice these crafts, and their work can be
                        found in small shops in Manolas.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Agricultural Heritage</h4>
                      <p className="text-gray-700 dark:text-white/80">
                        The island's terraced gardens produce tomatoes, fava beans, white eggplants, and
                        other vegetables using traditional dry-farming methods adapted to the volcanic soil
                        and limited water resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Accommodation Section */}
          <section id="accommodation" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Where to Stay in Thirasia</h2>
            <p className="text-gray-700 mb-8">
              Accommodation options on Thirasia are limited but authentic, offering a chance to
              experience traditional Cycladic hospitality away from mass tourism.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/guesthouse.jpg"
                    alt="Traditional guesthouse"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Traditional Guesthouses</h3>
                  <p className="text-gray-700 dark:text-white/80">
                    A few family-run guesthouses in Manolas and Potamos offer simple, clean rooms
                    with authentic Cycladic character. Many feature terraces with caldera views.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/cave-house.jpg"
                    alt="Cave house accommodation"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Cave Houses</h3>
                  <p className="text-gray-700 dark:text-white/80">
                    Some renovated traditional cave houses are available for rent, offering a unique
                    accommodation experience. These houses are carved into the volcanic rock and stay
                    naturally cool in summer.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="/images/islands/thirasia/rooms-to-let.jpg"
                    alt="Rooms to let"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Rooms to Let</h3>
                  <p className="text-gray-700 dark:text-white/80">
                    Simple rooms in local homes, often advertised as "rooms to let," provide an
                    affordable option and a chance to interact with local families. Basic amenities
                    but authentic experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 dark:bg-cyan-600/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Accommodation Tips</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Book well in advance during peak season (July-August)</li>
                <li>Consider staying in Manolas for the best views and dining options</li>
                <li>Accommodation near the port is convenient but can be noisy during the day</li>
                <li>Many places don't have online booking systems - contact directly by phone</li>
                <li>Consider staying on Santorini and visiting Thirasia as a day trip if accommodation is full</li>
              </ul>
            </div>
          </section>

          {/* Ready to Experience Section */}
          <section className="mb-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl overflow-hidden">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-cyan-600/100 bg-opacity-30 rounded-full text-sm font-semibold mb-6">
                    Best Time to Visit: May-June & September-October
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Experience Thirasia?</h2>
                  <p className="text-lg mb-8 text-blue-100">
                    Discover the authentic side of the Cyclades on Thirasia, where traditional
                    island life continues at its own peaceful pace with spectacular caldera views.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/hotels/"
                      className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 dark:bg-cyan-600/10 transition duration-300"
                    >
                      Find Accommodations
                    </a>
                    <a
                      href="/ferry-tickets/"
                      className="inline-block bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300"
                    >
                      How to get there
                    </a>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img
                    src="/images/islands/thirasia/cta-image.jpg"
                    alt="Experience Thirasia"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ThirasiaGuide;


