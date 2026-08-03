from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):   # frontend -> register -> Validate
    username : str = Field(..., min_length=2)
    email : EmailStr
    password : str = Field(..., min_length=8)

class UserLogin(BaseModel):   # frontend -> login -> Validate
    email : EmailStr
    password : str = Field(..., min_length=8)

# Alias for backward compatibility
User = UserRegister

class TransactionsCreate(BaseModel):
    is_income : bool # expense or income
    category : str
    amount : float
    description : str

class TransactionsResponse(BaseModel):
    id : str
    is_income : bool # expense or income
    category : str
    amount : float
    description : str
    time : datetime