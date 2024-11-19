document.addEventListener("DOMContentLoaded", () => {
  const tabelaProdutos = document.getElementById("produtos-tabela");

  fetch("/api/produtos")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((produto) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${produto.ID_Produto}</td>
                    <td>${produto.Nome}</td>
                    <td>${produto.Descricao}</td>
                    <td>R$ ${produto.Preco}</td>
                    <td>${produto.Estoque}</td>
                    <td>${produto.ID_Categoria}</td>
                `;
        tabelaProdutos.appendChild(row);
      });
    })
    .catch((err) => console.error("Erro ao buscar produtos:", err));
});
