from fastapi import FastAPI

from routes.upload import router as upload_router


app = FastAPI(
    title="LearnPilot AI",
    description="AI-powered Learning Management System",
    version="1.0.0"
)


app.include_router(upload_router)


@app.get("/")
def root():
    return {
        "message": "LearnPilot AI API is running",
        "status": "healthy"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }