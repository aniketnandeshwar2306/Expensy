from datetime import   datetime 
from pydantic import BaseModel


class User(BaseModel):   # frotend -> receive data -> Validate
    username : str
    email : str
    password : str

class TransactionsCreate(BaseModel):
    is_income : bool # expense or income
    category : str
    amount : float
    description : str

class TransactionsResponse(BaseModel):
    id : int
    is_income : bool # expense or income
    category : str
    amount : float
    description : str
    time : datetime