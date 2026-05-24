from pydantic import BaseModel
from typing import List, Optional

class WriterRequest(BaseModel):
    extractor_output: dict
    selected_idea: dict
    llm_mode: str
    api_key: Optional[str] = None

class BlogSection(BaseModel):
    heading: str
    level: int = 2
    content: str

class FAQItem(BaseModel):
    question: str
    answer: str

class GeneratedBlog(BaseModel):
    title: str
    slug: str
    meta_title: str
    meta_description: str
    primary_keyword: str
    secondary_keywords: List[str] = []
    hook: str
    intro: str
    sections: List[BlogSection] = []
    faq: List[FAQItem] = []
    conclusion: str
    cta: str
    internal_link_suggestions: List[str] = []
    external_reference_suggestions: List[str] = []
    image_prompt_suggestions: List[str] = []
    schema_suggestions: List[str] = []
    markdown: str
    generated_at: str
    provider_used: str
    model_used: str

class WriterResponse(BaseModel):
    status: str
    data: Optional[GeneratedBlog] = None
    error: Optional[str] = None
