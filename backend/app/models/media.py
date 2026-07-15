from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.core.database import Base


class MediaFile(Base):
    __tablename__ = "media_files"

    id = Column(Integer, primary_key=True, index=True)
    service_request_id = Column(Integer, ForeignKey("service_requests.id"), nullable=False)
    file_type = Column(String(20), nullable=False)  # "image" or "video"
    storage_url = Column(String(500), nullable=False)  # Cloudinary's secure_url
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    service_request = relationship("ServiceRequest", back_populates="media_files")