from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["System"])

@router.get("/")
async def health_check():
    return {"status": "ok", "message": "AgriNN API is running"}
