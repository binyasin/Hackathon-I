import { generateEmbedding } from '../lib/embeddings.js';
import { queryPinecone } from '../lib/pinecone.js';
import { generateResponse } from '../lib/groq.js';

/**
 * Test script to verify RAG pipeline works end-to-end
 */
async function testQuery() {
  const testQuery = 'What is ROS 2?';

  console.log('\n🧪 Testing RAG pipeline...\n');
  console.log(`Query: "${testQuery}"\n`);

  try {
    // Step 1: Embed query
    console.log('1️⃣  Generating query embedding...');
    const queryEmbedding = await generateEmbedding(testQuery);
    console.log(`   ✓ Embedding generated (${queryEmbedding.length} dimensions)\n`);

    // Step 2: Search Pinecone
    console.log('2️⃣  Searching Pinecone for relevant chunks...');
    const matches = await queryPinecone(queryEmbedding, { topK: 3 });
    console.log(`   ✓ Found ${matches.length} matches\n`);

    if (matches.length === 0) {
      console.log('❌ No matches found. Did you run ingestion? (npm run ingest)');
      return;
    }

    // Display matches
    console.log('📄 Top matches:');
    matches.forEach((match, i) => {
      console.log(`   ${i + 1}. [Score: ${Math.round(match.score * 100)}%] ${match.metadata.chapter} → ${match.metadata.heading}`);
    });
    console.log();

    // Step 3: Build context
    const context = matches.map(m => m.metadata.text).join('\n\n---\n\n');
    console.log(`3️⃣  Context built (${Math.ceil(context.length / 4)} tokens)\n`);

    // Step 4: Generate response
    console.log('4️⃣  Generating response with Groq...');
    const response = await generateResponse(testQuery, context);
    console.log(`   ✓ Response generated (${response.usage?.total_tokens || 0} tokens)\n`);

    // Display result
    console.log('🤖 AI Response:');
    console.log('─'.repeat(60));
    console.log(response.content);
    console.log('─'.repeat(60));

    console.log('\n✅ RAG pipeline test successful!\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

// Run test
testQuery();
