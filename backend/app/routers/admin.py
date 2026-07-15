from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session, joinedload
from typing import List

from app.core.database import get_db
from app.core.security import (
    create_access_token,
    decode_access_token,
    verify_password,
)
from app.models.admin import Admin
from app.models.service_request import ServiceRequest
from app.models.customer import Customer
from app.schemas.admin import (
    AdminLogin,
    AdminOut,
    StatusUpdate,
    AdminServiceRequestOut,
)

router = APIRouter()
bearer_scheme = HTTPBearer()


def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> Admin:
    try:
        payload = decode_access_token(credentials.credentials)
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        admin_id = int(payload.get("sub"))
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=401, detail="Admin not found")
    return admin


@router.post("/login")
def admin_login(payload: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == payload.email).first()
    if not admin or not verify_password(payload.password, admin.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    token = create_access_token({"sub": str(admin.id), "role": "admin"})
    return {
        "access_token": token,
        "token_type": "bearer",
        "admin": AdminOut.model_validate(admin),
    }


@router.get("/requests", response_model=List[AdminServiceRequestOut])
def list_all_requests(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    return (
        db.query(ServiceRequest)
        .options(joinedload(ServiceRequest.customer))
        .order_by(ServiceRequest.created_at.desc())
        .all()
    )


@router.patch("/requests/{request_id}/status", response_model=AdminServiceRequestOut)
def update_request_status(
    request_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    service_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not service_request:
        raise HTTPException(status_code=404, detail="Service request not found")

    service_request.status = payload.status
    db.commit()
    db.refresh(service_request)
    return service_request


@router.get("/customers")
def list_all_customers(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    return db.query(Customer).all()