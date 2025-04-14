import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Create a Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read the SQL file
const sqlFilePath = path.join(__dirname, 'create_hotels_table.sql');
const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

async function runSqlQuery() {
  try {
    console.log('Running hotels SQL script...');
    const { data, error } = await supabase.rpc('exec_sql', { query: sqlQuery });
    
    if (error) {
      console.error('Error executing SQL:', error);
      return;
    }
    
    console.log('Hotels table created and populated successfully!');
    console.log('Result:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

runSqlQuery();
