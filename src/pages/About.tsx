import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Mail, Phone, Award, Users, Clock, Globe } from 'lucide-react';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Discover Cyclades | Your Expert Guide to Greek Island Travel</title>
        <meta
          name="description"
          content="Learn about Discover Cyclades, your trusted travel companion for exploring the Greek islands. With over a decade of experience, we provide expert guidance, curated accommodations, and authentic local experiences."
        />
        <meta
          name="keywords"
          content="Discover Cyclades, Greek islands travel, Cyclades expert, island hopping Greece, Greek travel agency, authentic Greek experiences"
        />
        <meta property="og:title" content="About Discover Cyclades | Your Expert Guide to Greek Island Travel" />
        <meta
          property="og:description"
          content="Your trusted travel companion for exploring the Greek islands. Expert guidance, curated accommodations, and authentic local experiences."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greececyclades.com/about" />
        <link rel="canonical" href="https://greececyclades.com/about" />
      </Helmet>

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white py-24">
          <div className="absolute inset-0">
            <img
              src="/assets/images/about/about-hero.jpg"
              alt="Discover Cyclades Team"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Discover Cyclades</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Your trusted companion in exploring the magical Cyclades islands of Greece
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600">
                At Discover Cyclades, we're passionate about creating unforgettable Greek island experiences. 
                Our mission is to help travelers discover the authentic beauty, rich culture, and hidden gems 
                of the Cyclades islands while promoting sustainable tourism and supporting local communities.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Key Features */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-6"
              >
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Knowledge</h3>
                <p className="text-gray-600">
                  Over 10 years of experience in Greek island travel, providing expert guidance and insider tips.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-6"
              >
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Local Connections</h3>
                <p className="text-gray-600">
                  Strong partnerships with local businesses and communities across the Cyclades.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center p-6"
              >
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sustainable Tourism</h3>
                <p className="text-gray-600">
                  Committed to promoting responsible travel and preserving island cultures.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Company Story */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg mx-auto">
                <p>
                  Founded in 2014, Discover Cyclades began with a simple vision: to share the authentic beauty 
                  and culture of the Greek islands with travelers from around the world. What started as a 
                  small team of passionate local guides has grown into a comprehensive travel platform, 
                  serving thousands of visitors annually.
                </p>
                <p>
                  Our team consists of experienced travel professionals, local experts, and technology 
                  specialists who work together to provide you with the most comprehensive and up-to-date 
                  information about the Cyclades islands. We take pride in our deep understanding of each 
                  island's unique character and our ability to create personalized travel experiences.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions about planning your Cyclades adventure? Our team is here to help you create 
                the perfect island-hopping experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-6"
              >
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Our Location</h3>
                <p className="text-gray-600">
                  123 Ermou Street<br />
                  Athens, 10563<br />
                  Greece
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-6"
              >
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">
                  +30 210 1234567<br />
                  Monday - Friday: 9:00 - 18:00<br />
                  Saturday: 10:00 - 15:00
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center p-6"
              >
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">
                  greececycladesgr@gmail.com
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Start Your Cyclades Adventure Today</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Let us help you discover the magic of the Greek islands. From pristine beaches to ancient 
                ruins, your perfect island experience awaits.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Plan Your Trip
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
