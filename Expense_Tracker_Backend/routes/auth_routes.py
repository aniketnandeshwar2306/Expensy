from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
import bcrypt
from auth import create_access_token, get_user_access
from database import user_collection
from schemas import User

router = APIRouter()


@router.get('/profile')
async def Profile(user_id: str = Depends(get_user_access)):
    user = user_collection.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=404, detail="User not Found")
    else:
        return {
            "username": user["username"],
            "email": user["email"],
            "id": str(user["_id"])
        }


@router.post('/register')
async def Register(user: User):  # (var name : var type)

    existing_user = user_collection.find_one({"email": user.email})
    if (existing_user):
        raise HTTPException(status_code=409, detail="Email already exists")
    else:
        hashed_password = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")  # string to bytes, bytes are hashed , hashed bytes to string
        new_user = {
            "username": user.username,
            "email": user.email,
            "password": hashed_password,
        }
        user_collection.insert_one(new_user)
    return {
        "message": "User value received"
    }


@router.post('/login')
async def Login(user: User):
    existing_user = user_collection.find_one({"email": user.email})
    if existing_user:
        if bcrypt.checkpw(user.password.encode("utf-8"), existing_user["password"].encode("utf-8")):  # (entered password in byte , db password in byte) checks if password matches
            token = create_access_token({
                "user_id": str(existing_user["_id"]),
                "email": existing_user["email"]
            })
            return {
                "access_token": token,
                "token_type": "bearer",
                "message": "Login Successfully"
            }
        else:
            raise HTTPException(status_code=401, detail="Incorrect Email or Password")
    else:
        raise HTTPException(status_code=404, detail="User not found, create new Account")
