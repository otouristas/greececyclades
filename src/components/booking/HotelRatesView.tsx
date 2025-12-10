import { useMemo, useState } from 'react';
import { Check, X, Bed, Users, Coffee, Utensils, Info, ChevronDown, ChevronUp, AlertCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import type { Hotel, HotelRate } from '@/lib/liteapi';
import { calculateNights } from '@/lib/liteapi';

interface HotelRatesViewProps {
  hotel: Hotel;
  onBookRate: (rate: HotelRate) => void;
  isLoading?: boolean;
  showHeader?: boolean;
}

export function HotelRatesView({ hotel, onBookRate, isLoading, showHeader = true }: HotelRatesViewProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [expandedRates, setExpandedRates] = useState<Set<string>>(new Set());

  const nights = (hotel.checkin && hotel.checkout)
    ? calculateNights(hotel.checkin, hotel.checkout)
    : 0;

  // Group rates by room type
  const groupedRates = useMemo(() => {
    if (!hotel.rates || hotel.rates.length === 0) {
      return [];
    }

    const groups = new Map<number, HotelRate[]>();

    hotel.rates.forEach((rate) => {
      const existing = groups.get(rate.mappedRoomId) || [];
      existing.push(rate);
      groups.set(rate.mappedRoomId, existing);
    });

    return Array.from(groups.entries()).map(([mappedRoomId, rates]) => ({
      mappedRoomId,
      roomName: rates[0].name,
      rates: rates.sort((a, b) =>
        (a.retailRate?.total?.[0]?.amount || 0) - (b.retailRate?.total?.[0]?.amount || 0)
      ),
    }));
  }, [hotel.rates]);

  function getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'EUR': return '€';
      case 'USD': return '$';
      case 'GBP': return '£';
      default: return currency;
    }
  }

  // Get board icon and color
  function getBoardInfo(boardName: string, boardCode?: string) {
    const lowerBoard = boardName.toLowerCase();
    const code = boardCode?.toUpperCase();

    if (code === 'BI' || code === 'BB' || lowerBoard.includes('breakfast')) {
      return { icon: Coffee, color: isDark ? 'text-orange-400' : 'text-orange-600', label: 'Breakfast Included', highlight: true };
    }
    if (code === 'HB' || lowerBoard.includes('half board') || lowerBoard.includes('dinner')) {
      return { icon: Utensils, color: isDark ? 'text-green-400' : 'text-green-600', label: 'Half Board', highlight: true };
    }
    if (code === 'FB' || code === 'AI' || lowerBoard.includes('all inclusive') || lowerBoard.includes('full board')) {
      return { icon: Utensils, color: isDark ? 'text-purple-400' : 'text-purple-600', label: 'All Inclusive', highlight: true };
    }
    return { icon: Bed, color: isDark ? 'text-gray-400' : 'text-gray-500', label: 'Room Only', highlight: false };
  }

  function toggleExpand(offerId: string) {
    setExpandedRates(prev => {
      const next = new Set(prev);
      if (next.has(offerId)) {
        next.delete(offerId);
      } else {
        next.add(offerId);
      }
      return next;
    });
  }

  // Theme styles
  const cardBg = isDark ? 'bg-dark-card border-white/10' : 'bg-white border-gray-200';
  const headerBg = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-white/70' : 'text-gray-600';
  const textMuted = isDark ? 'text-white/50' : 'text-gray-500';
  const hoverBg = isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50';
  const dividerColor = isDark ? 'divide-white/10' : 'divide-gray-200';

  return (
    <div className="space-y-6">
      {/* Available Rooms & Rates */}
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className={`animate-spin rounded-full h-10 w-10 border-4 ${isDark ? 'border-white/10 border-t-cyclades-turquoise' : 'border-gray-200 border-t-cyan-600'}`} />
          </div>
        ) : groupedRates.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
            <Bed className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
            <p className={`text-lg mb-2 ${textPrimary}`}>No rates available</p>
            <p className={`text-sm ${textMuted}`}>
              Rates are not available for your selected dates. Please try different dates.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedRates.map(({ mappedRoomId, roomName, rates }) => (
              <Card key={mappedRoomId} className={`overflow-hidden shadow-lg border ${cardBg}`}>
                {/* Room Header */}
                <div className={`px-5 py-4 border-b ${headerBg}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-cyclades-turquoise/20' : 'bg-cyan-100'}`}>
                        <Bed className={`w-5 h-5 ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`} />
                      </div>
                      <h3 className={`text-lg font-bold ${textPrimary}`}>{roomName}</h3>
                    </div>
                    <Badge variant="outline" className={`text-xs ${isDark ? 'border-white/20 text-white/70' : ''}`}>
                      {rates.length} option{rates.length > 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>

                {/* Rate Options */}
                <div className={`divide-y ${dividerColor}`}>
                  {rates.map((rate) => {
                    const price = rate.retailRate?.total?.[0];
                    const initialPrice = (rate.retailRate as any)?.initialPrice?.[0];
                    const isRefundable = rate.cancellationPolicies?.refundableTag === 'RFN';
                    const taxesAndFees = rate.retailRate?.taxesAndFees || [];
                    const boardInfo = getBoardInfo(rate.boardName, (rate as any).boardType || (rate as any).boardCode);
                    const BoardIcon = boardInfo.icon;
                    const isExpanded = expandedRates.has(rate.offerId);

                    // Get additional rate info
                    const maxOccupancy = (rate as any).maxOccupancy;
                    const remarks = (rate as any).remarks;
                    const perks = (rate as any).perks || [];
                    const paymentTypes = (rate as any).paymentTypes || [];
                    const cancelPolicies = rate.cancellationPolicies?.cancelPolicyInfos || [];

                    // Calculate if there's a discount
                    const hasDiscount = initialPrice && initialPrice.amount > (price?.amount || 0);
                    const discountPercent = hasDiscount
                      ? Math.round((1 - (price?.amount || 0) / initialPrice.amount) * 100)
                      : 0;

                    if (!price) return null;

                    return (
                      <div
                        key={rate.offerId}
                        className={`transition-colors ${hoverBg}`}
                      >
                        {/* Main Rate Row */}
                        <div className="p-5 flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
                          {/* Rate Details */}
                          <div className="flex-1 space-y-3">
                            {/* Top Row: Badges */}
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Discount Badge */}
                              {hasDiscount && discountPercent > 0 && (
                                <Badge className="bg-red-500 text-white border-0">
                                  -{discountPercent}% OFF
                                </Badge>
                              )}

                              {/* Refundable Badge */}
                              <Badge
                                variant={isRefundable ? 'default' : 'secondary'}
                                className={isRefundable
                                  ? 'bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30'
                                  : isDark
                                    ? 'bg-white/10 text-white/70 border-white/20'
                                    : 'bg-gray-100 text-gray-600'
                                }
                              >
                                {isRefundable ? (
                                  <><Check className="w-3 h-3 mr-1" /> Free Cancellation</>
                                ) : (
                                  <><X className="w-3 h-3 mr-1" /> Non-refundable</>
                                )}
                              </Badge>

                              {/* Board Type Badge */}
                              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${boardInfo.highlight
                                  ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                                  : (isDark ? 'bg-white/10' : 'bg-gray-100')
                                }`}>
                                <BoardIcon className={`w-3.5 h-3.5 ${boardInfo.color}`} />
                                <span className={boardInfo.highlight ? '' : textSecondary}>{boardInfo.label}</span>
                              </div>

                              {/* Max Occupancy */}
                              {maxOccupancy && (
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                  <Users className={`w-3.5 h-3.5 ${textMuted}`} />
                                  <span className={textSecondary}>Max {maxOccupancy} guests</span>
                                </div>
                              )}
                            </div>

                            {/* Perks */}
                            {perks.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {perks.map((perk: any, idx: number) => (
                                  <div key={idx} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                                    <Gift className="w-3 h-3" />
                                    {perk.name}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Cancellation Info */}
                            {isRefundable && cancelPolicies[0]?.cancelTime && (
                              <p className={`text-sm ${textMuted}`}>
                                Free cancellation until{' '}
                                <span className={isDark ? 'text-green-400 font-medium' : 'text-green-600 font-medium'}>
                                  {new Date(cancelPolicies[0].cancelTime).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              </p>
                            )}

                            {/* Tax Summary */}
                            {taxesAndFees.length > 0 && (
                              <div className={`text-xs ${textMuted}`}>
                                {taxesAndFees.every((t: any) => t.included) ? (
                                  <span className={isDark ? 'text-green-400' : 'text-green-600'}>✓ All taxes and fees included</span>
                                ) : (
                                  <span>
                                    + {getCurrencySymbol(price.currency)}
                                    {taxesAndFees.filter((t: any) => !t.included).reduce((sum: number, t: any) => sum + (t.amount || 0), 0).toFixed(2)}
                                    {' '}taxes/fees at property
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Expand Button for More Details */}
                            <button
                              onClick={() => toggleExpand(rate.offerId)}
                              className={`inline-flex items-center gap-1 text-xs font-medium ${isDark ? 'text-cyclades-turquoise hover:text-cyan-400' : 'text-cyan-600 hover:text-cyan-700'}`}
                            >
                              {isExpanded ? (
                                <>Less details <ChevronUp className="w-3 h-3" /></>
                              ) : (
                                <>More details <ChevronDown className="w-3 h-3" /></>
                              )}
                            </button>
                          </div>

                          {/* Price & Book Button */}
                          <div className="flex items-center gap-5">
                            <div className="text-right">
                              {/* Strikethrough Price if Discount */}
                              {hasDiscount && (
                                <div className={`text-sm line-through ${textMuted}`}>
                                  {getCurrencySymbol(initialPrice.currency)}{initialPrice.amount.toFixed(0)}
                                </div>
                              )}
                              <div className={`text-2xl font-bold ${isDark ? 'text-cyclades-turquoise' : 'text-cyan-600'}`}>
                                {getCurrencySymbol(price.currency)}{price.amount.toFixed(0)}
                              </div>
                              <div className={`text-sm ${textSecondary}`}>
                                {nights} {nights === 1 ? 'night' : 'nights'} total
                              </div>
                              {nights > 1 && (
                                <div className={`text-xs ${textMuted}`}>
                                  {getCurrencySymbol(price.currency)}{(price.amount / nights).toFixed(0)}/night
                                </div>
                              )}
                            </div>

                            <Button
                              onClick={() => onBookRate(rate)}
                              className={`px-6 py-5 text-sm font-semibold whitespace-nowrap ${isDark ? 'bg-cyclades-turquoise hover:bg-cyan-500' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-600 hover:to-cyan-600'} text-white shadow-lg hover:shadow-xl transition-all`}
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className={`px-5 pb-5 pt-0 space-y-4 ${isDark ? 'border-t border-white/5' : 'border-t border-gray-100'}`}>
                            {/* Remarks */}
                            {remarks && (
                              <div className={`p-3 rounded-lg text-sm ${isDark ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-50 text-blue-800'}`}>
                                <div className="flex items-start gap-2">
                                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                  <div dangerouslySetInnerHTML={{ __html: remarks }} />
                                </div>
                              </div>
                            )}

                            {/* Detailed Tax Breakdown */}
                            {taxesAndFees.length > 0 && (
                              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                <h4 className={`text-sm font-medium mb-2 ${textPrimary}`}>Taxes & Fees</h4>
                                <div className="space-y-1">
                                  {taxesAndFees.map((tax: any, idx: number) => (
                                    <div key={idx} className={`flex justify-between text-xs ${textSecondary}`}>
                                      <span>{tax.description || 'Tax'}</span>
                                      <span className={tax.included ? (isDark ? 'text-green-400' : 'text-green-600') : ''}>
                                        {tax.included ? 'Included' : `${getCurrencySymbol(tax.currency || price.currency)}${tax.amount?.toFixed(2) || '0.00'}`}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Cancellation Policy Details */}
                            {cancelPolicies.length > 0 && (
                              <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                <h4 className={`text-sm font-medium mb-2 ${textPrimary}`}>Cancellation Policy</h4>
                                <div className="space-y-1">
                                  {cancelPolicies.map((policy: any, idx: number) => (
                                    <div key={idx} className={`text-xs ${textSecondary}`}>
                                      {policy.amount === 0 ? (
                                        <span className={isDark ? 'text-green-400' : 'text-green-600'}>
                                          Free cancellation until {new Date(policy.cancelTime).toLocaleDateString()}
                                        </span>
                                      ) : (
                                        <>
                                          After {new Date(policy.cancelTime).toLocaleDateString()}: {getCurrencySymbol(policy.currency)}{policy.amount} {policy.type === 'percentage' ? '%' : ''} fee
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Payment Types */}
                            {paymentTypes.length > 0 && (
                              <div className={`text-xs ${textMuted}`}>
                                Payment options: {paymentTypes.join(', ')}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
