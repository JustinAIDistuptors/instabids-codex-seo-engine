-- Initial database schema for InstaBids SEO Engine

-- Service categories taxonomy
CREATE TABLE service_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  parent_id INTEGER REFERENCES service_categories(id),
  description TEXT,
  keywords TEXT[],
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Location data
CREATE TABLE zip_codes (
  id SERIAL PRIMARY KEY,
  zip VARCHAR(10) NOT NULL UNIQUE,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(2) NOT NULL,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  median_income INTEGER,
  population INTEGER,
  median_age DECIMAL(5,2),
  housing_density DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Generated pages
CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  service_category_id INTEGER NOT NULL REFERENCES service_categories(id),
  zip_code_id INTEGER NOT NULL REFERENCES zip_codes(id),
  variation INTEGER NOT NULL DEFAULT 1,
  url_path VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  meta_description TEXT,
  h1 VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_urls TEXT[],
  schema_markup JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(service_category_id, zip_code_id, variation)
);

-- Page performance metrics
CREATE TABLE page_metrics (
  id SERIAL PRIMARY KEY,
  page_id INTEGER NOT NULL REFERENCES pages(id),
  indexed BOOLEAN DEFAULT FALSE,
  indexed_at TIMESTAMP WITH TIME ZONE,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  position DECIMAL(5,2),
  ctr DECIMAL(5,2),
  bounce_rate DECIMAL(5,2),
  time_on_page INTEGER, -- in seconds
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pipeline tasks
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- scout, analyst, creator, etc.
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  priority INTEGER NOT NULL DEFAULT 1,
  params JSONB NOT NULL,
  result JSONB,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  retry_count INTEGER DEFAULT 0,
  next_retry_at TIMESTAMP WITH TIME ZONE,
  parent_task_id INTEGER REFERENCES tasks(id)
);

-- Page improvements
CREATE TABLE page_improvements (
  id SERIAL PRIMARY KEY,
  page_id INTEGER NOT NULL REFERENCES pages(id),
  issues_addressed JSONB NOT NULL,
  improvement_type VARCHAR(50) NOT NULL,
  previous_metrics JSONB,
  implemented_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  success_measured BOOLEAN DEFAULT FALSE,
  success_metrics JSONB
);

-- Content templates
CREATE TABLE content_templates (
  id SERIAL PRIMARY KEY,
  service_category_id INTEGER REFERENCES service_categories(id),
  name VARCHAR(255) NOT NULL,
  template_content TEXT NOT NULL,
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX ON tasks(status, priority);
CREATE INDEX ON tasks(type, status);
CREATE INDEX ON pages(service_category_id, zip_code_id);
CREATE INDEX ON page_metrics(page_id);
CREATE INDEX ON tasks(parent_task_id);
CREATE INDEX ON page_improvements(page_id);
CREATE INDEX ON content_templates(service_category_id, is_active);