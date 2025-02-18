import { useState } from 'react';
import DashboardLayout from '../../components/business/DashboardLayout';
import {
  User,
  Building2,
  Bell,
  CreditCard,
  Lock,
  Globe,
  Mail,
  Shield,
  Save,
} from 'lucide-react';

interface SettingsSection {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: 'profile',
    name: 'Profile',
    icon: User,
    description: 'Manage your personal information and preferences',
  },
  {
    id: 'business',
    name: 'Business Details',
    icon: Building2,
    description: 'Update your business information and settings',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    description: 'Configure how you receive notifications',
  },
  {
    id: 'payments',
    name: 'Payments',
    icon: CreditCard,
    description: 'Manage your payment methods and payout settings',
  },
  {
    id: 'security',
    name: 'Security',
    icon: Lock,
    description: 'Update your password and security preferences',
  },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+30 123 456 7890',
    language: 'en',
    timezone: 'Europe/Athens',
    businessName: 'Cyclades Rentals',
    businessEmail: 'info@cycladesrentals.com',
    vatNumber: 'GR123456789',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-full pt-4 lg:pt-0">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Settings Navigation */}
          <nav className="flex-none w-full lg:w-64">
            <div className="rounded-lg border bg-white p-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="rounded-lg border bg-white">
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div className="divide-y">
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your personal details and preferences
                    </p>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                          Language
                        </label>
                        <select
                          name="language"
                          id="language"
                          value={formData.language}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="en">English</option>
                          <option value="el">Greek</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                          Timezone
                        </label>
                        <select
                          name="timezone"
                          id="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Europe/Athens">Europe/Athens (GMT+2)</option>
                          <option value="Europe/London">Europe/London (GMT+0)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        <Save className="h-5 w-5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick links */}
              <div className="border-t p-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Your data is protected by our{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700">
                        privacy policy
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                      Terms of Service
                    </a>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
