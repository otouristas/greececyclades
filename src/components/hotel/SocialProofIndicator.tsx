import { Users, TrendingUp, Clock } from 'lucide-react';

interface SocialProofIndicatorProps {
  viewersCount?: number;
  bookingsToday?: number;
  lastBooked?: string; // e.g., "2 hours ago"
  popularWith?: string; // e.g., "honeymooners"
  className?: string;
}

export function SocialProofIndicator({
  viewersCount,
  bookingsToday,
  lastBooked,
  popularWith,
  className = ''
}: SocialProofIndicatorProps) {
  const indicators = [];

  if (viewersCount !== undefined && viewersCount > 0) {
    indicators.push({
      icon: Users,
      text: `${viewersCount} people viewing`,
      color: 'text-blue-600'
    });
  }

  if (bookingsToday !== undefined && bookingsToday > 0) {
    indicators.push({
      icon: TrendingUp,
      text: `Booked ${bookingsToday} time${bookingsToday > 1 ? 's' : ''} today`,
      color: 'text-green-600'
    });
  }

  if (lastBooked) {
    indicators.push({
      icon: Clock,
      text: `Last booked ${lastBooked}`,
      color: 'text-orange-600'
    });
  }

  if (popularWith) {
    indicators.push({
      icon: TrendingUp,
      text: `Popular with ${popularWith}`,
      color: 'text-purple-600'
    });
  }

  if (indicators.length === 0) return null;

  // Show only the first indicator for cleaner UI
  const indicator = indicators[0];
  const Icon = indicator.icon;

  return (
    <div className={`flex items-center gap-1.5 text-xs ${indicator.color} ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{indicator.text}</span>
    </div>
  );
}

