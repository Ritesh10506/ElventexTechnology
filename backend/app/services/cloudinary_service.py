import cloudinary
import cloudinary.uploader

from app.core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


def upload_file(file, resource_type: str = "auto") -> dict:
    """
    Uploads a file-like object to Cloudinary.
    resource_type: 'image', 'video', or 'auto' (Cloudinary detects it)
    Returns Cloudinary's response dict, which includes 'secure_url'.
    """
    result = cloudinary.uploader.upload(file, resource_type=resource_type)
    return result