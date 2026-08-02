from fastapi import FastAPI , HTTPException , Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine 
from sqlalchemy.orm import  sessionmaker
import bcrypt
from auth import create_access_token , get_user_access
from models import UserTable , TransactionsTable , Base
from schemas import User , TransactionsCreate , TransactionsResponse
from datetime import   datetime  , timezone

DATABASE_URL = "sqlite:///expense_tracker.db"


engine = create_engine(DATABASE_URL)  # bridge between db and FastAPI
sessionLocal = sessionmaker(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)   # creates table



@app.get('/')
async def root():
    return {"message": "Hello World"}



@app.get('/profile')
async def Profile(user_id : str = Depends(get_user_access)):
    db = sessionLocal()
    user = db.query(UserTable).filter(UserTable.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404 , detail="User no Found")
    else:
        return {
        "username" : user.username,
        "email" : user.email,
        "id" : user.id
        }

@app.post('/register')
async def Register(user : User):  # (var name : var type)
    
    db = sessionLocal()
    existing_user = db.query(UserTable).filter(UserTable.email == user.email).first() # it return either the UserTable object or None
    if(existing_user):
        raise HTTPException(status_code=409 , detail="Email already exists")
    else:
        hashed_password = bcrypt.hashpw(user.password.encode("utf-8"),bcrypt.gensalt()).decode("utf-8") # string to bytes, bytes are hashed , hashed bytes to string
        new_user = UserTable(
        username = user.username,
        email = user.email,
        password = hashed_password)
        db.add(new_user)
        db.commit()
        db.close()
    return {
        "message" : "User value received"
    }

@app.post('/login')
async def Login(user:User):
    db = sessionLocal()
    existing_user = db.query(UserTable).filter(UserTable.email == user.email).first()
    if existing_user:
        if bcrypt.checkpw(user.password.encode("utf-8"),existing_user.password.encode("utf-8")): # (entered password in byte , db passworrd in byte) checks if password matches 
            token = create_access_token({
                "user_id" : existing_user.id,
                "email" : existing_user.email
            })
            return{
                "access_token": token ,
                "token_type" : "bearer",
                "message" : "Login Successfully"
            }
        else:
            raise HTTPException(status_code=401, detail="Incorrect Email or Password")
    else:
        raise HTTPException(status_code= 404,detail="User not found, create new Account")
    

@app.post('/transaction')
def transaction( transaction : TransactionsCreate, user_id = Depends(get_user_access) ):
    db = sessionLocal()
    try:
        create_Table = TransactionsTable(
            user_id = user_id,
            is_income = transaction.is_income,
            category = transaction.category,
            amount = transaction.amount,
            description = transaction.description,
            time = datetime.now(timezone.utc)
        )
        db.add(create_Table)
        db.commit()
        db.refresh(create_Table)
        return create_Table
    
    finally:
        db.close()

@app.get('/transactions' , response_model=list[TransactionsResponse])
def getTransactions( user_id = Depends(get_user_access) ):
    db = sessionLocal()
    try:
        transactions = (db.query(TransactionsTable).
        filter(TransactionsTable.user_id == user_id)
        .order_by(TransactionsTable.time.desc())
        .all()
        )
        return transactions
    finally:
        db.close()

@app.delete('/transaction/{transaction_id}')
def deleteTransaction(transaction_id : int,user_id = Depends(get_user_access)):
    db = sessionLocal()
    try:
        transaction = (db.query(TransactionsTable).
        filter(TransactionsTable.id == transaction_id , TransactionsTable.user_id == user_id).first())
        if(transaction is None):
            raise HTTPException(status_code=404 , detail="transaction not found")
        else:
            db.delete(transaction)
            db.commit()
    finally:
        db.close()






    


