from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base


class ServiceType(str, enum.Enum):
    website_designing = "website_designing"
    website_health_check = "website_health_check"
    seo_optimization = "seo_optimization"
    graphic_designing = "graphic_designing"
    logo_designing = "logo_designing"
    updating_website = "updating_website"


class RequestStatus(str, enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    in_review = "in_review"
    completed = "completed"
    cancelled = "cancelled"


class ServiceRequest(Base):
    __tablename__ = "service_requests"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    service_type = Column(Enum(ServiceType), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(Enum(RequestStatus), default=RequestStatus.pending)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    customer = relationship("Customer", back_populates="requests")
    media_files = relationship("MediaFile", back_populates="service_request")