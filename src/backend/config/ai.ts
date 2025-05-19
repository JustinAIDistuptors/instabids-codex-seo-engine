import OpenAI from 'openai';
import { env } from './env';

// OpenAI client instance
export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

// Model configuration for different use cases
export const aiModels = {
  // Primary models for agent system
  orchestrator: {
    model: 'gpt-4-turbo',
    temperature: 0.2,
    maxTokens: 4096,
  },
  scout: {
    model: 'gpt-4-turbo',
    temperature: 0.3,
    maxTokens: 2048,
  },
  analyst: {
    model: 'gpt-4-turbo',
    temperature: 0.1,
    maxTokens: 4096,
  },
  creator: {
    model: 'gpt-4-turbo',
    temperature: 0.7,
    maxTokens: env.MAX_CONTENT_LENGTH,
  },
  optimizer: {
    model: 'gpt-4-turbo',
    temperature: 0.2,
    maxTokens: 2048,
  },
  // Embedding model for vector search
  embedding: {
    model: 'text-embedding-3-large',
  },
};

// Function to generate embeddings for vector search
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: aiModels.embedding.model,
      input: text,
    });
    
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate text embedding');
  }
}

// Chat completion function with retry logic
export async function createChatCompletion(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  model: string = aiModels.creator.model,
  temperature: number = aiModels.creator.temperature,
  maxTokens: number = aiModels.creator.maxTokens,
  retries: number = 3
): Promise<string> {
  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt < retries) {
    try {
      const completion = await openai.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      });

      return completion.choices[0].message.content || '';
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error during chat completion');
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      attempt++;
    }
  }

  // If all retries failed
  throw lastError || new Error('Failed to complete chat completion after retries');
}

export default {
  openai,
  aiModels,
  generateEmbedding,
  createChatCompletion,
};
