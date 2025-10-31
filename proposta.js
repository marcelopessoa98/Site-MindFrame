// ==========================================================
// MIND FRAME - JAVASCRIPT: LÓGICA DO FORMULÁRIO (Validação e Confirmação)
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("propostaForm");
  const confirmationMessage = document.getElementById(
    "confirmationMessageRedirect"
  );

  // 1. --- Lógica para Exibir a Mensagem de Sucesso Personalizada (REATIVADA) ---
  // Esta lógica é executada se o FormSubmit redirecionar para a nossa página com o hash
  if (window.location.hash === "#confirmationMessageRedirect") {
    if (form) form.style.display = "none"; // Oculta o formulário de envio
    if (confirmationMessage) confirmationMessage.style.display = "block"; // Mostra a mensagem de agradecimento

    // Remove o hash da URL para limpar a barra de endereço
    history.replaceState(null, null, " ");
    return; // Pára a execução, pois o formulário já foi enviado.
  }

  // 2. --- Lógica de Validação Local (Só roda se a mensagem de confirmação não for exibida) ---
  if (form) {
    form.addEventListener("submit", function (e) {
      const isValid = validateForm();

      if (!isValid) {
        e.preventDefault(); // Impede o envio se a validação falhar
      }
    });

    // Adiciona listeners para feedback de validação ao sair do campo
    ["nome", "email", "servico", "mensagem"].forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        const eventType = input.tagName === "SELECT" ? "change" : "blur";
        input.addEventListener(eventType, () => validateField(input));
      }
    });
  }

  // 3. --- Lógica de Atualização Dinâmica da URL (Para o FormSubmit funcionar localmente) ---
  // Se o seu site estiver rodando em um servidor local (como 127.0.0.1),
  // precisamos garantir que o FormSubmit redirecione para o endereço correto.
  const redirectInput = document.getElementById("formSubmitRedirect");
  if (redirectInput) {
    // Pega a URL base da página atual (ex: http://127.0.0.1:5500)
    const currentBaseUrl = window.location.origin;

    // Constrói a URL de redirecionamento completa e a aplica
    // Ex: http://127.0.0.1:5500/proposta.html#confirmationMessageRedirect
    redirectInput.value =
      currentBaseUrl + "/proposta.html#confirmationMessageRedirect";
  }
});

// Função central de validação (mantida do passo anterior)
function validateForm() {
  let isValid = true;
  let focusSet = false;

  const fields = [
    { id: "nome", message: "O nome/empresa é obrigatório.", check: isNotEmpty },
    { id: "email", message: "E-mail inválido ou vazio.", check: isValidEmail },
    {
      id: "servico",
      message: "Por favor, selecione um serviço.",
      check: isSelected,
    },
    {
      id: "mensagem",
      message: "Os detalhes do projeto são obrigatórios.",
      check: isNotEmpty,
    },
  ];

  fields.forEach((field) => {
    const inputElement = document.getElementById(field.id);
    const fieldIsValid = validateField(
      inputElement,
      field.message,
      field.check
    );

    if (!fieldIsValid) {
      isValid = false;
      if (!focusSet) {
        inputElement.focus();
        focusSet = true;
      }
    }
  });

  return isValid;
}

// Função para validar um campo específico e mostrar/esconder o erro (mantida do passo anterior)
function validateField(inputElement, errorMessage, customCheck = isNotEmpty) {
  if (!inputElement) return true;

  if (!errorMessage) {
    if (inputElement.id === "email") {
      errorMessage = "E-mail inválido ou vazio.";
      customCheck = isValidEmail;
    } else if (inputElement.id === "servico") {
      errorMessage = "Por favor, selecione um serviço.";
      customCheck = isSelected;
    } else {
      errorMessage = "Este campo é obrigatório.";
      customCheck = isNotEmpty;
    }
  }

  let isValid = customCheck(inputElement);

  const errorElement = document.getElementById(`error-${inputElement.id}`);

  if (isValid) {
    inputElement.classList.remove("error");
    if (errorElement) errorElement.style.display = "none";
  } else {
    inputElement.classList.add("error");
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
    }
  }
  return isValid;
}

// Checkers (Funções de verificação)
function isNotEmpty(input) {
  if (input.tagName === "SELECT") {
    return input.value !== "";
  }
  return input.value.trim() !== "";
}

function isSelected(input) {
  return input.value !== "";
}

function isValidEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input.value.trim());
}
