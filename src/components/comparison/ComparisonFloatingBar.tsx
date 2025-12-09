import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useComparison } from '@/contexts/ComparisonContext';
import { Scale, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ComparisonFloatingBar() {
  const { comparedHotels, comparisonCount, clearComparison } = useComparison();
  const navigate = useNavigate();

  if (comparisonCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-primary text-primary-foreground rounded-full shadow-2xl px-6 py-3 flex items-center gap-4">
          <Scale className="h-5 w-5" />
          
          <div className="flex items-center gap-2">
            {comparedHotels.map((hotel) => (
              <div key={hotel.id} className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-foreground">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <Badge variant="secondary" className="bg-primary-foreground text-primary">
            {comparisonCount} hotels
          </Badge>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigate('/compare-hotels')}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Eye className="h-4 w-4 mr-2" />
              Compare Now
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={clearComparison}
              className="hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
