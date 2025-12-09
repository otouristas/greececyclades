import { Calendar, CheckCircle } from 'lucide-react';

interface LastUpdatedProps {
  date: string;
  variant?: 'inline' | 'badge' | 'card';
  showVerified?: boolean;
}

export default function LastUpdated({ 
  date, 
  variant = 'inline',
  showVerified = true 
}: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (variant === 'badge') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
        <Calendar className="w-4 h-4" />
        <span>Updated {formattedDate}</span>
        {showVerified && <CheckCircle className="w-4 h-4" />}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-white/60">Last updated</p>
          <p className="font-semibold text-gray-900 dark:text-white">{formattedDate}</p>
        </div>
        {showVerified && (
          <div className="ml-auto flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Verified</span>
          </div>
        )}
      </div>
    );
  }

  // Default inline variant
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-white/60">
      <Calendar className="w-4 h-4" />
      <span>Last updated: {formattedDate}</span>
      {showVerified && (
        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
      )}
    </span>
  );
}
