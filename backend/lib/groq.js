import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * System prompt for the textbook assistant
 * Enforces strict adherence to provided context
 */
const SYSTEM_PROMPT = `You are an AI teaching assistant for the "Physical AI & Humanoid Robotics — Essentials" textbook. Your role is to answer questions STRICTLY based on the provided textbook content.

RULES:
1. Answer ONLY from the context provided below. Do not use external knowledge.
2. If the answer is not in the context, respond exactly: "This topic is not covered in the current edition of the textbook. Please refer to the official ROS 2 documentation for additional resources."
3. Cite the relevant section or chapter when answering (e.g., "As explained in Chapter 1...").
4. Use clear, educational language matching the textbook's beginner-friendly tone.
5. If the query is ambiguous, ask a clarifying question.
6. Keep answers concise (2-4 paragraphs maximum).
7. Do not hallucinate or invent information not present in the context.

CONTEXT:
{context}`;

/**
 * Generate response using Groq LLM
 * @param {string} query - User's question
 * @param {string} context - Retrieved textbook context
 * @param {Array} conversationHistory - Previous messages (optional)
 * @returns {Promise<Object>} Response with content and usage stats
 */
export async function generateResponse(query, context, conversationHistory = []) {
  if (!query || query.trim().length === 0) {
    throw new Error('Query cannot be empty');
  }

  if (!context || context.trim().length === 0) {
    throw new Error('Context cannot be empty');
  }

  // Build system prompt with context
  const systemPromptWithContext = SYSTEM_PROMPT.replace('{context}', context);

  // Build messages array
  const messages = [
    { role: 'system', content: systemPromptWithContext },
    ...conversationHistory.slice(-4), // Last 2 exchanges (4 messages)
    { role: 'user', content: query }
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.3, // Low temperature for factual accuracy
      max_tokens: 500,
      top_p: 0.9,
      stream: false
    });

    return {
      content: completion.choices[0].message.content,
      usage: completion.usage,
      model: completion.model,
      finish_reason: completion.choices[0].finish_reason
    };
  } catch (error) {
    console.error('Error generating response with Groq:', error);

    // Handle rate limiting
    if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }

    throw new Error(`Response generation failed: ${error.message}`);
  }
}

/**
 * Generate streaming response using Groq LLM
 * Useful for real-time UI updates
 * @param {string} query - User's question
 * @param {string} context - Retrieved textbook context
 * @param {Array} conversationHistory - Previous messages (optional)
 * @returns {Promise<AsyncIterable>} Streaming response chunks
 */
export async function generateStreamingResponse(query, context, conversationHistory = []) {
  const systemPromptWithContext = SYSTEM_PROMPT.replace('{context}', context);

  const messages = [
    { role: 'system', content: systemPromptWithContext },
    ...conversationHistory.slice(-4),
    { role: 'user', content: query }
  ];

  try {
    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.3,
      max_tokens: 500,
      top_p: 0.9,
      stream: true
    });

    return stream;
  } catch (error) {
    console.error('Error generating streaming response:', error);
    throw new Error(`Streaming response generation failed: ${error.message}`);
  }
}

/**
 * Check if Groq API is accessible
 * @returns {Promise<boolean>}
 */
export async function checkGroqHealth() {
  try {
    await groq.models.list();
    return true;
  } catch (error) {
    console.error('Groq health check failed:', error);
    return false;
  }
}

export default { generateResponse, generateStreamingResponse, checkGroqHealth };
