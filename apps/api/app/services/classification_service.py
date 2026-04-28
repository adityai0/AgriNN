import os
import shutil
import uuid
from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.classification import ClassificationResult
from ai.inference import run_inference


async def process_image_classification(file: UploadFile, db: Session, user_id: int = None):
    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    local_path = os.path.join(settings.UPLOAD_DIR, unique_filename)

    with open(local_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        from app.services.s3_service import upload_image, upload_processed_image, generate_presigned_url
        original_image_key = upload_image(local_path)
    except Exception as e:
        if os.path.exists(local_path):
            os.remove(local_path)
        return {
            "success": False,
            "animal_type": "unknown",
            "confidence": 0.0,
            "metrics": {"body_width": 0.0, "body_height": 0.0, "body_ratio": 0.0, "contour_area": 0.0},
            "score": "N/A",
            "error": f"Failed to upload to S3: {str(e)}",
        }

    inference_result = run_inference(local_path)
    
    if os.path.exists(local_path):
        os.remove(local_path)

    if inference_result.get("error"):
        return {
            "success": False,
            "animal_type": "unknown",
            "breed": "Unknown",
            "breed_confidence": 0.0,
            "confidence": 0.0,
            "metrics": {"body_width": 0.0, "body_height": 0.0, "body_ratio": 0.0, "contour_area": 0.0},
            "score": "N/A",
            "original_image_url": generate_presigned_url(original_image_key),
            "error": inference_result["error"],
        }

    processed_image_key = None
    saved_image_path = inference_result.get("saved_image_path")
    if saved_image_path and os.path.exists(saved_image_path):
        try:
            processed_image_key = upload_processed_image(saved_image_path)
        except Exception:
            pass
        finally:
            os.remove(saved_image_path)

    metrics_data = inference_result.get("metrics", {})
    body_width = metrics_data.get("body_width", 0.0)
    body_height = metrics_data.get("body_height", 0.0)
    body_ratio = metrics_data.get("body_ratio", 0.0)
    contour_area = metrics_data.get("contour_area", 0.0)

    db_record = ClassificationResult(
        user_id=user_id,
        animal_type=inference_result["animal_type"],
        breed=inference_result.get("breed", "Unknown"),
        breed_confidence=inference_result.get("breed_confidence", 0.0),
        confidence=inference_result["confidence"],
        score=inference_result["score"],
        body_width=body_width,
        body_height=body_height,
        body_ratio=body_ratio,
        contour_area=contour_area,
        original_image_key=original_image_key,
        processed_image_key=processed_image_key,
    )

    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    return {
        "success": True,
        "animal_type": inference_result["animal_type"],
        "breed": inference_result.get("breed", "Unknown"),
        "breed_confidence": inference_result.get("breed_confidence", 0.0),
        "confidence": inference_result["confidence"],
        "metrics": {
            "body_width": body_width,
            "body_height": body_height,
            "body_ratio": body_ratio,
            "contour_area": contour_area,
        },
        "score": inference_result["score"],
        "original_image_url": generate_presigned_url(original_image_key),
        "processed_image_url": generate_presigned_url(processed_image_key),
    }
