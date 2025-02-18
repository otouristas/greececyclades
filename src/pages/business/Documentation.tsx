import { useState } from 'react';
import DashboardLayout from '../../components/business/DashboardLayout';
import { Search, Book, FileText, Video, HelpCircle, ChevronRight } from 'lucide-react';

interface DocSection {
  title: string;
  description: string;
  icon: React.ElementType;
  articles: DocArticle[];
}

interface DocArticle {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide';
  readTime?: string;
  videoLength?: string;
}

const documentation: DocSection[] = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of managing your properties and bookings',
    icon: Book,
    articles: [
      {
        id: 'GS001',
        title: 'Quick Start Guide',
        description: 'Everything you need to know to get started with your business account',
        type: 'guide',
        readTime: '5 min read',
      },
      {
        id: 'GS002',
        title: 'Setting Up Your First Property',
        description: 'Step-by-step guide to listing your first property',
        type: 'video',
        videoLength: '10 min',
      },
    ],
  },
  {
    title: 'Managing Bookings',
    description: 'Handle reservations, cancellations, and guest communications',
    icon: FileText,
    articles: [
      {
        id: 'MB001',
        title: 'Processing Bookings',
        description: 'Learn how to manage booking requests and confirmations',
        type: 'article',
        readTime: '4 min read',
      },
      {
        id: 'MB002',
        title: 'Handling Cancellations',
        description: 'Best practices for managing booking cancellations',
        type: 'article',
        readTime: '3 min read',
      },
    ],
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides for common tasks',
    icon: Video,
    articles: [
      {
        id: 'VT001',
        title: 'Dashboard Overview',
        description: 'A complete tour of your business dashboard',
        type: 'video',
        videoLength: '8 min',
      },
      {
        id: 'VT002',
        title: 'Property Management Tips',
        description: 'Expert tips for managing multiple properties',
        type: 'video',
        videoLength: '15 min',
      },
    ],
  },
];

function ArticleCard({ article }: { article: DocArticle }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 hover:bg-gray-50">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{article.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{article.description}</p>
        <div className="mt-2">
          <span className="inline-flex items-center space-x-2 text-xs text-gray-500">
            {article.type === 'video' ? (
              <>
                <Video className="h-4 w-4" />
                <span>{article.videoLength}</span>
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                <span>{article.readTime}</span>
              </>
            )}
          </span>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
}

function DocSectionCard({ section }: { section: DocSection }) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-6 flex items-center space-x-3">
        <div className="rounded-lg bg-blue-50 p-3">
          <section.icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
          <p className="mt-1 text-sm text-gray-500">{section.description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {section.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Documentation</h1>
          <p className="mt-2 text-sm text-gray-500">
            Everything you need to know about managing your properties and bookings
          </p>
        </div>

        <div className="relative max-w-2xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {documentation.map((section) => (
            <DocSectionCard key={section.title} section={section} />
          ))}
        </div>

        <div className="rounded-lg border bg-blue-50 p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-blue-100 p-3">
              <HelpCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Need Help?</h2>
              <p className="mt-1 text-sm text-gray-500">
                Can't find what you're looking for? Contact our support team.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <button className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <span>Contact Support</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
