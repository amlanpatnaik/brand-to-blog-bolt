from fastapi import APIRouter, HTTPException
from app.schemas.writer import WriterRequest, WriterResponse
from app.services.orchestrator import run_writer

router = APIRouter()

@router.post("/write", response_model=WriterResponse)
async def generate_article(request: WriterRequest):
    try:
        result = await run_writer(
            extractor_data=request.extractor_output,
            selected_idea=request.selected_idea,
            llm_mode=request.llm_mode,
            api_key=request.api_key
        )
        return WriterResponse(status="success", data=result)
    except HTTPException:
        raise
    except Exception as e:
        return WriterResponse(status="error", error=str(e))
