import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import SEO from '../components/SEO';

export default function BusinessSignIn() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      if (data.user) {
        // Check if user has a business account
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (businessError || !businessData) {
          setError('This account is not associated with a business. Please use regular sign in.');
          setLoading(false);
          return;
        }

        const user = {
          id: data.user.id,
          name: businessData.name || data.user.email?.split('@')[0] || 'Business User',
          email: data.user.email || '',
          avatar: null
        };
        
        login(user);
        navigate('/business/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Business Sign In - Discover Cyclades Business Portal"
        description="Sign in to your business account to manage your listings, bookings, and profile on Discover Cyclades."
      />

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary-100 mb-4">
                <Building2 className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Business Sign In
              </h2>
              <p className="text-gray-600">
                Sign in to manage your business account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have a business account?{' '}
                <Link
                  to="/business/signup"
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  Sign up here
                </Link>
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Regular user?{' '}
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

