import { useState } from 'react';
import { Calendar, Users, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function StickyBookingWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to hotels page with search params
    const params = new URLSearchParams();
    if (checkIn) params.append('checkin', checkIn);
    if (checkOut) params.append('checkout', checkOut);
    if (guests) params.append('guests', guests);
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-primary shadow-[0_-4px_20px_rgba(30,46,72,0.15)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {!isExpanded ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Find Your Perfect Stay</span>
            </div>
            <Button 
              onClick={() => setIsExpanded(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Hotels
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary">Book Your Sifnos Hotel</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Check-in</label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Check-out</label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    min="1"
                    max="10"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-primary-foreground self-end"
                size="lg"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              💰 Best price guarantee · 🔒 Secure booking · ⭐ 1000+ verified reviews
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
