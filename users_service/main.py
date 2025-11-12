from fastapi import FastAPI, HTTPException
from typing import List, Dict
import uvicorn

app = FastAPI(title="User Service")

USERS_DB = [
    {"id": 1, "name": "Arthur Silva", "email": "arthur@dogship.com", "role": "developer"},
    {"id": 2, "name": "Maria Santos", "email": "maria@example.com", "role": "designer"},
    {"id": 3, "name": "João Oliveira", "email": "joao@example.com", "role": "manager"},
]

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "users"}

@app.get("/users", response_model=List[Dict])
def get_users():
    print("Listando todos os usuários...")
    return USERS_DB

@app.get("/users/{user_id}", response_model=Dict)
def get_user(user_id: int):
    print(f"Buscando usuário com ID: {user_id}")
    user = next((u for u in USERS_DB if u["id"] == user_id), None)
    
    if not user:
        print(f"Usuário {user_id} não encontrado")
        raise HTTPException(status_code=404, detail="User not found")
    
    print(f"Usuário encontrado: {user['name']}")
    return user

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
