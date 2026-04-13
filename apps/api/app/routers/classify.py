from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.classification import ClassificationResponse
from app.services.classification_service import process_image_classification

router = APIRouter(prefix="/classify", tags=["AI Inference"])

@router.post("/", response_model=ClassificationResponse)
async def classify_animal(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    Upload an image for Animal Type Classification.
    Returns the classification metrics, score, and confidence.
    """
    # Assuming user_id=None for now as authentication is not implemented yet
    result = await process_image_classification(file, db, user_id=None)
    return result
