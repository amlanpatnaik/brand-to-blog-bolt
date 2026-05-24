import asyncio
from datetime import datetime, timezone
from typing import Optional
from app.services.llm_router import resolve_llm_client
from app.services.url_service import normalize_url
from app.services.content_extractor import fetch_url, extract_content, build_content_summary
from app.services.json_repair import repair_and_parse
from app.prompts.extractor_prompt import build_extractor_prompt
from app.prompts.architect_prompt import build_architect_prompt
from app.prompts.writer_prompt import build_writer_prompt
from app.schemas.extractor import ExtractorOutput, SourceSignals
from app.schemas.architect import ArchitectOutput, BlogIdea
from app.schemas.writer import GeneratedBlog, BlogSection, FAQItem
from app.core.config import settings
import re

async def run_extractor(url: str, llm_mode: str, api_key: Optional[str] = None) -> ExtractorOutput:
    normalized_url = normalize_url(url)
    provider = resolve_llm_client(llm_mode, api_key)

    last_error = None
    for attempt in range(settings.MAX_RETRIES + 1):
        try:
            html, status = await fetch_url(normalized_url)
            content_text, source_signals = extract_content(html, normalized_url)
            content_summary = build_content_summary(content_text, source_signals, normalized_url)
            prompt = build_extractor_prompt(normalized_url, content_summary)
            raw_response = await asyncio.wait_for(
                provider.generate(prompt, expect_json=True),
                timeout=settings.LLM_TIMEOUT
            )
            data = repair_and_parse(raw_response)
            return ExtractorOutput(
                input_url=url,
                canonical_url=data.get("canonical_url", normalized_url),
                brand_name=data.get("brand_name", "Unknown Brand"),
                company_summary=data.get("company_summary", ""),
                value_proposition=data.get("value_proposition", ""),
                offerings=data.get("offerings", []),
                audience=data.get("audience", []),
                brand_voice=data.get("brand_voice", "professional"),
                differentiators=data.get("differentiators", []),
                geo_signals=data.get("geo_signals", []),
                trust_signals=data.get("trust_signals", []),
                product_or_service_categories=data.get("product_or_service_categories", []),
                content_themes=data.get("content_themes", []),
                seo_opportunities=data.get("seo_opportunities", []),
                keyword_suggestions=data.get("keyword_suggestions", []),
                structured_raw_text_summary=data.get("structured_raw_text_summary", ""),
                source_signals=source_signals,
                provider_used=provider.provider_name,
                model_used=provider.model_name,
                extracted_at=datetime.now(timezone.utc).isoformat()
            )
        except Exception as e:
            last_error = e
            if attempt < settings.MAX_RETRIES:
                await asyncio.sleep(1)
    raise last_error

async def run_architect(extractor_data: dict, user_keywords: list, llm_mode: str, api_key: Optional[str] = None) -> ArchitectOutput:
    provider = resolve_llm_client(llm_mode, api_key)

    auto_keywords = extractor_data.get("keyword_suggestions", [])
    combined_keywords = list(dict.fromkeys(user_keywords + auto_keywords))[:20]

    last_error = None
    for attempt in range(settings.MAX_RETRIES + 1):
        try:
            prompt = build_architect_prompt(extractor_data, combined_keywords)
            raw_response = await asyncio.wait_for(
                provider.generate(prompt, expect_json=True),
                timeout=settings.LLM_TIMEOUT
            )
            data = repair_and_parse(raw_response)
            ideas_raw = data.get("blog_ideas", [])
            blog_ideas = []
            for i, idea in enumerate(ideas_raw[:10]):
                blog_ideas.append(BlogIdea(
                    id=idea.get("id", f"idea-{i+1}"),
                    title=idea.get("title", f"Blog Idea {i+1}"),
                    primary_keyword=idea.get("primary_keyword", ""),
                    secondary_keywords=idea.get("secondary_keywords", []),
                    search_intent=idea.get("search_intent", "informational"),
                    funnel_stage=idea.get("funnel_stage", "top"),
                    why_it_can_rank=idea.get("why_it_can_rank", ""),
                    target_audience=idea.get("target_audience", ""),
                    angle=idea.get("angle", ""),
                    outline=idea.get("outline", []),
                    suggested_cta=idea.get("suggested_cta", "")
                ))
            return ArchitectOutput(
                selected_keywords=data.get("selected_keywords", combined_keywords[:10]),
                blog_ideas=blog_ideas,
                content_strategy_notes=data.get("content_strategy_notes", ""),
                provider_used=provider.provider_name,
                model_used=provider.model_name
            )
        except Exception as e:
            last_error = e
            if attempt < settings.MAX_RETRIES:
                await asyncio.sleep(1)
    raise last_error

async def run_writer(extractor_data: dict, selected_idea: dict, llm_mode: str, api_key: Optional[str] = None) -> GeneratedBlog:
    provider = resolve_llm_client(llm_mode, api_key)

    last_error = None
    for attempt in range(settings.MAX_RETRIES + 1):
        try:
            prompt = build_writer_prompt(extractor_data, selected_idea)
            raw_response = await asyncio.wait_for(
                provider.generate(prompt, expect_json=True),
                timeout=settings.LLM_TIMEOUT
            )
            data = repair_and_parse(raw_response)
            sections = []
            for s in data.get("sections", []):
                sections.append(BlogSection(
                    heading=s.get("heading", ""),
                    level=s.get("level", 2),
                    content=s.get("content", "")
                ))
            faq = []
            for f in data.get("faq", []):
                faq.append(FAQItem(
                    question=f.get("question", ""),
                    answer=f.get("answer", "")
                ))
            return GeneratedBlog(
                title=data.get("title", selected_idea.get("title", "")),
                slug=data.get("slug", re.sub(r"[^a-z0-9]+", "-", data.get("title", "article").lower())),
                meta_title=data.get("meta_title", "")[:60],
                meta_description=data.get("meta_description", "")[:160],
                primary_keyword=data.get("primary_keyword", ""),
                secondary_keywords=data.get("secondary_keywords", []),
                hook=data.get("hook", ""),
                intro=data.get("intro", ""),
                sections=sections,
                faq=faq,
                conclusion=data.get("conclusion", ""),
                cta=data.get("cta", ""),
                internal_link_suggestions=data.get("internal_link_suggestions", []),
                external_reference_suggestions=data.get("external_reference_suggestions", []),
                image_prompt_suggestions=data.get("image_prompt_suggestions", []),
                schema_suggestions=data.get("schema_suggestions", []),
                markdown=data.get("markdown", ""),
                generated_at=datetime.now(timezone.utc).isoformat(),
                provider_used=provider.provider_name,
                model_used=provider.model_name
            )
        except Exception as e:
            last_error = e
            if attempt < settings.MAX_RETRIES:
                await asyncio.sleep(1)
    raise last_error
