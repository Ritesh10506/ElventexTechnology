from pydantic import BaseModel
from datetime import datetime
from typing import List

from app.models.service_request import ServiceType, RequestStatus
from app.schemas.media import MediaOut


class ServiceRequestCreate(BaseModel):
    service_type: ServiceType
    description: str


class ServiceRequestOut(BaseModel):
    id: int
    service_type: ServiceType
    description: str
    status: RequestStatus
    created_at: datetime
    media_files: List[MediaOut] = []

    class Config:
        from_attributes = True