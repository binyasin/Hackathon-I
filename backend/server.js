/**
 * Local development server for testing backend API
 * This mimics Vercel's serverless function behavior locally
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, '.env.local') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000', 'https://binyasin.github.io'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const { default: healthHandler } = await import('./api/health.js');

    // Mimic Vercel's req/res objects
    const mockReq = { method: 'GET', query: req.query };
    const mockRes = {
      status: (code) => {
        res.status(code);
        return mockRes;
      },
      json: (data) => res.json(data),
      send: (data) => res.send(data),
      setHeader: (key, value) => res.setHeader(key, value)
    };

    await healthHandler(mockReq, mockRes);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ error: 'Health check failed', details: error.message });
  }
});

// Query endpoint
app.post('/api/query', async (req, res) => {
  try {
    const { default: queryHandler } = await import('./api/query.js');

    // Mimic Vercel's req/res objects
    const mockReq = {
      method: 'POST',
      body: req.body,
      query: req.query,
      headers: req.headers
    };
    const mockRes = {
      status: (code) => {
        res.status(code);
        return mockRes;
      },
      json: (data) => res.json(data),
      send: (data) => res.send(data),
      setHeader: (key, value) => res.setHeader(key, value)
    };

    await queryHandler(mockReq, mockRes);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({
      error: 'Query processing failed',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Query endpoint: http://localhost:${PORT}/api/query`);
  console.log(`\n✅ Environment variables loaded from .env.local`);
  console.log(`   - GROQ_API_KEY: ${process.env.GROQ_API_KEY ? '✓' : '✗'}`);
  console.log(`   - PINECONE_API_KEY: ${process.env.PINECONE_API_KEY ? '✓' : '✗'}`);
  console.log(`   - PINECONE_INDEX_NAME: ${process.env.PINECONE_INDEX_NAME || 'not set'}`);
  console.log(`   - PINECONE_HOST: ${process.env.PINECONE_HOST ? '✓' : '✗'}`);
  console.log(`   - OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✓' : '✗'}`);
});
