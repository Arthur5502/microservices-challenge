# Microsserviços com Docker e API Gateway

Este projeto implementa uma arquitetura de microserviços com API Gateway e interface web.

## 🏗️ Arquitetura

- **Gateway Service** (porta 8080): API Gateway que roteia requisições
- **Users Service** (porta 8001): Gerencia dados de usuários
- **Orders Service** (porta 8002): Gerencia pedidos
- **Frontend Service** (porta 3000): Interface web para visualização

## 🚀 Como rodar (passo a passo)

1. **Clone o repositório e navegue para a pasta raiz do projeto.**

2. **Execute (Docker e Docker Compose precisam estar instalados):**
  ```bash
  docker-compose up --build
  ```

3. **Acesse a interface web:**
   - Abra seu navegador em: **http://localhost:3000**
   - Use a interface para visualizar usuários e buscar pedidos

4. **Testes de API (via terminal):**
   - Listar usuários:
     ```bash
     curl http://localhost:8080/api/users
     ```
   - Pedidos do usuário 1:
     ```bash
     curl http://localhost:8080/api/orders/1
     ```

5. **Para desligar:**
   ```bash
   docker-compose down
   ```

## 📁 Estrutura do Projeto

```
microservices-challenge/
├── docker-compose.yml          # Orquestração dos serviços
├── gateway_service/            # API Gateway (FastAPI)
├── users_service/              # Serviço de usuários (FastAPI)
├── orders_service/             # Serviço de pedidos (FastAPI)
└── frontend_service/           # Interface web (HTML/CSS/JS)
```

## 🌐 Endpoints Disponíveis

### Gateway (http://localhost:8080)
- `GET /` - Health check
- `GET /api/users` - Lista todos os usuários
- `GET /api/orders/{user_id}` - Lista pedidos de um usuário

### Frontend (http://localhost:3000)
- Interface web para interação com os microserviços

## 🎨 Interface Web

O frontend oferece:
- ✅ Visualização de todos os usuários
- ✅ Busca de pedidos por ID de usuário
- ✅ Monitoramento de status do sistema
- ✅ Design responsivo e moderno
