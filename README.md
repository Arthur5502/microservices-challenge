# Microsserviços com Docker e API Gateway

## Como rodar (passo a passo)

1. **Clone o repositório e navegue para a pasta raiz do projeto.**
2. **Execute (Docker e Docker Compose precisam estar instalados):**
```
docker-compose up --build
```
3. **Testes de API:**
- Listar usuários:
  ```
  curl http://localhost:8080/api/users
  ```
- Pedidos do usuário 1:
  ```
  curl http://localhost:8080/api/orders/1
  ```

4. **Para desligar:**

docker-compose down
