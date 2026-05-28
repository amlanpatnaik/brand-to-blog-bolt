export type LLMMode = 'gemini_user' | 'openai_user' | 'app_default';
export type PhaseStatus = 'idle' | 'validating' | 'running' | 'success' | 'error';

export interface BruteForceConfig {
  topic: string;
  keywords: string[];
  collectionUrls: string[];
  enforced: boolean;
}

export interface WorkflowState {
  llmMode: LLMMode | null;
  apiKey: string;
  activeProvider: string;
  activeModel: string;
  currentPhase: 'hero' | 'extractor' | 'architect' | 'writer' | 'history';
  phaseStatus: Record<string, PhaseStatus>;
  errors: Record<string, string | null>;
  extractorResult: ExtractorOutput | null;
  architectResult: ArchitectOutput | null;
  selectedIdea: BlogIdea | null;
  writerResult: GeneratedBlog | null;
  userKeywords: string[];
  collectionUrls: string[];
  bruteForce: BruteForceConfig;
}

export interface SourceSignals {
  page_title: string;
  meta_description: string;
  canonical_url: string;
  h1_tags: string[];
  h2_tags: string[];
  nav_labels: string[];
  has_json_ld: boolean;
  word_count: number;
  fetch_status: string;
}

export interface SeasonalContext {
  current_date: string;
  current_season: string;
  upcoming_events: string[];
  seasonal_activities: string[];
  gifting_occasions: string[];
  content_opportunity_summary: string;
}

export interface ExtractorOutput {
  input_url: string;
  canonical_url: string;
  brand_name: string;
  company_summary: string;
  value_proposition: string;
  offerings: string[];
  audience: string[];
  brand_voice: string;
  differentiators: string[];
  geo_signals: string[];
  trust_signals: string[];
  product_or_service_categories: string[];
  niche: string;
  content_themes: string[];
  blog_section_summary: string;
  blog_post_examples: string[];
  seasonal_context: SeasonalContext | null;
  seo_opportunities: string[];
  keyword_suggestions: string[];
  structured_raw_text_summary: string;
  source_signals: SourceSignals;
  provider_used: string;
  model_used: string;
  extracted_at: string;
}

export interface RecommendedProduct {
  name: string;
  url: string;
  description: string;
  placement_suggestion: string;
}

export interface BlogIdea {
  id: string;
  title: string;
  primary_keyword: string;
  secondary_keywords: string[];
  search_intent: string;
  funnel_stage: string;
  why_it_can_rank: string;
  target_audience: string;
  angle: string;
  outline: string[];
  suggested_cta: string;
  recommended_products: RecommendedProduct[];
}

export interface TrafficKeyword {
  keyword: string;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  rationale: string;
}

export interface ArchitectOutput {
  selected_keywords: string[];
  blog_ideas: BlogIdea[];
  content_strategy_notes: string;
  traffic_keyword_suggestions: TrafficKeyword[];
  provider_used: string;
  model_used: string;
}

export interface BlogSection {
  heading: string;
  level: number;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SeoAeoScoreDetail {
  criterion: string;
  passed: boolean;
  note: string;
}

export interface SeoAeoScore {
  seo_score: number;
  aeo_score: number;
  overall_score: number;
  seo_details: SeoAeoScoreDetail[];
  aeo_details: SeoAeoScoreDetail[];
  top_improvements: string[];
}

export interface GeneratedBlog {
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  primary_keyword: string;
  secondary_keywords: string[];
  hook: string;
  intro: string;
  sections: BlogSection[];
  faq: FAQItem[];
  conclusion: string;
  cta: string;
  internal_link_suggestions: string[];
  external_reference_suggestions: string[];
  image_prompt_suggestions: string[];
  schema_suggestions: string[];
  markdown: string;
  seo_aeo_score: SeoAeoScore;
  generated_at: string;
  provider_used: string;
  model_used: string;
}

export interface BlogHistoryEntry {
  id: string;
  session_id: string;
  brand_name: string;
  brand_url: string;
  blog_title: string;
  slug: string;
  primary_keyword: string;
  secondary_keywords: string[];
  topic: string;
  brute_force_enforced: boolean;
  llm_provider: string;
  llm_model: string;
  seo_score: number;
  aeo_score: number;
  blog_data: GeneratedBlog;
  created_at: string;
}
