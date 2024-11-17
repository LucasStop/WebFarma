// Regex para validação de email e celular
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const celularRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

// Função para validar um campo com uma expressão regular
export function validateField(field, regex, errorMessage) {
  if (!regex.test(field.value)) {
    setError(field, errorMessage);
  } else {
    clearError(field);
  }
}

// Função para validar a confirmação da senha
export function validatePasswordConfirmation(senha, senhaConfirmacao) {
  if (senha.value !== senhaConfirmacao.value) {
    setError(senhaConfirmacao, "As senhas não coincidem.");
  } else {
    clearError(senhaConfirmacao);
  }
}

// Função para exibir uma mensagem de erro
export function setError(field, message) {
  const errorSpan = field.nextElementSibling;
  errorSpan.textContent = message;
  errorSpan.style.color = "red";
}

// Função para limpar a mensagem de erro
export function clearError(field) {
  const errorSpan = field.nextElementSibling;
  errorSpan.textContent = "";
}
