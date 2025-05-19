import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { env } from './env';
import { httpLogStream } from './logging';

// Server configuration settings
export const serverConfig = {
  // Server settings
  port: env.PORT,
  host: '0.0.0.0', // Listen on all network interfaces
  
  // CORS configuration
  cors: {
    origin: env.NODE_ENV === 'production' 
      ? ['https://instabids.ai', /\.instabids\.ai$/] 
      : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count'],
    credentials: true,
    maxAge: 86400, // 24 hours
  },
  
  // Helmet security configuration
  helmet: {
    contentSecurityPolicy: env.NODE_ENV === 'production',
    crossOriginEmbedderPolicy: env.NODE_ENV === 'production',
    crossOriginOpenerPolicy: env.NODE_ENV === 'production',
    crossOriginResourcePolicy: env.NODE_ENV === 'production',
    dnsPrefetchControl: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: env.NODE_ENV === 'production',
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: true,
    referrerPolicy: true,
    xssFilter: true,
  },
  
  // Compression configuration
  compression: {
    level: 6, // Compression level (0-9)
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req: express.Request, res: express.Response) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later.',
  },
  
  // JSON body parser configuration
  bodyParser: {
    json: {
      limit: '1mb',
    },
    urlencoded: {
      extended: true,
      limit: '1mb',
    },
  },
  
  // Morgan logging configuration
  logging: {
    format: env.NODE_ENV === 'production' 
      ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
      : ':method :url :status :response-time ms - :res[content-length]',
    options: {
      stream: httpLogStream,
    },
  },
};

export default serverConfig;
