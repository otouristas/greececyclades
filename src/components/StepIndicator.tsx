import { motion } from 'framer-motion';
import { Calendar, Sun, Waves, Compass } from 'lucide-react';
import clsx from 'clsx';

interface StepIndicatorProps {
  currentStep: number;
  steps: Array<{
    icon: typeof Calendar;
    label: string;
  }>;
}

const steps = [
  { icon: Calendar, label: 'Duration' },
  { icon: Sun, label: 'Month' },
  { icon: Waves, label: 'Vibes' },
  { icon: Compass, label: 'Plan' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center mb-8 relative">
      {/* Progress Line */}
      <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Steps */}
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index + 1 < currentStep;
        const isCurrent = index + 1 === currentStep;

        return (
          <motion.div
            key={index}
            className="relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                  {
                    'bg-blue-500 text-white': isCurrent,
                    'bg-green-500 text-white': isCompleted,
                    'bg-gray-200 text-gray-500': !isCurrent && !isCompleted,
                  }
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span
                className={clsx('mt-2 text-sm font-medium transition-colors', {
                  'text-blue-500': isCurrent,
                  'text-green-500': isCompleted,
                  'text-gray-500': !isCurrent && !isCompleted,
                })}
              >
                {step.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
