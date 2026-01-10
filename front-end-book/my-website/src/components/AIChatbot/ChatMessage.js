import React from 'react';
import styles from './styles.module.css';

export default function ChatMessage({ message }) {
  const { role, content, sources, error } = message;

  return (
    <div className={`${styles.message} ${styles[role]} ${error ? styles.error : ''}`}>
      <div className={styles.messageContent}>
        <div className={styles.messageRole}>
          {role === 'user' ? '👤 You' : '🤖 AI Assistant'}
        </div>
        <div className={styles.messageText}>
          {content}
        </div>
      </div>

      {/* Source Citations */}
      {sources && sources.length > 0 && (
        <div className={styles.sources}>
          <strong>📚 Sources:</strong>
          <div className={styles.sourcesList}>
            {sources.map((source, idx) => (
              <a
                key={idx}
                href={source.url || '#'}
                className={styles.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                title={`Relevance: ${Math.round(source.relevance_score * 100)}%`}
              >
                <span className={styles.sourceName}>
                  {source.chapter} → {source.section}
                </span>
                <span className={styles.sourceScore}>
                  {Math.round(source.relevance_score * 100)}%
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
