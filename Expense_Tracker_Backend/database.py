from pymongo import MongoClient  # type: ignore

client = MongoClient("mongodb://localhost:27017")

db = client["expense-tracker"]

user_collection = db["users"]
transaction_collection = db["transactions"]