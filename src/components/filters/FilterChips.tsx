import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export interface FilterChip {
  id: string;
  label: string;
  value: string | number;
  category?: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export default function FilterChips({
  chips,
  onRemove,
  onClearAll,
  className = ''
}: FilterChipsProps) {
  if (chips.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {chips.map((chip) => (
        <motion.button
          key={chip.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => onRemove(chip.id)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
        >
          <span>{chip.label}</span>
          <X className="h-3.5 w-3.5" />
        </motion.button>
      ))}
      {onClearAll && chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

