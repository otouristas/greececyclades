# Supabase Accommodation Table Setup Instructions

Follow these steps to set up the accommodation table in your Supabase project:

## 1. Log in to Supabase Dashboard

Go to [https://app.supabase.io/](https://app.supabase.io/) and log in to your account.

## 2. Select Your Project

Select the project with URL: `https://oxzbzhpcycygegnpckum.supabase.co`

## 3. Open SQL Editor

In the left sidebar, click on "SQL Editor".

## 4. Create the Accommodation Table Structure

Click on the "+" button to create a new query and paste the following SQL to create the table structure:

```sql
-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create accommodation table if it doesn't exist
CREATE TABLE IF NOT EXISTS accommodation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  island_id TEXT NOT NULL,
  location JSONB NOT NULL,
  category TEXT NOT NULL,
  star_rating INTEGER NOT NULL,
  price_range JSONB NOT NULL,
  featured BOOLEAN DEFAULT false,
  images JSONB NOT NULL,
  address TEXT NOT NULL,
  amenities TEXT[] NOT NULL,
  room_types JSONB[] NOT NULL,
  rating NUMERIC(3,1) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7)
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS accommodation_slug_idx ON accommodation (slug);

-- Create index on island_id for faster filtering
CREATE INDEX IF NOT EXISTS accommodation_island_id_idx ON accommodation (island_id);

-- Create index on featured for faster featured accommodation queries
CREATE INDEX IF NOT EXISTS accommodation_featured_idx ON accommodation (featured);
```

Click the "Run" button to execute this query.

## 5. Insert Sample Accommodation Data

Create another new query by clicking the "+" button and paste the contents of the `insert_accommodation_data.sql` file. Then click "Run" to insert the sample data.

## 6. Set up Row Level Security (RLS)

By default, Supabase tables are protected by Row Level Security. For the accommodation table, we need to allow public read access:

```sql
-- Enable row level security
ALTER TABLE accommodation ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access for accommodations"
  ON accommodation
  FOR SELECT
  TO public
  USING (true);
```

Click "Run" to apply these security settings.

## 7. Verify the Table

After running the scripts:
1. Go to "Table Editor" in the left sidebar
2. You should see an "accommodation" table
3. Click on it to verify that the sample data has been inserted correctly

## 8. Test the Connection

Once the table is created, you can run the test script in the project:

```
node src/utils/display_accommodations.js
```

This should now successfully connect to the accommodation table and retrieve data.

## Troubleshooting

If you encounter any issues:
1. Check that you're using the correct Supabase URL and anon key in the .env file
2. Ensure the SQL script executed without errors
3. Verify that the accommodation table was created in the Table Editor
4. Check the RLS (Row Level Security) settings to ensure public access is allowed for the accommodation table
