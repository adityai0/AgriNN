import os
import shutil
import uuid
from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.classification import ClassificationResult

# Import AI pipeline logic
# Ensure PYTHONPATH allows importing from the root or relative paths correctly
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))
from ai.inference import run_inference

async def process_image_classification(file: UploadFile, db: Session, user_id: int = None):
    # 1. Save file locally (designed to be swapped with S3 later)
    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    local_path = os.path.join(settings.UPLOAD_DIR, unique_filename)
    
    with open(local_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # 2. Call inference pipeline
    inference_result = run_inference(local_path)
    
    if inference_result.get("error"):
        return {
            "success": False,
            "animal_type": "unknown",
            "confidence": 0.0,
            "metrics": {
                "body_width": 0.0,
                "body_height": 0.0,
                "body_ratio": 0.0,
                "contour_area": 0.0
            },
            "score": "N/A",
            "error": inference_result["error"]
        }
        
    # Extract metrics safely
    metrics_data = inference_result.get("metrics", {})
    body_width = metrics_data.get("body_width", 0.0)
    body_height = metrics_data.get("body_height", 0.0)
    body_ratio = metrics_data.get("body_ratio", 0.0)
    contour_area = metrics_data.get("contour_area", 0.0)

    # 3. Save to database
    db_record = ClassificationResult(
        user_id=user_id,
        animal_type=inference_result["animal_type"],
        confidence=inference_result["confidence"],
        score=inference_result["score"],
        body_width=body_width,
        body_height=body_height,
        body_ratio=body_ratio,
        contour_area=contour_area,
        image_path=local_path  # Update this later if pushing to S3
    )
    
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    
    # 4. Construct response
    return {
        "success": True,
        "animal_type": inference_result["animal_type"],
        "confidence": inference_result["confidence"],
        "metrics": {
            "body_width": body_width,
            "body_height": body_height,
            "body_ratio": body_ratio,
            "contour_area": contour_area
        },
        "score": inference_result["score"]
    }
