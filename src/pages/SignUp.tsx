import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  Heart, 
  MapPin, 
  Ship, 
  Calendar, 
  Bookmark,
  Mail,
  Lock,
  User,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) {
      setError('Failed to create account');
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error: any) {
      setError('Could not sign up with Google');
    }
  };

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Create Travel Plans",
      description: "Design your perfect island-hopping itinerary"
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Discover Hidden Gems",
      description: "Access exclusive local recommendations and secret spots"
    },
    {
      icon: <Ship className="w-8 h-8 text-indigo-500" />,
      title: "Easy Ferry Booking",
      description: "Book and track your ferry journeys between islands"
    },
    {
      icon: <Calendar className="w-8 h-8 text-emerald-500" />,
      title: "Smart Trip Planning",
      description: "Get AI-powered suggestions for the best travel dates"
    },
    {
      icon: <Bookmark className="w-8 h-8 text-amber-500" />,
      title: "Personal Collection",
      description: "Save and organize your favorite destinations"
    }
  ];

  return (
    <>
      <SEO 
        title={`Create Account ${SITE_TAGLINE}`}
        description="Join Greece Cyclades to start planning your perfect Greek island adventure with personalized recommendations and travel tools."
      />
      <div className="flex min-h-screen w-full">
        {/* Left Column - Benefits */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="h-full flex flex-col justify-center p-8 md:p-16 lg:p-24">
            <div className="max-w-lg mx-auto">
              <h2 className="text-3xl font-bold mb-8">Start Your Island Adventure</h2>
              
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                      <p className="text-white/80">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="/images/testimonials/alex.jpg" 
                    alt="Alex" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">Alex M.</h4>
                    <p className="text-sm text-white/80">Travel Enthusiast</p>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "Joining Greece Cyclades was the best decision for my Greek island trip. 
                  The planning tools and local insights helped me discover incredible places 
                  I wouldn't have found on my own!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sign Up Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
              <p className="text-gray-600">Join our community of island explorers</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

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

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Account
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
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
