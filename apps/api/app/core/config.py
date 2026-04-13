import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgriNN API"
    # Provide a default SQLite DB if Postgres is not set yet for testing
    DATABASE_URL: str = "sqlite:///./agrinn.db" 
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")

    class Config:
        env_file = ".env"

settings = Settings()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
