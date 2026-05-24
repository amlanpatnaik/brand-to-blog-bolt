# AIBuddy — AI Content Pipeline

> From URL to ranking-ready content system. Business URL → Brand Extraction → Blog Ideas → Full SEO Article.

## Architecture

```
┌─────────────────────────────────────────┐
│  Next.js Frontend (port 3000)           │
│  Cosmic UI · Phase Workflow · Results   │
└─────────────────┬───────────────────────┘
                  │ fetch/JSON
┌─────────────────▼───────────────────────┐
│  FastAPI Backend (port 8000)            │
│  /api/extract · /api/architect · /api/write │
└─────────────────┬───────────────────────┘
                  │
         ┌────────▼────────┐
         │  LLM Providers  │
         │  Gemini · OpenAI│
         └─────────────────┘
```

## Quick Start

### 1. Backend (Python 3.11+)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # Edit with your keys
uvicorn app.main:app --reload --port 8000
```

Backend runs at http://localhost:8000  
API docs at http://localhost:8000/docs

### 2. Frontend (Node 18+)

```bash
# From project root
npm install
npm run dev
```

Frontend runs at http://localhost:3000

---

## Configuration

### Backend: `backend/.env`

| Variable | Description | Default |
|---|---|---|
| `DEFAULT_PROVIDER` | Provider for "App Default" mode: `gemini` or `openai` | `gemini` |
| `DEFAULT_MODEL` | Model for app default mode | `gemini-2.0-flash` |
| `GEMINI_API_KEY` | Server-side Gemini key (for app default) | — |
| `OPENAI_API_KEY` | Server-side OpenAI key (for app default) | — |
| `GEMINI_USER_MODEL` | Model used when user provides Gemini key | `gemini-2.0-flash` |
| `OPENAI_USER_MODEL` | Model used when user provides OpenAI key | `gpt-4o-mini` |
| `ALLOWED_ORIGINS` | CORS origins (comma-separated) | `http://localhost:3000` |
| `REQUEST_TIMEOUT` | Website fetch timeout (seconds) | `30` |
| `LLM_TIMEOUT` | LLM call timeout (seconds) | `120` |
| `MAX_RETRIES` | Retries per phase on failure | `2` |

### Frontend: `.env.local`

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | FastAPI backend URL | `http://localhost:8000` |

---

## LLM Access Modes

Users choose one of three modes before starting:

| Mode | Description |
|---|---|
| **Gemini Flash** | User provides their own Gemini API key. Uses `GEMINI_USER_MODEL`. |
| **OpenAI GPT** | User provides their own OpenAI API key. Uses `OPENAI_USER_MODEL`. |
| **App Default** | Backend uses server-configured provider + key. Requires `GEMINI_API_KEY` or `OPENAI_API_KEY` in `.env`. |

User keys are never persisted — they're only sent for active requests and held transiently in session state.

---

## Pipeline Phases

### Phase 1: Extractor
- Fetches the business URL (SSRF-safe)
- Parses HTML: title, meta, H1/H2, nav, body text
- Sends summarized content to LLM
- Returns structured brand JSON: name, summary, offerings, audience, differentiators, keywords, SEO opportunities

### Phase 2: Architect
- Takes extractor JSON + user-added keywords
- Generates exactly 10 blog ideas via LLM
- Each idea: title, primary keyword, intent, funnel stage, outline, CTA

### Phase 3: Writer
- Takes extractor JSON + one selected blog idea
- Generates a complete 1500–2500 word SEO article
- Returns: title, slug, meta, hook, sections, FAQ, CTA, internal/external links, image prompts, schema suggestions, markdown

---

## Backend Module Map

```
backend/app/
├── main.py                    # FastAPI app + CORS
├── core/
│   ├── config.py              # Settings via pydantic-settings
│   └── security.py            # URL validation, SSRF prevention
├── api/routes/
│   ├── extractor.py           # POST /api/extract
│   ├── architect.py           # POST /api/architect
│   ├── writer.py              # POST /api/write
│   └── health.py              # GET /api/health
├── schemas/
│   ├── extractor.py           # ExtractorOutput, ExtractorRequest
│   ├── architect.py           # ArchitectOutput, BlogIdea
│   └── writer.py              # GeneratedBlog, WriterRequest
├── services/
│   ├── llm_router.py          # resolve_llm_client() — single source of truth
│   ├── orchestrator.py        # run_extractor, run_architect, run_writer
│   ├── content_extractor.py   # fetch_url, extract_content, build_content_summary
│   ├── url_service.py         # normalize_url
│   ├── json_repair.py         # repair_and_parse for LLM output
│   └── providers/
│       ├── gemini_provider.py
│       ├── openai_provider.py
│       └── default_provider.py
└── prompts/
    ├── extractor_prompt.py
    ├── architect_prompt.py
    └── writer_prompt.py
```

---

## Security Notes

- User API keys are only sent for the active request and never written to disk or logs
- URL fetching is SSRF-protected: blocks localhost, loopback, RFC 1918 private ranges
- Prompt injection defense: scraped website content is treated as raw data, not instructions
- App default keys come only from environment variables, never from user input
