# Knowledge Graph Framework

This directory contains the knowledge representation framework for the InstaBids SEO Engine. The system uses graph-based representations to store and process knowledge about the codebase, services, locations, and content.

## Knowledge Graph Schema

The system uses a multi-layered knowledge graph approach:

1. **Codebase Knowledge Graph**
   - Represents the structure, dependencies, and relationships within the codebase
   - Nodes: files, functions, classes, modules
   - Edges: imports, calls, extends, implements

2. **Service Taxonomy Graph**
   - Represents the hierarchy and relationships between service types
   - Nodes: service categories, specific services, attributes
   - Edges: is-a, has-attribute, related-to

3. **Location Knowledge Graph**
   - Represents geographical and demographic knowledge
   - Nodes: ZIP codes, cities, neighborhoods, landmarks
   - Edges: contains, near, has-demographic

4. **Content Knowledge Graph**
   - Represents generated content, templates, patterns, and performance
   - Nodes: pages, templates, sections, keywords
   - Edges: uses-template, contains-keyword, performs-at

## Graph Storage and Access

The knowledge graphs are stored in two formats:

1. **Static Export Files**
   - JSON/GraphML exports for human readability and version control
   - AST exports for codebase representation
   - Dependency graph snapshots

2. **Live Database Storage**
   - Neo4j graph database for complex queries and traversals
   - Vector embeddings for semantic similarity queries

## Graph Generation and Maintenance

The knowledge graphs are generated and maintained through:

1. **Static Analysis**
   - Code parsing and AST generation
   - Dependency analysis
   - Structure extraction

2. **Dynamic Learning**
   - Performance feedback incorporation
   - Content pattern extraction
   - Relationship discovery

## Integration with Agents

Agents interact with the knowledge graphs through:

1. **Query Interface**
   - Cypher queries for Neo4j
   - GraphQL-style queries for in-memory graphs

2. **Traversal API**
   - Path finding
   - Neighborhood exploration
   - Similarity search

3. **Update API**
   - Adding new nodes and relationships
   - Updating properties
   - Versioning changes

By maintaining these knowledge graphs, agents can develop a deep understanding of the project context, facilitating more intelligent decision-making and generation.
