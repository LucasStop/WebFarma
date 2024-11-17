// register.js

import {
  validateField,
  validatePasswordConfirmation,
  setError,
  clearError,
} from "./validation.js";

export function setupFormValidation(form) {
  const fields = {
    username: form.querySelector("#username"),
    email: form.querySelector("#email"),
    endereco: form.querySelector("#endereco"),
    celular: form.querySelector("#celular"),
    senha: form.querySelector("#senha"),
    senhaConfirmacao: form.querySelector("#senhaConfirmacao"),
  };

  fields.celular.addEventListener("input", () => formatCelular(fields.celular));
  fields.email.addEventListener("input", () =>
    validateField(fields.email, emailRegex, "Digite um email válido.")
  );
  fields.senhaConfirmacao.addEventListener("input", () =>
    validatePasswordConfirmation(fields.senha, fields.senhaConfirmacao)
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm(fields, form);
  });
}

async function submitForm(fields, form) {
  if (!checkForm(fields)) return;

  const data = {
    nome: fields.username.value,
    email: fields.email.value,
    endereco: fields.endereco.value,
    celular: fields.celular.value,
    senha: fields.senha.value,
  };

  try {
    const response = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      form.reset();
    } else {
      alert("Erro: " + result.error);
    }
  } catch (error) {
    alert("Erro ao enviar os dados: " + error.message);
  }
}

function checkForm(fields) {
  let isValid = true;
  const validations = [
    {
      field: fields.username,
      message: "O nome do usuário é obrigatório.",
      condition: () => fields.username.value.trim() === "",
      emptyMessage: "Campo vazio",
    },
    {
      field: fields.email,
      message: "Digite um email válido.",
      condition: () =>
        fields.email.value.trim() === "" ||
        !emailRegex.test(fields.email.value),
      emptyMessage: "Campo vazio",
    },
    {
      field: fields.endereco,
      message: "O endereço é obrigatório.",
      condition: () => fields.endereco.value.trim() === "",
      emptyMessage: "Campo vazio",
    },
    {
      field: fields.celular,
      message: "Digite um número de celular válido.",
      condition: () =>
        fields.celular.value.trim() === "" ||
        !celularRegex.test(fields.celular.value),
      emptyMessage: "Campo vazio",
    },
    {
      field: fields.senha,
      message: "A senha é obrigatória.",
      condition: () => fields.senha.value.trim() === "",
      emptyMessage: "Campo vazio",
    },
    {
      field: fields.senhaConfirmacao,
      message: "As senhas não coincidem.",
      condition: () =>
        fields.senhaConfirmacao.value.trim() === "" ||
        fields.senha.value !== fields.senhaConfirmacao.value,
      emptyMessage: "Campo vazio",
    },
  ];

  validations.forEach(({ field, message, condition, emptyMessage }) => {
    if (field.value.trim() === "") {
      setError(field, emptyMessage); // Exibe "Campo vazio" se o campo estiver vazio
      isValid = false;
    } else if (condition()) {
      setError(field, message); // Exibe a mensagem de erro específica
      isValid = false;
    } else {
      clearError(field); // Limpa o erro se a validação passar
    }
  });

  return isValid;
}
