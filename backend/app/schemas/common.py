from pydantic import BaseModel
from typing import Literal, Optional

class LLMSelection(BaseModel):
    mode: Literal["gemini_user", "openai_user", "app_default"]
    api_key: Optional[str] = None
