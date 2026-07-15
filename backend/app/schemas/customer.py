from pydantic import BaseModel, EmailStr


class OtpRequest(BaseModel):
    name: str
    mobile_number: str
    email: EmailStr


class OtpVerify(BaseModel):
    email: EmailStr
    code: str


class CustomerOut(BaseModel):
    id: int
    name: str
    mobile_number: str
    email: str
    is_verified: bool

    class Config:
        from_attributes = True