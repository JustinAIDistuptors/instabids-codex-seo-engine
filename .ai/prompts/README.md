# Prompt Templates

This directory contains structured prompt templates for the AI agents in the InstaBids SEO Engine. These templates ensure consistency and are versioned alongside the codebase.

## How Templates Work

Templates use a simple variable substitution format with `{{variable_name}}` placeholders. The agent framework will automatically replace these placeholders with contextual values at runtime.

Example:
```
Generate a landing page for {{service_type}} in {{zip_code}} that targets the following keywords: {{keywords}}.
Use a tone that appeals to {{demographic_profile}} and include local references to {{local_landmarks}}.
```

## Template Categories

- `/system` - Base system prompts for defining agent roles
- `/tasks` - Task-specific prompts for different operations
- `/refinement` - Prompts for improving and refining content
- `/analysis` - Prompts for data analysis and insight extraction
- `/generation` - Prompts for content generation
- `/meta` - Prompts for the Orchestrator to manage other agents

## Version Control

All templates are version-controlled. When updating a template, increment the version number in the template metadata:

```
---
version: 1.2
author: InstaBids Team
last_updated: 2025-05-19
use_case: Page generation for service pages
effectiveness_score: 0.87
---

[Template content here]
```
