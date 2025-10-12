'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Brain, Sparkles, ExternalLink } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Welcome message
const WELCOME_MESSAGE = "Hi! I'm here to help you learn more about NMTSA and our neurologic music therapy services. How can I assist you today?";

/**
 * Parse message content and convert URLs to clickable links
 * @param text - The message text that may contain URLs
 * @param isUserMessage - Whether this is a user message (affects link styling)
 * @returns JSX with clickable links
 */
const parseMessageWithLinks = (text: string, isUserMessage: boolean = false) => {
  // Regular expression to match URLs, excluding trailing punctuation
  // This pattern matches URLs but stops before common punctuation like ), ., !
  const urlRegex = /(https?:\/\/[^\s)]+?)([),.:;!?]*(?:\s|$))/g;
  
  const elements: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  // Find all URLs in the text
  while ((match = urlRegex.exec(text)) !== null) {
    const fullMatch = match[0];
    const url = match[1]; // URL without trailing punctuation
    const trailing = match[2]; // Trailing punctuation and whitespace
    const matchIndex = match.index;

    // Add text before the URL
    if (matchIndex > lastIndex) {
      elements.push(text.substring(lastIndex, matchIndex));
    }

    // Add the clickable link
    elements.push(
      <a
        key={matchIndex}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 underline decoration-2 underline-offset-2 transition-all duration-200 font-medium ${
          isUserMessage 
            ? 'text-white hover:text-amber-100 decoration-white/70 hover:decoration-white' 
            : 'text-blue-600 hover:text-blue-700 decoration-blue-600 hover:decoration-blue-700'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {url}
        <ExternalLink className="w-3 h-3 inline-block flex-shrink-0" />
      </a>
    );

    // Add the trailing punctuation/whitespace as plain text
    elements.push(trailing);

    lastIndex = matchIndex + fullMatch.length;
  }

  // Add any remaining text after the last URL
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Filter out the initial welcome message and get last 5 messages
      // AWS Bedrock requires conversations to start with a user message
      const conversationHistory = messages
        .filter((msg, index) => index > 0) // Skip the initial welcome message
        .slice(-5); // Get last 5 messages for context

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again later or contact us directly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Widget Button - Brain Icon with Glassmorphism */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-button group fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-6"
          aria-label="Open chat assistant"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300 animate-gradient" 
               style={{ backgroundSize: '200% 200%' }} />
          
          {/* Glass layer */}
          <div className="absolute inset-0 rounded-full backdrop-blur-xl bg-white/10 border border-white/20" />
          
          {/* Brain icon */}
          <div className="relative">
            <Brain className="w-7 h-7 text-white drop-shadow-lg" strokeWidth={2.5} />
          </div>
          
          {/* Sparkle indicator */}
          <span className="absolute -top-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-gradient-to-br from-amber-300 to-amber-500 items-center justify-center border-2 border-white shadow-lg">
              <Sparkles className="w-3 h-3 text-white" />
            </span>
          </span>
        </button>
      )}

      {/* Chat Window - Modern Glass Design */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] flex flex-col overflow-hidden rounded-3xl shadow-2xl animate-slide-in">
          {/* Glass background with blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-amber-50/90 to-orange-50/95 backdrop-blur-2xl" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />
          
          {/* Border glow effect */}
          <div className="absolute inset-0 rounded-3xl border border-white/50 shadow-[0_0_80px_rgba(251,191,36,0.3)]" />
          
          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Header with glass effect */}
            <div className="relative px-6 py-5 border-b border-white/30 backdrop-blur-xl bg-gradient-to-r from-amber-500/90 via-orange-500/90 to-amber-600/90 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Animated brain icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl animate-pulse-slow" />
                    <div className="relative w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/40 shadow-lg">
                      <Brain className="w-7 h-7 text-white drop-shadow-md animate-float" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-white text-lg drop-shadow-md">NMTSA Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                      <p className="text-xs text-white/90 font-medium">Always here to help</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 rounded-2xl p-2 transition-all duration-300 hover:rotate-90 backdrop-blur-xl border border-white/20"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5 text-white drop-shadow-md" />
                </button>
              </div>
            </div>

            {/* Messages Area with subtle glass effect */}
            <div className="relative flex-1 overflow-y-auto p-6 space-y-4">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
              
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-lg backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-white/20 rounded-br-md shadow-amber-500/20'
                        : 'bg-white/80 text-gray-800 border-white/60 rounded-bl-md shadow-gray-200/50'
                    }`}
                  >
                    {message.role === 'assistant' && index > 0 && (
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200/50">
                        <Brain className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-semibold text-amber-600">NMTSA AI</span>
                      </div>
                    )}
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {parseMessageWithLinks(message.content, message.role === 'user')}
                    </div>
                    <span className={`text-xs mt-2 block ${
                      message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white/80 backdrop-blur-xl text-gray-800 border border-white/60 rounded-2xl rounded-bl-md p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area with glass effect */}
            <div className="relative p-4 border-t border-white/30 backdrop-blur-2xl bg-gradient-to-r from-white/60 via-amber-50/40 to-white/60 rounded-b-3xl">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  {/* Input glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about NMTSA..."
                    disabled={isLoading}
                    className="relative w-full px-5 py-3.5 bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl 
                             focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 
                             disabled:bg-gray-100/80 disabled:cursor-not-allowed 
                             placeholder:text-gray-400 text-sm font-medium
                             shadow-lg transition-all duration-300 hover:shadow-xl"
                  />
                </div>
                
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="relative group bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl px-5 py-3.5
                           hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                           hover:scale-105 active:scale-95 border border-white/20 backdrop-blur-xl"
                  aria-label="Send message"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Send className="relative w-5 h-5 drop-shadow-md" />
                </button>
              </div>
              
            </div>
          </div>
        </div>
      )}
      
      {/* Custom styles */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .chatbot-button {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-slide-in {
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
