import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  id: string;
  title: string;
  description?: string;
  component: React.ReactNode;
  validation?: () => boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (data: Record<string, any>) => void;
  onCancel?: () => void;
  className?: string;
  showProgress?: boolean;
  autoSave?: boolean;
  storageKey?: string;
}

export default function MultiStepForm({
  steps,
  onComplete,
  onCancel,
  className = '',
  showProgress = true,
  autoSave = true,
  storageKey = 'multistep_form_data'
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Load saved data
  useEffect(() => {
    if (autoSave && storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData(parsed.data || {});
          setCurrentStep(parsed.step || 0);
        } catch (e) {
          console.error('Failed to load saved form data:', e);
        }
      }
    }
  }, [autoSave, storageKey]);

  // Auto-save form data
  useEffect(() => {
    if (autoSave && storageKey) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ data: formData, step: currentStep })
      );
    }
  }, [formData, currentStep, autoSave, storageKey]);

  const updateFormData = (updates: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const validateStep = (stepIndex: number): boolean => {
    const step = steps[stepIndex];
    if (step.validation) {
      return step.validation();
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (autoSave && storageKey) {
      localStorage.removeItem(storageKey);
    }
    onComplete(formData);
  };

  const handleCancel = () => {
    if (autoSave && storageKey) {
      localStorage.removeItem(storageKey);
    }
    if (onCancel) {
      onCancel();
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Progress Indicator */}
      {showProgress && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      index < currentStep
                        ? 'bg-green-500 text-white'
                        : index === currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p
                    className={`mt-2 text-xs font-medium ${
                      index === currentStep ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-colors ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {steps[currentStep].title}
              </h2>
              {steps[currentStep].description && (
                <p className="text-gray-600 mt-2">
                  {steps[currentStep].description}
                </p>
              )}
            </div>

            <div className="min-h-[300px]">
              {typeof steps[currentStep].component === 'function'
                ? steps[currentStep].component({ formData, updateFormData })
                : steps[currentStep].component}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 border-t border-gray-200 flex items-center justify-between">
        <div>
          {!isFirstStep && (
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
          )}
          {onCancel && (
            <button
              onClick={handleCancel}
              className="ml-4 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {isLastStep ? 'Complete' : 'Next'}
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}


