import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ResetPasswordForm from './ResetPasswordForm';

export type AuthView = 'sign-in' | 'sign-up' | 'reset-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: AuthView;
  redirectUrl?: string;
  onSuccess?: () => void;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  defaultView = 'sign-in',
  redirectUrl,
  onSuccess
}: AuthModalProps) {
  const [view, setView] = useState<AuthView>(defaultView);
  
  // Handle successful authentication
  const handleAuthSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };
  
  // Reset view when modal is closed
  const handleClose = () => {
    onClose();
    // Reset to default view after a short delay
    setTimeout(() => setView(defaultView), 300);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-sifnos-deep-blue">
            {view === 'sign-in' ? 'Welcome Back' : 
             view === 'sign-up' ? 'Create an Account' : 
             'Reset Your Password'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {view === 'sign-in' ? 'Sign in to your Hotels Sifnos account' : 
             view === 'sign-up' ? 'Join Hotels Sifnos to save your favorite hotels and get personalized recommendations' : 
             'Enter your email to receive a password reset link'}
          </DialogDescription>
        </DialogHeader>
        
        {(view === 'sign-in' || view === 'sign-up') && (
          <Tabs defaultValue={view} onValueChange={(value) => setView(value as AuthView)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sign-in" className="mt-4">
              <SignInForm 
                onSuccess={handleAuthSuccess}
                onForgotPassword={() => setView('reset-password')}
                redirectUrl={redirectUrl}
              />
            </TabsContent>
            
            <TabsContent value="sign-up" className="mt-4">
              <SignUpForm 
                onSuccess={handleAuthSuccess}
                redirectUrl={redirectUrl}
              />
            </TabsContent>
          </Tabs>
        )}
        
        {view === 'reset-password' && (
          <div className="mt-4">
            <ResetPasswordForm 
              onBack={() => setView('sign-in')}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}