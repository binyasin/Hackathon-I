import React, { useEffect, useState } from 'react';
import ChatModal from './ChatModal';
import styles from './styles.module.css';

export default function TextSelector() {
  const [selectedText, setSelectedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleTextSelection() {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      // Only show button if text is selected (min 10 characters)
      if (text.length >= 10) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          setSelectedText(text);
          setButtonPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + window.scrollY - 50 // Position above selection
          });
          setShowButton(true);
        } catch (error) {
          // Ignore errors from invalid selection ranges
          console.debug('Selection error:', error);
        }
      } else {
        setShowButton(false);
      }
    }

    // Hide button when clicking elsewhere
    function handleClickAway(e) {
      if (!e.target.closest(`.${styles.askAIButton}`) && !e.target.closest(`.${styles.modalOverlay}`)) {
        setShowButton(false);
      }
    }

    // Add event listeners
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('click', handleClickAway);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('click', handleClickAway);
    };
  }, []);

  const handleAskAI = () => {
    setShowButton(false);
    setModalOpen(true);
  };

  return (
    <>
      {showButton && (
        <button
          className={styles.askAIButton}
          style={{
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
            transform: 'translateX(-50%)' // Center horizontally
          }}
          onClick={handleAskAI}
          aria-label="Ask AI about selected text"
        >
          💬 Ask AI
        </button>
      )}

      {modalOpen && (
        <ChatModal
          initialQuery={selectedText}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
