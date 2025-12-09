
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { addDays, format, isSameDay, isBefore, isAfter, isWithinInterval } from 'date-fns';

// Define types for availability data
type AvailabilityStatus = 'available' | 'booked' | 'unavailable';

export interface DateAvailability {
  date: Date;
  status: AvailabilityStatus;
}

interface AvailabilityProps {
  availability: DateAvailability[];
  className?: string;
}

const HotelAvailabilityCalendar: React.FC<AvailabilityProps> = ({ 
  availability,
  className 
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Function to determine if a date is booked
  const isBooked = (date: Date): boolean => {
    return availability.some(
      item => item.status === 'booked' && isSameDay(new Date(item.date), date)
    );
  };

  // Function to determine if a date is available
  const isAvailable = (date: Date): boolean => {
    return availability.some(
      item => item.status === 'available' && isSameDay(new Date(item.date), date)
    );
  };

  // Function to determine if a date is unavailable
  const isUnavailable = (date: Date): boolean => {
    return availability.some(
      item => item.status === 'unavailable' && isSameDay(new Date(item.date), date)
    );
  };

  // Custom rendering for days
  const modifiersClassNames = {
    booked: 'bg-red-100 text-red-800 hover:bg-red-200',
    available: 'bg-green-100 text-green-800 hover:bg-green-200',
    unavailable: 'bg-gray-100 text-gray-500',
    past: 'opacity-50 cursor-not-allowed',
  };

  // Check if date is in the past
  const isPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isBefore(date, today);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <Calendar
          mode="default"
          onMonthChange={setCurrentMonth}
          className="pointer-events-auto"
          classNames={{
            day_today: "bg-sifnos-turquoise/10 text-sifnos-deep-blue font-semibold",
            day_selected: "bg-sifnos-turquoise text-white hover:bg-sifnos-turquoise hover:text-white",
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          }}
          modifiers={{
            booked: (date) => isBooked(date),
            available: (date) => isAvailable(date),
            unavailable: (date) => isUnavailable(date),
            past: (date) => isPast(date),
          }}
          modifiersClassNames={modifiersClassNames}
          selected={[]}
          disabled={[{ before: new Date() }]}
          numberOfMonths={2}
        />
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded bg-green-100"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded bg-red-100"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded bg-gray-100"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default HotelAvailabilityCalendar;
