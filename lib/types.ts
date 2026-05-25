export type LLMMode = 'gemini_user' | 'openai_user' | 'app_default';
export type PhaseStatus = 'idle' | 'validating' | 'running' | 'success' | 'error';

export interface WorkflowState {
  llmMode: LLMMode | null;
  apiKey: string;
  activeProvider: string;
  activeModel: string;
  currentPhase: 'hero' | 'extractor' | 'architect' | 'writer';
  phaseStatus: Record<string, PhaseStatus>;
  errors: Record<string, string | null>;
  extractorResult: ExtractorOutput | null;
  architectResult: ArchitectOutput | null;
  selectedIdea: BlogIdea | null;
  writerResult: GeneratedBlog | null;
  userKeywords: string[];
  collectionUrls: string[];
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

export interface ArchitectOutput {
  selected_keywords: string[];
  blog_ideas: BlogIdea[];
  content_strategy_notes: string;
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
  generated_at: string;
  provider_used: string;
  model_used: string;
}
