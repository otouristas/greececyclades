import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactNode;
}

interface ToastState extends ToastProps {
  id: string;
}

let toasts: ToastState[] = [];
let listeners: ((toasts: ToastState[]) => void)[] = [];

const addToast = (toast: ToastProps) => {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { ...toast, id }];
  listeners.forEach(listener => listener(toasts));
  setTimeout(() => {
    removeToast(id);
  }, 5000);
};

const removeToast = (id: string) => {
  toasts = toasts.filter(t => t.id !== id);
  listeners.forEach(listener => listener(toasts));
};

export function useToasts() {
  const [currentToasts, setCurrentToasts] = useState<ToastState[]>(toasts);

  useEffect(() => {
    listeners.push(setCurrentToasts);
    return () => {
      listeners = listeners.filter(l => l !== setCurrentToasts);
    };
  }, []);

  return currentToasts;
}

export function ToastContainer() {
  const toasts = useToasts();

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-lg shadow-lg p-4 min-w-[300px] ${
              toast.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{toast.title}</h3>
                {toast.description && (
                  <p className={`text-sm ${toast.variant === 'destructive' ? 'text-red-100' : 'text-gray-500'}`}>
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className={`p-1 rounded-full hover:bg-black/10 ${
                  toast.variant === 'destructive' ? 'text-white' : 'text-gray-500'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {toast.action && (
              <div className="mt-2">
                {toast.action}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export const toast = addToast;
