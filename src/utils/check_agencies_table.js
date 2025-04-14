// Script to check if the agencies table exists and has the correct structure
import { supabase } from '../lib/supabase';

async function checkAgenciesTable() {
  console.log('Checking agencies table...');
  
  try {
    // Check if the table exists by querying it
    const { data, error } = await supabase
      .from('agencies')
      .select('count()')
      .limit(1);
    
    if (error) {
      console.error('Error checking agencies table:', error);
      return false;
    }
    
    console.log('Agencies table exists with count result:', data);
    
    // Get table structure
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_info', { table_name: 'agencies' });
    
    if (tableError) {
      console.error('Error getting table info:', tableError);
      // This might fail if the RPC function doesn't exist, which is fine
    } else {
      console.log('Table structure:', tableInfo);
    }
    
    // Try to get a single row to check the structure
    const { data: sampleRow, error: sampleError } = await supabase
      .from('agencies')
      .select('*')
      .limit(1)
      .single();
    
    if (sampleError) {
      console.error('Error getting sample row:', sampleError);
    } else {
      console.log('Sample row structure:', sampleRow);
    }
    
    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Execute the check
checkAgenciesTable()
  .then(exists => {
    console.log('Agencies table check complete. Table exists:', exists);
  })
  .catch(err => {
    console.error('Error running check:', err);
  });
