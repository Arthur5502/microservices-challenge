from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
import uvicorn

app = FastAPI(title="API Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://users_service:8001")
ORDER_SERVICE_URL = os.getenv("ORDER_SERVICE_URL", "http://orders_service:8002")

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "gateway"}

@app.get("/api/users")
def proxy_users():
    try:
        r = httpx.get(f"{USER_SERVICE_URL}/users", timeout=2)
        return JSONResponse(status_code=r.status_code, content=r.json())
    except Exception as e:
        raise HTTPException(status_code=502, detail="User Service offline") 

@app.get("/api/orders/{user_id}")
def proxy_orders(user_id: int):
    try:
        r = httpx.get(f"{ORDER_SERVICE_URL}/orders/{user_id}", timeout=2)
        return JSONResponse(status_code=r.status_code, content=r.json())
    except Exception as e:
        raise HTTPException(status_code=502, detail="Order Service offline") 

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
