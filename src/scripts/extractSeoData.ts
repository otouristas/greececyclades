import * as fs from 'fs';
import * as path from 'path';

// Directory to search
const pagesDir = path.join(__dirname, '..', 'pages');

// Output file
const outputFile = path.join(__dirname, '..', '..', 'seo_meta_data.csv');

// Function to extract SEO data from file content
function extractSeoData(content: string, fileName: string) {
  const pageName = path.basename(fileName, '.tsx');
  let title: string | null = null;
  let description: string | null = null;

  // Look for SEO component with direct props
  const seoTitleMatch = content.match(/title=["']([^"']+)["']/);
  const seoDescMatch = content.match(/description=["']([^"']+)["']/);
  
  if (seoTitleMatch) {
    title = seoTitleMatch[1];
  }
  
  if (seoDescMatch) {
    description = seoDescMatch[1];
  }

  // Look for seoData object (used in island guides)
  if (!title || !description) {
    const seoDataMatch = content.match(/seoData\s*=\s*{[^}]*title:\s*["']([^"']+)["'][^}]*description:\s*["']([^"']+)["']/s);
    if (seoDataMatch) {
      title = title || seoDataMatch[1];
      description = description || seoDataMatch[2];
    }
  }

  // Look for generateMyTripsSEO and similar functions
  if (!title || !description) {
    if (content.includes('generateMyTripsSEO()')) {
      // Check if we can find the function definition
      const funcMatch = content.match(/generateMyTripsSEO[^{]*{[^}]*title:[^,]*["']([^"']+)["'][^}]*description:[^,]*["']([^"']+)["']/s);
      if (funcMatch) {
        title = title || funcMatch[1];
        description = description || funcMatch[2];
      } else {
        // Hardcode known values for specific pages
        if (pageName === 'MyTrips') {
          title = title || 'My Trips | Greece Cyclades';
          description = description || 'View and manage your saved trips to the Cyclades islands of Greece.';
        }
      }
    }
  }

  if (title && description) {
    return {
      page: pageName,
      title: title,
      description: description
    };
  }
  
  return null;
}

// Main function
function main() {
  try {
    // Get all TSX files in the pages directory
    const files = fs.readdirSync(pagesDir)
      .filter(file => file.endsWith('.tsx'))
      .map(file => path.join(pagesDir, file));
    
    const results: Array<{page: string, title: string, description: string}> = [];
    
    // Process each file
    files.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const data = extractSeoData(content, file);
        if (data) {
          results.push(data);
        } else {
          console.log(`No SEO data found for ${path.basename(file)}`);
        }
      } catch (err: any) {
        console.error(`Error processing ${file}:`, err.message);
      }
    });
    
    // Create CSV content
    const csvHeader = 'Page,Meta Title,Meta Description\n';
    const csvRows = results.map(data => 
      `${data.page},"${data.title.replace(/"/g, '""')}","${data.description.replace(/"/g, '""')}"`
    );
    
    const csvContent = csvHeader + csvRows.join('\n');
    
    // Write to file
    fs.writeFileSync(outputFile, csvContent, 'utf8');
    
    console.log(`SEO data extracted to ${outputFile}`);
    console.log(`Found ${results.length} pages with SEO data`);
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main();
