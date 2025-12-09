
import React, { useState, useEffect } from 'react';

interface HotelLogoProps {
  hotel: any;
  hotelLogoUrl: string | null;
  position: 'corner' | 'inline';
}

const HotelLogo = ({ hotel, hotelLogoUrl, position }: HotelLogoProps) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [retries, setRetries] = useState(0);
  
  if (!hotelLogoUrl) return null;

  useEffect(() => {
    // Reset states when logo URL changes
    if (hotelLogoUrl) {
      setLogoError(false);
      setLogoLoaded(false);
      setRetries(0); // Reset retries counter when URL changes
    }
  }, [hotelLogoUrl]);

  const handleLogoLoad = () => {
    setLogoLoaded(true);
    setLogoError(false);
    if (position === 'corner') {
      console.log(`Logo loaded successfully for ${hotel.name}: ${hotelLogoUrl}`);
    }
  };

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load ${position} logo for ${hotel.name}: ${hotelLogoUrl}`);
    
    // Special handling for Villa Olivia Clara logo
    if (hotel.name === "Villa Olivia Clara") {
      // Use the correct direct path without any conditionals
      console.log(`Forcing direct path for Villa Olivia Clara logo`);
      const timestamp = Date.now();
      const randomValue = Math.floor(Math.random() * 1000);
      // Use the absolute direct path that we know works
      e.currentTarget.src = `/uploads/hotels/villa-olivia-clara/logo-villa-olivia.png?v=${timestamp}-${randomValue}`;
      setRetries(prevRetries => prevRetries + 1);
      return;
    }
    
    // Retry with a new cache buster if we haven't exceeded retry attempts
    if (retries < 2) {
      console.log(`Retrying logo load for ${hotel.name}, attempt ${retries + 1}`);
      const timestamp = Date.now();
      const randomValue = Math.floor(Math.random() * 1000);
      
      // Extract the base URL without cache busters
      let baseUrl = hotelLogoUrl;
      if (baseUrl.includes('?')) {
        baseUrl = baseUrl.split('?')[0];
      }
      
      e.currentTarget.src = `${baseUrl}?v=${timestamp}-${randomValue}`;
      setRetries(prevRetries => prevRetries + 1);
    } else {
      setLogoError(true);
      e.currentTarget.style.display = 'none';
    }
  };

  if (position === 'corner') {
    return (
      <div className="absolute top-2 right-2 bg-white/90 p-1 rounded-md shadow-sm">
        <img 
          key={`hotel-big-logo-${hotel.id}-${Date.now()}`}
          src={hotel.name === "Villa Olivia Clara" ? 
               `/uploads/hotels/villa-olivia-clara/logo-villa-olivia.png?v=${Date.now()}-${Math.floor(Math.random() * 1000)}` : 
               hotelLogoUrl}
          alt={`${hotel.name} logo`} 
          className={`h-8 w-auto max-w-[80px] object-contain ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLogoLoad}
          onError={handleLogoError}
          style={logoError ? { display: 'none' } : undefined}
        />
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-7 h-7 bg-white rounded-full p-0.5 shadow-sm border border-gray-100 overflow-hidden">
      <img 
        key={`hotel-small-logo-${hotel.id}-${Date.now()}`}
        src={hotel.name === "Villa Olivia Clara" ? 
             `/uploads/hotels/villa-olivia-clara/logo-villa-olivia.png?v=${Date.now()}-${Math.floor(Math.random() * 1000)}` : 
             hotelLogoUrl}
        alt={`${hotel.name} logo`}
        className={`w-full h-full object-contain ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLogoLoad}
        onError={handleLogoError}
        style={logoError ? { display: 'none' } : undefined}
      />
    </div>
  );
};

export default HotelLogo;
