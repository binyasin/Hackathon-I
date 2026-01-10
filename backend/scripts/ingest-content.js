import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { chunkMarkdownBySections } from '../lib/chunker.js';
import { generateEmbeddingsBatch } from '../lib/embeddings.js';
import { upsertVectors } from '../lib/pinecone.js';

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to docs directory
const DOCS_PATH = path.join(__dirname, '../../front-end-book/my-website/docs/module1');

/**
 * Extract chapters from markdown files
 * @returns {Array<Object>} Array of chapter objects with content and metadata
 */
function extractChapters() {
  console.log(`\n📚 Reading markdown files from: ${DOCS_PATH}\n`);

  if (!fs.existsSync(DOCS_PATH)) {
    throw new Error(`Docs path does not exist: ${DOCS_PATH}`);
  }

  const files = fs.readdirSync(DOCS_PATH).filter(f => f.endsWith('.md'));
  const chapters = [];

  for (const file of files) {
    // Skip template and test files
    if (file.startsWith('_') || file.includes('template') || file.includes('test')) {
      console.log(`⏭️  Skipping: ${file}`);
      continue;
    }

    const filePath = path.join(DOCS_PATH, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(fileContent);

    const chapterId = file.replace('.md', '');

    chapters.push({
      id: chapterId,
      content: content,
      metadata: {
        id: chapterId,
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || '',
        keywords: frontmatter.keywords || [],
        difficulty: frontmatter.difficulty || 'beginner',
        estimated_time: frontmatter.estimated_time || 'unknown'
      }
    });

    console.log(`✓ Loaded: ${frontmatter.title || file} (${Math.ceil(content.length / 1000)}KB)`);
  }

  console.log(`\n📖 Total chapters loaded: ${chapters.length}\n`);
  return chapters;
}

/**
 * Main ingestion workflow
 */
async function ingestContent() {
  console.log('🚀 Starting content ingestion...\n');

  try {
    // Step 1: Extract chapters
    const chapters = extractChapters();

    if (chapters.length === 0) {
      throw new Error('No chapters found to ingest');
    }

    // Step 2: Chunk content
    console.log('🔪 Chunking content...\n');
    const allChunks = [];

    for (const chapter of chapters) {
      const chunks = chunkMarkdownBySections(chapter.content, chapter.metadata, 500);
      allChunks.push(...chunks);
      console.log(`  → ${chapter.metadata.title}: ${chunks.length} chunks`);
    }

    console.log(`\n✓ Total chunks created: ${allChunks.length}\n`);

    // Step 3: Generate embeddings
    console.log('🧠 Generating embeddings with OpenAI...\n');

    const texts = allChunks.map(chunk => chunk.text);
    const embeddings = await generateEmbeddingsBatch(texts);

    console.log(`✓ Generated ${embeddings.length} embeddings\n`);

    // Step 4: Upsert to Pinecone
    console.log('📌 Upserting vectors to Pinecone...\n');

    const vectorsUpserted = await upsertVectors(allChunks, embeddings, 'v1');

    console.log(`\n✅ Ingestion complete!`);
    console.log(`   Chapters: ${chapters.length}`);
    console.log(`   Chunks: ${allChunks.length}`);
    console.log(`   Vectors in Pinecone: ${vectorsUpserted}`);
    console.log(`   Namespace: v1`);

    // Step 5: Summary
    console.log(`\n📊 Summary:`);
    chapters.forEach(ch => {
      const chunkCount = allChunks.filter(chunk => chunk.chapter === ch.metadata.title).length;
      console.log(`   • ${ch.metadata.title}: ${chunkCount} chunks`);
    });

  } catch (error) {
    console.error('\n❌ Ingestion failed:', error.message);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

// Run ingestion
ingestContent();
