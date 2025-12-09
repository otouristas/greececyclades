import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AvailabilityCalendarProps {
  hotelId: string;
  onAvailabilityCheck: (data: any) => void;
  className?: string;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  hotelId,
  onAvailabilityCheck,
  className = ''
}) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<any>(null);
  const { toast } = useToast();

  const handleDateSelect = (date: Date | undefined, type: 'checkIn' | 'checkOut') => {
    if (type === 'checkIn') {
      setCheckIn(date);
      // Clear check-out if it's before the new check-in date
      if (checkOut && date && checkOut <= date) {
        setCheckOut(undefined);
      }
    } else {
      setCheckOut(date);
    }
  };

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Please select both dates",
        description: "Choose your check-in and check-out dates to see availability.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('real-time-availability', {
        body: {
          hotelId,
          checkIn: checkIn.toISOString().split('T')[0],
          checkOut: checkOut.toISOString().split('T')[0],
          guests
        }
      });

      if (error) throw error;

      setAvailabilityData(data);
      onAvailabilityCheck(data);

      if (data.available) {
        toast({
          title: "Great news!",
          description: `${data.totalRooms} room(s) available for your dates.`
        });
      } else {
        toast({
          title: "No availability",
          description: "Sorry, no rooms are available for these dates. Try different dates.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      toast({
        title: "Error",
        description: "Failed to check availability. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nights = checkIn && checkOut ? 
    Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Check Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Check-in Date</label>
            <Calendar
              mode="single"
              selected={checkIn}
              onSelect={(date) => handleDateSelect(date, 'checkIn')}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Check-out Date</label>
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={(date) => handleDateSelect(date, 'checkOut')}
              disabled={(date) => !checkIn || date <= checkIn}
              className="rounded-md border"
            />
          </div>
        </div>

        {/* Guests Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Users className="h-4 w-4" />
            Number of Guests
          </label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
            >
              -
            </Button>
            <span className="px-4 py-2 border rounded-md min-w-[3rem] text-center">
              {guests}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGuests(Math.min(8, guests + 1))}
              disabled={guests >= 8}
            >
              +
            </Button>
          </div>
        </div>

        {/* Booking Summary */}
        {checkIn && checkOut && (
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Booking Summary
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span>{checkIn.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span>{checkOut.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Nights:</span>
                <span>{nights}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span>{guests}</span>
              </div>
            </div>
          </div>
        )}

        {/* Availability Results */}
        {availabilityData && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Available Rooms</h4>
              <Badge variant={availabilityData.available ? "default" : "destructive"}>
                {availabilityData.available ? `${availabilityData.totalRooms} Available` : 'No Availability'}
              </Badge>
            </div>
            
            {availabilityData.rooms?.map((room: any) => (
              <div key={room.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">{room.name}</h5>
                    <p className="text-sm text-muted-foreground">{room.description}</p>
                    <p className="text-sm">Capacity: {room.capacity} guests</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">€{room.price}</p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Check Availability Button */}
        <Button 
          onClick={checkAvailability}
          disabled={!checkIn || !checkOut || isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? "Checking..." : "Check Availability"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;