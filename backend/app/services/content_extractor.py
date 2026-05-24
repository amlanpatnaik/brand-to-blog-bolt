import httpx
import re
from bs4 import BeautifulSoup
from typing import Optional, Tuple, Dict, Any
from app.core.config import settings
from app.schemas.extractor import SourceSignals

MAX_CHARS = settings.MAX_CONTENT_CHARS

async def fetch_url(url: str) -> Tuple[str, int]:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; AIBuddy/1.0; +https://aibuddy.app)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    }
    async with httpx.AsyncClient(follow_redirects=True, timeout=settings.REQUEST_TIMEOUT) as client:
        response = await client.get(url, headers=headers)
        response.raise_for_status()
        return response.text, response.status_code

def extract_content(html: str, url: str) -> Tuple[str, SourceSignals]:
    soup = BeautifulSoup(html, "lxml")

    # Remove noise elements
    for tag in soup.find_all(["script", "style", "noscript", "iframe", "img", "svg", "nav", "footer"]):
        tag.decompose()

    title = soup.find("title")
    page_title = title.get_text(strip=True) if title else ""

    meta_desc_tag = soup.find("meta", attrs={"name": "description"})
    meta_description = ""
    if meta_desc_tag:
        meta_description = meta_desc_tag.get("content", "")

    canonical_tag = soup.find("link", attrs={"rel": "canonical"})
    canonical_url = ""
    if canonical_tag:
        canonical_url = canonical_tag.get("href", "")

    h1_tags = [h.get_text(strip=True) for h in soup.find_all("h1")][:5]
    h2_tags = [h.get_text(strip=True) for h in soup.find_all("h2")][:10]

    # Navigation labels
    nav_labels = []
    for nav in soup.find_all("nav"):
        for link in nav.find_all("a"):
            text = link.get_text(strip=True)
            if text and len(text) < 50:
                nav_labels.append(text)
    nav_labels = list(set(nav_labels))[:20]

    has_json_ld = bool(soup.find("script", attrs={"type": "application/ld+json"}))

    # Extract main text content
    body = soup.find("body")
    if body:
        paragraphs = body.find_all(["p", "li", "h1", "h2", "h3", "h4", "td"])
        texts = []
        seen = set()
        for p in paragraphs:
            text = p.get_text(separator=" ", strip=True)
            if len(text) > 30 and text not in seen:
                seen.add(text)
                texts.append(text)
        full_text = "\n".join(texts)
    else:
        full_text = soup.get_text(separator="\n", strip=True)

    # Deduplicate and truncate
    lines = [line.strip() for line in full_text.splitlines() if line.strip()]
    deduped = list(dict.fromkeys(lines))
    full_text = "\n".join(deduped)

    word_count = len(full_text.split())

    if len(full_text) > MAX_CHARS:
        full_text = full_text[:MAX_CHARS] + "\n[content truncated for token efficiency]"

    signals = SourceSignals(
        page_title=page_title,
        meta_description=meta_description,
        canonical_url=canonical_url or url,
        h1_tags=h1_tags,
        h2_tags=h2_tags,
        nav_labels=nav_labels,
        has_json_ld=has_json_ld,
        word_count=word_count,
        fetch_status="ok"
    )

    return full_text, signals

def build_content_summary(text: str, signals: SourceSignals, url: str) -> str:
    summary_parts = [
        f"URL: {url}",
        f"Page Title: {signals.page_title}",
        f"Meta Description: {signals.meta_description}",
        f"H1 Tags: {', '.join(signals.h1_tags)}",
        f"H2 Tags: {', '.join(signals.h2_tags[:5])}",
        f"Navigation: {', '.join(signals.nav_labels[:10])}",
        "---",
        "Website Text Content:",
        text
    ]
    return "\n".join(summary_parts)
