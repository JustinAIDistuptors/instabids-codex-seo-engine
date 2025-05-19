# Agent Configuration Framework

This directory contains the configuration files for each agent in the InstaBids SEO Engine. These configurations define the behavior, capabilities, and constraints of the agents.

## Configuration Schema

Each agent configuration follows this schema:

```json
{
  "agent_id": "string",
  "name": "string",
  "role": "string",
  "description": "string",
  "goals": ["string"],
  "constraints": ["string"],
  "tools": [
    {
      "tool_id": "string",
      "name": "string",
      "description": "string",
      "permissions": ["string"]
    }
  ],
  "memory": {
    "short_term_capacity": "number",
    "long_term_strategy": "string",
    "context_window": "number"
  },
  "model": {
    "provider": "string",
    "name": "string",
    "temperature": "number",
    "max_tokens": "number"
  },
  "communication": {
    "can_initiate": ["agent_id"],
    "can_receive_from": ["agent_id"],
    "message_format": "string"
  }
}
```

## Configuration Files

- `orchestrator.json` - Configuration for the Orchestrator agent
- `scout.json` - Configuration for the Scout agent (data acquisition)
- `analyst.json` - Configuration for the Analyst agent (data processing)
- `creator.json` - Configuration for the Creator agent (content generation)
- `artist.json` - Configuration for the Artist agent (image generation)
- `optimizer.json` - Configuration for the Optimizer agent (SEO)
- `publisher.json` - Configuration for the Publisher agent (deployment)
- `sentinel.json` - Configuration for the Sentinel agent (monitoring)
