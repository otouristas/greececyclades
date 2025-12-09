import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import AuthModal from './AuthModal';

interface AuthButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

export default function AuthButton({ 
  variant = 'default', 
  size = 'default',
  className = '',
  children
}: AuthButtonProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  return (
    <>
      <Button 
        variant={variant} 
        size={size}
        className={className}
        onClick={() => setIsAuthModalOpen(true)}
      >
        {children || (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </>
        )}
      </Button>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}