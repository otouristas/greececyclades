import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, X, MessageCircle, Mic, MicOff, Minimize2, Maximize2,
  Sparkles, Loader2
} from 'lucide-react';
import { generateConversationalTrip } from '../../utils/ai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  typing?: boolean;
}

interface TouristasAIChatProps {
  initialMessage?: string;
  onClose?: () => void;
}

export default function TouristasAIChat({ initialMessage, onClose }: TouristasAIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: initialMessage || '🇬🇷 **Γεια σας!** Welcome to Touristas AI!\n\nI\'m your personal Greek islands oracle with knowledge of all 25+ Cyclades islands. I can help you:\n\n• Plan perfect itineraries\n• Find hotels and accommodations\n• Discover activities and experiences\n• Get ferry schedules\n• Find restaurants and local tips\n\nWhat would you like to know about the Cyclades? ✨',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognition = useRef<any>(null);

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';
      
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognition.current.onerror = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleVoiceRecording = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
    } else {
      recognition.current?.start();
      setIsListening(true);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    
    const typingMessage: Message = {
      id: 'typing',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const conversationHistory = messages
        .filter(msg => msg.id !== 'typing')
        .map(msg => `${msg.role === 'user' ? 'User' : 'Touristas AI'}: ${msg.content}`)
        .join('\n');
      
      const response = await generateConversationalTrip(currentInput, conversationHistory);
      
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== 'typing');
        return [...filtered, {
          id: Date.now().toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date()
        }];
      });
    } catch (error) {
      console.error('Touristas AI Error:', error);
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== 'typing');
        return [...filtered, {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'I apologize, but I\'m having trouble processing your request right now. Please try again!',
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          const text = line.slice(2, -2);
          return <strong key={i} className="font-bold">{text}</strong>;
        }
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return <div key={i} className="ml-4">{line}</div>;
        }
        if (line.trim() === '') {
          return <br key={i} />;
        }
        return <div key={i}>{line}</div>;
      });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-sifnos-deep-blue to-primary text-white rounded-full shadow-2xl hover:shadow-sifnos-deep-blue/50 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Open Touristas AI Chat"
          >
            <MessageCircle className="w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed z-50 ${
              isMinimized
                ? 'bottom-6 right-6 w-80 h-16'
                : 'bottom-6 right-6 w-full max-w-md h-[600px] md:h-[700px]'
            } md:max-w-md bg-white rounded-2xl shadow-2xl border-2 border-gray-200 flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sifnos-deep-blue to-primary text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/touristas-ai-logo.svg"
                  alt="Touristas AI"
                  className="w-8 h-8"
                />
                <div>
                  <div className="font-bold text-sm">Touristas AI</div>
                  <div className="text-xs text-white/80">Cyclades Travel Assistant</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onClose?.();
                  }}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-sifnos-deep-blue text-white rounded-br-md'
                            : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                        }`}
                      >
                        {message.typing ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Touristas AI is thinking...</span>
                          </div>
                        ) : (
                          <div className="text-sm whitespace-pre-wrap">
                            {formatMessage(message.content)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSend} className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask Touristas AI anything about the Cyclades..."
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sifnos-deep-blue focus:border-transparent resize-none text-sm"
                        rows={1}
                        style={{ minHeight: '48px', maxHeight: '120px' }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={toggleVoiceRecording}
                        className={`p-3 rounded-xl transition-colors ${
                          isListening
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        aria-label={isListening ? 'Stop recording' : 'Start voice input'}
                      >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                      <button
                        type="submit"
                        disabled={!inputValue.trim() || isLoading}
                        className="p-3 bg-sifnos-deep-blue text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    Powered by Touristas AI • Trained on all Cyclades content
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMinimized(true)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

