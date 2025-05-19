import { env, checkRequiredServices } from './env';
import database, { testDatabaseConnection } from './database';
import ai from './ai';
import neo4j from './neo4j';
import logging from './logging';
import * as agentConfig from './agent-config';
import * as pipeline from './pipeline';
import server from './server';

// Export all configurations
export {
  // Environment and service configuration
  env,
  checkRequiredServices,
  
  // Database and persistence
  database,
  testDatabaseConnection,
  
  // AI services
  ai,
  
  // Knowledge graph
  neo4j,
  
  // Logging
  logging,
  
  // Agent system
  agentConfig,
  
  // Pipeline
  pipeline,
  
  // Server
  server,
};

// Export default configuration object
export default {
  env,
  database,
  ai,
  neo4j,
  logging,
  agentConfig,
  pipeline,
  server,
  
  // Service checks
  checks: {
    checkRequiredServices,
    testDatabaseConnection,
    testNeo4jConnection: neo4j.testNeo4jConnection,
  },
};
