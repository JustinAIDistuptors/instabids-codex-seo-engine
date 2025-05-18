# InstaBids Autonomous SEO Engine

An advanced, fully autonomous AI system designed to generate, optimize, and maintain hundreds of thousands of hyper-localized service pages across US ZIP codes for InstaBids.ai.

## Overview

This system creates unique landing pages following the pattern of: [Service] in [City/ZIP] (e.g., "Expert Plumbers in Beverly Hills, 90210"). Unlike typical programmatic SEO approaches that simply swap location tokens into identical templates, this system generates genuinely unique, locally-relevant content at scale through a sophisticated multi-agent AI architecture.

## Core Features

- **Multi-Agent Architecture**: Specialized AI components handling different aspects of the pipeline
- **Autonomous Operation**: Self-monitoring, self-diagnosing, and self-improving capabilities
- **Genuine Content Generation**: AI-powered creation of unique, valuable content for each page
- **Local Relevance**: Integration of ZIP code demographics and local insights
- **SEO Optimization**: Advanced on-page SEO including schema markup
- **Continuous Improvement**: Performance-based optimization and A/B testing
- **Administrative Dashboard**: Complete control and monitoring interface

## System Architecture

The system employs a modular multi-agent architecture:

- **Orchestration Agent**: Coordinates all other agents, manages workflows
- **Data Acquisition Agent (Scout)**: Scrapes competitor websites and SERPs
- **Data Processing Agent (Analyst)**: Transforms raw data into actionable insights
- **Content Generation Agent (Creator)**: Creates unique, localized content
- **Image Generation Agent (Artist)**: Creates unique, locally-relevant images
- **SEO Optimization Agent (Optimizer)**: Ensures proper on-page SEO implementation
- **Deployment Agent (Publisher)**: Handles GitHub commits and Vercel deployments
- **Monitoring Agent (Sentinel)**: Tracks performance metrics

## Repository Structure

```
instabids-codex-seo-engine/
├── AGENTS.MD                       # Global guidance for Codex agents
├── README.md                       # Project overview and setup instructions
├── .github/
│   └── workflows/
│       ├── ci.yml                  # CI pipeline configuration
│       └── deploy.yml              # Deployment workflow
├── docs/
│   ├── ARCHITECTURE.md             # System architecture documentation
│   ├── AGENT_ROLES.md              # Description of each agent's role
│   ├── PIPELINE.md                 # Pipeline workflow documentation
│   └── ADMIN_UI.md                 # UI documentation
├── prompts/                        # Prompts for Codex agents
│   ├── system_prompts.md           # Core system prompts
│   ├── orchestrator_prompts.md     # Orchestrator-specific prompts
│   ├── content_prompts.md          # Content generation prompts
│   └── seo_prompts.md              # SEO optimization prompts
├── src/
│   ├── backend/
│   │   ├── config/                 # Configuration files
│   │   ├── controllers/            # API controllers
│   │   ├── db/                     # Database files
│   │   │   ├── models/             # Database models
│   │   │   ├── migrations/         # Database migrations
│   │   │   └── seeds/              # Seed data
│   │   ├── services/               # Business logic services
│   │   │   ├── pipeline/           # Pipeline orchestration
│   │   │   ├── agents/             # Agent implementations
│   │   │   ├── content/            # Content generation
│   │   │   └── seo/                # SEO optimization
│   │   ├── utils/                  # Utility functions
│   │   ├── routes/                 # API routes
│   │   ├── app.js                  # Express application
│   │   └── server.js               # Server entry point
│   └── frontend/
│       ├── components/             # React components
│       ├── pages/                  # Next.js pages
│       ├── styles/                 # CSS styles
│       └── utils/                  # Frontend utilities
├── tests/                          # Test files
│   ├── unit/
│   └── integration/
└── package.json                    # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- OpenAI API key
- GitHub access token
- Vercel account and token

### Installation

1. Clone this repository:
```bash
git clone https://github.com/JustinAIDistuptors/instabids-codex-seo-engine.git
cd instabids-codex-seo-engine
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your API keys and configuration:

```
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_API_KEY=your_supabase_api_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# GitHub
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
GITHUB_BRANCH=main

# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=your_vercel_project_id

# SEO Tools
SERPAPI_KEY=your_serpapi_key

# Settings
NODE_ENV=development
LOG_LEVEL=info
AGENT_CONCURRENCY=5
PORT=3001

# Scheduling
ENABLE_SCHEDULER=false
MAX_TASKS_PER_RUN=50
```

4. Set up the database:
```bash
npm run db:setup
```

5. Start the development server:
```bash
npm run dev
```

6. Access the admin dashboard at `http://localhost:3000`

## Usage

### Dashboard Controls

The administrative dashboard provides controls to:

1. Start/stop the autonomous pipeline
2. Configure service categories and ZIP code targeting
3. Adjust content generation parameters
4. Monitor performance metrics
5. Preview and manually adjust generated pages

### Continuous Operation

Once started, the system will:

1. Identify high-opportunity service+ZIP combinations
2. Gather competitive intelligence
3. Generate unique, optimized content
4. Deploy pages to the live site
5. Monitor performance
6. Autonomously improve underperforming pages

## Development

For detailed development information, see the [Architecture Documentation](./docs/ARCHITECTURE.md).

## For Codex Agents

This repository is optimized for Codex agents to build and extend the system. See [AGENTS.MD](./AGENTS.MD) for detailed instructions.