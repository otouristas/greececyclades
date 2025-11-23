import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';
import { toast } from '../ui/toast';

interface FavoritesButtonProps {
  itemId: string;
  itemType: 'island' | 'hotel' | 'activity' | 'car' | 'ferry';
  itemName: string;
  itemImage?: string;
  itemLink: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function FavoritesButton({
  itemId,
  itemType,
  itemName,
  itemImage,
  itemLink,
  className = '',
  size = 'md'
}: FavoritesButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  // Check if item is favorited
  useEffect(() => {
    if (!user) {
      setIsFavorited(false);
      return;
    }

    async function checkFavorite() {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('id')
          .eq('user_id', user.id)
          .eq('item_id', itemId)
          .eq('item_type', itemType)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking favorite:', error);
          return;
        }

        setIsFavorited(!!data);
      } catch (error) {
        console.error('Error checking favorite:', error);
      }
    }

    checkFavorite();
  }, [user, itemId, itemType]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({ title: 'Please sign in to save favorites', variant: 'destructive' });
      // Optionally redirect to sign in
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('item_id', itemId)
          .eq('item_type', itemType);

        if (error) throw error;

        setIsFavorited(false);
        toast({ title: 'Removed from favorites' });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            item_id: itemId,
            item_type: itemType,
            item_name: itemName,
            item_image: itemImage,
            item_link: itemLink
          });

        if (error) throw error;

        setIsFavorited(true);
        toast({ title: 'Added to favorites' });
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast({ title: error.message || 'Failed to update favorites', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`${sizeClasses[size]} ${className} flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 hover:border-red-300 transition-all ${
        isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`${iconSizes[size]} ${isFavorited ? 'fill-current' : ''}`}
      />
    </motion.button>
  );
}

