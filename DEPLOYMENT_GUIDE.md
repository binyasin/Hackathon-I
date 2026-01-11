# 🚀 RAG Chatbot Deployment Guide

## Overview
This guide will help you deploy the RAG chatbot to production in ~30 minutes.

---

## Step 1: Get API Keys (15 minutes)

You need 3 API keys from free-tier services:

### 1.1 Groq API (LLM) - FREE ⚡

**Sign up**: https://console.groq.com/

1. Click "Sign up" (use GitHub or Google)
2. Verify your email
3. Navigate to "API Keys" in the left sidebar
4. Click "Create API Key"
5. Name it: `hackathon-chatbot`
6. **Copy the key** (starts with `gsk_...`)
7. ⚠️ Save it somewhere - you won't see it again!

**Example key**: `gsk_1234abcd5678efgh...`

---

### 1.2 Pinecone (Vector Database) - FREE 📌

**Sign up**: https://www.pinecone.io/

1. Click "Sign Up" (use email or Google)
2. Choose "Starter" plan (FREE)
3. Skip the tutorial/onboarding
4. Go to "API Keys" tab
5. **Copy your API Key**
6. **Copy your Environment** (e.g., `us-east-1-aws`)

**Example**:
- API Key: `12345678-abcd-1234-efgh-123456789abc`
- Environment: `us-east-1-aws`

---

### 1.3 OpenAI (Embeddings) - ~$5 💳

**Sign up**: https://platform.openai.com/

1. Click "Sign up"
2. Go to "Settings" → "Billing"
3. Click "Add payment method"
4. Add **$5 minimum** (actual cost will be ~$0.001 for this project)
5. Go to "API Keys"
6. Click "Create new secret key"
7. Name it: `hackathon-chatbot`
8. **Copy the key** (starts with `sk-...`)

**Note**: $5 credit will last for months. This project uses ~$0.001.

**Example key**: `sk-proj-abcd1234efgh5678...`

---

## Step 2: Create Pinecone Index (2 minutes)

**Go to**: https://app.pinecone.io/

1. Click "Create Index" button (top right)
2. Fill in the form:
   - **Name**: `textbook-v1`
   - **Dimensions**: `1536`
   - **Metric**: `cosine`
   - **Pod Type**: `s1.x1` (default, free tier)
3. Click "Create Index"
4. Wait ~30 seconds for it to initialize
5. You should see "Ready" status

✅ Your index is now ready to receive vectors!

---

## Step 3: Deploy Backend to Vercel (10 minutes)

### 3.1 Install Vercel CLI

Open a terminal and run:

```bash
npm install -g vercel
```

### 3.2 Login to Vercel

```bash
vercel login
```

This will open a browser window. Log in with GitHub, GitLab, Bitbucket, or email.

### 3.3 Deploy Backend

Navigate to the backend directory:

```bash
cd C:\Users\JOJIS\Desktop\Hackathon-I\backend
vercel --prod
```

**Follow the prompts:**

```
? Set up and deploy "backend"? [Y/n] y
? Which scope? Your Name
? Link to existing project? [y/N] n
? What's your project's name? hackathon-rag-backend
? In which directory is your code located? ./
```

**Wait for deployment** (~1-2 minutes)

When complete, you'll see:

```
✅  Production: https://hackathon-rag-backend-xxx.vercel.app [1s]
```

**✅ COPY THIS URL!** You'll need it later.

Example: `https://hackathon-rag-backend-abc123.vercel.app`

---

### 3.4 Add Environment Variables to Vercel

1. Go to https://vercel.com/dashboard
2. Find your project: `hackathon-rag-backend`
3. Click on it
4. Go to "Settings" tab
5. Click "Environment Variables" in left sidebar
6. Add **EACH** of these variables:

**Variable 1:**
- **Key**: `GROQ_API_KEY`
- **Value**: Your Groq key (starts with `gsk_...`)
- **Environment**: Production, Preview, Development (check all 3)
- Click "Save"

**Variable 2:**
- **Key**: `PINECONE_API_KEY`
- **Value**: Your Pinecone key
- **Environment**: All 3
- Click "Save"

**Variable 3:**
- **Key**: `PINECONE_INDEX_NAME`
- **Value**: `textbook-v1`
- **Environment**: All 3
- Click "Save"

**Variable 4:**
- **Key**: `PINECONE_ENVIRONMENT`
- **Value**: Your Pinecone environment (e.g., `us-east-1-aws`)
- **Environment**: All 3
- Click "Save"

**Variable 5:**
- **Key**: `OPENAI_API_KEY`
- **Value**: Your OpenAI key (starts with `sk-...`)
- **Environment**: All 3
- Click "Save"

✅ All 5 environment variables added!

---

### 3.5 Redeploy with Environment Variables

After adding environment variables, trigger a new deployment:

```bash
vercel --prod
```

Or click "Redeploy" in the Vercel dashboard.

---

## Step 4: Ingest Content to Pinecone (2 minutes)

Now we need to populate Pinecone with your textbook content.

### 4.1 Create Local .env File

```bash
cd C:\Users\JOJIS\Desktop\Hackathon-I\backend
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
GROQ_API_KEY=gsk_your_groq_key_here
PINECONE_API_KEY=your_pinecone_key_here
PINECONE_INDEX_NAME=textbook-v1
PINECONE_ENVIRONMENT=us-east-1-aws
OPENAI_API_KEY=sk_your_openai_key_here
```

Save the file.

### 4.2 Install Dependencies

```bash
npm install
```

### 4.3 Run Ingestion

```bash
npm run ingest
```

**Expected output:**

```
🚀 Starting content ingestion...

📚 Reading markdown files from: ...
✓ Loaded: ROS 2 as a Robotic Nervous System (5KB)
✓ Loaded: ROS 2 Communication Primitives (10KB)
✓ Loaded: Humanoid Robot Description with URDF (11KB)

📖 Total chapters loaded: 3

🔪 Chunking content...
  → ROS 2 as a Robotic Nervous System: 18 chunks
  → ROS 2 Communication Primitives: 22 chunks
  → Humanoid Robot Description with URDF: 24 chunks

✓ Total chunks created: 64

🧠 Generating embeddings with OpenAI...
Generated embeddings for batch 1: 64 texts
✓ Generated 64 embeddings

📌 Upserting vectors to Pinecone...
Upserted batch 1: 64 vectors

✅ Ingestion complete!
   Chapters: 3
   Chunks: 64
   Vectors in Pinecone: 64
   Namespace: v1
```

✅ Your textbook content is now in Pinecone!

---

## Step 5: Test Backend API (1 minute)

Test that your backend is working:

```bash
npm run test-query
```

**Expected output:**

```
🧪 Testing RAG pipeline...

Query: "What is ROS 2?"

1️⃣  Generating query embedding...
   ✓ Embedding generated (1536 dimensions)

2️⃣  Searching Pinecone for relevant chunks...
   ✓ Found 3 matches

📄 Top matches:
   1. [Score: 95%] ROS 2 as a Robotic Nervous System → What is ROS 2?
   2. [Score: 87%] ROS 2 as a Robotic Nervous System → The Nervous System Analogy
   3. [Score: 82%] ROS 2 Communication Primitives → Introduction

3️⃣  Context built (1200 tokens)

4️⃣  Generating response with Groq...
   ✓ Response generated (450 tokens)

🤖 AI Response:
────────────────────────────────────────────────────────────
ROS 2 is middleware that enables different software components of a robot to communicate with each other. It acts as a translation layer that allows various programs to exchange information seamlessly...
────────────────────────────────────────────────────────────

✅ RAG pipeline test successful!
```

If you see this, your backend is working! 🎉

---

## Step 6: Update Frontend Config (1 minute)

Now connect your frontend to the deployed backend.

Edit `front-end-book/my-website/docusaurus.config.js`:

**Find this line** (around line 41):

```javascript
customFields: {
  RAG_BACKEND_URL: process.env.RAG_BACKEND_URL || 'http://localhost:3000',
},
```

**Replace with your Vercel URL:**

```javascript
customFields: {
  RAG_BACKEND_URL: 'https://hackathon-rag-backend-abc123.vercel.app',
},
```

**⚠️ Important**: Use YOUR actual Vercel URL from Step 3.3!

---

## Step 7: Deploy Frontend (2 minutes)

Commit and push your changes:

```bash
cd C:\Users\JOJIS\Desktop\Hackathon-I
git add front-end-book/my-website/docusaurus.config.js
git commit -m "Configure production backend URL for RAG chatbot"
git push origin main
```

**Wait 2-3 minutes** for GitHub Actions to deploy.

Check deployment status: https://github.com/binyasin/Hackathon-I/actions

When it shows ✅ green checkmark, your site is live!

---

## Step 8: Test Live Site! 🎉

### 8.1 Open Your Site

Go to: **https://binyasin.github.io/Hackathon-I/**

### 8.2 Test the Chatbot

1. Navigate to **Module 1 → Chapter 1**
2. **Select this text**: "ROS 2 is middleware that enables different software components"
3. You should see **"💬 Ask AI" button** appear above the selection
4. **Click it** - a chat modal opens
5. The AI should respond with an answer about ROS 2!
6. Check the **sources** at the bottom - they should link to Chapter 1

### 8.3 Try More Questions

Ask follow-up questions:
- "Explain this in simpler terms"
- "How does this work in humanoid robots?"
- "What are the main components?"

All answers should cite sources from your textbook!

---

## 🎉 Success Checklist

If everything works, you should see:

- ✅ Site loads at `https://binyasin.github.io/Hackathon-I/`
- ✅ Diagrams display correctly
- ✅ Text selection shows "Ask AI" button
- ✅ Chat modal opens
- ✅ AI responds with relevant answers
- ✅ Sources cite specific chapters
- ✅ Links work and navigate to chapters
- ✅ Works on mobile (try resizing browser)

---

## 🐛 Troubleshooting

### Error: "Sorry, I encountered an error"

**Check:**
1. Is your Vercel backend URL correct in `docusaurus.config.js`?
2. Are all 5 environment variables set in Vercel?
3. Did you redeploy after adding environment variables?
4. Is the Pinecone index created and populated?

**Test backend directly:**
```bash
curl -X POST https://your-backend.vercel.app/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"What is ROS 2?"}'
```

Should return JSON with an answer.

---

### Error: "This topic is not covered"

**Cause**: Pinecone index is empty or ingestion failed.

**Fix**: Run `npm run ingest` again in the backend directory.

---

### Error: "Rate limit exceeded"

**Cause**: Too many requests in a short time (Groq free tier limit).

**Fix**: Wait 1 minute and try again.

---

### API Keys Not Working

**Check:**
1. Did you copy the full key (no spaces)?
2. Is the key still active? (didn't expire or get deleted)
3. For OpenAI: Do you have credits? Check billing dashboard

---

## 📊 Monitor Usage (Optional)

### Groq Dashboard
https://console.groq.com/usage

- Check requests per minute
- Free tier: 100 requests/min

### Pinecone Dashboard
https://app.pinecone.io/

- Check vectors count (should be ~64)
- Check query count

### OpenAI Dashboard
https://platform.openai.com/usage

- Check API usage (should be ~$0.001)

---

## 🏆 Demo for Judges

### Demo Script:

1. **Show the textbook**: "This is an interactive textbook for learning ROS 2"
2. **Navigate to Chapter 1**: "Let me show you a cool feature"
3. **Select text**: Highlight "ROS 2 is middleware..."
4. **Click "Ask AI"**: "I can ask AI about any concept"
5. **Show response**: "It gives me an explanation"
6. **Show sources**: "And cites where in the textbook this info comes from"
7. **Ask follow-up**: "I can have a conversation about the topic"
8. **Show mobile**: Resize browser to show it's mobile-responsive

### Key Points to Mention:

- 100% free-tier infrastructure (Vercel + Groq + Pinecone)
- Ultra-fast responses (<5 seconds with Groq)
- Accurate answers grounded in textbook content
- Source attribution for trustworthiness
- Built in 2 days for the hackathon

---

## 📈 Next Steps (If Time Permits)

1. Add more content (Module 2, Module 3)
2. Improve prompt engineering for better answers
3. Add conversation history persistence (localStorage)
4. Add usage analytics
5. Create a video demo

---

## ✅ You're Done!

Congratulations! You now have a fully functional AI-powered textbook with:
- 3 complete chapters on ROS 2
- 5 professional diagrams
- Interactive RAG chatbot
- Source citations
- Mobile-responsive design
- Production deployment

**Live URL**: https://binyasin.github.io/Hackathon-I/

Share this with judges, friends, and on social media! 🚀

---

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review `backend/README.md`
3. Check Vercel deployment logs
4. Test backend API directly with cURL

Good luck with your hackathon! 🎉
