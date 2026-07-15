import random
import string
from datetime import datetime, timedelta

import httpx

from app.core.config import settings


def generate_otp() -> str:
    return "".join(random.choices(string.digits, k=6))


def get_otp_expiry() -> datetime:
    return datetime.utcnow() + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)


def send_otp_email(to_email: str, code: str):
    # If no Brevo key is set yet, print to console instead of failing —
    # lets you keep building/testing without waiting on Brevo signup.
    if not settings.BREVO_API_KEY:
        print(f"[DEV MODE] OTP for {to_email}: {code}")
        return

    response = httpx.post(
        "https://api.brevo.com/v3/smtp/email",
        headers={
            "api-key": settings.BREVO_API_KEY,
            "Content-Type": "application/json",
        },
        json={
            "sender": {"name": "Elventex Technology", "email": "no-reply@elventex.com"},
            "to": [{"email": to_email}],
            "subject": "Your Elventex verification code",
            "htmlContent": f"<p>Your verification code is: <b>{code}</b></p><p>This code expires in {settings.OTP_EXPIRE_MINUTES} minutes.</p>",
        },
        timeout=10.0,
    )
    response.raise_for_status()