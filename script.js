// ==========================================================
// MIND FRAME - JAVASCRIPT CORE
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Funcionalidade do Menu de Navegação Responsivo (Mobile Menu)
  setupMobileMenu();

  // 2. Funcionalidade de Header Sticky ao Rolar
  setupStickyHeader();

  // 3. Funcionalidade de Scroll Suave para os links
  setupSmoothScroll();

  // 4. Animações Nativas (Scroll Reveal)
  setupNativeScrollReveal();

  // 5. NOVO: Checagem de sucesso do Formulário de Feedback
  checkFeedbackSuccess();
});

// --- 1. Menu de Navegação Responsivo ---
function setupMobileMenu() {
  const headerContent = document.querySelector(".header-content-v7");
  const nav = document.querySelector(".site-nav-v7");
  if (!nav) return;

  const menuToggle = document.createElement("div");
  menuToggle.classList.add("menu-toggle");
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

  headerContent.insertBefore(menuToggle, nav);

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    const icon = menuToggle.querySelector("i");
    if (nav.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  document.querySelectorAll(".nav-item-v7").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        menuToggle.querySelector("i").classList.remove("fa-times");
        menuToggle.querySelector("i").classList.add("fa-bars");
      }
    });
  });
}

// --- 2. Header Fixo (Sticky) com Efeito de Rolagem ---
function setupStickyHeader() {
  const header = document.querySelector(".site-header-v7");
  if (!header) return;

  const scrollThreshold = 100;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

// --- 3. Scroll Suave para Links Internos ---
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offset =
            document.querySelector(".site-header-v7").offsetHeight || 75;
          window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// --- 4. ANIMAÇÕES NATIVAS (INTERSECTION OBSERVER) ---
function setupNativeScrollReveal() {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".js-reveal").forEach((el) => {
    observer.observe(el);
  });
}

// --- 5. Lógica para Confirmação do Formulário de Feedback na Home (NOVO) ---
function checkFeedbackSuccess() {
  const successMessage = document.getElementById("feedback-success");
  const feedbackForm = document.getElementById("feedbackForm");

  // Checa o hash na URL
  if (window.location.hash === "#feedback-sent") {
    if (feedbackForm) {
      feedbackForm.style.display = "none"; // Esconde o formulário
    }
    if (successMessage) {
      successMessage.style.display = "block"; // Mostra a mensagem de sucesso
    }

    // Rola até a seção de feedback para o usuário ver a mensagem
    const feedbackSection = document.getElementById("enviar-feedback");
    if (feedbackSection) {
      const offset =
        document.querySelector(".site-header-v7").offsetHeight || 75;
      window.scrollTo({
        top: feedbackSection.offsetTop - offset,
        behavior: "smooth",
      });
    }

    // Remove o hash da URL para que não apareça novamente ao recarregar
    setTimeout(() => {
      history.replaceState(null, null, " ");
    }, 100);
  }
}

// ==========================================================
// LÓGICA DE ENVIO AJAX E EXIBIÇÃO DO MODAL DE FEEDBACK
// ==========================================================
document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackModal = document.getElementById("feedbackModal");
  const closeFeedbackModalBtn = document.getElementById("closeFeedbackModal");

  // Intercepta o envio do formulário
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Impede o envio padrão e o redirecionamento do FormSubmit

      const form = e.target;
      const formData = new FormData(form);
      const formAction = form.getAttribute("action");

      // Você pode adicionar um loader aqui, se quiser

      // Envia os dados para o FormSubmit usando Fetch/AJAX
      fetch(formAction, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json", // Crucial para o FormSubmit não redirecionar
        },
      })
        .then((response) => {
          if (response.ok) {
            // Limpa o formulário e mostra o modal
            form.reset();
            feedbackModal.style.display = "flex";
          } else {
            // Lidar com erros de envio (opcional)
            alert(
              "Ocorreu um erro ao enviar sua avaliação. Por favor, tente novamente."
            );
          }
        })
        .catch((error) => {
          console.error("Erro de envio:", error);
          alert("Erro de conexão. Por favor, verifique sua rede.");
        });
    });
  }

  // Fecha o modal ao clicar no botão
  if (closeFeedbackModalBtn) {
    closeFeedbackModalBtn.addEventListener("click", function () {
      feedbackModal.style.display = "none";
    });
  }

  // Fecha o modal ao clicar fora dele
  if (feedbackModal) {
    feedbackModal.addEventListener("click", function (e) {
      if (e.target === feedbackModal) {
        feedbackModal.style.display = "none";
      }
    });
  }

  // (Mantenha o resto do seu código script.js - como a animação - inalterado)
});
