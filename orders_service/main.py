from fastapi import FastAPI, HTTPException
from typing import List, Dict
import httpx
import uvicorn
import os

app = FastAPI(title="Order Service")

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://users_service:8001")

ORDERS_DB = [
    {"id": 101, "user_id": 1, "product": "MacBook Pro M3", "amount": 15000.00},
    {"id": 102, "user_id": 1, "product": "Kindle Paperwhite", "amount": 650.00},
    {"id": 103, "user_id": 2, "product": "Cadeira Gamer", "amount": 1300.00},
]

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "orders"}

@app.get("/orders/{user_id}", response_model=List[Dict])
def get_orders(user_id: int):
    try:
        response = httpx.get(f"{USER_SERVICE_URL}/users/{user_id}", timeout=2)
        response.raise_for_status()
    except Exception:
        raise HTTPException(status_code=404, detail=f"Usuário {user_id} não encontrado.")
    
    orders = [order for order in ORDERS_DB if order["user_id"] == user_id]
    return orders

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
