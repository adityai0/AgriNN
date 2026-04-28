import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgriNN API"
    DATABASE_URL: str = "sqlite:///./agrinn.db"
    CORS_ORIGINS: str = "http://localhost:3000"
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
    
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    AWS_S3_BUCKET: str = ""

    class Config:
        env_file = ".env"

settings = Settings()

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
