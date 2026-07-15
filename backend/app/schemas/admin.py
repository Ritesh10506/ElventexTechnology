from pydantic import BaseModel, EmailStr
from datetime import datetime

from app.models.service_request import ServiceType, RequestStatus


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminOut(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True


class StatusUpdate(BaseModel):
    status: RequestStatus


class CustomerBrief(BaseModel):
    id: int
    name: str
    mobile_number: str
    email: str

    class Config:
        from_attributes = True


class AdminServiceRequestOut(BaseModel):
    id: int
    service_type: ServiceType
    description: str
    status: RequestStatus
    created_at: datetime
    customer: CustomerBrief

    class Config:
        from_attributes = True