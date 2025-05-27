import { Car, Users, Clock, HeadphonesIcon, CalendarDays, ChevronDown, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import WelcomePickupsLogo from '../components/WelcomePickupsLogo';
import { Disclosure } from '@headlessui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TransferRouteCard from '../components/TransferRouteCard';

const locations = [
  'Athens International Airport (ATH)',
  'Piraeus Port',
  'Rafina Port',
  'Lavrio Port',
  'Athens Railway Station',
  'Syntagma Square',
  'Athens Bus Station (Terminal B)',
  'Athens Bus Station - KTEL Attikis',
  'Athens Bus Station - KTEL Kifisou'
];

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BookingForm {
  from: string;
  to: string;
  date: Date;
  time: string;
  passengers: number;
  luggage: number;
}

const features: FeatureItem[] = [
  {
    title: 'Trained drivers',
    description: 'Hand picked & trained drivers',
    icon: Users
  },
  {
    title: 'Low prices',
    description: 'Same price as a regular taxi from the line',
    icon: Car
  },
  {
    title: 'Arrival monitoring',
    description: 'Drivers are always on time',
    icon: Clock
  },
  {
    title: 'Quality support',
    description: '24/7 email & phone support',
    icon: HeadphonesIcon
  }
];

const faqs: FAQItem[] = [
  {
    question: 'What happens after I complete the booking?',
    answer: 'After the booking is completed, the local driver receives the details for your pickup and you receive an email with their details. After the introduction, you will continue receiving updates regarding your transfer through email notifications, up until the moment you meet your driver at the arrival gate. The drivers know exactly where to find you and what to do in case of unexpected changes, so rest assured that everything will go according to plan.'
  },
  {
    question: 'How do you select your drivers?',
    answer: 'The drivers who participate in the service are selected and trained in order for you to have an excellent experience. All of them have already performed several transfers, and are continuously reviewed for their quality of service. Each of them has a unique personality, and in the long run, our goal is to let you select what type of personality and car you would prefer for your pickup.'
  },
  {
    question: 'Is it more expensive than a taxi ride?',
    answer: 'The service is offered at the same or a slightly higher price than a metered taxi ride. However, when you book with us there are no additional charges depending on traffic or other factors. Our goal is to connect you with a local professional driver who, apart from transferring you, will answer any question you might have during your first hour in the destination, and make your first moments unique and memorable. Think of it more like a local friend with a car.'
  }
];

export default function Transfers() {
  const [form, setForm] = useState<BookingForm>({
    from: locations[0],
    to: locations[1],
    date: new Date(),
    time: '12:00',
    passengers: 2,
    luggage: 2
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = 'https://www.book-online-transfers.com/en/greececyclades-airport-taxi';
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Greece Cyclades Transfer Booking"
        description="Book your ride to and from the airport, port or any destination, in just a few steps!Get Ready for Cyclades!"
      />

      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/transfers/transfers-hero.jpg"
            alt="Greece Transfers"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            {/* Left Content */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-6">
                Book Your Transfer in Greece
              </h1>
              <p className="text-xl text-white/90 mb-12">
                Safe and reliable transfers from airports, ports, and stations across Greece
              </p>
            </div>

            {/* Booking Form - Sticky on right */}
            <div className="w-full lg:w-[360px] sticky top-24">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Book a transfer</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* From */}
                  <div className="mb-4">
                    <div className="relative">
                      <select
                        value={form.from}
                        onChange={(e) => setForm({ ...form, from: e.target.value })}
                        className="w-full h-12 pl-10 pr-10 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 appearance-none"
                      >
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                      <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* To */}
                  <div className="mb-4">
                    <div className="relative">
                      <select
                        value={form.to}
                        onChange={(e) => setForm({ ...form, to: e.target.value })}
                        className="w-full h-12 pl-10 pr-10 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 appearance-none"
                      >
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                      <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Pick Up Date
                      </label>
                      <div className="relative">
                        <DatePicker
                          selected={form.date}
                          onChange={(date: Date | null) => date && setForm({ ...form, date })}
                          dateFormat="dd/MM/yyyy"
                          minDate={new Date()}
                          className="w-full h-12 pl-4 pr-10 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <CalendarDays className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Time
                      </label>
                      <div className="relative">
                        <select
                          value={form.time}
                          onChange={(e) => setForm({ ...form, time: e.target.value })}
                          className="w-full h-12 pl-4 pr-10 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        >
                          {Array.from({ length: 144 }, (_, i) => {
                            const hour = Math.floor(i / 6);
                            const minute = (i % 6) * 10;
                            return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                          }).map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <Clock className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Passengers and Luggage */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Passengers
                      </label>
                      <div className="flex items-center border rounded border-gray-300 h-12">
                        <button
                          type="button"
                          onClick={() => setForm(f => ({ ...f, passengers: Math.max(1, f.passengers - 1) }))}
                          className="w-12 h-full flex items-center justify-center hover:bg-gray-100 border-r border-gray-300"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={form.passengers}
                          readOnly
                          className="w-full h-full text-center border-none focus:ring-0"
                        />
                        <button
                          type="button"
                          onClick={() => setForm(f => ({ ...f, passengers: Math.min(8, f.passengers + 1) }))}
                          className="w-12 h-full flex items-center justify-center hover:bg-gray-100 border-l border-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Luggage Pieces
                      </label>
                      <div className="flex items-center border rounded border-gray-300 h-12">
                        <button
                          type="button"
                          onClick={() => setForm(f => ({ ...f, luggage: Math.max(0, f.luggage - 1) }))}
                          className="w-12 h-full flex items-center justify-center hover:bg-gray-100 border-r border-gray-300"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={form.luggage}
                          readOnly
                          className="w-full h-full text-center border-none focus:ring-0"
                        />
                        <button
                          type="button"
                          onClick={() => setForm(f => ({ ...f, luggage: Math.min(8, f.luggage + 1) }))}
                          className="w-12 h-full flex items-center justify-center hover:bg-gray-100 border-l border-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white h-12 rounded font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 mb-2">Transfers operated by</p>
                    <div className="flex justify-center">
                      <WelcomePickupsLogo />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How Our Transfers Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Your Transfer</h3>
              <p className="text-gray-600">
                Select your pickup and drop-off locations, date, and number of passengers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meet Your Driver</h3>
              <p className="text-gray-600">
                Your professional driver will meet you at the specified location with a name sign.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy the Ride</h3>
              <p className="text-gray-600">
                Relax in a comfortable vehicle while your driver takes you to your destination.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Routes Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Popular Transfer Routes
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our most frequently booked transfer routes with fixed prices and professional drivers.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TransferRouteCard
              from="Athens Airport"
              to="Piraeus Port"
              duration="45 min"
              price="€49"
              image="/images/transfers/athens-airport.jpg"
              onClick={() => {
                window.location.href = 'https://www.book-online-transfers.com/en/greececyclades-airport-taxi';
              }}
            />
            <TransferRouteCard
              from="Piraeus Port"
              to="Athens City Center"
              duration="30 min"
              price="€39"
              image="/images/transfers/piraeus-port.jpg"
              onClick={() => {
                window.location.href = 'https://www.book-online-transfers.com/en/greececyclades-airport-taxi';
              }}
            />
            <TransferRouteCard
              from="Athens Airport"
              to="Athens City Center"
              duration="35 min"
              price="€45"
              image="/images/transfers/athens-city.jpg"
              onClick={() => {
                window.location.href = 'https://www.book-online-transfers.com/en/greececyclades-airport-taxi';
              }}
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-16">
          Greece Cyclades Transfer Booking
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }: { open: boolean }) => (
                  <div className="bg-white rounded-lg shadow">
                    <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-lg font-medium text-gray-900 focus:outline-none">
                      <span>{faq.question}</span>
                      <span className={`ml-6 ${open ? 'transform rotate-180' : ''}`}>
                        ↓
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
