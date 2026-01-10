import React from 'react';
import { TextSelector } from '../components/AIChatbot';

/**
 * Root wrapper component
 * Injects the TextSelector component globally across all pages
 * This enables text selection → "Ask AI" functionality everywhere
 */
export default function Root({ children }) {
  return (
    <>
      {children}
      <TextSelector />
    </>
  );
}
