/**
 * Content chunking utilities for markdown text
 * Splits chapters into semantically meaningful chunks for RAG
 */

/**
 * Estimate token count (rough approximation: 1 token ≈ 4 characters)
 * @param {string} text - Text to count tokens for
 * @returns {number} Estimated token count
 */
function estimateTokenCount(text) {
  return Math.ceil(text.length / 4);
}

/**
 * Split a long section into smaller chunks at paragraph boundaries
 * @param {string} text - Text to split
 * @param {number} maxTokens - Maximum tokens per chunk
 * @returns {Array<string>} Array of text chunks
 */
function splitLongSection(text, maxTokens = 500) {
  const paragraphs = text.split(/\n\n+/); // Split on double newlines
  const chunks = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    const paraTokens = estimateTokenCount(para);
    const currentTokens = estimateTokenCount(currentChunk);

    // If adding this paragraph exceeds max tokens, save current chunk
    if (currentTokens + paraTokens > maxTokens && currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + para;
    }
  }

  // Add remaining chunk
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks.length > 0 ? chunks : [text]; // Fallback to original text
}

/**
 * Remove markdown syntax that doesn't add semantic value
 * @param {string} text - Markdown text
 * @returns {string} Cleaned text
 */
function cleanMarkdown(text) {
  return text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/```[\s\S]*?```/g, '[CODE BLOCK]') // Simplify code blocks
    .replace(/`([^`]+)`/g, '$1') // Remove inline code formatting
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/#{1,6}\s+/g, '') // Remove heading markers
    .replace(/\n{3,}/g, '\n\n') // Normalize newlines
    .trim();
}

/**
 * Chunk markdown content by H2 sections
 * @param {string} content - Full markdown content
 * @param {Object} metadata - Chapter metadata (id, title, keywords, etc.)
 * @param {number} maxTokens - Maximum tokens per chunk
 * @returns {Array<Object>} Array of chunk objects with text and metadata
 */
export function chunkMarkdownBySections(content, metadata, maxTokens = 500) {
  const chunks = [];

  // Remove frontmatter if present (handled separately)
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/m, '');

  // Split on H2 headings (## )
  const sections = contentWithoutFrontmatter.split(/\n(?=## )/);

  sections.forEach((section, sectionIndex) => {
    if (section.trim().length === 0) return;

    const lines = section.split('\n');
    const firstLine = lines[0].trim();

    // Extract heading (remove ## prefix)
    let heading;
    let sectionText;

    if (firstLine.startsWith('##')) {
      heading = firstLine.replace(/^##\s+/, '').trim();
      sectionText = lines.slice(1).join('\n').trim();
    } else {
      // First section before any H2 (typically title or intro)
      heading = metadata.title;
      sectionText = section.trim();
    }

    // Clean the text
    const cleanedText = cleanMarkdown(sectionText);

    if (cleanedText.length === 0) return;

    const tokenCount = estimateTokenCount(cleanedText);

    // If section is too long, split it further
    if (tokenCount > maxTokens) {
      const subsections = splitLongSection(cleanedText, maxTokens);

      subsections.forEach((subsection, subIndex) => {
        chunks.push({
          id: `${metadata.id}_${sectionIndex}_${subIndex}`,
          text: subsection,
          heading: heading,
          chapter: metadata.title,
          keywords: metadata.keywords || [],
          difficulty: metadata.difficulty,
          estimated_time: metadata.estimated_time,
          url: `https://binyasin.github.io/Hackathon-I/module1/${metadata.id}`
        });
      });
    } else {
      // Section fits within token limit
      chunks.push({
        id: `${metadata.id}_${sectionIndex}`,
        text: cleanedText,
        heading: heading,
        chapter: metadata.title,
        keywords: metadata.keywords || [],
        difficulty: metadata.difficulty,
        estimated_time: metadata.estimated_time,
        url: `https://binyasin.github.io/Hackathon-I/module1/${metadata.id}`
      });
    }
  });

  return chunks;
}

/**
 * Chunk multiple chapters at once
 * @param {Array<Object>} chapters - Array of chapter objects with content and metadata
 * @param {number} maxTokens - Maximum tokens per chunk
 * @returns {Array<Object>} Combined array of all chunks
 */
export function chunkMultipleChapters(chapters, maxTokens = 500) {
  const allChunks = [];

  for (const chapter of chapters) {
    const chunks = chunkMarkdownBySections(chapter.content, chapter.metadata, maxTokens);
    allChunks.push(...chunks);
  }

  console.log(`Total chunks created: ${allChunks.length}`);
  return allChunks;
}

export default { chunkMarkdownBySections, chunkMultipleChapters, estimateTokenCount };
