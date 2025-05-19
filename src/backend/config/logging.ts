import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { env } from './env';

// Ensure logs directory exists
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Custom log format with colors for console
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// File log format (no colors)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json()
);

// Create the main logger
export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  levels: winston.config.npm.levels,
  format: fileFormat,
  defaultMeta: { service: 'instabids-seo-engine' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: consoleFormat,
    }),
    
    // Info file transport
    new winston.transports.File({
      filename: path.join(logDir, 'app.log'),
      level: 'info',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // Error file transport (separate)
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

// Create a specialized agent logger
export const agentLogger = winston.createLogger({
  level: env.LOG_LEVEL,
  levels: winston.config.npm.levels,
  format: fileFormat,
  defaultMeta: { service: 'agent-system' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: consoleFormat,
    }),
    
    // Agent file transport
    new winston.transports.File({
      filename: path.join(logDir, 'agents.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

// Stream for Morgan HTTP logger integration
export const httpLogStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Create a factory function for agent-specific loggers
export function createAgentLogger(agentType: string, agentId: string) {
  return winston.createLogger({
    level: env.LOG_LEVEL,
    levels: winston.config.npm.levels,
    format: fileFormat,
    defaultMeta: { service: 'agent-system', agentType, agentId },
    transports: [
      // Console transport (only in development)
      ...(env.NODE_ENV === 'development' 
        ? [new winston.transports.Console({ format: consoleFormat })]
        : []),
      
      // Agent-specific file transport
      new winston.transports.File({
        filename: path.join(logDir, `agent-${agentType}-${agentId}.log`),
        maxsize: 1048576, // 1MB
        maxFiles: 3,
      }),
      
      // Combined agents file
      new winston.transports.File({
        filename: path.join(logDir, 'agents.log'),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    ],
    exitOnError: false,
  });
}

export default { 
  logger,
  agentLogger,
  createAgentLogger,
  httpLogStream
};
