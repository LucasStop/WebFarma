// validation.js

// Regexes de validação
export const nomeProdutoRegex = /^.{1,50}$/;
export const descricaoProdutoRegex = /^.{1,150}$/;
export const precoProdutoRegex = /^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/;
export const codigoBarrasRegex = /^\d{1,12}$/;

// Função para validar um campo usando uma regex
export function validateField(field, regex, errorMessage) {
  if (!regex.test(field.value)) {
    setError(field, errorMessage);
  } else {
    clearError(field);
  }
}

// Função para exibir mensagem de erro
export function setError(field, message) {
  const errorSpan = field.nextElementSibling;
  errorSpan.textContent = message;
  errorSpan.style.color = "red";
}

// Função para limpar mensagem de erro
export function clearError(field) {
  const errorSpan = field.nextElementSibling;
  errorSpan.textContent = "";
}

// Função para validação final do formulário de produto
export function checkProductForm(fields) {
  let isValid = true;

  const validations = [
    {
      field: fields.nomeProduto,
      fieldName: "nomeProduto",
      message: "O nome do produto deve ter no máximo 50 caracteres.",
      condition: () => !nomeProdutoRegex.test(fields.nomeProduto?.value || ""),
      emptyMessage: "Campo vazio",
    },
    {
      field: fields.descricao,
      fieldName: "descricao",
      message: "A descrição deve ter no máximo 150 caracteres.",
      condition: () =>
        !descricaoProdutoRegex.test(fields.descricao?.value || ""),
      emptyMessage: "Campo vazio",
    },
    {
      field: fields.preco,
      fieldName: "preco",
      condition: () => !precoProdutoRegex.test(fields.preco?.value || ""),
      emptyMessage: "Campo vazio",
    },
    {
      field: fields.codigobarras,
      fieldName: "codigobarras",
      message: "O código de barras deve conter apenas números inteiros.",
      condition: () =>
        !codigoBarrasRegex.test(fields.codigobarras?.value || ""),
      emptyMessage: "Campo vazio",
    },
    {
      field: fields.categoria, // Atualize para "categoria"
      message: "Por favor, selecione uma categoria.",
      condition: () => !fields.categoria.value,
      emptyMessage: "Campo vazio",
    },
  ];

  validations.forEach(
    ({ field, fieldName, message, condition, emptyMessage }) => {
      if (!field) {
        console.error(`Erro: o campo ${fieldName} não foi encontrado.`);
        isValid = false;
      } else if (field.value.trim() === "") {
        console.log(`Erro no campo ${fieldName}: ${emptyMessage}`);
        setError(field, emptyMessage);
        isValid = false;
      } else if (condition()) {
        console.log(`Erro no campo ${fieldName}: ${message}`);
        setError(field, message);
        isValid = false;
      } else {
        clearError(field);
      }
    }
  );

  return isValid;
}
