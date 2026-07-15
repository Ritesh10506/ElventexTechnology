from pydantic import BaseModel
from datetime import datetime

from app.models.service_request import ServiceType, RequestStatus


class ServiceRequestCreate(BaseModel):
    service_type: ServiceType
    description: str


class ServiceRequestOut(BaseModel):
    id: int
    service_type: ServiceType
    description: str
    status: RequestStatus
    created_at: datetime

    class Config:
        from_attributes = True