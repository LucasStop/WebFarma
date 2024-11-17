// register.js

import {
  validateField,
  checkProductForm,
  nomeProdutoRegex,
  descricaoProdutoRegex,
  precoProdutoRegex,
  codigoBarrasRegex,
} from "./validation.js";

let categoriasMap = {};

async function carregarCategorias() {
  const selectCategoria = document.getElementById("idCategoria");

  if (!selectCategoria) {
    console.error("Elemento select de categoria não encontrado no DOM.");
    return;
  }

  try {
    const response = await fetch("/api/categorias");
    const categorias = await response.json();

    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.ID_Categoria;
      option.textContent = categoria.Nome_Categoria;
      selectCategoria.appendChild(option);
      categoriasMap[categoria.Nome_Categoria] = categoria.ID_Categoria;
    });
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  }
}

// Configura a validação do formulário de produto
export function setupProductFormValidation(form) {
  document.addEventListener("DOMContentLoaded", carregarCategorias);

  const fields = {
    nomeProduto: form.querySelector("#nomeProduto"),
    descricao: form.querySelector("#descricao"),
    preco: form.querySelector("#preco"),
    estoque: form.querySelector("#estoque"),
    codigobarras: form.querySelector("#codigobarras"),
    categoria: form.querySelector("#categoria"), // Atualize para "categoria"
};

  fields.nomeProduto.addEventListener("input", () =>
    validateField(
      fields.nomeProduto,
      nomeProdutoRegex,
      "Nome com até 50 caracteres."
    )
  );
  fields.descricao.addEventListener("input", () =>
    validateField(
      fields.descricao,
      descricaoProdutoRegex,
      "Descrição com até 150 caracteres."
    )
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitProductForm(fields, form);
  });
}

async function submitProductForm(fields, form) {
  if (!checkProductForm(fields)) return;
  const categoriaId = fields.categoria.value;
  const estoque = document.getElementById("estoque").value;

  const data = {
    nome: document.getElementById("nomeProduto").value,
    descricao: document.getElementById("descricao").value,
    preco: document.getElementById("preco").value,
    estoque: estoque,
    codigobarras: document.getElementById("codigobarras").value,
    idCategoria: categoriaId, // Aqui está o ID da categoria selecionada
  };

  try {
    const response = await fetch("/api/produtos", {
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
