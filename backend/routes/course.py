from fastapi import APIRouter
from pydantic import BaseModel

from services.course_generator import generate_course


router = APIRouter(
    prefix="/api/course",
    tags=["Course Generation"]
)


class CourseRequest(BaseModel):
    text: str


@router.post("/generate")
def generate_course_endpoint(request: CourseRequest):
    course = generate_course(request.text)

    return {
        "success": True,
        "course": course
    }