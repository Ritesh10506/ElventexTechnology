from pydantic import BaseModel
from datetime import datetime


class MediaOut(BaseModel):
    id: int
    service_request_id: int
    file_type: str
    storage_url: str
    uploaded_at: datetime

    class Config:
        from_attributes = True