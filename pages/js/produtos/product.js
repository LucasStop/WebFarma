// product.js

// Carrega as categorias e preenche o select de categoria
document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/categorias")
    .then((response) => response.json())
    .then((data) => {
      const categoriaSelect = document.getElementById("categoria");
      data.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria.ID_Categoria; // Define o ID como valor
        option.textContent = categoria.Nome_Categoria; // Mostra o nome da categoria
        categoriaSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Erro ao buscar categorias:", error));
});

// Função para atualizar a quantidade do estoque
function updateQuantity(amount) {
  const quantityInput = document.getElementById("estoque");
  let currentValue = parseInt(quantityInput.value) || 1;

  // Atualiza o valor apenas se o novo valor for >= 1
  const newValue = currentValue + amount;
  if (newValue >= 1) {
    quantityInput.value = newValue;
  }
}

// Event listeners para os botões de incremento e decremento de quantidade
document
  .getElementById("increment")
  .addEventListener("click", () => updateQuantity(1));
document
  .getElementById("decrement")
  .addEventListener("click", () => updateQuantity(-1));
