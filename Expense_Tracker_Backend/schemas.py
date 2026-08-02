from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class User(BaseModel):   # frontend -> receive data -> Validate
    username : str = Field(..., min_length=2)
    email : EmailStr
    password : str = Field(..., min_length=8)

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