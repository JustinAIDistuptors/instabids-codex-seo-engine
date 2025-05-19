# Backend Server

This directory contains the backend server implementation for the InstaBids SEO Engine.

## Directory Structure

- `/config` - Configuration files and environment setup
- `/controllers` - API controllers for handling HTTP requests
- `/db` - Database models, migrations, and seeds
- `/middleware` - Express middleware functions
- `/routes` - API routes definition
- `/services` - Core business logic services
  - `/agents` - Agent implementations
  - `/pipeline` - Pipeline orchestration logic
  - `/knowledge` - Knowledge graph and data management
  - `/content` - Content generation and manipulation
  - `/seo` - SEO optimization utilities
- `/utils` - Utility functions and helpers
- `app.js` - Express application setup
- `server.js` - Server entry point

## Application Flow

1. Client makes a request to an API endpoint
2. Request is processed through middleware (auth, validation, etc.)
3. Route handler delegates to appropriate controller
4. Controller uses services to perform operations
5. Services interact with databases, external APIs, and agent systems
6. Response is returned to the client

## Key Services

- **AgentService** - Factory for creating and managing different agent types
- **PipelineService** - Manages task flows and agent coordination
- **KnowledgeService** - Handles knowledge graph operations
- **ContentService** - Manages content generation and processing
- **SEOService** - Handles SEO optimization and schema markup
- **PublishService** - Manages deployments to GitHub/Vercel
- **MonitoringService** - Tracks performance and metrics
