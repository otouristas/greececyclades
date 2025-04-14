// Script to execute the fix for agencies table SQL in Supabase
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name properly in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runFixAgenciesSql() {
  try {
    console.log('Reading SQL fix file...');
    const sqlFilePath = path.resolve(__dirname, 'fix_agencies_table.sql');
    console.log('SQL file path:', sqlFilePath);
    
    if (!fs.existsSync(sqlFilePath)) {
      console.error('SQL file not found at path:', sqlFilePath);
      process.exit(1);
    }
    
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log('SQL content loaded, length:', sqlContent.length);
    
    console.log('Executing SQL to fix agencies table...');
    
    // Split the SQL into separate statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement using a direct query
    for (const [index, stmt] of statements.entries()) {
      console.log(`Executing statement ${index + 1}/${statements.length}`);
      
      try {
        // Use raw SQL query since we can't use RPC
        const { error } = await supabase.rpc('exec_sql', { sql: stmt });
        
        if (error) {
          console.error(`Error executing statement ${index + 1}:`, error);
          
          // Try direct query as fallback
          try {
            // This is a workaround - we'll query the agencies table to see if our changes took effect
            const { data: checkData, error: checkError } = await supabase
              .from('agencies')
              .select('rating, reviews_count')
              .limit(1);
              
            if (checkError) {
              console.error('Error checking agencies table:', checkError);
            } else {
              console.log('Current agencies table structure:', checkData);
            }
          } catch (directError) {
            console.error('Error with direct query:', directError);
          }
        }
      } catch (stmtExecError) {
        console.error(`Failed to execute statement ${index + 1}:`, stmtExecError);
      }
    }
    
    // Check if the agencies table has the required columns
    console.log('Checking if agencies table has the required columns...');
    const { data, error: queryError } = await supabase
      .from('agencies')
      .select('rating, reviews_count')
      .limit(1);
    
    if (queryError) {
      console.error('Error querying agencies table:', queryError);
      console.log('You may need to manually fix the agencies table in Supabase.');
      
      // Provide instructions for manual table fix
      console.log('\nTo manually fix the agencies table:');
      console.log('1. Go to your Supabase project dashboard');
      console.log('2. Navigate to the SQL Editor');
      console.log('3. Copy and paste the contents of fix_agencies_table.sql');
      console.log('4. Execute the SQL');
    } else {
      console.log('Agencies table structure:', data);
      console.log('Fix completed successfully!');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Execute the function
runFixAgenciesSql()
  .then(() => console.log('Done!'))
  .catch(err => console.error('Error:', err));
