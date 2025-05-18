# Pipeline Workflow Documentation

This document describes the end-to-end workflow of the InstaBids SEO Engine pipeline, from opportunity identification to continuous improvement.

## Pipeline Overview

The SEO Engine pipeline is a continuous process that generates, optimizes, deploys, and improves localized service pages. It follows a modular, agent-based architecture with well-defined task boundaries and handoffs.

## Workflow Stages

### 1. Opportunity Identification

**Purpose**: Identify high-value service+ZIP combinations for page generation.

**Process Flow**:
1. Analyze service categories based on priority and demand
2. Filter ZIP codes based on population, income, and other demographic factors
3. Cross-reference with existing pages to identify gaps
4. Calculate opportunity score based on competition and potential traffic

**Implementation**:
```javascript
// Orchestrator identifies opportunities
const opportunities = await orchestrator.identifyOpportunities({
  limit: 20, // Start with the top 20 opportunities
  minPopulation: 10000,
  minPriority: 3
});

// For each opportunity, start the pipeline
for (const opportunity of opportunities) {
  await taskQueue.addTask({
    type: 'scout',
    priority: opportunity.priorityScore,
    params: {
      serviceId: opportunity.serviceId,
      zipId: opportunity.zipId,
      keywords: opportunity.keywords
    }
  });
}
```

### 2. Data Acquisition (Scout)

**Purpose**: Gather competitive intelligence and local data.

**Process Flow**:
1. Scout receives task from the queue
2. Retrieves service and ZIP code information
3. Searches for "[Service] in [City, ZIP]" keywords
4. Scrapes top-ranking pages
5. Gathers local data about the ZIP code
6. Outputs structured data for analysis

**Implementation**:
```javascript
// Scout agent processing
async function processScoutTask(task) {
  const { serviceId, zipId, keywords } = task.params;
  
  // Gather data from various sources
  const serpResults = await scrapeSERPs(keywords);
  const competitorData = await analyzeCompetitors(serpResults);
  const localData = await gatherLocalInfo(zipId);
  
  // Return structured results
  return {
    serpData: serpResults,
    competitorContent: competitorData,
    localInsights: localData
  };
}
```

### 3. Data Analysis (Analyst)

**Purpose**: Process raw data into actionable content briefs.

**Process Flow**:
1. Analyst receives Scout data
2. Processes competitor content to identify patterns
3. Extracts key topics, headings, and structural elements
4. Incorporates local insights into the brief
5. Creates a detailed content brief for the Creator

**Implementation**:
```javascript
// Analyst agent processing
async function processAnalystTask(task) {
  const { scoutResults, serviceId, zipId } = task.params;
  
  // Process the Scout's data
  const patterns = extractContentPatterns(scoutResults.competitorContent);
  const keyTopics = identifyTopics(scoutResults.competitorContent);
  const localRelevance = analyzeLocalContext(scoutResults.localInsights);
  
  // Create a content brief
  const contentBrief = {
    serviceId,
    zipId,
    title: generateTitleOptions(patterns, localRelevance),
    headings: suggestHeadings(patterns, keyTopics),
    keyPoints: prioritizeContent(keyTopics),
    localContexts: localRelevance.contextPoints,
    suggestedStructure: recommendStructure(patterns),
    keywords: extractKeywords(scoutResults)
  };
  
  return contentBrief;
}
```

### 4. Content Creation (Creator)

**Purpose**: Generate unique, localized content based on the brief.

**Process Flow**:
1. Creator receives content brief
2. Selects appropriate base template
3. Crafts unique content with local relevance
4. Structures content with proper headings and SEO elements
5. Returns formatted content ready for optimization

**Implementation**:
```javascript
// Creator agent processing
async function processCreatorTask(task) {
  const { contentBrief } = task.params;
  
  // Select a template variation to ensure uniqueness
  const template = await selectTemplate(contentBrief.serviceId);
  
  // Generate the content
  const generatedContent = await generateContent({
    template,
    brief: contentBrief,
    aiModel: 'gpt-4',
    maxTokens: 2500
  });
  
  // Localize the content with specific references
  const localizedContent = await localizeContent(
    generatedContent, 
    contentBrief.zipId, 
    contentBrief.localContexts
  );
  
  // Format as HTML
  const htmlContent = formatAsHTML(localizedContent);
  
  return {
    html: htmlContent,
    meta: {
      title: contentBrief.title[0], // Selected title
      headings: extractHeadingsFromContent(htmlContent),
      keywordUsage: analyzeKeywordDensity(htmlContent, contentBrief.keywords)
    }
  };
}
```

### 5. Parallel Processing

At this stage, the workflow branches into two parallel processes: Image Generation and SEO Optimization.

#### 5a. Image Generation (Artist)

**Purpose**: Create unique, locally-relevant images for the page.

**Process Flow**:
1. Artist receives content and local context
2. Generates appropriate imagery based on service type
3. Incorporates local elements where appropriate
4. Optimizes images for web delivery
5. Returns image assets with metadata

**Implementation**:
```javascript
// Artist agent processing
async function processArtistTask(task) {
  const { content, serviceId, zipId } = task.params;
  
  // Get service and location details
  const service = await getServiceDetails(serviceId);
  const location = await getZipDetails(zipId);
  
  // Generate hero image with local elements
  const heroImage = await generateImage({
    prompt: `${service.name} service in ${location.city}, ${location.state}`,
    localElements: location.landmarks,
    style: service.imageStyle,
    dimensions: { width: 1200, height: 630 }
  });
  
  // Generate supporting images
  const supportingImages = await generateSupportingImages(content, service, 3);
  
  // Optimize all images
  const optimizedImages = await optimizeImagesForWeb([heroImage, ...supportingImages]);
  
  return {
    heroImage: optimizedImages[0],
    supportingImages: optimizedImages.slice(1),
    alt: generateAltText(optimizedImages, service, location)
  };
}
```

#### 5b. SEO Optimization (Optimizer)

**Purpose**: Enhance content with technical SEO elements.

**Process Flow**:
1. Optimizer receives content from Creator
2. Analyzes content structure and keyword usage
3. Optimizes meta tags and heading structure
4. Generates schema markup based on service type
5. Returns SEO-enhanced content

**Implementation**:
```javascript
// Optimizer agent processing
async function processOptimizerTask(task) {
  const { content, serviceId, zipId } = task.params;
  
  // Get service and location details
  const service = await getServiceDetails(serviceId);
  const location = await getZipDetails(zipId);
  
  // Generate schema markup
  const schema = generateSchemaMarkup({
    type: 'LocalBusiness',
    service,
    location,
    content
  });
  
  // Optimize meta tags
  const metaTags = optimizeMetaTags(content, service, location);
  
  // Enhance content structure
  const enhancedContent = optimizeContentStructure(content);
  
  // Add internal linking
  const linkedContent = addInternalLinks(enhancedContent, serviceId, zipId);
  
  return {
    content: linkedContent,
    metaTags,
    schema,
    seoScore: calculateSEOScore(linkedContent, metaTags, schema)
  };
}
```

### 6. Page Publishing (Publisher)

**Purpose**: Deploy optimized content to the live site.

**Process Flow**:
1. Publisher receives optimized content, images, and SEO elements
2. Formats all assets for the target platform
3. Creates a commit to the GitHub repository
4. Triggers a Vercel deployment
5. Verifies the deployment and records the URL

**Implementation**:
```javascript
// Publisher agent processing
async function processPublisherTask(task) {
  const { content, images, seo, serviceId, zipId } = task.params;
  
  // Get service and location details
  const service = await getServiceDetails(serviceId);
  const location = await getZipDetails(zipId);
  
  // Format for deployment
  const pageData = formatForDeployment({
    content,
    images,
    seo,
    service,
    location
  });
  
  // Create GitHub commit
  const commit = await createGitHubCommit({
    files: pageData.files,
    message: `Add ${service.name} page for ${location.city}, ${location.state} (${location.zip})`
  });
  
  // Trigger deployment
  const deployment = await triggerVercelDeployment(commit.sha);
  
  // Verify deployment
  const deploymentResult = await waitForDeployment(deployment.id);
  
  // Create database record for the page
  const page = await db.Page.create({
    service_category_id: serviceId,
    zip_code_id: zipId,
    url_path: pageData.urlPath,
    title: seo.metaTags.title,
    content: content,
    schema_markup: JSON.stringify(seo.schema),
    deployed_url: deploymentResult.url,
    published_at: new Date()
  });
  
  return {
    pageId: page.id,
    url: deploymentResult.url,
    deploymentId: deployment.id
  };
}
```

### 7. Performance Monitoring (Sentinel)

**Purpose**: Track page performance and identify improvement opportunities.

**Process Flow**:
1. Sentinel monitors newly deployed pages
2. Tracks indexation status in search engines
3. Collects performance metrics (rankings, traffic, engagement)
4. Identifies underperforming pages
5. Triggers improvement tasks for optimization

**Implementation**:
```javascript
// Sentinel agent processing
async function processSentinelTask(task) {
  const { pageId, url } = task.params;
  
  // Check indexation status
  const indexStatus = await checkIndexationStatus(url);
  
  // Gather performance metrics
  const searchMetrics = await collectSearchMetrics(url);
  const analyticsMetrics = await collectAnalyticsData(url);
  
  // Save metrics to database
  await db.PageMetrics.create({
    page_id: pageId,
    indexed: indexStatus.indexed,
    indexed_at: indexStatus.indexedAt,
    impressions: searchMetrics.impressions,
    clicks: searchMetrics.clicks,
    position: searchMetrics.averagePosition,
    bounce_rate: analyticsMetrics.bounceRate,
    time_on_page: analyticsMetrics.timeOnPage,
    measured_at: new Date()
  });
  
  // Evaluate if page needs improvement
  const needsImprovement = evaluatePerformance({
    metrics: { ...searchMetrics, ...analyticsMetrics },
    thresholds: config.improvementThresholds
  });
  
  // If needed, schedule an improvement task
  if (needsImprovement) {
    await taskQueue.addTask({
      type: 'improvement',
      priority: calculateImprovementPriority(needsImprovement.score),
      params: {
        pageId,
        issues: needsImprovement.issues,
        currentMetrics: { ...searchMetrics, ...analyticsMetrics }
      }
    });
  }
  
  // Schedule next monitoring task
  await taskQueue.addTask({
    type: 'sentinel',
    priority: 5,
    params: { pageId, url },
    scheduledFor: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Check again in 7 days
  });
  
  return {
    indexed: indexStatus.indexed,
    metrics: { ...searchMetrics, ...analyticsMetrics },
    needsImprovement: needsImprovement ? true : false
  };
}
```

### 8. Continuous Improvement

**Purpose**: Enhance underperforming pages based on data.

**Process Flow**:
1. Improvement task is triggered for underperforming pages
2. Current content and performance issues are analyzed
3. Targeted improvements are made based on specific issues
4. Updated content goes through optimization and publishing
5. Results are monitored to verify improvement

**Implementation**:
```javascript
// Improvement task processing
async function processImprovementTask(task) {
  const { pageId, issues, currentMetrics } = task.params;
  
  // Get current page data
  const page = await db.Page.findByPk(pageId, {
    include: [
      { model: db.ServiceCategory },
      { model: db.ZipCode }
    ]
  });
  
  // Analyze improvement opportunities
  const improvements = await analyzeImprovementOpportunities(page, issues, currentMetrics);
  
  // Generate improved content
  const improvedContent = await generateImprovedContent(page.content, improvements);
  
  // Run through optimization again
  const optimizedContent = await optimizeContent(improvedContent);
  
  // Update the page
  const updatedPage = await updatePage(pageId, {
    content: optimizedContent,
    variation: page.variation + 1
  });
  
  // Track the improvement
  await db.PageImprovement.create({
    page_id: pageId,
    issues_addressed: JSON.stringify(issues),
    improvement_type: improvements.type,
    previous_metrics: JSON.stringify(currentMetrics),
    implemented_at: new Date()
  });
  
  return {
    pageId,
    updatedUrl: updatedPage.url,
    improvementType: improvements.type
  };
}
```

## Task Dependencies and Flow Control

The pipeline orchestrator manages task dependencies and ensures proper flow control:

```javascript
// Handle task completion and create follow-up tasks
async function handleTaskCompletion(task) {
  logger.info(`Task completed: ${task.id} (${task.type})`);
  
  try {
    if (task.type === 'scout') {
      // After Scout completes, create Analyst task
      await taskQueue.addTask({
        type: 'analyst',
        priority: task.priority,
        params: {
          ...task.params,
          scoutResults: task.result
        },
        parentTaskId: task.id
      });
    } 
    else if (task.type === 'analyst') {
      // After Analyst completes, create Creator task
      await taskQueue.addTask({
        type: 'creator',
        priority: task.priority,
        params: {
          ...task.params,
          contentBrief: task.result
        },
        parentTaskId: task.id
      });
    }
    else if (task.type === 'creator') {
      // After Creator completes, create parallel Artist and Optimizer tasks
      await Promise.all([
        taskQueue.addTask({
          type: 'artist',
          priority: task.priority,
          params: {
            ...task.params,
            content: task.result.content
          },
          parentTaskId: task.id
        }),
        taskQueue.addTask({
          type: 'optimizer',
          priority: task.priority,
          params: {
            ...task.params,
            content: task.result.content
          },
          parentTaskId: task.id
        })
      ]);
    }
    // Continue with other task types...
  } catch (error) {
    logger.error('Error handling task completion', { error, taskId: task.id });
  }
}
```

## Error Handling and Recovery

The pipeline includes robust error handling with retry mechanisms:

```javascript
// Handle task failure
async function handleTaskFailure(task, error) {
  logger.error(`Task failed: ${task.id} (${task.type})`, { error });
  
  try {
    // Update task status
    await taskQueue.updateTaskStatus(task.id, 'failed', { error: error.message });
    
    // Check if we should retry
    if (task.retryCount < 3) {
      // Calculate exponential backoff
      const backoffMinutes = Math.pow(2, task.retryCount);
      const nextRetry = new Date();
      nextRetry.setMinutes(nextRetry.getMinutes() + backoffMinutes);
      
      // Create retry task
      await taskQueue.addTask({
        type: task.type,
        priority: task.priority - 1, // Lower priority for retries
        params: task.params,
        retryCount: task.retryCount + 1,
        nextRetryAt: nextRetry,
        parentTaskId: task.parentTaskId
      });
      
      logger.info(`Scheduled retry for task ${task.id} in ${backoffMinutes} minutes`);
    } else {
      logger.warn(`Task ${task.id} has failed ${task.retryCount} times, no more retries`);
      
      // Potentially notify administrators or create a human review task
      await createHumanReviewTask(task, error);
    }
  } catch (retryError) {
    logger.error('Error handling task failure', { error: retryError, taskId: task.id });
  }
}
```

## Monitoring and Management

The entire pipeline can be monitored and managed through the admin dashboard:

- Start/stop the pipeline
- View current task status
- Analyze performance metrics
- Manually trigger specific tasks
- Adjust pipeline parameters

The dashboard provides real-time insights into the pipeline's operation and allows for intervention when needed.