from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta
from app.db.session import get_db
from app.models.classification import ClassificationResult

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_analyses = db.query(func.count(ClassificationResult.id)).scalar() or 0
    avg_confidence = db.query(func.avg(ClassificationResult.confidence)).scalar() or 0.0
    cattle_processed = db.query(func.count(ClassificationResult.id)).filter(ClassificationResult.animal_type == 'cattle').scalar() or 0
    buffalo_processed = db.query(func.count(ClassificationResult.id)).filter(ClassificationResult.animal_type == 'buffalo').scalar() or 0
    
    return {
        "total_analyses": total_analyses,
        "average_confidence": round(avg_confidence, 4),
        "cattle_processed": cattle_processed,
        "buffalo_processed": buffalo_processed
    }

@router.get("/analytics")
def get_dashboard_analytics(db: Session = Depends(get_db)):
    # 1. Weekly Volume (last 7 days grouped by day name)
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    recent_records = db.query(ClassificationResult.created_at, ClassificationResult.animal_type).filter(
        ClassificationResult.created_at >= seven_days_ago
    ).all()
    
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    weekly_volume = {d: {"name": d, "cattle": 0, "buffalo": 0} for d in days}
    
    for r in recent_records:
        day_name = r.created_at.strftime("%a")
        if r.animal_type == "cattle":
            weekly_volume[day_name]["cattle"] += 1
        elif r.animal_type == "buffalo":
            weekly_volume[day_name]["buffalo"] += 1
            
    # Reorder starting from 6 days ago up to today
    ordered_weekly_volume = []
    for i in range(6, -1, -1):
        d_name = (datetime.utcnow() - timedelta(days=i)).strftime("%a")
        ordered_weekly_volume.append(weekly_volume[d_name])

    # 2. ATC Grade Distribution
    distribution_records = db.query(ClassificationResult.grade, func.count(ClassificationResult.id)).group_by(ClassificationResult.grade).all()
    
    distribution_map = {
        "Excellent": 0,
        "Very Good": 0,
        "Good": 0,
        "Average": 0,
        "N/A": 0
    }
    
    for grade, count in distribution_records:
        if grade in distribution_map:
            distribution_map[grade] = count
        elif grade is not None:
            distribution_map["N/A"] += count
            
    atc_distribution = [
        {"name": k, "count": v} for k, v in distribution_map.items() if k != "N/A" or v > 0
    ]

    return {
        "weekly_volume": ordered_weekly_volume,
        "atc_distribution": atc_distribution
    }
