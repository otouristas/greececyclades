import { useState } from 'react';
import { Share2, Copy, Check, Facebook, Twitter, MessageCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  variant?: 'icon' | 'button' | 'dropdown';
}

export default function ShareButton({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = document.title,
  description = '',
  image = '',
  className = '',
  variant = 'icon'
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text: description,
    url
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setIsOpen(false);
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      // Fallback to copy
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'email') => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setIsOpen(false);
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleWebShare}
        className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
              >
                <div className="py-1">
                  {navigator.share && (
                    <button
                      onClick={handleWebShare}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Share via...
                    </button>
                  )}
                  <button
                    onClick={handleCopyLink}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                  <div className="border-t border-gray-200 my-1" />
                  <button
                    onClick={() => handleSocialShare('facebook')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleSocialShare('twitter')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Twitter className="h-4 w-4 text-blue-400" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleSocialShare('whatsapp')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 text-green-500" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleSocialShare('email')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Icon variant (default)
  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 transition-colors"
        aria-label="Share"
      >
        <Share2 className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
            >
              <div className="py-1">
                {navigator.share && (
                  <button
                    onClick={handleWebShare}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share via...
                  </button>
                )}
                <button
                  onClick={handleCopyLink}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </button>
                <div className="border-t border-gray-200 my-1" />
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </button>
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4 text-blue-400" />
                  Twitter
                </button>
                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  WhatsApp
                </button>
                <button
                  onClick={() => handleSocialShare('email')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


