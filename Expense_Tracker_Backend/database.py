import os
from pymongo import MongoClient  # type: ignore

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")

client = MongoClient(MONGODB_URL)

db = client["expense-tracker"]

user_collection = db["users"]
transaction_collection = db["transactions"]