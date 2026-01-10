import { checkPineconeHealth } from '../lib/pinecone.js';
import { checkGroqHealth } from '../lib/groq.js';
import { checkOpenAIHealth } from '../lib/embeddings.js';

/**
 * Health Check API Endpoint
 * Verifies that all external services are accessible
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check all services in parallel
    const [pineconeHealthy, groqHealthy, openaiHealthy] = await Promise.all([
      checkPineconeHealth().catch(() => false),
      checkGroqHealth().catch(() => false),
      checkOpenAIHealth().catch(() => false)
    ]);

    const allHealthy = pineconeHealthy && groqHealthy && openaiHealthy;

    return res.status(allHealthy ? 200 : 503).json({
      status: allHealthy ? 'healthy' : 'degraded',
      services: {
        pinecone: pineconeHealthy ? 'connected' : 'unavailable',
        groq: groqHealthy ? 'available' : 'unavailable',
        openai: openaiHealthy ? 'available' : 'unavailable'
      },
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });

  } catch (error) {
    console.error('Error in /api/health:', error);

    return res.status(500).json({
      status: 'unhealthy',
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
}
