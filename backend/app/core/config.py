from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    DEFAULT_PROVIDER: str = "gemini"
    DEFAULT_MODEL: str = "gemini-2.0-flash"
    GEMINI_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    GEMINI_USER_MODEL: str = "gemini-2.0-flash"
    OPENAI_USER_MODEL: str = "gpt-4o-mini"
    ALLOWED_ORIGINS: str = "http://localhost:3000"
    REQUEST_TIMEOUT: int = 30
    LLM_TIMEOUT: int = 120
    MAX_CONTENT_CHARS: int = 15000
    MAX_RETRIES: int = 2

    model_config = {"env_file": ".env", "extra": "ignore"}

settings = Settings()
