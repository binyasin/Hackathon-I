# RAG Chatbot Backend

Backend API for the Physical AI & Humanoid Robotics textbook chatbot.

## Tech Stack

- **Serverless**: Vercel Functions
- **LLM**: Groq API (llama-3.3-70b-versatile)
- **Vector DB**: Pinecone
- **Embeddings**: OpenAI text-embedding-3-small

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup API Keys

Create `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Fill in your API keys:
- **Groq**: https://console.groq.com/
- **Pinecone**: https://www.pinecone.io/
- **OpenAI**: https://platform.openai.com/

### 3. Create Pinecone Index

1. Login to Pinecone console
2. Create new index:
   - Name: `textbook-v1`
   - Dimensions: `1536`
   - Metric: `cosine`
   - Region: `us-east-1-aws` (or your preferred region)

### 4. Ingest Content

Run the ingestion script to chunk and embed textbook content:

```bash
npm run ingest
```

Expected output: `~60 vectors inserted to Pinecone`

### 5. Test Locally

```bash
npm run dev
```

Test the query endpoint:

```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is ROS 2?"}'
```

### 6. Deploy to Vercel

```bash
npm run deploy
```

Or push to GitHub and connect Vercel project.

## API Endpoints

### POST /api/query

Query the chatbot with a question.

**Request:**
```json
{
  "query": "What is ROS 2?",
  "conversation_history": []
}
```

**Response:**
```json
{
  "answer": "ROS 2 is middleware that enables...",
  "sources": [
    {
      "chapter": "ROS 2 as a Robotic Nervous System",
      "section": "What is ROS 2?",
      "url": "https://binyasin.github.io/Hackathon-I/module1/chapter1",
      "relevance_score": 0.95
    }
  ],
  "tokens_used": 450
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "pinecone_connected": true,
  "groq_available": true
}
```

## Environment Variables (Vercel)

Add these in Vercel Dashboard → Settings → Environment Variables:

- `GROQ_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_INDEX_NAME`
- `PINECONE_ENVIRONMENT`
- `OPENAI_API_KEY`

## File Structure

```
backend/
├── api/
│   ├── query.js          # Main RAG endpoint
│   └── health.js         # Health check
├── lib/
│   ├── pinecone.js       # Pinecone client
│   ├── groq.js           # Groq API client
│   ├── embeddings.js     # OpenAI embeddings
│   └── chunker.js        # Content chunking
├── scripts/
│   └── ingest-content.js # Content ingestion
├── package.json
├── vercel.json
└── .env.example
```

## Troubleshooting

### "Pinecone index not found"
- Verify index name matches `PINECONE_INDEX_NAME`
- Check index exists in Pinecone console

### "Groq API rate limit exceeded"
- Free tier: 100 req/min
- Wait 1 minute and retry
- Consider implementing rate limiting

### "OpenAI API error"
- Check API key is valid
- Verify account has credits

### CORS errors
- Ensure CORS headers are set in `api/query.js`
- Verify frontend URL matches allowed origin
