import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, User, ExternalLink } from 'lucide-react';
import { Message } from './utils/chat-utils';

interface ChatMessagesDarkProps {
    messages: Message[];
    messagesEndRef: React.RefObject<HTMLDivElement>;
    onSuggestionClick?: (suggestion: string) => void;
    suggestions?: string[];
}

/**
 * Parse markdown-style formatting for rich text display (Dark Mode)
 */
const formatMessageContent = (content: string) => {
    const parts: React.ReactNode[] = [];
    const lines = content.split('\n');

    lines.forEach((line, lineIndex) => {
        // Handle headers
        if (line.startsWith('### ')) {
            parts.push(
                <h4 key={`h4-${lineIndex}`} className="font-bold text-base mt-3 mb-1 text-cyclades-turquoise">
                    {processBoldAndLinks(line.replace('### ', ''))}
                </h4>
            );
        } else if (line.startsWith('## ')) {
            parts.push(
                <h3 key={`h3-${lineIndex}`} className="font-bold text-lg mt-4 mb-2 text-white">
                    {processBoldAndLinks(line.replace('## ', ''))}
                </h3>
            );
        } else if (line.startsWith('# ')) {
            parts.push(
                <h2 key={`h2-${lineIndex}`} className="font-bold text-xl mt-4 mb-2 text-white">
                    {processBoldAndLinks(line.replace('# ', ''))}
                </h2>
            );
        }
        // Handle bullet points
        else if (line.startsWith('- ') || line.startsWith('• ')) {
            const bulletContent = line.replace(/^[-•]\s*/, '');
            parts.push(
                <div key={`bullet-${lineIndex}`} className="flex gap-2 items-start ml-1 my-1">
                    <span className="text-cyclades-turquoise mt-1">•</span>
                    <span className="text-white/80">{processBoldAndLinks(bulletContent)}</span>
                </div>
            );
        }
        // Handle numbered lists
        else if (/^\d+\.\s/.test(line)) {
            const match = line.match(/^(\d+)\.\s(.*)$/);
            if (match) {
                parts.push(
                    <div key={`num-${lineIndex}`} className="flex gap-2 items-start ml-1 my-1">
                        <span className="text-cyclades-turquoise font-semibold min-w-[1.5rem]">{match[1]}.</span>
                        <span className="text-white/80">{processBoldAndLinks(match[2])}</span>
                    </div>
                );
            }
        }
        // Regular paragraph
        else if (line.trim()) {
            parts.push(
                <p key={`p-${lineIndex}`} className="text-white/80 my-1.5 leading-relaxed">
                    {processBoldAndLinks(line)}
                </p>
            );
        }
        // Empty line = paragraph break
        else {
            parts.push(<div key={`br-${lineIndex}`} className="h-2" />);
        }
    });

    return parts;
};

/**
 * Process bold text and markdown links within a string
 */
const processBoldAndLinks = (text: string): React.ReactNode => {
    // Combined regex for bold text and markdown links
    const combinedRegex = /(\*\*(.*?)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = combinedRegex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }

        if (match[1]) {
            // Bold text match: **text**
            parts.push(
                <strong key={`bold-${key++}`} className="font-semibold text-white">
                    {match[2]}
                </strong>
            );
        } else if (match[3]) {
            // Link match: [text](url)
            const linkText = match[4];
            const linkUrl = match[5];

            if (linkUrl.startsWith('/')) {
                // Internal link
                parts.push(
                    <Link
                        key={`link-${key++}`}
                        to={linkUrl}
                        className="text-cyclades-turquoise hover:text-cyan-300 underline decoration-cyclades-turquoise/50 hover:decoration-cyan-300 font-medium transition-colors"
                    >
                        {linkText}
                    </Link>
                );
            } else {
                // External link
                parts.push(
                    <a
                        key={`link-${key++}`}
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyclades-turquoise hover:text-cyan-300 underline decoration-cyclades-turquoise/50 hover:decoration-cyan-300 font-medium transition-colors inline-flex items-center gap-1"
                    >
                        {linkText}
                        <ExternalLink className="w-3 h-3" />
                    </a>
                );
            }
        }

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
};

export default function ChatMessagesDark({
    messages,
    messagesEndRef,
    onSuggestionClick,
    suggestions
}: ChatMessagesDarkProps) {
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, messagesEndRef]);

    return (
        <div className="flex-1 overflow-y-auto h-full overscroll-contain scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-transparent">
            <div className="p-4 sm:p-5 space-y-4 pb-8">
                {messages.map((message, msgIndex) => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: msgIndex === messages.length - 1 ? 0.1 : 0 }}
                        className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        {/* Avatar */}
                        <div className="flex-shrink-0 mt-1">
                            {message.role === 'user' ? (
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center shadow-md border border-white/10">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyclades-turquoise to-cyan-400 flex items-center justify-center shadow-md ring-2 ring-cyclades-turquoise/30">
                                    <Sparkles className="w-4 h-4 text-dark-bg" />
                                </div>
                            )}
                        </div>

                        {/* Message Content */}
                        <div className={`flex-1 min-w-0 ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
                            {/* Message Bubble */}
                            <div className={`relative max-w-[90%] ${message.role === 'user'
                                    ? 'bg-gradient-to-br from-cyclades-turquoise to-cyan-600 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-lg shadow-cyclades-turquoise/20'
                                    : 'bg-dark-card text-white rounded-2xl rounded-tl-md px-4 py-3 shadow-md border border-dark-border/30'
                                }`}>
                                {/* AI Label for assistant messages */}
                                {message.role === 'assistant' && message.id !== 'welcome' && (
                                    <div className="flex items-center gap-1.5 mb-2 text-xs text-cyclades-turquoise">
                                        <Sparkles className="w-3 h-3" />
                                        <span className="font-medium">Touristas AI</span>
                                    </div>
                                )}

                                {/* Typing Indicator */}
                                {message.typing ? (
                                    <div className="flex items-center gap-3 py-2">
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map(i => (
                                                <span
                                                    key={i}
                                                    className="w-2 h-2 bg-cyclades-turquoise rounded-full animate-bounce"
                                                    style={{ animationDelay: `${i * 150}ms` }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-white/50">Thinking...</span>
                                    </div>
                                ) : (
                                    /* Message Content with Rich Formatting */
                                    <div className={`text-sm leading-relaxed ${message.role === 'user' ? 'text-white' : ''}`}>
                                        {message.role === 'assistant' ? (
                                            formatMessageContent(message.content)
                                        ) : (
                                            <span className="whitespace-pre-wrap break-words">{message.content}</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Show suggestion buttons for welcome message */}
                            {message.id === 'welcome' && suggestions && suggestions.length > 0 && onSuggestionClick && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {suggestions.map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => onSuggestionClick(suggestion)}
                                            className="px-4 py-2 text-sm font-medium bg-dark-card hover:bg-cyclades-turquoise/10 text-white/80 hover:text-white border border-dark-border/50 hover:border-cyclades-turquoise/50 rounded-full transition-all duration-200 hover:scale-105"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
