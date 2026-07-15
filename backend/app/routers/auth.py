from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi.responses import RedirectResponse
from app.services.google_oauth_service import (
    build_google_auth_url,
    exchange_code_for_token,
    get_google_user_info,
)

from app.core.database import get_db
from app.core.security import create_access_token
from app.models.customer import Customer
from app.schemas.customer import OtpRequest, OtpVerify, CustomerOut
from app.services.otp_service import generate_otp, get_otp_expiry, send_otp_email

router = APIRouter()


@router.post("/otp/request")
def request_otp(payload: OtpRequest, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.email == payload.email).first()

    if not customer:
        customer = Customer(
            name=payload.name,
            mobile_number=payload.mobile_number,
            email=payload.email,
        )
        db.add(customer)

    code = generate_otp()
    customer.otp_code = code
    customer.otp_expires_at = get_otp_expiry()
    db.commit()

    send_otp_email(payload.email, code)

    return {"message": "OTP sent"}


@router.post("/otp/verify")
def verify_otp(payload: OtpVerify, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.email == payload.email).first()

    if not customer or not customer.otp_code:
        raise HTTPException(status_code=400, detail="No OTP requested for this email")

    if customer.otp_code != payload.code:
        raise HTTPException(status_code=400, detail="Incorrect code")

    if customer.otp_expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Code expired, please request a new one")

    customer.is_verified = True
    customer.otp_code = None
    customer.otp_expires_at = None
    db.commit()

    token = create_access_token({"sub": str(customer.id)})

    return {
        "access_token": token,
        "token_type": "bearer",
        "customer": CustomerOut.model_validate(customer),
    }
@router.get("/google/login")
def google_login():
    return RedirectResponse(build_google_auth_url())


@router.get("/google/callback")
def google_callback(code: str, db: Session = Depends(get_db)):
    token_data = exchange_code_for_token(code)
    user_info = get_google_user_info(token_data["access_token"])

    email = user_info["email"]
    name = user_info.get("name", "")

    customer = db.query(Customer).filter(Customer.email == email).first()
    if not customer:
        customer = Customer(
            name=name,
            mobile_number="",
            email=email,
            is_verified=True,
        )
        db.add(customer)
    else:
        customer.is_verified = True

    db.commit()
    db.refresh(customer)

    access_token = create_access_token({"sub": str(customer.id)})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "customer": CustomerOut.model_validate(customer),
    }