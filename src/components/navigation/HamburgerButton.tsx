import React from 'react';
import { motion } from 'framer-motion';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative z-50 w-10 h-10 focus:outline-none"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-5">
        <motion.span
          initial={false}
          animate={{
            top: isOpen ? '50%' : '0%',
            rotate: isOpen ? '45deg' : '0deg',
            translateY: isOpen ? '-50%' : '0%'
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 w-6 h-0.5 bg-gray-900 transform origin-center"
        />
        <motion.span
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            translateY: '-50%'
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-1/2 w-6 h-0.5 bg-gray-900 transform"
        />
        <motion.span
          initial={false}
          animate={{
            bottom: isOpen ? '50%' : '0%',
            rotate: isOpen ? '-45deg' : '0deg',
            translateY: isOpen ? '50%' : '0%'
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 bottom-0 w-6 h-0.5 bg-gray-900 transform origin-center"
        />
      </div>
    </button>
  );
}