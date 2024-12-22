import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  MapPin, 
  Ship, 
  Calendar, 
  Bookmark,
  Mail,
  Lock,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) {
      setError('Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error: any) {
      setError('Could not sign in with Google');
    }
  };

  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Personalized Travel Plans",
      description: "Create and save custom itineraries tailored to your preferences"
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Exclusive Local Tips",
      description: "Access insider recommendations and hidden gems from local experts"
    },
    {
      icon: <Ship className="w-8 h-8 text-indigo-500" />,
      title: "Ferry Tracking",
      description: "Real-time updates and notifications for your ferry bookings"
    },
    {
      icon: <Calendar className="w-8 h-8 text-emerald-500" />,
      title: "Trip History",
      description: "Keep track of your past and upcoming island adventures"
    },
    {
      icon: <Bookmark className="w-8 h-8 text-amber-500" />,
      title: "Save Favorites",
      description: "Bookmark your favorite islands, hotels, and activities"
    }
  ];

  return (
    <>
      <SEO 
        title={`Sign In ${SITE_TAGLINE}`}
        description="Sign in to your Greece Cyclades account to access personalized travel planning features and exclusive content."
      />
      <div className="flex min-h-screen w-full">
        {/* Left Column - Sign In Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue your Greek island journey</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column - Benefits */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="h-full flex flex-col justify-center p-8 md:p-16 lg:p-24">
            <div className="max-w-lg mx-auto">
              <h2 className="text-3xl font-bold mb-8">Why Join Greece Cyclades?</h2>
              
              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-white/80">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="/images/testimonials/maria.jpg" 
                    alt="Maria" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">Maria K.</h4>
                    <p className="text-sm text-white/80">Island Explorer</p>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "Greece Cyclades made planning my island-hopping adventure so much easier. 
                  The personalized recommendations were spot-on, and I discovered amazing places 
                  I wouldn't have found otherwise!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
