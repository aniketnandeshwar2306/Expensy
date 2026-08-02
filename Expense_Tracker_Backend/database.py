import os
from pymongo import MongoClient  # type: ignore
import certifi

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")

# Use certifi for TLS CA certificates if connecting to remote MongoDB Atlas
if "mongodb+srv" in MONGODB_URL:
    client = MongoClient(MONGODB_URL, tlsCAFile=certifi.where())
else:
    client = MongoClient(MONGODB_URL)

db = client["expense-tracker"]

user_collection = db["users"]
transaction_collection = db["transactions"]