# Agent Memory Framework

This directory contains the memory management system for agents in the InstaBids SEO Engine. The framework provides both short-term and long-term memory capabilities for agents to maintain context and learn from experience.

## Memory Architecture

The system implements a multi-layered memory architecture:

### 1. Short-Term Memory (Working Memory)
- Stores context for the current task execution
- Maintains conversation history for multi-turn interactions
- Tracks temporary variables and intermediate results
- Automatically clears after task completion or configurable timeout
- Stored as JSON files with timestamp prefixes

### 2. Long-Term Memory (Episodic Memory)
- Stores summaries of completed tasks and their outcomes
- Records successful patterns and approaches
- Maintains a history of errors and their resolutions
- Implemented using a combination of:
  - Chronological logs (JSON files with metadata)
  - Vector embeddings for semantic retrieval
  - Graph-based relationships between memory entries

### 3. Semantic Memory (Knowledge Base)
- Stores factual information about services, locations, patterns, etc.
- Maintains learned heuristics and rules
- Contains stable, refined knowledge extracted from experiences
- Integrated with the Knowledge Graph system

## Memory Operations

The memory system supports the following operations:

### Storage
- `store_short_term(agent_id, key, value, expiration)` - Store a value in short-term memory
- `store_episodic(agent_id, episode_data, metadata)` - Store an episode in long-term memory
- `store_semantic(fact_data, confidence_score)` - Store a fact in semantic memory

### Retrieval
- `get_short_term(agent_id, key)` - Retrieve a value from short-term memory
- `search_episodic(agent_id, query, limit)` - Search episodic memory for relevant experiences
- `semantic_lookup(query, threshold)` - Look up facts in semantic memory

### Consolidation
- `consolidate_episodes(agent_id, time_range)` - Extract patterns from episodic memory
- `extract_rules(agent_id, confidence_threshold)` - Generate rules from experiences
- `update_knowledge_graph(patterns, rules)` - Update semantic knowledge

## Memory Persistence

The memory system uses a multi-tiered persistence strategy:

1. **Active Memory**
   - In-memory storage for currently active agents
   - Fast access, ephemeral

2. **Local Storage**
   - JSON files for short-term persistence
   - Used for restarts and recovery
   - Directory structure organized by agent and memory type

3. **Database Storage**
   - Long-term storage in PostgreSQL
   - Vector database for embeddings (Pinecone or similar)
   - Graph database for relationships (Neo4j)

## Integration with Codex

Codex agents interact with the memory system through:

1. **Context Window Management**
   - Smart loading of relevant memory into Codex's context window
   - Prioritization based on relevance and recency
   - Compression of memory entries to maximize context utilization

2. **Memory Reflection**
   - Periodic prompting of agents to reflect on and consolidate memories
   - Extraction of patterns and heuristics
   - Validation of memory consistency

3. **Cross-Agent Memory Sharing**
   - Selective sharing of memories between agents
   - Permission-based access controls
   - Memory translation between agent-specific formats
