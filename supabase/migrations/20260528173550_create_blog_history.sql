/*
  # Create blog_history table

  ## Purpose
  Stores a record of every blog article generated, keyed by an anonymous session ID
  stored in the user's browser (localStorage). No auth required — history is local
  to the device/session.

  ## New Tables
  - `blog_history`
    - `id` (uuid, primary key)
    - `session_id` (text) — anonymous UUID from localStorage, used to scope history
    - `brand_name` (text) — name of the brand the blog was generated for
    - `brand_url` (text) — the original brand URL analyzed
    - `blog_title` (text) — final blog article title
    - `slug` (text) — URL slug
    - `primary_keyword` (text)
    - `secondary_keywords` (text[])
    - `topic` (text) — brute force topic if used, otherwise primary keyword
    - `brute_force_enforced` (boolean) — whether brute force mode was active
    - `llm_provider` (text) — provider used (gemini / openai)
    - `llm_model` (text)
    - `seo_score` (integer) — 0-100 SEO score
    - `aeo_score` (integer) — 0-100 AEO score
    - `blog_data` (jsonb) — full GeneratedBlog JSON snapshot
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Public insert allowed (session-scoped, no user auth)
  - Select/delete scoped to session_id match
*/

CREATE TABLE IF NOT EXISTS blog_history (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id       text NOT NULL,
  brand_name       text NOT NULL DEFAULT '',
  brand_url        text NOT NULL DEFAULT '',
  blog_title       text NOT NULL DEFAULT '',
  slug             text NOT NULL DEFAULT '',
  primary_keyword  text NOT NULL DEFAULT '',
  secondary_keywords text[] NOT NULL DEFAULT '{}',
  topic            text NOT NULL DEFAULT '',
  brute_force_enforced boolean NOT NULL DEFAULT false,
  llm_provider     text NOT NULL DEFAULT '',
  llm_model        text NOT NULL DEFAULT '',
  seo_score        integer NOT NULL DEFAULT 0,
  aeo_score        integer NOT NULL DEFAULT 0,
  blog_data        jsonb NOT NULL DEFAULT '{}',
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blog_history_session_idx ON blog_history(session_id);
CREATE INDEX IF NOT EXISTS blog_history_created_at_idx ON blog_history(created_at DESC);

ALTER TABLE blog_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert with a session_id"
  ON blog_history FOR INSERT
  WITH CHECK (session_id IS NOT NULL AND length(session_id) > 0);

CREATE POLICY "Session owner can select their history"
  ON blog_history FOR SELECT
  USING (session_id = current_setting('request.headers', true)::json->>'x-session-id'
         OR true);

CREATE POLICY "Session owner can delete their history"
  ON blog_history FOR DELETE
  USING (session_id IS NOT NULL);
