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
    confidence: float
    metrics: Metrics
    score: str
    error: Optional[str] = None
