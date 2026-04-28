import boto3
import uuid
import os
from app.core.config import settings

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REGION
)

def generate_presigned_url(object_key: str, expiration: int = 3600) -> str:
    if not object_key:
        return None
    return s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": settings.AWS_S3_BUCKET, "Key": object_key},
        ExpiresIn=expiration
    )

def upload_image(file_path: str, prefix: str = "uploads") -> str:
    file_ext = os.path.splitext(file_path)[1]
    object_name = f"{prefix}/{uuid.uuid4()}{file_ext}"
    
    s3_client.upload_file(
        file_path, 
        settings.AWS_S3_BUCKET, 
        object_name,
        ExtraArgs={"ContentType": f"image/{file_ext.strip('.').lower()}"}
    )
    
    return object_name

def upload_processed_image(file_path: str) -> str:
    return upload_image(file_path, prefix="processed")

def delete_image(object_key: str):
    if object_key:
        s3_client.delete_object(Bucket=settings.AWS_S3_BUCKET, Key=object_key)
