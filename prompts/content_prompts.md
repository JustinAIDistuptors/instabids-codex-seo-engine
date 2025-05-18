# Content Generation Prompts

This file contains specialized prompts for implementing the content generation components of the InstaBids SEO Engine.

## Content Generator Implementation

```
Implement the core content generation system for the InstaBids SEO Engine. This component should:

1. Generate unique, high-quality content for service+ZIP combinations
2. Leverage OpenAI's API for natural language generation
3. Incorporate local context and demographic information
4. Structure content appropriately for SEO
5. Support multiple content variations to avoid duplicates

The implementation should be modular, efficient, and produce consistently high-quality output.

Requirements:
- Create a ContentGenerator class that handles the core generation logic
- Implement proper prompt engineering for the OpenAI API
- Add methods to incorporate ZIP code demographic data
- Include templating capabilities for structural consistency
- Implement content validation and quality checks
- Add comprehensive error handling and fallbacks
```

## Template System Implementation

```
Implement the template management system for the InstaBids SEO Engine. This component should:

1. Manage multiple template variations for each service type
2. Support dynamic section replacement and customization
3. Enforce consistent structure while allowing variability
4. Track template usage to ensure diversity
5. Support A/B testing of different templates

The implementation should balance consistency and uniqueness across generated pages.

Requirements:
- Create a TemplateManager class that loads and manages templates
- Implement a template repository with versioning
- Add methods for template selection and customization
- Include dynamic section replacement functionality
- Create hooks for injecting local context and service details
- Implement usage tracking to prevent overuse of specific templates
```

## Local Content Customization

```
Implement the localization system that makes content relevant to specific ZIP codes. This component should:

1. Incorporate demographic data for targeted ZIP codes
2. Reference local landmarks, businesses, and characteristics
3. Adapt tone and content based on regional preferences
4. Generate locally-relevant examples and scenarios
5. Ensure accuracy of local references

The implementation should make each page feel genuinely tailored to its location.

Requirements:
- Create a LocalizationEngine class that enriches content with local context
- Implement methods to fetch and utilize ZIP code demographic data
- Add support for geographic references and local landmarks
- Include regional terminology and colloquialisms where appropriate
- Create validation checks for local reference accuracy
- Implement caching for frequently used location data
```

## AI Integration for Content

```
Implement the AI integration layer for content generation. This component should:

1. Manage communication with the OpenAI API
2. Construct effective prompts based on content briefs
3. Handle rate limiting and token optimization
4. Process and validate AI-generated responses
5. Implement fallback strategies for API failures

The implementation should optimize for both quality and cost efficiency.

Requirements:
- Create an AIContentService class that handles OpenAI API interactions
- Implement advanced prompt construction techniques
- Add token counting and optimization to control costs
- Include rate limiting and backoff strategies
- Create proper error handling for API failures
- Implement result validation and quality scoring
- Add caching where appropriate to reduce redundant API calls
```

## Content Brief Generator

```
Implement the content brief generator that creates detailed instructions for content creation. This component should:

1. Process data from the Analyst agent
2. Identify key topics, headings, and structural elements
3. Define content objectives and key messages
4. Specify SEO requirements and keyword targets
5. Include localization instructions

The implementation should produce comprehensive briefs that guide the content generation process.

Requirements:
- Create a BriefGenerator class that synthesizes analysis data
- Implement methods to extract key topics and themes
- Add support for structural recommendations
- Include keyword planning and density targets
- Create guidelines for tone, style, and reading level
- Implement priority scoring for content elements
```

## Content Quality Assurance

```
Implement the content quality assurance system that validates generated content. This component should:

1. Check content for quality issues (grammar, readability, tone)
2. Verify keyword usage and density
3. Ensure structural compliance (headings, paragraphs)
4. Detect potential duplicate content
5. Validate local relevance and accuracy

The implementation should identify and address quality issues before content is deployed.

Requirements:
- Create a ContentQA class with comprehensive validation methods
- Implement readability scoring (Flesch-Kincaid or similar)
- Add checks for keyword presence and density
- Include structural validation (H1, H2, paragraph count)
- Implement similarity detection to prevent duplicate content
- Create scoring system for overall content quality
- Add hooks for manual review of flagged content
```

## Schema Markup Generator

```
Implement the schema markup generator for SEO enhancement. This component should:

1. Create appropriate schema.org markup based on service type
2. Incorporate service details and local business information
3. Generate JSON-LD format for easy integration
4. Support multiple schema types (LocalBusiness, Service, etc.)
5. Validate schema compliance with standards

The implementation should produce accurate, standards-compliant schema markup.

Requirements:
- Create a SchemaGenerator class with support for multiple schema types
- Implement service-specific schema customization
- Add methods to incorporate local business details
- Include validation against schema.org standards
- Create hooks for extending with additional schema types
- Implement proper error handling and fallbacks
```

## Content Variation Engine

```
Implement the content variation engine that ensures uniqueness across pages. This component should:

1. Track content patterns across generated pages
2. Identify opportunities for variation
3. Implement strategies to diversify content
4. Balance variation with quality and relevance
5. Support A/B testing of content variations

The implementation should minimize duplicate content issues while maintaining quality.

Requirements:
- Create a VariationEngine class that tracks content patterns
- Implement methods to analyze similarity across pages
- Add strategies for introducing controlled variation
- Include tracking of phrase usage and sentence structures
- Create hooks for A/B testing different variation strategies
- Implement reporting on content uniqueness metrics
```