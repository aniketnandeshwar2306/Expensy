
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column , Integer , String , Float , Boolean , DateTime
from sqlalchemy import ForeignKey
from datetime import   datetime 

Base = declarative_base()




class UserTable(Base):   # Database -> store data -> retrieve data
    __tablename__ = "users"
    id = Column(Integer , primary_key=True)  # each user must have this unique id
    username  = Column(String)
    email  = Column(String , unique=True)
    password  = Column(String)

class TransactionsTable(Base):
    __tablename__ = "transactions"

    id = Column(Integer , primary_key=True)
    user_id = Column(Integer , ForeignKey("users.id"))
    is_income = Column(Boolean)
    category = Column(String)
    amount = Column(Float)
    description = Column(String)
    time = Column(DateTime , default= datetime.utcnow)