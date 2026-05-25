const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const FUNCTIONS_BASE = `${SUPABASE_URL}/functions/v1`;

const baseHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Apikey': SUPABASE_ANON_KEY,
};

export async function extractBrand(url: string, llmMode: string, apiKey?: string) {
  const res = await fetch(`${FUNCTIONS_BASE}/aibuddy-extract`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({ url, llm_mode: llmMode, api_key: apiKey || null }),
  });
  const data = await res.json();
  if (!res.ok || data.status === 'error') throw new Error(data.error || 'Extraction failed');
  return data;
}

export async function generateIdeas(
  extractorOutput: object,
  userKeywords: string[],
  llmMode: string,
  apiKey?: string,
  collectionUrls?: string[]
) {
  const res = await fetch(`${FUNCTIONS_BASE}/aibuddy-architect`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({
      extractor_output: extractorOutput,
      user_keywords: userKeywords,
      llm_mode: llmMode,
      api_key: apiKey || null,
      collection_urls: collectionUrls || [],
    }),
  });
  const data = await res.json();
  if (!res.ok || data.status === 'error') throw new Error(data.error || 'Blog idea generation failed');
  return data;
}

export async function generateArticle(
  extractorOutput: object,
  selectedIdea: object,
  llmMode: string,
  apiKey?: string,
  collectionUrls?: string[]
) {
  const res = await fetch(`${FUNCTIONS_BASE}/aibuddy-writer`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({
      extractor_output: extractorOutput,
      selected_idea: selectedIdea,
      llm_mode: llmMode,
      api_key: apiKey || null,
      collection_urls: collectionUrls || [],
    }),
  });
  const data = await res.json();
  if (!res.ok || data.status === 'error') throw new Error(data.error || 'Article generation failed');
  return data;
}

export async function checkHealth() {
  try {
    const res = await fetch(`${FUNCTIONS_BASE}/aibuddy-health`, {
      headers: baseHeaders,
    });
    return res.json();
  } catch {
    return { status: 'error', default_ai_available: false };
  }
}
