from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime

class ExtractorRequest(BaseModel):
    url: str
    llm_mode: str
    api_key: Optional[str] = None

class SourceSignals(BaseModel):
    page_title: Optional[str] = None
    meta_description: Optional[str] = None
    canonical_url: Optional[str] = None
    h1_tags: List[str] = []
    h2_tags: List[str] = []
    nav_labels: List[str] = []
    has_json_ld: bool = False
    word_count: int = 0
    fetch_status: str = "ok"

class ExtractorOutput(BaseModel):
    input_url: str
    canonical_url: Optional[str] = None
    brand_name: str
    company_summary: str
    value_proposition: str
    offerings: List[str] = []
    audience: List[str] = []
    brand_voice: str
    differentiators: List[str] = []
    geo_signals: List[str] = []
    trust_signals: List[str] = []
    product_or_service_categories: List[str] = []
    content_themes: List[str] = []
    seo_opportunities: List[str] = []
    keyword_suggestions: List[str] = []
    structured_raw_text_summary: str
    source_signals: SourceSignals
    provider_used: str
    model_used: str
    extracted_at: str

class ExtractorResponse(BaseModel):
    status: str
    data: Optional[ExtractorOutput] = None
    error: Optional[str] = None
