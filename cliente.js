document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginScreen = document.getElementById("loginScreen");
  const dashboard = document.getElementById("dashboard");
  const loginError = document.getElementById("loginError");
  const logoutButton = document.getElementById("logoutButton");

  // ==========================================================
  // CONFIGURAÇÃO DE CREDENCIAIS (Para simulação)
  // ==========================================================
  const VALID_USER = "cliente@mindframe.com";
  const VALID_PASS = "admin";
  const CLIENT_NAME = "TechCorp Sistemas"; // Nome da empresa do cliente

  // ==========================================================
  // 1. Lógica de Login
  // ==========================================================
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const usernameInput = document.getElementById("username").value.trim();
      const passwordInput = document.getElementById("password").value;

      // Simulação de autenticação
      if (usernameInput === VALID_USER && passwordInput === VALID_PASS) {
        // Sucesso: Esconder Login, Mostrar Dashboard
        loginError.style.display = "none";

        // Armazenar no localStorage (Simulação de sessão)
        localStorage.setItem("mindframe_auth", "true");
        localStorage.setItem("mindframe_client_name", CLIENT_NAME);

        // Redireciona para o Dashboard
        showDashboard();
      } else {
        // Falha: Mostrar mensagem de erro
        loginError.style.display = "block";
      }
    });
  }

  // ==========================================================
  // 2. Lógica de Logout
  // ==========================================================
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      // Limpa a sessão
      localStorage.removeItem("mindframe_auth");
      localStorage.removeItem("mindframe_client_name");

      // Redireciona para o Login
      showLogin();
    });
  }

  // ==========================================================
  // 3. Funções de Transição de Tela
  // ==========================================================
  function showDashboard() {
    loginScreen.style.display = "none";
    dashboard.style.display = "block";

    // Atualiza o nome do cliente no Dashboard
    const clientNameDisplay = document.getElementById("clientNameDisplay");
    const storedName =
      localStorage.getItem("mindframe_client_name") || "Cliente";
    if (clientNameDisplay) {
      clientNameDisplay.textContent = storedName;
    }
  }

  function showLogin() {
    loginScreen.style.display = "flex"; // Usamos flex para centralizar o formulário
    dashboard.style.display = "none";
    // Limpa os campos após o logout
    if (loginForm) loginForm.reset();
  }

  // ==========================================================
  // 4. Verificação Inicial (Mantém o cliente logado se a aba for fechada)
  // ==========================================================
  const isAuthenticated = localStorage.getItem("mindframe_auth") === "true";
  if (isAuthenticated) {
    showDashboard();
  } else {
    showLogin();
  }

  // ==========================================================
  // 5. Lógica de Navegação do Dashboard Horizontal (V3: Tabs)
  // ==========================================================
  const navTabs = document.querySelectorAll(".top-nav-tabs-v3 .nav-tab-v3");
  const contentPanels = document.querySelectorAll(
    ".main-content-v3 .content-panel-v3"
  );

  navTabs.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // 1. Remove a classe 'active' de todas as tabs
      navTabs.forEach((nav) => nav.classList.remove("active"));

      // 2. Adiciona a classe 'active' à tab clicada
      this.classList.add("active");

      // 3. Pega o ID do conteúdo a ser mostrado
      const targetId = this.getAttribute("data-content");

      // 4. Esconde todos os painéis de conteúdo
      contentPanels.forEach((panel) => {
        panel.style.display = "none";
      });

      // 5. Mostra apenas o painel alvo
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.style.display = "block";
      }
    });
  });

  // Assegura que o primeiro item do menu (Resumo) esteja ativo ao carregar
  const firstNavTab = document.querySelector(".top-nav-tabs-v3 .nav-tab-v3");
  if (
    firstNavTab &&
    !document.querySelector(".top-nav-tabs-v3 .nav-tab-v3.active")
  ) {
    firstNavTab.classList.add("active");
    const firstPanel = document.getElementById(
      firstNavTab.getAttribute("data-content")
    );
    if (firstPanel) {
      firstPanel.style.display = "block";
    }
  }
});
