from pydantic import BaseModel
from typing import List, Optional

class ArchitectRequest(BaseModel):
    extractor_output: dict
    user_keywords: List[str] = []
    llm_mode: str
    api_key: Optional[str] = None

class BlogIdea(BaseModel):
    id: str
    title: str
    primary_keyword: str
    secondary_keywords: List[str] = []
    search_intent: str
    funnel_stage: str
    why_it_can_rank: str
    target_audience: str
    angle: str
    outline: List[str] = []
    suggested_cta: str

class ArchitectOutput(BaseModel):
    selected_keywords: List[str] = []
    blog_ideas: List[BlogIdea] = []
    content_strategy_notes: str
    provider_used: str
    model_used: str

class ArchitectResponse(BaseModel):
    status: str
    data: Optional[ArchitectOutput] = None
    error: Optional[str] = None
