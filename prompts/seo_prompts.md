# SEO Optimization Prompts

This file contains specialized prompts for implementing the SEO optimization components of the InstaBids SEO Engine.

## SEO Analyzer Implementation

```
Implement the SEO analysis system for the InstaBids SEO Engine. This component should:

1. Analyze content for SEO factors (keyword usage, headings, structure)
2. Check technical aspects (meta tags, schema markup, internal links)
3. Identify optimization opportunities
4. Generate specific improvement recommendations
5. Score content against SEO best practices

The implementation should provide comprehensive insights for optimization.

Requirements:
- Create an SEOAnalyzer class with modular analysis capabilities
- Implement keyword analysis (density, placement, variations)
- Add content structure validation (headings, paragraphs, lists)
- Include technical SEO checks (meta tags, schema, links)
- Create scoring system with detailed factor breakdown
- Implement priority ranking for improvement suggestions
```

## Metadata Optimizer

```
Implement the metadata optimization system for the InstaBids SEO Engine. This component should:

1. Generate optimized title tags (compelling, keyword-rich, length-appropriate)
2. Create effective meta descriptions with calls to action
3. Implement proper Open Graph and Twitter Card tags
4. Optimize heading tags (H1, H2, H3) throughout content
5. Generate appropriate alt text for images

The implementation should maximize search visibility while maintaining user appeal.

Requirements:
- Create a MetadataOptimizer class with specialized methods for each tag type
- Implement title tag generator with keyword placement and length control
- Add meta description generator with CTA templates
- Include social media tag optimization for Open Graph and Twitter
- Create heading hierarchy optimization (H1, H2, H3)
- Implement alt text generator for images based on context
- Add validation for all generated metadata
```

## Schema Markup Optimizer

```
Implement the schema markup optimization system for the InstaBids SEO Engine. This component should:

1. Generate appropriate schema.org markup based on service type
2. Create nested schema structures for rich content
3. Incorporate local business and service details
4. Implement review, FAQ, and other enhancing schemas
5. Validate schema against testing tools

The implementation should maximize rich snippet opportunities and structured data benefits.

Requirements:
- Create a SchemaOptimizer class supporting various schema types
- Implement LocalBusiness schema with full local details
- Add Service schema with service attributes and offers
- Include FAQ schema for question/answer content
- Create nested schema structures for rich relationships
- Implement validation against Schema.org standards
- Add testing against Google's Rich Results Test parameters
```

## Internal Linking Optimizer

```
Implement the internal linking optimization system for the InstaBids SEO Engine. This component should:

1. Identify appropriate internal linking opportunities
2. Generate contextual anchor text for links
3. Implement proper link structure and attributes
4. Balance link distribution across pages
5. Track internal linking patterns site-wide

The implementation should create a strong internal linking structure to enhance SEO value.

Requirements:
- Create an InternalLinkOptimizer class that analyzes linking opportunities
- Implement relevance scoring between pages for link decisions
- Add contextual anchor text generation based on content
- Include methods to fetch site-wide link structure
- Create tracking for link distribution and density
- Implement hierarchical linking strategy (hub and spoke model)
```

## URL Structure Optimizer

```
Implement the URL structure optimization system for the InstaBids SEO Engine. This component should:

1. Generate SEO-friendly URL patterns for different page types
2. Implement consistent URL structure across the site
3. Incorporate keywords appropriately in URLs
4. Handle special characters and formatting
5. Create redirect strategies for URL changes

The implementation should produce clean, descriptive, and consistent URLs.

Requirements:
- Create a URLOptimizer class with standardized patterns
- Implement slug generation from titles and keywords
- Add sanitization for special characters and spaces
- Include length optimization and keyword placement
- Create consistent hierarchical structure
- Implement collision detection and resolution
- Add redirect management for URL changes
```

## Content Structure Optimizer

```
Implement the content structure optimization system for the InstaBids SEO Engine. This component should:

1. Analyze and improve content structure for SEO
2. Optimize heading hierarchy and distribution
3. Enhance paragraph structure and length
4. Improve list formatting and table usage
5. Optimize content flow and readability

The implementation should create well-structured content that performs well in search.

Requirements:
- Create a ContentStructureOptimizer class with specialized methods
- Implement heading optimization (H1, H2, H3) with proper hierarchy
- Add paragraph length and structure improvement
- Include list and table formatting enhancement
- Create scannable content with proper formatting
- Implement structure templates for different content types
- Add validation against SEO best practices
```

## Mobile Optimization

```
Implement the mobile optimization system for the InstaBids SEO Engine. This component should:

1. Analyze content for mobile-friendliness
2. Optimize page elements for mobile display
3. Check and improve page speed factors
4. Enhance touch targets and mobile usability
5. Test responsive behavior across devices

The implementation should ensure all generated pages perform well on mobile devices.

Requirements:
- Create a MobileOptimizer class with specialized testing methods
- Implement mobile-first content structure validation
- Add image optimization for mobile (responsive sizing, lazy loading)
- Include touch target size and spacing checks
- Create mobile page speed optimization strategies
- Implement viewpoint and responsive testing
- Add mobile-specific SEO validation
```

## Local SEO Enhancement

```
Implement the local SEO enhancement system for the InstaBids SEO Engine. This component should:

1. Optimize content for local search queries
2. Enhance schema markup with local business details
3. Implement local keyword strategies
4. Incorporate geographic references appropriately
5. Support NAP (Name, Address, Phone) consistency

The implementation should maximize visibility in local search results.

Requirements:
- Create a LocalSEOOptimizer class with geographic specialization
- Implement local keyword research and integration
- Add NAP consistency validation
- Include geographic markup enhancement
- Create local business schema optimization
- Implement local search testing and validation
- Add location-based content recommendations
```

## Performance Optimization

```
Implement the performance optimization system for the InstaBids SEO Engine. This component should:

1. Analyze page performance factors (Core Web Vitals)
2. Optimize images for web delivery
3. Enhance code efficiency and loading
4. Implement caching strategies
5. Test and score performance improvements

The implementation should ensure all generated pages meet or exceed performance benchmarks.

Requirements:
- Create a PerformanceOptimizer class with Core Web Vitals focus
- Implement image optimization (format, size, compression)
- Add code optimization for CSS and JavaScript
- Include lazy loading implementation for appropriate elements
- Create caching recommendation strategies
- Implement performance testing and scoring
- Add priority ranking for performance improvements
```