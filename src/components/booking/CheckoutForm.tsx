import { useState } from 'react';
import { User, Mail, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type { PrebookResponse } from '@/lib/liteapi';

interface CheckoutFormProps {
  prebookData: PrebookResponse['data'];
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

export function CheckoutForm({ prebookData, onSubmit, isLoading }: CheckoutFormProps) {
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

  const price = prebookData.price.total;
  const currencySymbol = price.currency === 'EUR' ? '€' : price.currency === 'USD' ? '$' : '£';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Primary Guest (Holder) */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Primary Guest Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="holder-firstName" className="flex items-center gap-2 mb-2">
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
                />
              </div>

              <div>
                <Label htmlFor="holder-lastName" className="mb-2 block">
                  Last Name *
                </Label>
                <Input
                  id="holder-lastName"
                  type="text"
                  value={holder.lastName}
                  onChange={(e) => handleHolderChange('lastName', e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="holder-email" className="flex items-center gap-2 mb-2">
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
                />
                <p className="text-xs text-gray-500 mt-1">Confirmation will be sent to this email</p>
              </div>

              <div>
                <Label htmlFor="holder-phone" className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone (Optional)
                </Label>
                <Input
                  id="holder-phone"
                  type="tel"
                  value={holder.phone}
                  onChange={(e) => handleHolderChange('phone', e.target.value)}
                  placeholder="+30 123 456 7890"
                />
              </div>
            </div>
          </Card>

          {/* Additional Guests */}
          {guests.length > 0 && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Guest Information</h2>
              
              <div className="space-y-4">
                {guests.map((guest, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Guest {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`guest-${index}-firstName`} className="mb-2 block text-sm">
                          First Name
                        </Label>
                        <Input
                          id={`guest-${index}-firstName`}
                          type="text"
                          value={guest.firstName}
                          onChange={(e) => handleGuestChange(index, 'firstName', e.target.value)}
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`guest-${index}-lastName`} className="mb-2 block text-sm">
                          Last Name
                        </Label>
                        <Input
                          id={`guest-${index}-lastName`}
                          type="text"
                          value={guest.lastName}
                          onChange={(e) => handleGuestChange(index, 'lastName', e.target.value)}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Terms & Conditions */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
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
        <Card className="p-6 sticky top-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <div className="text-sm text-gray-600">Hotel</div>
              <div className="font-medium text-gray-900">
                {prebookData.room?.name || 'Hotel Room'}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Board Type</div>
              <div className="font-medium text-gray-900">
                {prebookData.room?.boardName || 'Room Only'}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Cancellation</div>
              <div className="font-medium text-gray-900">
                {prebookData.cancellationPolicies?.refundableTag === 'RFN' ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Refundable
                  </span>
                ) : (
                  <span className="text-gray-600">Non-refundable</span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Total Amount</span>
              <span className="text-2xl font-bold text-sifnos-turquoise">
                {currencySymbol}{price.amount.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500">All taxes and fees included</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

