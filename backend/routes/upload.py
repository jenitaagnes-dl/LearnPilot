from fastapi import APIRouter, UploadFile, File
import os

from services.pdf_processor import extract_text_from_pdf


router = APIRouter(
    prefix="/api/upload",
    tags=["Document Upload"]
)


@router.post("/pdf")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        return {
            "success": False,
            "message": "Only PDF files are supported."
        }

    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join("uploads", file.filename)

    contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    text = extract_text_from_pdf(file_path)

    return {
        "success": True,
        "filename": file.filename,
        "characters_extracted": len(text),
        "preview": text[:1000]
    }