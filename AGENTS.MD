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

## AI Framework Architecture

The project uses a sophisticated architecture for AI agent operation:

### Memory Management
- Located in `.ai/memory/`
- Short-term memory for task context
- Long-term memory for learned patterns
- Semantic memory integrated with knowledge graphs

### Knowledge Representation
- Located in `.ai/knowledge/`
- Codebase knowledge graph
- Service taxonomy graph
- Location knowledge graph
- Content knowledge graph

### Agent Configuration
- Located in `.ai/configs/`
- Individual agent configurations in JSON
- Tool access controls
- Memory capacity settings
- Model parameters

### Prompt Templates
- Located in `.ai/prompts/`
- System prompts
- Task prompts
- Refinement prompts
- Meta prompts for orchestration

## Codex-Specific Guidelines

When building this system, leverage Codex's capabilities effectively:

### Context Window Management
- Keep files under 4000 lines to fit within Codex's 192K token context window
- Use meaningful file and function names for better context understanding
- Implement imports/exports to manage dependencies clearly

### Parallel Task Execution
- Design the system for Codex's ability to handle concurrent tasks
- Use asynchronous patterns consistently
- Structure the codebase for parallel agent operation

### Pattern Recognition
- Provide clear examples for Codex to follow
- Use consistent patterns across similar components
- Document pattern intentions in comments

### Error Handling
- Implement robust error handling as Codex may miss edge cases
- Use type definitions to guide Codex's code generation
- Add validation for critical functions

## Key Technologies

- **Backend**: Node.js with Express, TypeScript
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

## Additional Resources

- For detailed system context, refer to `project_info.txt`
- For agent memory architecture, see `.ai/memory/README.md`
- For knowledge representation, see `.ai/knowledge/README.md`
- For agent configuration schema, see `.ai/configs/README.md`
- For prompt templates, see `.ai/prompts/README.md`

## Special Codex Features to Utilize

1. **Natural Language Understanding**: You can process and generate rich textual content for landing pages.
2. **Code Generation**: You can create entire modules, components, or functions from descriptions.
3. **Pattern Completion**: You can extend existing code patterns to new use cases.
4. **Problem Solving**: You can debug issues and propose solutions based on context.
5. **Architecture Design**: You can help design scalable system components.

Remember to break large tasks into smaller, manageable chunks that align with your context window limits. When generating new code, maintain consistency with existing patterns and follow the established architectural principles.
