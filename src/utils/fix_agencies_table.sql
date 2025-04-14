-- Fix agencies table structure by adding missing columns
-- This script is idempotent and can be run multiple times

-- Add rating column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'agencies' AND column_name = 'rating') THEN
        ALTER TABLE agencies ADD COLUMN rating NUMERIC(3,1) DEFAULT 0;
    END IF;
END $$;

-- Add reviews_count column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'agencies' AND column_name = 'reviews_count') THEN
        ALTER TABLE agencies ADD COLUMN reviews_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Update sample data with ratings if they don't have them
UPDATE agencies 
SET rating = 4.8, reviews_count = 245
WHERE name = 'Cyclades Car Rentals' AND (rating IS NULL OR rating = 0);

UPDATE agencies 
SET rating = 4.5, reviews_count = 189
WHERE name = 'Island Wheels' AND (rating IS NULL OR rating = 0);

UPDATE agencies 
SET rating = 4.7, reviews_count = 312
WHERE name = 'Blue Aegean Rentals' AND (rating IS NULL OR rating = 0);

UPDATE agencies 
SET rating = 4.6, reviews_count = 278
WHERE name = 'Greek Island Motors' AND (rating IS NULL OR rating = 0);

UPDATE agencies 
SET rating = 4.3, reviews_count = 156
WHERE name = 'Cyclades Auto' AND (rating IS NULL OR rating = 0);
