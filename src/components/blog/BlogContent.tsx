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
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-4">{children}</h3>
    ),
  };

  return (
    <article className="prose prose-lg max-w-none">
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
