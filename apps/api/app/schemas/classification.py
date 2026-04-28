from pydantic import BaseModel
from typing import Optional

class Metrics(BaseModel):
    body_width: float
    body_height: float
    body_ratio: float
    contour_area: float

class ClassificationResponse(BaseModel):
    success: bool
    animal_type: str
    breed: str
    breed_confidence: float
    confidence: float
    metrics: Metrics
    score: str
    original_image_url: Optional[str] = None
    processed_image_url: Optional[str] = None
    error: Optional[str] = None
