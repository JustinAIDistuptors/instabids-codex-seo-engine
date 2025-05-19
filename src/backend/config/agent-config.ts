import { env } from './env';

// Agent base configuration interface
export interface AgentBaseConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
  tools?: string[];
  memory?: {
    shortTermCapacity: number;
    longTermEnabled: boolean;
    semanticSearchEnabled: boolean;
  };
}

// Agent configuration with specific roles
export interface AgentConfig extends AgentBaseConfig {
  role: string;
  description: string;
  goals: string[];
  constraints: string[];
}

// Default memory configuration
export const defaultMemoryConfig = {
  shortTermCapacity: 10,
  longTermEnabled: true,
  semanticSearchEnabled: true,
};

// Base configuration for all agents
export const baseAgentConfig: AgentBaseConfig = {
  model: 'gpt-4-turbo',
  temperature: 0.7,
  maxTokens: 4000,
  memory: defaultMemoryConfig,
};

// Orchestrator agent configuration
export const orchestratorConfig: AgentConfig = {
  ...baseAgentConfig,
  role: 'Orchestrator',
  description: 'Manages overall workflow and coordinates other agents',
  goals: [
    'Coordinate all other agents efficiently',
    'Prioritize tasks based on business impact',
    'Ensure smooth pipeline operation',
    'Monitor system performance',
    'Adapt to changing requirements'
  ],
  constraints: [
    'Must respect API rate limits',
    'Should not overload any single agent',
    'Must record all significant decisions',
    'Should follow established workflows',
    'Must implement error recovery'
  ],
  temperature: 0.2,
  maxTokens: 4000,
  tools: [
    'taskManager',
    'agentController',
    'performanceMonitor',
    'errorHandler'
  ]
};

// Scout agent configuration
export const scoutConfig: AgentConfig = {
  ...baseAgentConfig,
  role: 'Scout',
  description: 'Collects data about competitors, SERPs, and local information',
  goals: [
    'Gather competitive intelligence',
    'Identify keyword opportunities',
    'Collect local business information',
    'Monitor SERP changes',
    'Identify trending content'
  ],
  constraints: [
    'Must respect website terms of service',
    'Should not overload external APIs',
    'Must avoid collecting PII',
    'Should cache results when appropriate',
    'Must record all data sources'
  ],
  temperature: 0.3,
  maxTokens: 2000,
  tools: [
    'serpSearch',
    'webScraper',
    'localDataFetcher',
    'competitorAnalyzer'
  ]
};

// Analyst agent configuration
export const analystConfig: AgentConfig = {
  ...baseAgentConfig,
  role: 'Analyst',
  description: 'Processes data and extracts actionable insights',
  goals: [
    'Identify keyword opportunities',
    'Analyze competitor strategies',
    'Extract local market insights',
    'Identify content gaps',
    'Discover high-value ZIP+service combinations'
  ],
  constraints: [
    'Must provide confidence scores with insights',
    'Should consider multiple data sources',
    'Must record all analysis steps',
    'Should prioritize actionable insights',
    'Must validate insights against historical data'
  ],
  temperature: 0.1,
  maxTokens: 4000,
  tools: [
    'dataAnalyzer',
    'keywordClassifier',
    'insightGenerator',
    'opportunityScorer'
  ]
};

// Creator agent configuration
export const creatorConfig: AgentConfig = {
  ...baseAgentConfig,
  role: 'Creator',
  description: 'Generates unique, localized content for service pages',
  goals: [
    'Create high-quality, engaging content',
    'Ensure local relevance',
    'Optimize for search engines',
    'Address user search intent',
    'Differentiate from competitors'
  ],
  constraints: [
    'Must avoid duplicate content',
    'Should use local references naturally',
    'Must follow brand voice guidelines',
    'Should target specified keywords',
    'Must create genuinely unique pages'
  ],
  temperature: env.DEFAULT_CONTENT_TEMPERATURE,
  maxTokens: env.MAX_CONTENT_LENGTH,
  tools: [
    'contentGenerator',
    'localInfoIntegrator',
    'keywordOptimizer',
    'headingStructurer'
  ]
};

// Artist agent configuration
export const artistConfig: AgentConfig = {
  ...baseAgentConfig,
  role: 'Artist',
  description: 'Creates unique, locally-relevant images for service pages',
  goals: [
    'Generate visually appealing images',
    'Ensure local relevance',
    'Complement textual content',
    'Enhance user engagement',
    'Maintain brand consistency'
  ],
  constraints: [
    'Must respect copyright and IP',
    'Should follow brand style guide',
    'Must generate appropriate content',
    'Should create unique images',
    'Must optimize for web performance'
  ],
  temperature: 0.7,
  maxTokens: 1000,
  tools: [
    'imageGenerator',
    'imageOptimizer',
    'styleGuideEnforcer'
  ]
};

// Optimizer agent configuration
export const optimizerConfig: AgentConfig = {
  ...baseAgentConfig,
  role: 'Optimizer',
  description: 'Enhances content for SEO and conversion performance',
  goals: [
    'Optimize on-page SEO elements',
    'Implement structured data markup',
    'Enhance page layout and usability',
    'Improve conversion potential',
    'Ensure technical SEO best practices'
  ],
  constraints: [
    'Must maintain content readability',
    'Should follow semantic HTML principles',
    'Must implement valid schema markup',
    'Should balance SEO with user experience',
    'Must test all structured data'
  ],
  temperature: 0.2,
  maxTokens: 2000,
  tools: [
    'seoAnalyzer',
    'schemaGenerator',
    'contentOptimizer',
    'metaTagOptimizer'
  ]
};

// Publisher agent configuration
export const publisherConfig: AgentConfig = {
  ...baseAgentConfig,
  role: 'Publisher',
  description: 'Handles deployment to GitHub and Vercel',
  goals: [
    'Ensure successful content deployment',
    'Maintain version control integrity',
    'Implement staging and testing',
    'Automate deployment workflows',
    'Monitor deployment health'
  ],
  constraints: [
    'Must create clean pull requests',
    'Should run pre-deployment tests',
    'Must handle deployment failures',
    'Should implement rollback capability',
    'Must respect branch protection rules'
  ],
  temperature: 0.1,
  maxTokens: 2000,
  tools: [
    'githubManager',
    'vercelDeployer',
    'deploymentTester',
    'rollbackManager'
  ]
};

// Sentinel agent configuration
export const sentinelConfig: AgentConfig = {
  ...baseAgentConfig,
  role: 'Sentinel',
  description: 'Monitors performance and provides feedback',
  goals: [
    'Track page performance metrics',
    'Identify underperforming content',
    'Detect technical issues',
    'Monitor search rankings',
    'Provide actionable feedback'
  ],
  constraints: [
    'Must establish performance baselines',
    'Should provide evidence-based feedback',
    'Must prioritize issues by impact',
    'Should track trends over time',
    'Must alert on critical issues'
  ],
  temperature: 0.1,
  maxTokens: 2000,
  tools: [
    'analyticsCollector',
    'performanceAnalyzer',
    'searchConsoleIntegrator',
    'alertGenerator'
  ]
};

// Map of all agent configurations by type
export const agentConfigs = {
  orchestrator: orchestratorConfig,
  scout: scoutConfig,
  analyst: analystConfig,
  creator: creatorConfig,
  artist: artistConfig,
  optimizer: optimizerConfig,
  publisher: publisherConfig,
  sentinel: sentinelConfig,
};

export default agentConfigs;
