import { generateEmbedding } from '../lib/embeddings.js';
import { queryPinecone } from '../lib/pinecone.js';
import { generateResponse } from '../lib/groq.js';

/**
 * RAG Query API Endpoint
 * Handles user questions by retrieving relevant context and generating answers
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://binyasin.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, conversation_history = [] } = req.body;

    // Validate input
    if (!query || query.trim().length < 3) {
      return res.status(400).json({
        error: 'Query must be at least 3 characters long'
      });
    }

    console.log(`\n🔍 Query: "${query}"`);

    // Step 1: Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);
    console.log(`✓ Query embedded`);

    // Step 2: Search Pinecone for relevant chunks
    const matches = await queryPinecone(queryEmbedding, {
      topK: 5,
      namespace: 'v1'
    });

    if (matches.length === 0) {
      return res.status(200).json({
        answer: 'I could not find relevant information in the textbook to answer this question. Please try rephrasing or ask about topics covered in the ROS 2 modules.',
        sources: [],
        tokens_used: 0
      });
    }

    console.log(`✓ Found ${matches.length} relevant chunks`);

    // Step 3: Build context from top matches (top 3 for token efficiency)
    const topMatches = matches.slice(0, 3);
    const context = topMatches.map(m => {
      const metadata = m.metadata;
      return `[From "${metadata.chapter}" - ${metadata.heading}]\n${metadata.text}`;
    }).join('\n\n---\n\n');

    console.log(`✓ Context built (${Math.ceil(context.length / 4)} tokens)`);

    // Step 4: Generate response using Groq
    const response = await generateResponse(query, context, conversation_history);
    console.log(`✓ Response generated (${response.usage?.total_tokens || 0} tokens)`);

    // Step 5: Extract source citations
    const sources = topMatches.map(m => ({
      chapter: m.metadata.chapter,
      section: m.metadata.heading,
      url: m.metadata.url,
      relevance_score: Math.round(m.score * 100) / 100 // Round to 2 decimals
    }));

    // Return successful response
    return res.status(200).json({
      answer: response.content,
      sources,
      tokens_used: response.usage?.total_tokens || 0,
      model: response.model
    });

  } catch (error) {
    console.error('❌ Error in /api/query:', error);

    // Handle specific errors
    if (error.message.includes('Rate limit')) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a moment.',
        retry_after: 60
      });
    }

    if (error.message.includes('API key')) {
      return res.status(500).json({
        error: 'Service configuration error. Please contact support.'
      });
    }

    // Generic error response
    return res.status(500).json({
      error: 'An error occurred while processing your question. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
