const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to extract SEO data from a file
function extractSeoData(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Try to find SEO component with title and description
    const seoRegex = /<SEO[^>]*title=["']([^"']+)["'][^>]*description=["']([^"']+)["'][^>]*\/?>/;
    const seoMatch = content.match(seoRegex);
    
    // Try to find seoData object for island guides
    const seoDataRegex = /const\s+seoData\s*=\s*{[^}]*title:\s*["']([^"']+)["'][^}]*description:\s*["']([^"']+)["'][^}]*}/s;
    const seoDataMatch = content.match(seoDataRegex);
    
    // Try to find direct SEO props
    const titleRegex = /<SEO[^>]*\s+title=["']([^"']+)["']/;
    const descriptionRegex = /<SEO[^>]*\s+description=["']([^"']+)["']/;
    
    const titleMatch = content.match(titleRegex);
    const descriptionMatch = content.match(descriptionRegex);
    
    // Get the page name from the file path
    const pageName = path.basename(filePath, path.extname(filePath));
    
    if (seoMatch) {
      return {
        page: pageName,
        title: seoMatch[1],
        description: seoMatch[2]
      };
    } else if (seoDataMatch) {
      return {
        page: pageName,
        title: seoDataMatch[1],
        description: seoDataMatch[2]
      };
    } else if (titleMatch && descriptionMatch) {
      return {
        page: pageName,
        title: titleMatch[1],
        description: descriptionMatch[1]
      };
    } else {
      // Try one more approach for multiline SEO components
      const lines = content.split('\n');
      let title = '';
      let description = '';
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('<SEO') || lines[i].includes('seoData')) {
          // Look for title in next few lines
          for (let j = i; j < i + 10 && j < lines.length; j++) {
            const titleLine = lines[j].match(/title=["']([^"']+)["']/);
            if (titleLine) {
              title = titleLine[1];
              break;
            }
          }
          
          // Look for description in next few lines
          for (let j = i; j < i + 10 && j < lines.length; j++) {
            const descLine = lines[j].match(/description=["']([^"']+)["']/);
            if (descLine) {
              description = descLine[1];
              break;
            }
          }
          
          if (title && description) {
            return {
              page: pageName,
              title,
              description
            };
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

// Main function
function main() {
  const srcDir = path.resolve(__dirname, 'src');
  const pagesDir = path.join(srcDir, 'pages');
  
  // Find all TSX files in the pages directory
  const files = glob.sync(path.join(pagesDir, '*.tsx'));
  
  const seoData = [];
  
  // Process each file
  files.forEach(file => {
    const data = extractSeoData(file);
    if (data) {
      seoData.push(data);
    }
  });
  
  // Sort by page name
  seoData.sort((a, b) => a.page.localeCompare(b.page));
  
  // Generate CSV
  const csvHeader = 'Page,Meta Title,Meta Description\n';
  const csvRows = seoData.map(data => 
    `${data.page},"${data.title.replace(/"/g, '""')}","${data.description.replace(/"/g, '""')}"`
  );
  
  const csvContent = csvHeader + csvRows.join('\n');
  
  // Write to file
  const outputPath = path.resolve(__dirname, 'seo_meta_data.csv');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  
  console.log(`SEO data extracted to ${outputPath}`);
  console.log(`Found ${seoData.length} pages with SEO data`);
}

main();
