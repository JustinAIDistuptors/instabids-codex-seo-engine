import neo4j, { Driver, Session, QueryResult } from 'neo4j-driver';
import { env } from './env';
import { logger } from './logging';

// Define Neo4j connection configuration
let driver: Driver | null = null;

// Function to initialize the Neo4j driver
export function initNeo4j(): Driver | null {
  try {
    // Skip if Neo4j is not configured
    if (!env.NEO4J_URI || !env.NEO4J_USER || !env.NEO4J_PASSWORD) {
      logger.warn('Neo4j configuration is missing, knowledge graph functionality will be limited');
      return null;
    }

    // Create Neo4j driver
    driver = neo4j.driver(
      env.NEO4J_URI,
      neo4j.auth.basic(env.NEO4J_USER, env.NEO4J_PASSWORD),
      {
        maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
        maxConnectionPoolSize: 50,
        connectionAcquisitionTimeout: 30 * 1000, // 30 seconds
        disableLosslessIntegers: true,
      }
    );

    logger.info('Neo4j driver initialized successfully');
    return driver;
  } catch (error) {
    logger.error('Failed to initialize Neo4j driver:', error);
    return null;
  }
}

// Function to get the Neo4j driver instance
export function getDriver(): Driver | null {
  if (!driver) {
    return initNeo4j();
  }
  return driver;
}

// Function to get a Neo4j session
export function getSession(): Session | null {
  const driverInstance = getDriver();
  if (!driverInstance) {
    return null;
  }
  return driverInstance.session();
}

// Function to run a Cypher query
export async function runQuery(
  cypher: string,
  params: Record<string, any> = {}
): Promise<QueryResult> {
  const session = getSession();
  
  if (!session) {
    throw new Error('Neo4j session could not be established');
  }
  
  try {
    const result = await session.run(cypher, params);
    return result;
  } finally {
    await session.close();
  }
}

// Function to check Neo4j connection
export async function testNeo4jConnection(): Promise<boolean> {
  try {
    const session = getSession();
    
    if (!session) {
      return false;
    }
    
    await session.run('RETURN 1 AS result');
    await session.close();
    
    logger.info('✅ Neo4j connection established successfully');
    return true;
  } catch (error) {
    logger.error('❌ Unable to connect to Neo4j:', error);
    return false;
  }
}

// Function to close the Neo4j driver
export async function closeNeo4jDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    driver = null;
    logger.info('Neo4j driver closed');
  }
}

export default {
  initNeo4j,
  getDriver,
  getSession,
  runQuery,
  testNeo4jConnection,
  closeNeo4jDriver,
};
