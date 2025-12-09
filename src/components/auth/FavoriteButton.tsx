import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import AuthModal from './AuthModal';

interface FavoriteButtonProps {
  hotelId: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function FavoriteButton({ 
  hotelId, 
  className = '',
  variant = 'outline',
  size = 'icon'
}: FavoriteButtonProps) {
  const { user, toggleFavorite, checkIsFavorite } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Check if hotel is favorited on mount and when user changes
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        setIsLoading(true);
        const status = await checkIsFavorite(hotelId);
        setIsFavorite(status);
        setIsLoading(false);
      } else {
        setIsFavorite(false);
      }
    };
    
    checkFavoriteStatus();
  }, [hotelId, user, checkIsFavorite]);
  
  // Handle favorite toggle
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    setIsLoading(true);
    const newStatus = await toggleFavorite(hotelId);
    setIsFavorite(newStatus);
    setIsLoading(false);
  };
  
  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`${className} ${isFavorite ? 'text-red-500 hover:text-red-600' : ''}`}
        onClick={handleToggleFavorite}
        disabled={isLoading}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`h-[1.2rem] w-[1.2rem] ${isFavorite ? 'fill-current' : ''}`} />
      </Button>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultView="sign-in"
      />
    </>
  );
}