from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from app.db.base import Base

class ClassificationResult(Base):
    __tablename__ = "classification_results"

    id = Column(Integer, primary_key=True, index=True)
    
    # User relationship for future scalability (nullable for now)
    user_id = Column(Integer, nullable=True, index=True)
    
    animal_type = Column(String, index=True)
    breed = Column(String, index=True)
    breed_confidence = Column(Float)
    confidence = Column(Float)
    score = Column(String, index=True)
    
    # Flattened Metrics
    body_width = Column(Float)
    body_height = Column(Float)
    body_ratio = Column(Float)
    contour_area = Column(Float)
    
    # Advanced Morphology
    traits = Column(JSON)
    composite_score = Column(Integer)
    grade = Column(String)
    
    original_image_key = Column(String)
    processed_image_key = Column(String)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
