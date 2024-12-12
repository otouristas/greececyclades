import { useParams, Link, useLocation } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import BlogContent from '../components/blog/BlogContent';
import SocialShare from '../components/blog/SocialShare';
import SEO from '../components/SEO';
import { SITE_TAGLINE } from '../constants/seo';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <Link to="/blog" className="text-blue-600 hover:text-blue-800">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentUrl = window.location.origin + location.pathname;

  return (
    <>
      <SEO 
        title={`${post.title} ${SITE_TAGLINE}`}
        description={post.description}
        ogImage={post.featuredImage}
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt || post.publishedAt,
          author: post.author,
          tags: post.tags
        }}
      />
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article>
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center justify-center text-gray-600 space-x-4 mb-6">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.readTime} min read</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
              <div className="flex justify-center">
                <SocialShare
                  url={currentUrl}
                  title={post.title}
                  description={post.description}
                />
              </div>
            </header>

            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg mb-12"
            />

            <BlogContent content={post.content} />

            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Share</h3>
                  <SocialShare
                    url={currentUrl}
                    title={post.title}
                    description={post.description}
                  />
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </>
  );
}
