from fastapi import APIRouter, HTTPException
from app.schemas.extractor import ExtractorRequest, ExtractorResponse
from app.services.orchestrator import run_extractor

router = APIRouter()

@router.post("/extract", response_model=ExtractorResponse)
async def extract_brand(request: ExtractorRequest):
    try:
        result = await run_extractor(
            url=request.url,
            llm_mode=request.llm_mode,
            api_key=request.api_key
        )
        return ExtractorResponse(status="success", data=result)
    except HTTPException:
        raise
    except Exception as e:
        return ExtractorResponse(status="error", error=str(e))
