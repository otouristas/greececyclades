const fs = require('fs');
const path = require('path');

// Directory to search
const pagesDir = path.join(__dirname, 'src', 'pages');

// Output file
const outputFile = path.join(__dirname, 'seo_meta_data.csv');

// Function to extract SEO data from file content
function extractSeoData(content, fileName) {
  const pageName = path.basename(fileName, '.tsx');
  let title = null;
  let description = null;

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
  // Get all TSX files in the pages directory
  const files = fs.readdirSync(pagesDir)
    .filter(file => file.endsWith('.tsx'))
    .map(file => path.join(pagesDir, file));
  
  const results = [];
  
  // Process each file
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const data = extractSeoData(content, file);
      if (data) {
        results.push(data);
      }
    } catch (err) {
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
}

main();
