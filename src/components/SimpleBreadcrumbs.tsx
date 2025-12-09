import { Link } from 'react-router-dom';

/**
 * Interface for a single breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string; // optional - omit for current page
}

/**
 * Props for SimpleBreadcrumbs component
 */
interface SimpleBreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * SimpleBreadcrumbs component
 * Renders a clean, GetYourGuide-style breadcrumb navigation with schema.org structured data
 * 
 * @param items - Array of breadcrumb items, where the last item is typically the current page
 */
export default function SimpleBreadcrumbs({ items }: SimpleBreadcrumbsProps) {
  // Generate schema.org BreadcrumbList structured data
  const generateBreadcrumbSchema = () => {
    const itemListElement = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://hotelssantorini.gr'
      }
    ];
    
    let position = 2;
    
    // Add provided items to schema
    items.forEach(item => {
      const itemUrl = item.href 
        ? (item.href.startsWith('http') 
            ? item.href 
            : `https://hotelssantorini.gr${item.href.startsWith('/') ? item.href : `/${item.href}`}`)
        : `https://hotelssantorini.gr${window.location.pathname}`;
          
      itemListElement.push({
        '@type': 'ListItem',
        'position': position,
        'name': item.label,
        'item': itemUrl
      });
      position++;
    });
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': itemListElement
    };
  };
  
  const breadcrumbSchema = generateBreadcrumbSchema();
  
  return (
    <>
      {/* Inject schema.org structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-sifnos-deep-blue">Home</Link>
            
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>/</span>
                {item.href ? (
                  <Link to={item.href} className="hover:text-sifnos-deep-blue">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-sifnos-deep-blue font-medium">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

