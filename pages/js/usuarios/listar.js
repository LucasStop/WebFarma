document.addEventListener("DOMContentLoaded", () => {
  const tabelaUsuarios = document.getElementById("usuarios-tabela");

  fetch("/api/usuarios")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Verifique o retorno da API no console
      data.forEach((usuario) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                        <td>${usuario.ID_Usuario}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.endereco}</td>
                        <td>${usuario.celular}</td>
                        <td>${usuario.tipo}</td>
                    `;
        tabelaUsuarios.appendChild(row);
      });
    })
    .catch((err) => console.error("Erro ao buscar usuários:", err));
});
