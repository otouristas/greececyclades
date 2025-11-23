import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Hotel, Car, UtensilsCrossed, Compass, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import SEO from '../components/SEO';

type BusinessType = 'hotel' | 'car_rental' | 'activity' | 'restaurant';

interface BusinessTypeOption {
  id: BusinessType;
  label: string;
  description: string;
  icon: React.ReactElement;
}

export default function BusinessSignUp() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: '',
    website: '',
    location: '',
    island: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const businessTypes: BusinessTypeOption[] = [
    {
      id: 'hotel',
      label: 'Hotel / Accommodation',
      description: 'List your hotel, villa, or accommodation property',
      icon: <Hotel className="w-8 h-8" />
    },
    {
      id: 'car_rental',
      label: 'Car Rental',
      description: 'Offer car and vehicle rental services',
      icon: <Car className="w-8 h-8" />
    },
    {
      id: 'activity',
      label: 'Activity / Tour',
      description: 'List tours, activities, and experiences',
      icon: <Compass className="w-8 h-8" />
    },
    {
      id: 'restaurant',
      label: 'Restaurant / Dining',
      description: 'List your restaurant, taverna, or cafe',
      icon: <UtensilsCrossed className="w-8 h-8" />
    }
  ];

  const handleBusinessTypeSelect = (type: BusinessType) => {
    setBusinessType(type);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/business/dashboard`,
          data: {
            user_type: 'business',
            business_type: businessType
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Failed to create user account');
      }

      // Step 2: Create business record
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .insert({
          user_id: authData.user.id,
          business_type: businessType,
          name: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          location: formData.location,
          island: formData.island,
          description: formData.description,
          status: 'pending'
        })
        .select()
        .single();

      if (businessError) throw businessError;

      // If user is automatically signed in, update auth store
      if (authData.session) {
        const user = {
          id: authData.user.id,
          name: formData.businessName,
          email: formData.user.email || '',
          avatar: null
        };
        login(user);
        navigate('/business/dashboard');
      } else {
        // Email confirmation required
        navigate('/business/signup/success');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Business Sign Up - List Your Business on Discover Cyclades"
        description="Join Discover Cyclades as a business partner. List your hotel, car rental, activity, or restaurant and reach thousands of travelers."
      />

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          {step === 1 ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary-100 mb-4">
                  <Building2 className="h-8 w-8 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Join as a Business Partner
                </h2>
                <p className="text-gray-600">
                  Select your business type to get started
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {businessTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleBusinessTypeSelect(type.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      businessType === type.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        businessType === type.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {type.label}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <Link
                  to="/signin"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Already have an account? Sign in
                </Link>
                <button
                  onClick={() => businessType && setStep(2)}
                  disabled={!businessType}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-primary-600 hover:text-primary-700 font-medium mb-4"
                >
                  ← Back
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Business Information
                </h2>
                <p className="text-gray-600">
                  Tell us about your {businessTypes.find(t => t.id === businessType)?.label.toLowerCase()}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your business name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="At least 6 characters"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+30 XXX XXX XXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="island" className="block text-sm font-medium text-gray-700 mb-2">
                      Island *
                    </label>
                    <select
                      id="island"
                      name="island"
                      required
                      value={formData.island}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select an island</option>
                      <option value="santorini">Santorini</option>
                      <option value="mykonos">Mykonos</option>
                      <option value="naxos">Naxos</option>
                      <option value="paros">Paros</option>
                      <option value="sifnos">Sifnos</option>
                      <option value="milos">Milos</option>
                      <option value="ios">Ios</option>
                      <option value="folegandros">Folegandros</option>
                      <option value="syros">Syros</option>
                      <option value="tinos">Tinos</option>
                      <option value="andros">Andros</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location / Address
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="City, village, or specific address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your business..."
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <Link
                    to="/signin"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Already have an account? Sign in
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Creating Account...' : 'Create Business Account'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

