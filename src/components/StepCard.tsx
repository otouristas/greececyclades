import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: React.ReactNode;
  step?: number;
  currentStep?: number;
  onClick?: () => void;
}

export default function StepCard({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  step, 
  currentStep, 
  onClick 
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={clsx(
        "bg-white rounded-xl p-6 shadow-lg",
        onClick && "cursor-pointer hover:shadow-xl transition-shadow"
      )}
      onClick={onClick}
    >
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className="w-full h-full bg-blue-500 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              {step && (
                <span className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step === currentStep ? "bg-blue-500 text-white" : "bg-gray-100"
                )}>
                  {step}
                </span>
              )}
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Icon className="w-6 h-6 text-blue-500" />
                {title}
              </h2>
            </div>
          </div>
          {description && (
            <p className="text-gray-600 mb-6">{description}</p>
          )}
          {children}
        </div>
      </div>
    </motion.div>
  );
}
