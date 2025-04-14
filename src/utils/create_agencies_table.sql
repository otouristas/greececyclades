-- Create agencies table
CREATE TABLE IF NOT EXISTS agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  islands TEXT[] DEFAULT '{}',
  services TEXT[] DEFAULT '{}',
  rating NUMERIC(3,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0
);

-- Insert sample data
INSERT INTO agencies (name, description, logo, website, phone, email, address, islands, services, rating, reviews_count)
VALUES 
  (
    'Cyclades Car Rentals',
    'Premium car rental service with locations on multiple Cyclades islands. We offer a wide range of vehicles from economy to luxury.',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwcmVudGFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://www.cycladescarrentals.com',
    '+30 22850 24888',
    'info@cycladescarrentals.com',
    'Main Street, Mykonos Town, 84600',
    ARRAY['Mykonos', 'Santorini', 'Paros', 'Naxos'],
    ARRAY['Car Rental', 'Airport Pickup', 'Insurance', '24/7 Support'],
    4.8,
    245
  ),
  (
    'Island Wheels',
    'Local car rental company specializing in small, fuel-efficient vehicles perfect for navigating narrow island roads.',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhciUyMHJlbnRhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://www.islandwheels.gr',
    '+30 22860 23777',
    'rentals@islandwheels.gr',
    'Port Area, Paros, 84400',
    ARRAY['Paros', 'Antiparos'],
    ARRAY['Car Rental', 'Scooter Rental', 'Free Delivery'],
    4.5,
    189
  ),
  (
    'Blue Aegean Rentals',
    'Family-owned business with over 20 years of experience providing quality vehicles at competitive prices.',
    'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMHJlbnRhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://www.blueaegeanrentals.com',
    '+30 22850 25999',
    'contact@blueaegeanrentals.com',
    'Fira, Santorini, 84700',
    ARRAY['Santorini', 'Ios'],
    ARRAY['Car Rental', 'Luxury Vehicles', 'Wedding Cars', 'Long-term Rental'],
    4.7,
    312
  ),
  (
    'Greek Island Motors',
    'Offering a diverse fleet of vehicles from compact cars to luxury SUVs. Multiple pickup locations across the islands.',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://www.greekislandmotors.com',
    '+30 22840 28555',
    'info@greekislandmotors.com',
    'Naxos Town, Naxos, 84300',
    ARRAY['Naxos', 'Paros', 'Mykonos', 'Santorini', 'Milos'],
    ARRAY['Car Rental', 'Airport Transfer', 'GPS Navigation', 'Child Seats'],
    4.6,
    278
  ),
  (
    'Cyclades Auto',
    'Budget-friendly car rental options with transparent pricing and no hidden fees. Perfect for travelers on a budget.',
    'https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://www.cycladesauto.gr',
    '+30 22870 22333',
    'rentals@cycladesauto.gr',
    'Port Area, Milos, 84800',
    ARRAY['Milos', 'Kimolos'],
    ARRAY['Car Rental', 'Scooter Rental', 'ATV Rental', 'Budget Options'],
    4.3,
    156
  ),
  (
    'Luxury Island Cars',
    'Premium car rental service specializing in luxury and sports cars for those seeking a high-end island experience.',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGx1eHVyeSUyMGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://www.luxuryislandcars.com',
    '+30 22890 27777',
    'vip@luxuryislandcars.com',
    'Mykonos Town, Mykonos, 84600',
    ARRAY['Mykonos', 'Santorini'],
    ARRAY['Luxury Car Rental', 'Chauffeur Service', 'VIP Experience', 'Yacht Transfer'],
    4.9,
    98
  )
ON CONFLICT (id) DO NOTHING;
