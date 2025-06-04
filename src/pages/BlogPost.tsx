import { useParams, Link, useLocation } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import BlogContent from '../components/blog/BlogContent';
import SocialShare from '../components/blog/SocialShare';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';
import { 
  MapPin,
  Ship,
  Hotel,
  Car,
  Tag,
  Bookmark,
  Heart
} from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentUrl = window.location.origin + location.pathname;

  // Get schemas if available (for newer blog content objects)
  const contentObj = typeof post.content === 'object' ? post.content as any : null;
  const schemas = contentObj && contentObj.schemas ? contentObj.schemas : {};
  const blogContent = contentObj ? contentObj.content : post.content;

  // Extract headings from blog content for table of contents
  const extractHeadings = (content: string) => {
    const headingRegex = /^## (.+)$/gm;
    const headings: string[] = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push(match[1]);
    }
    
    return headings;
  };

  const headings = extractHeadings(blogContent);

  const TableOfContents = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
      <nav className="space-y-2">
        {headings.length > 0 ? (
          headings.map((heading) => (
            <a 
              key={heading}
              href={`#${heading.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
              className="block text-gray-600 hover:text-blue-600 transition-colors"
            >
              {heading}
            </a>
          ))
        ) : (
          ['Overview', 'Getting There', 'Where to Stay', 'What to Do', 'Tips & Recommendations'].map((section) => (
            <a 
              key={section}
              href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
              className="block text-gray-600 hover:text-blue-600 transition-colors"
            >
              {section}
            </a>
          ))
        )}
      </nav>
    </div>
  );

  const QuickLinks = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
      <div className="space-y-3">
        <Link 
          to="/ferry-tickets" 
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Ship className="w-4 h-4 mr-2" />
          Book Ferry Tickets
        </Link>
        <Link 
          to="/hotels" 
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Hotel className="w-4 h-4 mr-2" />
          Find Hotels
        </Link>
        <Link 
          to="/rent-a-car" 
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Car className="w-4 h-4 mr-2" />
          Rent a Car
        </Link>
      </div>
    </div>
  );

  const RelatedContent = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Related Content</h3>
      <div className="space-y-4">
        {post.relatedIslands?.map((island) => (
          <Link 
            key={island}
            to={`/islands/${island}`}
            className="flex items-start group"
          >
            <MapPin className="w-4 h-4 mt-1 mr-2 text-gray-500 group-hover:text-blue-600" />
            <div>
              <span className="text-gray-900 group-hover:text-blue-600 font-medium capitalize">
                {island.replace(/-/g, ' ')} Island Guide
              </span>
              <p className="text-sm text-gray-500">Complete travel guide</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  const PopularTags = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const SaveAndShare = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
          <Bookmark className="w-5 h-5" />
          Save for Later
        </button>
        <button className="flex items-center gap-2 text-gray-700 hover:text-rose-600 transition-colors">
          <Heart className="w-5 h-5" />
          Like
        </button>
      </div>
      <SocialShare url={currentUrl} title={post.title} description={post.description} />
    </div>
  );

  return (
    <>
      <SEO 
        title={`${post.title} ${SITE_TAGLINE}`}
        description={post.description}
        ogImage={post.featuredImage}
        ogType="article"
        canonicalUrl={currentUrl}
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt || post.publishedAt,
          author: post.author,
          tags: post.tags
        }}
        jsonLD={schemas.article || {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.description,
          "image": post.featuredImage,
          "author": {
            "@type": "Person",
            "name": post.author,
            "jobTitle": post.authorRole
          },
          "publisher": {
            "@type": "Organization",
            "name": "Greece Cyclades",
            "logo": {
              "@type": "ImageObject",
              "url": "https://greececyclades.com/logo.png"
            }
          },
          "datePublished": post.publishedAt
        }}
        structuredData={schemas.faq}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Image */}
        <div className="relative h-[50vh] pt-20">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-gray-200">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.readTime} min read</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <article className="prose prose-lg max-w-none">
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                  <p className="text-xl text-gray-600 mb-6">
                    {post.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-8">
                    <img
                      src="/touristas-ai-logo.svg"
                      alt={post.author}
                      className="w-12 h-12 mr-4"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{post.author}</div>
                      <div>Published on {new Date(post.publishedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <BlogContent content={blogContent} />
                </div>
              </article>

              {/* Related Posts */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {blogPosts
                    .filter(p => p.id !== post.id)
                    .slice(0, 2)
                    .map(relatedPost => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                          <img
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {relatedPost.title}
                            </h3>
                            <p className="text-gray-600 mt-2 line-clamp-2">
                              {relatedPost.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <TableOfContents />
                <QuickLinks />
                <RelatedContent />
                <PopularTags />
                <SaveAndShare />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
