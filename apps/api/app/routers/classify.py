from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.classification import ClassificationResponse
from app.services.classification_service import process_image_classification

router = APIRouter(prefix="/classify", tags=["AI Inference"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}


@router.post("/", response_model=ClassificationResponse)
async def classify_animal(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail=f"Invalid file type: {file.content_type}")
    result = await process_image_classification(file, db, user_id=None)
    return result
