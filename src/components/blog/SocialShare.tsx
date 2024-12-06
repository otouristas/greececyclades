import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Link as LinkIcon 
} from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
}

interface ShareLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  email: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks: ShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex space-x-4">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href={shareLinks.email}
        className="text-gray-600 hover:text-gray-800"
        aria-label="Share via Email"
      >
        <Mail className="w-5 h-5" />
      </a>
      <button
        onClick={copyToClipboard}
        className="text-gray-600 hover:text-gray-800"
        aria-label="Copy link"
        type="button"
      >
        <LinkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
