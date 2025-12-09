
import React from 'react';
import HotelAvailabilityCalendar from './HotelAvailabilityCalendar';
import { addDays } from 'date-fns';

// Generate mock availability data based on Airbnb listing
const generateMockAvailability = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const availability = [];
  
  // Generate data for the next 90 days
  for (let i = 0; i < 90; i++) {
    const date = addDays(today, i);
    
    // Mock data patterns based on Airbnb listing
    // Summer months (June-August) are mostly booked
    const summerMonth = date.getMonth() >= 5 && date.getMonth() <= 7;
    const isWeekend = date.getDay() === 5 || date.getDay() === 6;
    
    let status = 'available';
    
    // Summer weekends are likely to be booked
    if (summerMonth && isWeekend) {
      status = Math.random() > 0.3 ? 'booked' : 'available';
    }
    // Some random bookings throughout
    else if (Math.random() > 0.8) {
      status = 'booked';
    }
    // Block out certain dates as unavailable (maintenance, etc)
    else if (Math.random() > 0.95) {
      status = 'unavailable';
    }
    
    availability.push({
      date,
      status
    });
  }
  
  // Add specific booked periods (5-7 days) to simulate actual bookings
  // First booking block - around early June
  const earlyJune = new Date(today.getFullYear(), 5, 5);
  for (let i = 0; i < 6; i++) {
    const bookingDate = addDays(earlyJune, i);
    const existingIndex = availability.findIndex(item => 
      item.date.getTime() === new Date(bookingDate).setHours(0, 0, 0, 0)
    );
    if (existingIndex !== -1) {
      availability[existingIndex].status = 'booked';
    }
  }
  
  // Second booking block - mid July
  const midJuly = new Date(today.getFullYear(), 6, 15);
  for (let i = 0; i < 7; i++) {
    const bookingDate = addDays(midJuly, i);
    const existingIndex = availability.findIndex(item => 
      item.date.getTime() === new Date(bookingDate).setHours(0, 0, 0, 0)
    );
    if (existingIndex !== -1) {
      availability[existingIndex].status = 'booked';
    }
  }
  
  return availability;
};

const VillaOliviaAvailability = () => {
  const mockAvailability = generateMockAvailability();
  
  return (
    <div className="cycladic-card p-6 md:p-8">
      <h2 className="text-2xl font-montserrat font-semibold mb-5">Availability Calendar</h2>
      <p className="mb-4 text-gray-700">Check availability for Villa Olivia Clara. Dates marked in red are already booked.</p>
      
      <HotelAvailabilityCalendar availability={mockAvailability} />
      
      <div className="mt-6 bg-sifnos-turquoise/10 p-4 rounded-lg">
        <p className="text-sm text-sifnos-deep-blue">
          <strong>Note:</strong> This is a visual representation of availability. To make a booking request, please use the contact form or booking button above.
        </p>
      </div>
    </div>
  );
};

export default VillaOliviaAvailability;
