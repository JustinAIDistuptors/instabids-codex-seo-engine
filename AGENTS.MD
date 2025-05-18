# InstaBids SEO Engine - Codex Agent Instructions

## Project Context

You are building an autonomous SEO system for InstaBids.ai that generates thousands of unique, locally-relevant service pages targeting specific service+ZIP combinations (e.g., "Plumbers in 90210").

## System Architecture

This system follows a multi-agent architecture where specialized components handle different aspects of the pipeline. As a Codex agent, you'll be implementing the code for all these components:

### Orchestration Layer
- Central task management system
- Agent coordination
- Error handling and recovery
- Performance monitoring

### Specialized Agents
1. **Scout** - Data acquisition from competitors and SERPs
2. **Analyst** - Data processing and insight extraction
3. **Creator** - Content generation for pages
4. **Artist** - Image generation with local relevance
5. **Optimizer** - SEO enhancement and schema markup
6. **Publisher** - Deployment automation via GitHub/Vercel
7. **Sentinel** - Performance tracking and feedback

## Key Technologies

- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Sequelize ORM
- **Frontend**: Next.js with React
- **AI Integration**: OpenAI API
- **Deployment**: GitHub API and Vercel Integration
- **Monitoring**: Custom analytics + Google Search Console API

## Development Standards

1. **Code Organization**
   - Follow the established directory structure
   - Use clear module separation
   - Implement clean, maintainable code

2. **Error Handling**
   - Implement robust error handling throughout
   - Use try/catch for all asynchronous operations
   - Log errors with appropriate context

3. **Asynchronous Patterns**
   - Use async/await pattern consistently
   - Implement proper Promise handling
   - Avoid callback hell and nested Promises

4. **Type Safety**
   - Use TypeScript for all new code
   - Define interfaces for all data structures
   - Implement proper type guards

5. **Database Access**
   - Use Sequelize models consistently
   - Implement transactions for multi-step operations
   - Optimize queries for performance

6. **Security**
   - Validate all inputs
   - Sanitize content before storage
   - Use environment variables for sensitive data

7. **Testing**
   - Write unit tests for core functionality
   - Implement integration tests for critical paths
   - Use mocks for external dependencies

## Implementation Guidance

### Content Generation Pipeline

When implementing the content generation pipeline, follow these principles:

1. **Template Variation**:
   - Create multiple base templates for each service type
   - Implement dynamic sections for local customization
   - Ensure statistical uniqueness across pages

2. **Localization**:
   - Incorporate ZIP code demographic data
   - Reference local landmarks and characteristics
   - Adapt content tone to regional preferences

3. **SEO Optimization**:
   - Implement proper heading structures (H1, H2, etc.)
   - Create schema markup tailored to service types
   - Optimize meta tags for search engines

### Frontend Dashboard

For the administrative dashboard:

1. **User Experience**:
   - Create intuitive controls for pipeline management
   - Implement real-time status indicators
   - Design informative performance visualizations

2. **Monitoring Views**:
   - Create page performance dashboards
   - Implement filtering by service and location
   - Design alerts for critical issues

### Continuous Operation

For implementing the continuous operation loop:

1. **Task Management**:
   - Create a robust task queue system
   - Implement priority-based processing
   - Build in retry mechanisms with exponential backoff

2. **Performance Feedback**:
   - Implement metrics collection for all generated pages
   - Create analysis pipelines for performance data
   - Design feedback loops for content improvement

## Database Schema Guidance

Implement a database schema that supports:

1. **Service Taxonomy**:
   - Hierarchical service categories
   - Service-specific attributes and requirements
   - SEO keyword mapping

2. **Location Data**:
   - ZIP code storage with geographic data
   - Demographic information integration
   - Local business data linkage

3. **Generated Pages**:
   - Content versioning for A/B testing
   - Performance metrics storage
   - Change history tracking

4. **Task Management**:
   - Pipeline task status tracking
   - Agent activity logging
   - Error state persistence