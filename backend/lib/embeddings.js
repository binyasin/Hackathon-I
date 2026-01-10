import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate embedding for a single text string
 * @param {string} text - Text to embed
 * @returns {Promise<Array>} Embedding vector (1536 dimensions)
 */
export async function generateEmbedding(text) {
  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error(`Embedding generation failed: ${error.message}`);
  }
}

/**
 * Generate embeddings for multiple texts in batch
 * @param {Array<string>} texts - Array of texts to embed
 * @returns {Promise<Array<Array>>} Array of embedding vectors
 */
export async function generateEmbeddingsBatch(texts) {
  if (!Array.isArray(texts) || texts.length === 0) {
    throw new Error('Texts must be a non-empty array');
  }

  // OpenAI allows batch embedding (max 2048 inputs per request)
  const batchSize = 100; // Conservative batch size
  const allEmbeddings = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);

    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: batch,
      });

      const batchEmbeddings = response.data.map(item => item.embedding);
      allEmbeddings.push(...batchEmbeddings);

      console.log(`Generated embeddings for batch ${Math.floor(i / batchSize) + 1}: ${batch.length} texts`);
    } catch (error) {
      console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, error);
      throw error;
    }
  }

  return allEmbeddings;
}

/**
 * Check if OpenAI API is accessible
 * @returns {Promise<boolean>}
 */
export async function checkOpenAIHealth() {
  try {
    await openai.models.list();
    return true;
  } catch (error) {
    console.error('OpenAI health check failed:', error);
    return false;
  }
}

export default { generateEmbedding, generateEmbeddingsBatch, checkOpenAIHealth };
