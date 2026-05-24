from typing import Optional, Union
from fastapi import HTTPException
from app.core.config import settings
from app.services.providers.gemini_provider import GeminiProvider
from app.services.providers.openai_provider import OpenAIProvider
from app.services.providers.default_provider import get_default_provider

def resolve_llm_client(mode: str, user_api_key: Optional[str] = None):
    if mode == "gemini_user":
        if not user_api_key:
            raise HTTPException(400, "Gemini API key required for gemini_user mode")
        return GeminiProvider(api_key=user_api_key, model=settings.GEMINI_USER_MODEL)
    elif mode == "openai_user":
        if not user_api_key:
            raise HTTPException(400, "OpenAI API key required for openai_user mode")
        return OpenAIProvider(api_key=user_api_key, model=settings.OPENAI_USER_MODEL)
    elif mode == "app_default":
        return get_default_provider()
    else:
        raise HTTPException(400, f"Unknown LLM mode: {mode}")
