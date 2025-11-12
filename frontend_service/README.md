# Frontend Service

Interface web simples para visualizar dados dos microserviços de usuários e pedidos.

## 🎨 Características

- **Dashboard Intuitivo**: Interface limpa e moderna
- **Visualização de Usuários**: Lista todos os usuários cadastrados
- **Busca de Pedidos**: Busca pedidos por ID de usuário
- **Status em Tempo Real**: Monitora o status do gateway
- **Responsivo**: Funciona em desktop e mobile

## 🚀 Como Usar

### Com Docker Compose

O frontend já está incluído no `docker-compose.yml` do projeto principal:

```bash
docker-compose up -d
```

Acesse: **http://localhost:3000**

### Desenvolvimento Local

Se quiser rodar sem Docker:

```bash
python3 -m http.server 3000
```

## 📋 Funcionalidades

### 1. Visualizar Usuários
- Clique no botão "Carregar Usuários"
- A lista de todos os usuários será exibida

### 2. Buscar Pedidos
- Digite o ID do usuário no campo de entrada
- Clique em "Buscar Pedidos" (ou pressione Enter)
- Os pedidos do usuário serão exibidos

### 3. Verificar Status
- O status do gateway é verificado automaticamente
- Atualização a cada 30 segundos

## 🔧 Estrutura

```
frontend_service/
├── index.html      # Estrutura HTML
├── styles.css      # Estilos e layout
├── app.js          # Lógica de comunicação com API
├── Dockerfile      # Container Nginx
└── README.md       # Esta documentação
```

## 🌐 Endpoints Consumidos

- `GET http://localhost:8080/` - Health check do gateway
- `GET http://localhost:8080/api/users` - Lista de usuários
- `GET http://localhost:8080/api/orders/{user_id}` - Pedidos por usuário

## 🎯 Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com gradientes e animações
- **JavaScript Vanilla**: Sem frameworks, puro e simples
- **Fetch API**: Comunicação assíncrona com backend
- **Nginx**: Servidor web em produção (Docker)

## 📱 Screenshots

O frontend apresenta:
- Cabeçalho com título e subtítulo
- Card de usuários com botão de carregar
- Card de pedidos com campo de busca
- Card de status do sistema
- Design responsivo e animações suaves

## 🐛 Troubleshooting

### Frontend não carrega dados
1. Verifique se o gateway está rodando: `http://localhost:8080`
2. Verifique o console do navegador para erros
3. Certifique-se de que CORS está configurado no gateway

### Erro de CORS
- O middleware CORS já está configurado no gateway
- Se ainda houver erro, verifique se todos os serviços estão na mesma rede Docker

### Frontend não inicia
```bash
docker-compose build frontend_service
docker-compose up -d frontend_service
```

## 📝 Notas

- O frontend é uma SPA (Single Page Application) simples
- Todos os dados são carregados via AJAX
- Não há persistência local (localStorage/sessionStorage)
- Interface otimizada para usabilidade
