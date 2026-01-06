#!/usr/bin/env node

/**
 * Word Count Validation Script
 *
 * Validates that Markdown files comply with word count limits:
 * - Chapter limit: ≤2000 words (FR-033)
 * - Paragraph limit: ≤150 words (FR-034)
 *
 * Usage: node scripts/validate-word-count.js [file-path]
 * If no file path provided, validates all .md files in docs/module1/chapter*.md
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const MAX_CHAPTER_WORDS = 2000;
const MAX_PARAGRAPH_WORDS = 150;

// Utility: Count words in text (excluding frontmatter and code blocks)
function countWords(text) {
  // Remove frontmatter (YAML between ---)
  text = text.replace(/^---[\s\S]*?---/m, '');

  // Remove code blocks (``` ... ```)
  text = text.replace(/```[\s\S]*?```/g, '');

  // Remove inline code (`...`)
  text = text.replace(/`[^`]+`/g, '');

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // Remove Markdown links but keep link text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove images
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

  // Split by whitespace and filter empty strings
  const words = text.split(/\s+/).filter(word => word.length > 0);

  return words.length;
}

// Utility: Extract paragraphs from Markdown
function extractParagraphs(text) {
  // Remove frontmatter
  text = text.replace(/^---[\s\S]*?---/m, '');

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');

  // Split by double newlines (paragraph breaks)
  const paragraphs = text.split(/\n\s*\n/).filter(para => {
    // Filter out empty paragraphs and headings
    const trimmed = para.trim();
    return trimmed.length > 0 && !trimmed.startsWith('#');
  });

  return paragraphs;
}

// Validate a single file
function validateFile(filePath) {
  console.log(`\nValidating: ${filePath}`);

  const content = fs.readFileSync(filePath, 'utf8');
  const totalWords = countWords(content);
  const paragraphs = extractParagraphs(content);

  let hasError = false;

  // Check chapter word count
  console.log(`  Total words: ${totalWords} (limit: ${MAX_CHAPTER_WORDS})`);
  if (totalWords > MAX_CHAPTER_WORDS) {
    console.error(`  ❌ FAIL: Chapter exceeds ${MAX_CHAPTER_WORDS} words by ${totalWords - MAX_CHAPTER_WORDS} words`);
    hasError = true;
  } else {
    console.log(`  ✅ PASS: Chapter word count within limit`);
  }

  // Check paragraph word counts
  let paragraphErrors = 0;
  paragraphs.forEach((para, index) => {
    const words = countWords(para);
    if (words > MAX_PARAGRAPH_WORDS) {
      if (paragraphErrors === 0) {
        console.error(`  ❌ FAIL: Paragraphs exceeding ${MAX_PARAGRAPH_WORDS} words:`);
      }
      console.error(`    - Paragraph ${index + 1}: ${words} words (exceeds by ${words - MAX_PARAGRAPH_WORDS})`);
      paragraphErrors++;
      hasError = true;
    }
  });

  if (paragraphErrors === 0) {
    console.log(`  ✅ PASS: All ${paragraphs.length} paragraphs within ${MAX_PARAGRAPH_WORDS} word limit`);
  }

  return !hasError;
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  let files = [];

  if (args.length > 0) {
    // Validate specific file
    files = [args[0]];
  } else {
    // Validate all chapter files
    const docsPath = path.join(__dirname, '..', 'docs', 'module1');
    files = glob.sync(path.join(docsPath, 'chapter*.md'));
  }

  if (files.length === 0) {
    console.log('No chapter files found to validate.');
    return;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('Word Count Validation Report');
  console.log(`${'='.repeat(60)}`);

  let allPassed = true;
  files.forEach(file => {
    const passed = validateFile(file);
    if (!passed) {
      allPassed = false;
    }
  });

  console.log(`\n${'='.repeat(60)}`);
  if (allPassed) {
    console.log('✅ ALL VALIDATIONS PASSED');
    console.log(`${'='.repeat(60)}\n`);
    process.exit(0);
  } else {
    console.error('❌ VALIDATION FAILED - Fix errors above');
    console.log(`${'='.repeat(60)}\n`);
    process.exit(1);
  }
}

main();
