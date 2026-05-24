from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/health")
async def health_check():
    default_available = bool(
        (settings.DEFAULT_PROVIDER == "gemini" and settings.GEMINI_API_KEY) or
        (settings.DEFAULT_PROVIDER == "openai" and settings.OPENAI_API_KEY)
    )
    return {
        "status": "ok",
        "default_ai_available": default_available,
        "default_provider": settings.DEFAULT_PROVIDER,
        "default_model": settings.DEFAULT_MODEL,
    }
