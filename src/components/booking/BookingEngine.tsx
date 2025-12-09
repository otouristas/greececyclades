import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CreditCard, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BookingEngineProps {
  hotelId: string;
  roomId?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomData?: any;
  hotelData?: any;
  onBookingComplete: (bookingData: any) => void;
}

const BookingEngine: React.FC<BookingEngineProps> = ({
  hotelId,
  roomId,
  checkIn,
  checkOut,
  guests,
  roomData,
  hotelData,
  onBookingComplete
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    userEmail: '',
    userPhone: '',
    specialRequests: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotalPrice = () => {
    if (!roomData) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    return roomData.price * nights;
  };

  const handleBooking = async () => {
    if (!formData.guestName || !formData.userEmail) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('booking-engine', {
        body: {
          hotelId,
          roomId,
          checkIn,
          checkOut,
          guests,
          userEmail: formData.userEmail,
          userPhone: formData.userPhone,
          guestName: formData.guestName,
          specialRequests: formData.specialRequests
        }
      });

      if (error) throw error;

      toast({
        title: "Booking confirmed!",
        description: "Your reservation has been confirmed. Check your email for details."
      });

      onBookingComplete(data);

    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = calculateTotalPrice();
  const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Complete Your Booking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Booking Summary */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Hotel:</span>
              <span className="font-medium">{hotelData?.name}</span>
            </div>
            {roomData && (
              <div className="flex justify-between">
                <span>Room:</span>
                <span className="font-medium">{roomData.name}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Check-in:</span>
              <span>{new Date(checkIn).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Check-out:</span>
              <span>{new Date(checkOut).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Nights:</span>
              <span>{nights}</span>
            </div>
            <div className="flex justify-between">
              <span>Guests:</span>
              <span>{guests}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>€{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Guest Information */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <User className="h-4 w-4" />
            Guest Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guestName">Full Name *</Label>
              <Input
                id="guestName"
                type="text"
                value={formData.guestName}
                onChange={(e) => handleInputChange('guestName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="userEmail" className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                Email Address *
              </Label>
              <Input
                id="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={(e) => handleInputChange('userEmail', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="userPhone" className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              Phone Number
            </Label>
            <Input
              id="userPhone"
              type="tel"
              value={formData.userPhone}
              onChange={(e) => handleInputChange('userPhone', e.target.value)}
              placeholder="+30 123 456 7890"
            />
          </div>

          <div>
            <Label htmlFor="specialRequests" className="flex items-center gap-2">
              <MessageSquare className="h-3 w-3" />
              Special Requests
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any special requests or notes for your stay..."
              rows={3}
            />
          </div>
        </div>

        {/* Payment Information Notice */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Payment Information</h4>
          <p className="text-sm text-blue-700">
            Payment will be processed directly with the hotel. You will receive confirmation 
            details and payment instructions via email after completing this booking.
          </p>
        </div>

        {/* Terms and Conditions */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>By completing this booking, you agree to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>The hotel's cancellation and refund policies</li>
            <li>Providing accurate contact information</li>
            <li>Arriving on the specified check-in date</li>
          </ul>
        </div>

        {/* Book Now Button */}
        <Button
          onClick={handleBooking}
          disabled={isLoading || !formData.guestName || !formData.userEmail}
          className="w-full"
          size="lg"
        >
          {isLoading ? "Processing..." : `Confirm Booking - €${totalPrice}`}
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-green-600 border-green-600">
            Secure Booking
          </Badge>
          <span>•</span>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Instant Confirmation
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingEngine;