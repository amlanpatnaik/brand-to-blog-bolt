from app.core.config import settings
from app.services.providers.gemini_provider import GeminiProvider
from app.services.providers.openai_provider import OpenAIProvider
from fastapi import HTTPException

def get_default_provider():
    provider = settings.DEFAULT_PROVIDER.lower()
    if provider == "gemini":
        if not settings.GEMINI_API_KEY:
            raise HTTPException(503, "App default AI unavailable: GEMINI_API_KEY not configured")
        return GeminiProvider(api_key=settings.GEMINI_API_KEY, model=settings.DEFAULT_MODEL)
    elif provider == "openai":
        if not settings.OPENAI_API_KEY:
            raise HTTPException(503, "App default AI unavailable: OPENAI_API_KEY not configured")
        return OpenAIProvider(api_key=settings.OPENAI_API_KEY, model=settings.DEFAULT_MODEL)
    else:
        raise HTTPException(503, f"App default AI unavailable: unknown provider '{provider}'")
