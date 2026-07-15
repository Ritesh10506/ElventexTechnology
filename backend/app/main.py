from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import auth, requirements, media, admin
from app.models import customer, service_request, media as media_model, admin as admin_model

app = FastAPI(title="Elventex API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(requirements.router, prefix="/requests", tags=["requests"])
app.include_router(media.router, prefix="/media", tags=["media"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])


@app.get("/")
def health_check():
    return {"status": "ok", "service": "elventex-api"}