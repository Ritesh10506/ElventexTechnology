from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.security import decode_access_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.models.customer import Customer
from app.models.service_request import ServiceRequest
from app.schemas.service_request import ServiceRequestCreate, ServiceRequestOut

router = APIRouter()
bearer_scheme = HTTPBearer()


def get_current_customer(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> Customer:
    try:
        payload = decode_access_token(credentials.credentials)
        customer_id = int(payload.get("sub"))
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=401, detail="Customer not found")
    return customer


@router.post("/", response_model=ServiceRequestOut)
def create_request(
    payload: ServiceRequestCreate,
    db: Session = Depends(get_db),
    current_customer: Customer = Depends(get_current_customer),
):
    new_request = ServiceRequest(
        customer_id=current_customer.id,
        service_type=payload.service_type,
        description=payload.description,
    )
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request


@router.get("/", response_model=List[ServiceRequestOut])
def list_my_requests(
    db: Session = Depends(get_db),
    current_customer: Customer = Depends(get_current_customer),
):
    return db.query(ServiceRequest).filter(ServiceRequest.customer_id == current_customer.id).all()