// Configuração da API
const API_BASE_URL = 'http://localhost:8080';

// Elementos do DOM
const loadUsersBtn = document.getElementById('loadUsersBtn');
const loadOrdersBtn = document.getElementById('loadOrdersBtn');
const userIdInput = document.getElementById('userIdInput');
const usersContainer = document.getElementById('usersContainer');
const ordersContainer = document.getElementById('ordersContainer');
const gatewayStatus = document.getElementById('gatewayStatus');

// Event Listeners
loadUsersBtn.addEventListener('click', loadUsers);
loadOrdersBtn.addEventListener('click', loadOrders);
userIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadOrders();
    }
});

// Verificar status do gateway ao carregar a página
checkGatewayStatus();

// Função para verificar status do gateway
async function checkGatewayStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (response.ok) {
            gatewayStatus.textContent = 'Online';
            gatewayStatus.className = 'status-badge status-online';
        } else {
            throw new Error('Gateway offline');
        }
    } catch (error) {
        gatewayStatus.textContent = 'Offline';
        gatewayStatus.className = 'status-badge status-offline';
    }
}

// Função para carregar usuários
async function loadUsers() {
    usersContainer.innerHTML = '<p class="loading">Carregando usuários...</p>';
    loadUsersBtn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/api/users`);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        usersContainer.innerHTML = `
            <div class="error">
                <strong>❌ Erro ao carregar usuários:</strong>
                <p>${error.message}</p>
                <p>Verifique se os serviços estão rodando corretamente.</p>
            </div>
        `;
    } finally {
        loadUsersBtn.disabled = false;
    }
}

// Função para exibir usuários
function displayUsers(users) {
    if (!users || users.length === 0) {
        usersContainer.innerHTML = '<p class="placeholder">Nenhum usuário encontrado.</p>';
        return;
    }

    const usersList = users.map(user => `
        <div class="user-item">
            <h3>👤 ${user.name}</h3>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        </div>
    `).join('');

    usersContainer.innerHTML = `
        <div class="user-list">
            ${usersList}
        </div>
    `;
}

// Função para carregar pedidos
async function loadOrders() {
    const userId = userIdInput.value.trim();

    if (!userId) {
        ordersContainer.innerHTML = `
            <div class="error">
                <strong>⚠️ Atenção:</strong>
                <p>Por favor, digite um ID de usuário válido.</p>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = '<p class="loading">Carregando pedidos...</p>';
    loadOrdersBtn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/api/orders/${userId}`);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        displayOrders(data, userId);
    } catch (error) {
        ordersContainer.innerHTML = `
            <div class="error">
                <strong>❌ Erro ao carregar pedidos:</strong>
                <p>${error.message}</p>
                <p>Verifique se o ID do usuário está correto e se os serviços estão rodando.</p>
            </div>
        `;
    } finally {
        loadOrdersBtn.disabled = false;
    }
}

// Função para exibir pedidos
function displayOrders(data, userId) {
    // A API retorna um array diretamente
    const orders = Array.isArray(data) ? data : [];

    if (!orders || orders.length === 0) {
        ordersContainer.innerHTML = `
            <p class="placeholder">
                Nenhum pedido encontrado para o usuário ID: ${userId}.
            </p>
        `;
        return;
    }

    const ordersList = orders.map(order => `
        <div class="order-item">
            <h3>📦 Pedido #${order.id}</h3>
            <p><strong>Produto:</strong> ${order.product}</p>
            <p><strong>Valor:</strong> R$ ${order.amount ? order.amount.toFixed(2) : '0.00'}</p>
        </div>
    `).join('');

    ordersContainer.innerHTML = `
        <div style="margin-bottom: 15px;">
            <p><strong>Pedidos do Usuário ID:</strong> ${userId}</p>
            <p><strong>Total de pedidos:</strong> ${orders.length}</p>
        </div>
        <div class="order-list">
            ${ordersList}
        </div>
    `;
}

// Atualizar status do gateway a cada 30 segundos
setInterval(checkGatewayStatus, 30000);
