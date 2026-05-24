from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import extractor, architect, writer, health

app = FastAPI(
    title="AIBuddy API",
    description="AI Content Pipeline: URL → Brand → Keywords → Blog Ideas → Article",
    version="1.0.0"
)

origins = [o.strip() for o in settings.ALLOWED_ORIGINS.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(extractor.router, prefix="/api", tags=["extractor"])
app.include_router(architect.router, prefix="/api", tags=["architect"])
app.include_router(writer.router, prefix="/api", tags=["writer"])

@app.get("/")
async def root():
    return {"message": "AIBuddy API", "docs": "/docs"}
