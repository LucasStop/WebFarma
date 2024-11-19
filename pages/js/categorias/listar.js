document.addEventListener("DOMContentLoaded", () => {
  const tabelaCategorias = document.getElementById("categorias-tabela");

  fetch("/api/categorias")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((categoria) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${categoria.ID_Categoria}</td>
                    <td>${categoria.Nome_Categoria}</td>
                `;
        tabelaCategorias.appendChild(row);
      });
    })
    .catch((err) => console.error("Erro ao buscar categorias:", err));
});
