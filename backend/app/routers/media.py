from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.customer import Customer
from app.models.service_request import ServiceRequest
from app.models.media import MediaFile
from app.schemas.media import MediaOut
from app.services.cloudinary_service import upload_file
from app.routers.requirements import get_current_customer

router = APIRouter()


@router.post("/upload/{service_request_id}", response_model=MediaOut)
def upload_media(
    service_request_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_customer: Customer = Depends(get_current_customer),
):
    # confirm this service request actually belongs to the logged-in customer
    service_request = (
        db.query(ServiceRequest)
        .filter(
            ServiceRequest.id == service_request_id,
            ServiceRequest.customer_id == current_customer.id,
        )
        .first()
    )
    if not service_request:
        raise HTTPException(status_code=404, detail="Service request not found")

    result = upload_file(file.file)

    file_type = "video" if result.get("resource_type") == "video" else "image"

    media = MediaFile(
        service_request_id=service_request_id,
        file_type=file_type,
        storage_url=result["secure_url"],
    )
    db.add(media)
    db.commit()
    db.refresh(media)

    return media