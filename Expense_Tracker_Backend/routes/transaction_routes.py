from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from auth import get_user_access
from database import transaction_collection
from schemas import TransactionsCreate, TransactionsResponse
from datetime import datetime, timezone

router = APIRouter()


# Helper to convert MongoDB document to response-friendly dict
def transaction_to_dict(tx):
    return {
        "id": str(tx["_id"]),
        "is_income": tx["is_income"],
        "category": tx["category"],
        "amount": tx["amount"],
        "description": tx["description"],
        "time": tx["time"],
    }


@router.post('/transaction')
def transaction(transaction: TransactionsCreate, user_id=Depends(get_user_access)):
    new_transaction = {
        "user_id": user_id,
        "is_income": transaction.is_income,
        "category": transaction.category,
        "amount": transaction.amount,
        "description": transaction.description,
        "time": datetime.now(timezone.utc),
    }
    result = transaction_collection.insert_one(new_transaction)
    new_transaction["_id"] = result.inserted_id
    return transaction_to_dict(new_transaction)


@router.get('/transactions', response_model=list[TransactionsResponse])
def getTransactions(user_id=Depends(get_user_access)):
    transactions = transaction_collection.find(
        {"user_id": user_id}
    ).sort("time", -1)
    return [transaction_to_dict(tx) for tx in transactions]


@router.delete('/transaction/{transaction_id}')
def deleteTransaction(transaction_id: str, user_id=Depends(get_user_access)):
    result = transaction_collection.delete_one({
        "_id": ObjectId(transaction_id),
        "user_id": user_id,
    })
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="transaction not found")
    return {"message": "Transaction deleted"}
