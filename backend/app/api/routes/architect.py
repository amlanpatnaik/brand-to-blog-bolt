from fastapi import APIRouter, HTTPException
from app.schemas.architect import ArchitectRequest, ArchitectResponse
from app.services.orchestrator import run_architect

router = APIRouter()

@router.post("/architect", response_model=ArchitectResponse)
async def generate_ideas(request: ArchitectRequest):
    try:
        result = await run_architect(
            extractor_data=request.extractor_output,
            user_keywords=request.user_keywords,
            llm_mode=request.llm_mode,
            api_key=request.api_key
        )
        return ArchitectResponse(status="success", data=result)
    except HTTPException:
        raise
    except Exception as e:
        return ArchitectResponse(status="error", error=str(e))
