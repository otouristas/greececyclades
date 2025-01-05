import { Bell } from 'lucide-react';

interface PriceAlertProps {
  onSubscribe: () => void;
}

export default function PriceAlert({ onSubscribe }: PriceAlertProps) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Get notified when prices drop
            </p>
            <p className="text-sm text-blue-700">
              We'll email you when the best time to book
            </p>
          </div>
        </div>
        <button
          onClick={onSubscribe}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Set Alert
        </button>
      </div>
    </div>
  );
}
