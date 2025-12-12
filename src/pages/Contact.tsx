import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Send, Loader2, MessageCircle, Clock, Globe, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formsubmit.co/ajax/greececycladesgr@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _template: 'box',
          _subject: `Greece Cyclades Contact: ${formData.subject}`,
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const faqs = [
    {
      q: "How do I book ferry tickets?",
      a: "You can book ferry tickets directly through our website. Visit our Ferry Tickets page to search for routes and schedules."
    },
    {
      q: "What's the best time to visit the Cyclades?",
      a: "The best time is from May to October, with June and September offering the perfect balance of good weather and fewer crowds."
    },
    {
      q: "Do you offer travel packages?",
      a: "We help you plan custom itineraries. Use our AI trip planner or contact us for personalized recommendations."
    }
  ];

  return (
    <>
      <SEO
        title="Contact Discover Cyclades: Travel Support & Partnership"
        description="Questions about Cyclades travel? Contact our expert team. Business partnerships, advertising, media inquiries welcome. Typical response: 24 hours."
        ogImage="/images/contact/contact-hero.jpg"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' }
        ]}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-cyan-600 via-cyan-600 to-cyclades-turquoise text-white pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
                {t('contact.hero.title', 'Get in Touch')}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed px-1">
                {t('contact.hero.subtitle', "Have questions about planning your Cyclades adventure? We're here to help! Our team of local experts is ready to assist you in creating your perfect Greek island experience.")}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</h3>
                <a href="mailto:greececycladesgr@gmail.com" className="text-cyan-600 dark:text-cyclades-turquoise hover:underline text-sm">
                  greececycladesgr@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">WhatsApp</h3>
                <a href="https://wa.me/302101234567" className="text-green-600 dark:text-green-400 hover:underline text-sm">
                  +30 210 123 4567
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
                <p className="text-gray-600 dark:text-white/70 text-sm">Usually within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('contact.form.title', 'Send us a Message')}</h2>
              <p className="text-gray-600 dark:text-white/60 mb-8">{t('contact.form.subtitle', "Fill out the form below and we'll get back to you as soon as possible.")}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:ring-2 focus:ring-cyan-600 dark:focus:ring-cyclades-turquoise focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:ring-2 focus:ring-cyan-600 dark:focus:ring-cyclades-turquoise focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    What can we help with?
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-600 dark:focus:ring-cyclades-turquoise focus:border-transparent transition-all"
                  >
                    <option value="">Select a topic</option>
                    <option value="Trip Planning">Trip Planning</option>
                    <option value="Ferry Bookings">Ferry Bookings</option>
                    <option value="Hotel Recommendations">Hotel Recommendations</option>
                    <option value="Activities & Tours">Activities & Tours</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Business Inquiry">Business Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:ring-2 focus:ring-cyan-600 dark:focus:ring-cyclades-turquoise focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your travel plans or ask us anything..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all
                    ${isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-600 to-cyclades-turquoise hover:opacity-90 hover:shadow-lg'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-500/30">
                    ✓ Thank you for your message! We'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-500/30">
                    Sorry, there was an error sending your message. Please try again or email us directly.
                  </div>
                )}
              </form>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* AI Assistant CTA */}
              <div className="bg-gradient-to-br from-cyan-600 to-cyclades-turquoise rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Need Instant Help?</h3>
                </div>
                <p className="text-white/90 mb-6">
                  Our AI travel assistant Touristas can answer your questions instantly, 24/7. Get personalized recommendations for your Cyclades trip.
                </p>
                <Link
                  to="/touristas-ai"
                  className="inline-flex items-center gap-2 bg-white text-cyan-600 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors"
                >
                  Chat with Touristas AI
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* FAQs */}
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-white/10 last:border-0 pb-6 last:pb-0">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                      <p className="text-gray-600 dark:text-white/60 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/help"
                  className="mt-6 inline-flex items-center gap-1 text-cyan-600 dark:text-cyclades-turquoise font-medium hover:underline"
                >
                  View all FAQs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Location */}
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-cyan-600 dark:text-cyclades-turquoise" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Location</h3>
                </div>
                <p className="text-gray-600 dark:text-white/60 mb-4">
                  Based in Athens, Greece – the gateway to the Cyclades islands.
                </p>
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.666844!2d23.726110!3d37.983972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd3c0f1c1ecb%3A0x9b6a5b4c8f1a1b1a!2sAthens%2C%20Greece!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gray-100 dark:bg-dark-card border-t border-gray-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('contact.cta.title', 'Ready to explore the Cyclades?')}
              </h2>
              <p className="text-gray-600 dark:text-white/70 mb-8 max-w-2xl mx-auto">
                {t('contact.cta.subtitle', 'Start planning your perfect Greek island adventure today.')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/islands"
                  className="bg-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-cyan-600/90 transition-colors"
                >
                  Explore Islands
                </Link>
                <Link
                  to="/guides"
                  className="bg-white dark:bg-dark-bg text-gray-900 dark:text-white px-8 py-3 rounded-xl font-medium border border-gray-200 dark:border-white/20 hover:border-cyan-600 dark:hover:border-cyclades-turquoise transition-colors"
                >
                  Travel Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

