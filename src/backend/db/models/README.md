# Database Models

This directory contains Sequelize models for the InstaBids SEO Engine.

## Model Structure

Each model is defined in its own file and exported from the `index.ts` file. The models are organized by domain:

- **Task Management** - Models for managing agent tasks and workflows
- **Content Generation** - Models for content templates, pages, and content versions
- **Location** - Models for geographic data like ZIP codes, cities, demographics
- **Service** - Models for service types, categories, and attributes
- **Agent** - Models for agent configurations, memory, and activity logs
- **Performance** - Models for tracking page performance and rankings

## Core Models

- `Task` - Represents a unit of work for an agent to perform
- `Workflow` - Represents a sequence of tasks for generating/updating content
- `Page` - Represents a generated service+location page
- `Service` - Represents a service type that can be offered
- `Location` - Represents a geographic location (ZIP code)
- `Agent` - Represents a configured AI agent in the system
- `Performance` - Tracks metrics for generated pages

## Associations

The models are related to each other as follows:

- A `Workflow` has many `Tasks`
- A `Page` belongs to a `Service` and a `Location`
- A `Page` has many `ContentVersions`
- A `Task` belongs to an `Agent`
- A `Performance` belongs to a `Page`

## Database Schema

For a visual representation of the database schema, see `docs/DATABASE_SCHEMA.md`.
