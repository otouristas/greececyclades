import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setSuccessMessage('Password reset link has been sent to your email');
      setEmail(''); // Clear the email field after success
    } catch (error: any) {
      setError(error.message || 'Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title={`Reset Password ${SITE_TAGLINE}`}
        description="Reset your Greece Cyclades account password securely."
      />
      <div className="flex min-h-screen w-full">
        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <div className="max-w-md w-full mx-auto">
            <Link 
              to="/signin" 
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
              <p className="text-gray-600">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-4 bg-green-50 border border-green-100 text-green-600 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Info */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="h-full flex flex-col justify-center p-8 md:p-16 lg:p-24">
            <div className="max-w-lg mx-auto">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-6">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-4">Secure Password Reset</h2>
                
                <div className="space-y-4 text-white/90">
                  <p>
                    We take your account security seriously. Here's what happens next:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li>We'll send a secure reset link to your email</li>
                    <li>Click the link in the email (valid for 1 hour)</li>
                    <li>Create a new password for your account</li>
                    <li>Sign in with your new password</li>
                  </ol>

                  <p className="text-sm text-white/80 mt-6">
                    Didn't receive the email? Check your spam folder or contact our support team 
                    if you need assistance.
                  </p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white/10 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-white/80">
                  Our support team is available 24/7 to assist you with any account-related issues.
                  Contact us at{' '}
                  <a href="mailto:support@greececyclades.com" className="underline hover:text-white">
                    support@greececyclades.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
