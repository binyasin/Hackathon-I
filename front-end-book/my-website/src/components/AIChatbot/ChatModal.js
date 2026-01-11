import React, { useState, useEffect, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ChatMessage from './ChatMessage';
import styles from './styles.module.css';

export default function ChatModal({ initialQuery, onClose }) {
  const { siteConfig } = useDocusaurusContext();
  const backendUrl = siteConfig.customFields?.RAG_BACKEND_URL || 'http://localhost:3000';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check if we're in demo mode (production site with localhost backend)
  const isProduction = typeof window !== 'undefined' &&
    (window.location.hostname === 'binyasin.github.io' || window.location.hostname.includes('github.io'));
  const isDemoMode = isProduction && backendUrl.includes('localhost');

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Send initial query if provided
  useEffect(() => {
    if (initialQuery && initialQuery.trim().length > 0) {
      handleQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleQuery = async (query) => {
    if (!query || query.trim().length === 0) return;

    // Add user message
    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          conversation_history: messages.slice(-4) // Last 2 exchanges
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources || []
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Query error:', error);

      // Determine user-friendly error message
      let errorContent = 'Sorry, I encountered an error processing your question. Please try again.';

      if (error.message.includes('Rate limit')) {
        errorContent = 'Rate limit exceeded. Please wait a moment and try again.';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
        errorContent = 'Cannot connect to the chatbot backend. Please ensure the backend server is running on http://localhost:3000 or check your network connection.';
      } else if (error.message.includes('HTTP 500') || error.message.includes('Internal Server')) {
        errorContent = 'The backend encountered an error. This might be due to missing API keys or configuration issues. Check the backend logs for details.';
      } else if (error.message.includes('HTTP 404')) {
        errorContent = 'The chatbot API endpoint was not found. Please ensure the backend is properly configured.';
      } else if (error.message) {
        // Show the actual error message if it's informative
        errorContent = `Error: ${error.message}`;
      }

      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: errorContent,
        error: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      handleQuery(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter (but not Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="chatbot-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3 id="chatbot-title">💬 Ask AI about the textbook</h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        {/* Demo Mode Notice */}
        {isDemoMode && (
          <div className={styles.demoBanner}>
            <strong>📋 Demo Mode</strong>
            <p>The AI chatbot backend is not currently deployed. This is a UI demonstration only. To enable full functionality, deploy the backend to Vercel and update the configuration.</p>
          </div>
        )}

        {/* Messages */}
        <div className={styles.messagesContainer}>
          {messages.length === 0 && (
            <div className={styles.welcomeMessage}>
              <p>👋 Hi! I'm your AI teaching assistant.</p>
              <p>Ask me anything about the textbook content!</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}

          {loading && (
            <div className={styles.loadingIndicator}>
              <div className={styles.typingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up question..."
            disabled={loading}
            className={styles.input}
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={styles.sendButton}
            aria-label="Send message"
          >
            {loading ? '⏳' : '➤'}
          </button>
        </form>
      </div>
    </div>
  );
}
