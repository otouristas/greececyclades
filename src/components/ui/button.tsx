import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary-500 text-white hover:bg-primary-600': variant === 'default',
            'border border-secondary-300 bg-transparent hover:bg-secondary-100': variant === 'outline',
            'bg-red-500 text-white hover:bg-red-600': variant === 'destructive',
            'h-9 px-4 py-2 text-sm': size === 'default',
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-8 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
