import { z } from 'zod';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Define environment variable schema with validation
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().positive().default(3001),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  AGENT_CONCURRENCY: z.coerce.number().int().positive().default(5),

  // Database
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().positive().default(5432),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string(),

  // OpenAI API
  OPENAI_API_KEY: z.string().min(1),

  // Neo4j (Knowledge Graph) - optional for local development without Neo4j
  NEO4J_URI: z.string().url().optional(),
  NEO4J_USER: z.string().optional(),
  NEO4J_PASSWORD: z.string().optional(),

  // Pinecone (Vector DB) - optional for local development without Pinecone
  PINECONE_API_KEY: z.string().optional(),
  PINECONE_ENVIRONMENT: z.string().optional(),
  PINECONE_INDEX: z.string().optional(),

  // GitHub API (for deployment) - optional for local development
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_OWNER: z.string().optional(),
  GITHUB_REPO: z.string().optional(),
  GITHUB_BRANCH: z.string().default('main'),

  // Vercel (for deployment) - optional for local development
  VERCEL_TOKEN: z.string().optional(),
  VERCEL_PROJECT_ID: z.string().optional(),
  VERCEL_TEAM_ID: z.string().optional(),

  // SEO Tools - optional for local development
  SERPAPI_KEY: z.string().optional(),
  
  // Content Generation Settings
  MIN_CONTENT_LENGTH: z.coerce.number().int().positive().default(1500),
  MAX_CONTENT_LENGTH: z.coerce.number().int().positive().default(3000),
  DEFAULT_CONTENT_TEMPERATURE: z.coerce.number().min(0).max(1).default(0.7),
  ENABLE_LOCAL_LANDMARKS: z.coerce.boolean().default(true),
  ENABLE_IMAGE_GENERATION: z.coerce.boolean().default(true),

  // Task Scheduling
  ENABLE_SCHEDULER: z.coerce.boolean().default(false),
  MAX_TASKS_PER_RUN: z.coerce.number().int().positive().default(50),
  SCHEDULER_CRON_EXPRESSION: z.string().default('0 0 * * *'),

  // Security
  JWT_SECRET: z.string().min(32).optional(),
  SESSION_SECRET: z.string().min(32).optional(),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().positive().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().positive().default(100),
});

// Parse and validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Function to check if required third-party services are configured
export function checkRequiredServices() {
  const warnings: string[] = [];
  
  // Check OpenAI - required for all environments
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required for the application to function');
  }
  
  // Check Neo4j in production
  if (env.NODE_ENV === 'production' && (!env.NEO4J_URI || !env.NEO4J_USER || !env.NEO4J_PASSWORD)) {
    warnings.push('Neo4j configuration is missing in production environment');
  }
  
  // Check Pinecone in production
  if (env.NODE_ENV === 'production' && (!env.PINECONE_API_KEY || !env.PINECONE_ENVIRONMENT || !env.PINECONE_INDEX)) {
    warnings.push('Pinecone configuration is missing in production environment');
  }
  
  // Check GitHub in production
  if (env.NODE_ENV === 'production' && (!env.GITHUB_TOKEN || !env.GITHUB_OWNER || !env.GITHUB_REPO)) {
    warnings.push('GitHub configuration is missing in production environment');
  }
  
  // Log warnings
  if (warnings.length > 0) {
    console.warn('⚠️ Environment configuration warnings:');
    warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
  
  return warnings.length === 0;
}

// Export default check
export default { env, checkRequiredServices };
