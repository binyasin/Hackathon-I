import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// Get index reference
const indexName = process.env.PINECONE_INDEX_NAME || 'textbook-v1';
const index = pinecone.index(indexName);

/**
 * Upsert vectors to Pinecone index
 * @param {Array} chunks - Array of text chunks with metadata
 * @param {Array} embeddings - Array of embedding vectors
 * @param {string} namespace - Namespace for versioning (default: 'v1')
 * @returns {Promise<number>} Number of vectors upserted
 */
export async function upsertVectors(chunks, embeddings, namespace = 'v1') {
  if (chunks.length !== embeddings.length) {
    throw new Error('Chunks and embeddings array length mismatch');
  }

  const vectors = chunks.map((chunk, i) => ({
    id: chunk.id,
    values: embeddings[i],
    metadata: {
      text: chunk.text,
      heading: chunk.heading,
      chapter: chunk.chapter,
      keywords: chunk.keywords || [],
      difficulty: chunk.difficulty,
      url: chunk.url || `https://binyasin.github.io/Hackathon-I/module1/${chunk.id.split('_')[0]}`
    }
  }));

  // Batch upsert in chunks of 100
  const batchSize = 100;
  let totalUpserted = 0;

  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);
    await index.namespace(namespace).upsert(batch);
    totalUpserted += batch.length;
    console.log(`Upserted batch ${Math.floor(i / batchSize) + 1}: ${batch.length} vectors`);
  }

  return totalUpserted;
}

/**
 * Query Pinecone for similar vectors
 * @param {Array} embedding - Query embedding vector
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of matches with metadata
 */
export async function queryPinecone(embedding, options = {}) {
  const {
    topK = 5,
    namespace = 'v1',
    filter = {},
    includeValues = false
  } = options;

  const results = await index.namespace(namespace).query({
    vector: embedding,
    topK,
    includeMetadata: true,
    includeValues,
    filter
  });

  return results.matches || [];
}

/**
 * Check if Pinecone connection is healthy
 * @returns {Promise<boolean>}
 */
export async function checkPineconeHealth() {
  try {
    const stats = await index.describeIndexStats();
    return stats.totalRecordCount > 0;
  } catch (error) {
    console.error('Pinecone health check failed:', error);
    return false;
  }
}

export default { upsertVectors, queryPinecone, checkPineconeHealth };
