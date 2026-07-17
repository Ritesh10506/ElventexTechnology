"""
One-time script to create your first admin account.
Run with: python create_admin.py
"""
from app.core.database import SessionLocal
from app.models.admin import Admin
from app.core.security import hash_password

db = SessionLocal()

name = input("Admin name: ")
email = input("Admin email: ")
password = input("Admin password: ")

existing = db.query(Admin).filter(Admin.email == email).first()
if existing:
    print("An admin with this email already exists.")
else:
    admin = Admin(name=name, email=email, hashed_password=hash_password(password))
    db.add(admin)
    db.commit()
    print(f"Admin '{name}' created successfully.")

db.close()