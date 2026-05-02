from pydantic import BaseModel
from typing import Optional

class Traits(BaseModel):
    stature: int
    body_length: int
    chest_width: int
    body_depth: int
    rump_width: int
    rump_angle: int
    angularity: int
    dairy_strength: int

class Metrics(BaseModel):
    body_width: float
    body_height: float
    body_ratio: float
    contour_area: float

class ClassificationResponse(BaseModel):
    id: str = None
    success: bool
    animal_type: str
    breed: str
    breed_confidence: float
    confidence: float
    traits: Traits
    composite_score: int
    grade: str
    metrics: Metrics
    score: str
    original_image_url: Optional[str] = None
    processed_image_url: Optional[str] = None
    error: Optional[str] = None
