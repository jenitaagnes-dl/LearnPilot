from routes.course import router as course_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.upload import router as upload_router

app = FastAPI(
    title="LearnPilot AI",
    description="AI-powered Learning Management System",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(upload_router)
app.include_router(course_router)

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