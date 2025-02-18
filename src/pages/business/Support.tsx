import { useState } from 'react';
import DashboardLayout from '../../components/business/DashboardLayout';
import { MessageCircle, Mail, Phone, Clock, Search, MessageSquare } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    question: 'How do I add a new property?',
    answer: 'To add a new property, go to the Properties page and click the "Add Property" button. Follow the step-by-step guide to enter your property details, upload photos, and set pricing.',
    category: 'Properties',
  },
  {
    question: 'How do I process a booking request?',
    answer: 'When you receive a booking request, go to the Bookings page. You\'ll see pending requests at the top. Review the details and click "Accept" or "Decline" based on availability.',
    category: 'Bookings',
  },
  {
    question: 'How are payments processed?',
    answer: 'Payments are processed automatically through our secure payment system. Once a booking is confirmed, the payment is held until 24 hours after check-in.',
    category: 'Payments',
  },
];

interface SupportChannel {
  name: string;
  description: string;
  icon: React.ElementType;
  action: string;
  link: string;
}

const supportChannels: SupportChannel[] = [
  {
    name: 'Live Chat',
    description: 'Chat with our support team in real-time',
    icon: MessageCircle,
    action: 'Start Chat',
    link: '#',
  },
  {
    name: 'Email Support',
    description: 'Send us an email, we usually respond within 24 hours',
    icon: Mail,
    action: 'Send Email',
    link: 'mailto:support@cyclades.com',
  },
  {
    name: 'Phone Support',
    description: 'Call us directly for urgent matters',
    icon: Phone,
    action: 'Call Now',
    link: 'tel:+302100000000',
  },
];

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border bg-white">
      <button
        className="flex w-full items-center justify-between p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{faq.question}</span>
        <span
          className={`ml-6 flex h-7 w-7 items-center justify-center rounded-full border text-gray-400 ${
            isOpen ? 'rotate-180 transform' : ''
          }`}
        >
          ⌄
        </span>
      </button>
      {isOpen && (
        <div className="border-t p-4">
          <p className="text-sm text-gray-500">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

function SupportChannelCard({ channel }: { channel: SupportChannel }) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3">
        <channel.icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">{channel.name}</h3>
      <p className="mt-2 text-sm text-gray-500">{channel.description}</p>
      <div className="mt-4">
        <a
          href={channel.link}
          className="inline-flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <span>{channel.action}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default function Support() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Support</h1>
          <p className="mt-2 text-sm text-gray-500">
            Get help with your account, properties, and bookings
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {supportChannels.map((channel) => (
            <SupportChannelCard key={channel.name} channel={channel} />
          ))}
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Find quick answers to common questions
            </p>
          </div>

          <div className="relative mb-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} faq={faq} />
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-blue-100 p-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Still need help?</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Our support team is available 24/7 to assist you
                </p>
              </div>
            </div>
            <button className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <MessageSquare className="h-5 w-5" />
              <span>Start Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
