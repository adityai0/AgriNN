from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.db.session import get_db
from app.models.classification import ClassificationResult
from app.services.s3_service import generate_presigned_url

router = APIRouter(prefix="/records", tags=["Records"])

@router.get("/")
def get_recent_records(limit: int = 50, db: Session = Depends(get_db)):
    records = db.query(ClassificationResult).order_by(desc(ClassificationResult.created_at)).limit(limit).all()
    
    response = []
    for record in records:
        response.append({
            "id": record.id,
            "animal_type": record.animal_type,
            "breed": record.breed,
            "breed_confidence": record.breed_confidence,
            "confidence": record.confidence,
            "score": record.score,
            "original_image_url": generate_presigned_url(record.original_image_key) if record.original_image_key else None,
            "processed_image_url": generate_presigned_url(record.processed_image_key) if record.processed_image_key else None,
            "created_at": record.created_at
        })
        
    return response
