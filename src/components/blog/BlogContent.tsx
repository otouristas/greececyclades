import ReactMarkdown, { Components } from 'react-markdown';
import { Link } from 'react-router-dom';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const components: Partial<Components> = {
    a: ({ href, children }) => {
      if (!href) return null;
      
      const isInternal = href.startsWith('/');
      if (isInternal) {
        return (
          <Link to={href} className="text-blue-600 hover:text-blue-800">
            {children}
          </Link>
        );
      }
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt }) => (
      <img 
        src={src || ''} 
        alt={alt || ''} 
        className="rounded-lg shadow-md w-full"
      />
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-8">{children}</h1>
    ),
    h2: ({ children }) => {
      // Create an ID from the heading text for anchor links
      const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
      
      return (
        <h2 id={id} className="text-3xl font-semibold mt-12 mb-6 scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      // Create an ID from the heading text for anchor links
      const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
      
      return (
        <h3 id={id} className="text-2xl font-semibold mt-8 mb-4 scroll-mt-24">
          {children}
        </h3>
      );
    },
  };

  return (
    <article className="prose prose-lg max-w-none">
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
