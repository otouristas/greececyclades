import { ReactNode } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  type: 'user' | 'business';
  isSignUp?: boolean;
}

export default function AuthLayout({ children, title, subtitle, type, isSignUp = false }: AuthLayoutProps) {
  const otherAuthPath = isSignUp 
    ? type === 'user' ? '/signin' : '/business/signin'
    : type === 'user' ? '/signup' : '/business/signup';
  
  const otherAuthText = isSignUp ? 'Sign in' : 'Sign up';
  const otherTypeLink = type === 'user' 
    ? isSignUp ? '/business/signup' : '/business/signin'
    : isSignUp ? '/signup' : '/signin';
  const otherTypeText = type === 'user' ? 'Business' : 'Personal';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 mt-14 md:mt-[72px]">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="mb-8">
              <Link to="/" className="inline-block">
                <Logo variant="white" />
              </Link>
              <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">{title}</h2>
              <p className="mt-2 text-sm text-white/80">{subtitle}</p>
            </div>

            {children}

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-transparent px-2 text-white/60">Or</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col space-y-4 text-sm">
                <p className="text-center text-white/80">
                  Already have an account?{' '}
                  <Link to={otherAuthPath} className="font-semibold text-white hover:text-white/90">
                    {otherAuthText}
                  </Link>
                </p>
                <p className="text-center text-white/80">
                  Looking for {otherTypeText} account?{' '}
                  <Link to={otherTypeLink} className="font-semibold text-white hover:text-white/90">
                    {otherTypeText} {isSignUp ? 'sign up' : 'sign in'}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={type === 'user' 
              ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2346&q=80"
              : "https://images.unsplash.com/photo-1496319791074-21e475b3802d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            }
            alt={type === 'user' ? "Beautiful beach in Greece" : "Greek restaurant by the sea"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
