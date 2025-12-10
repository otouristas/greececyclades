import { useState } from 'react';
import { User, Mail, Phone, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useTheme } from '@/contexts/ThemeContext';
import type { PrebookResponse, HotelRate } from '@/lib/liteapi';

interface CheckoutFormProps {
  prebookData: PrebookResponse['data'] | null | undefined;
  rate?: HotelRate | null;
  onSubmit: (holderData: HolderData, guestsData: GuestData[]) => void;
  isLoading?: boolean;
}

export interface HolderData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface GuestData {
  occupancyNumber: number;
  firstName: string;
  lastName: string;
  email?: string;
}

export function CheckoutForm({ prebookData, rate, onSubmit, isLoading }: CheckoutFormProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Holder (primary guest) information
  const [holder, setHolder] = useState<HolderData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Additional guests
  const [guests, setGuests] = useState<GuestData[]>([
    { occupancyNumber: 1, firstName: '', lastName: '' },
  ]);

  const [agreeTerms, setAgreeTerms] = useState(false);

  function handleHolderChange(field: keyof HolderData, value: string) {
    setHolder((prev) => ({ ...prev, [field]: value }));
  }

  function handleGuestChange(index: number, field: keyof GuestData, value: string) {
    const updated = [...guests];
    updated[index] = { ...updated[index], [field]: value };
    setGuests(updated);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!holder.firstName || !holder.lastName || !holder.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (!agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    onSubmit(holder, guests);
  }

  // Safe access to price data - try multiple sources
  // 1. From prebookData.price.total (object format)
  // 2. From prebookData.price (if it's the direct amount)
  // 3. From prebookData.retailRate (LiteAPI v3 format)
  // 4. From rate prop as fallback
  let priceAmount = 0;
  let priceCurrency = 'EUR';

  if (prebookData) {
    // Try different response formats from LiteAPI
    if (prebookData.price?.total?.amount !== undefined) {
      priceAmount = prebookData.price.total.amount;
      priceCurrency = prebookData.price.total.currency || 'EUR';
    } else if ((prebookData as any).retailRate?.total?.[0]?.amount !== undefined) {
      priceAmount = (prebookData as any).retailRate.total[0].amount;
      priceCurrency = (prebookData as any).retailRate.total[0].currency || 'EUR';
    } else if ((prebookData as any).totalPrice !== undefined) {
      priceAmount = (prebookData as any).totalPrice;
      priceCurrency = (prebookData as any).currency || 'EUR';
    } else if ((prebookData as any).price?.amount !== undefined) {
      priceAmount = (prebookData as any).price.amount;
      priceCurrency = (prebookData as any).price.currency || 'EUR';
    }
  }

  // Fallback to rate data if prebook price is 0
  if (priceAmount === 0 && rate?.retailRate?.total?.[0]) {
    priceAmount = rate.retailRate.total[0].amount;
    priceCurrency = rate.retailRate.total[0].currency || 'EUR';
  }

  const currencySymbol = priceCurrency === 'EUR' ? '€' : priceCurrency === 'USD' ? '$' : '£';

  // Get room info
  const roomName = prebookData?.room?.name || rate?.name || 'Hotel Room';
  const boardName = prebookData?.room?.boardName || rate?.boardName || 'Room Only';
  const isRefundable = prebookData?.cancellationPolicies?.refundableTag === 'RFN' ||
    rate?.cancellationPolicies?.refundableTag === 'RFN';

  // Show error state if prebookData is missing
  if (!prebookData) {
    return (
      <Card className={`p-8 text-center ${isDark ? 'bg-dark-card border-white/10' : 'bg-white'}`}>
        <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
        <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Booking Data Not Found
        </h2>
        <p className={`mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
          The prebooking information is missing. Please go back and select a room again.
        </p>
        <Button
          onClick={() => window.history.back()}
          className="bg-sifnos-turquoise hover:bg-sifnos-deep-blue text-white"
        >
          Go Back
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Primary Guest (Holder) */}
          <Card className={`p-6 ${isDark ? 'bg-dark-card border-white/10' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Primary Guest Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="holder-firstName" className={`flex items-center gap-2 mb-2 ${isDark ? 'text-white/80' : ''}`}>
                  <User className="w-4 h-4" />
                  First Name *
                </Label>
                <Input
                  id="holder-firstName"
                  type="text"
                  value={holder.firstName}
                  onChange={(e) => handleHolderChange('firstName', e.target.value)}
                  placeholder="John"
                  required
                  className={isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : ''}
                />
              </div>

              <div>
                <Label htmlFor="holder-lastName" className={`mb-2 block ${isDark ? 'text-white/80' : ''}`}>
                  Last Name *
                </Label>
                <Input
                  id="holder-lastName"
                  type="text"
                  value={holder.lastName}
                  onChange={(e) => handleHolderChange('lastName', e.target.value)}
                  placeholder="Doe"
                  required
                  className={isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : ''}
                />
              </div>

              <div>
                <Label htmlFor="holder-email" className={`flex items-center gap-2 mb-2 ${isDark ? 'text-white/80' : ''}`}>
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="holder-email"
                  type="email"
                  value={holder.email}
                  onChange={(e) => handleHolderChange('email', e.target.value)}
                  placeholder="john.doe@example.com"
                  required
                  className={isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : ''}
                />
                <p className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  Confirmation will be sent to this email
                </p>
              </div>

              <div>
                <Label htmlFor="holder-phone" className={`flex items-center gap-2 mb-2 ${isDark ? 'text-white/80' : ''}`}>
                  <Phone className="w-4 h-4" />
                  Phone (Optional)
                </Label>
                <Input
                  id="holder-phone"
                  type="tel"
                  value={holder.phone}
                  onChange={(e) => handleHolderChange('phone', e.target.value)}
                  placeholder="+30 123 456 7890"
                  className={isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : ''}
                />
              </div>
            </div>
          </Card>

          {/* Additional Guests */}
          {guests.length > 0 && (
            <Card className={`p-6 ${isDark ? 'bg-dark-card border-white/10' : 'bg-white'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Additional Guest Information
              </h2>

              <div className="space-y-4">
                {guests.map((guest, index) => (
                  <div key={index} className={`pb-4 last:border-0 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
                    <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                      Guest {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`guest-${index}-firstName`} className={`mb-2 block text-sm ${isDark ? 'text-white/70' : ''}`}>
                          First Name
                        </Label>
                        <Input
                          id={`guest-${index}-firstName`}
                          type="text"
                          value={guest.firstName}
                          onChange={(e) => handleGuestChange(index, 'firstName', e.target.value)}
                          placeholder="Jane"
                          className={isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`guest-${index}-lastName`} className={`mb-2 block text-sm ${isDark ? 'text-white/70' : ''}`}>
                          Last Name
                        </Label>
                        <Input
                          id={`guest-${index}-lastName`}
                          type="text"
                          value={guest.lastName}
                          onChange={(e) => handleGuestChange(index, 'lastName', e.target.value)}
                          placeholder="Doe"
                          className={isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40' : ''}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Terms & Conditions */}
          <Card className={`p-6 ${isDark ? 'bg-dark-card border-white/10' : 'bg-white'}`}>
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor="terms" className={`text-sm cursor-pointer ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                  I agree to the{' '}
                  <a href="/terms-of-service" target="_blank" className="text-sifnos-turquoise hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy-policy" target="_blank" className="text-sifnos-turquoise hover:underline">
                    Privacy Policy
                  </a>
                  . I understand the cancellation policy for this booking.
                </label>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!agreeTerms || isLoading}
            className="w-full bg-sifnos-turquoise hover:bg-sifnos-deep-blue text-white py-6 text-lg font-semibold"
          >
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </form>
      </div>

      {/* Booking Summary Sidebar */}
      <div className="lg:col-span-1">
        <Card className={`p-6 sticky top-4 ${isDark ? 'bg-dark-card border-white/10' : 'bg-white'}`}>
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Booking Summary
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Room</div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {roomName}
              </div>
            </div>

            <div>
              <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Board Type</div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {boardName}
              </div>
            </div>

            <div>
              <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Cancellation</div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {isRefundable ? (
                  <span className="text-green-500 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Refundable
                  </span>
                ) : (
                  <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Non-refundable</span>
                )}
              </div>
            </div>
          </div>

          <div className={`pt-4 ${isDark ? 'border-t border-white/10' : 'border-t border-gray-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={isDark ? 'text-white/70' : 'text-gray-700'}>Total Amount</span>
              <span className="text-2xl font-bold text-sifnos-turquoise">
                {currencySymbol}{priceAmount.toFixed(2)}
              </span>
            </div>
            {priceAmount === 0 && (
              <p className={`text-xs ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                Price will be confirmed on payment page
              </p>
            )}
            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              All taxes and fees included
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
