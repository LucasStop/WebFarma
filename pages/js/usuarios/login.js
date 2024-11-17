// login.js

export async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const result = await response.json();

    if (response.ok) {
      // Verifica o tipo de usuário e redireciona para a página correta
      if (result.tipo === "Administrador") {
        window.location.href = "/admin.html"; // Redireciona para a página de admin
      } else {
        window.location.href = "/index.html"; // Redireciona para a página principal
      }
    } else {
      alert("Erro: " + result.error);
    }
  } catch (error) {
    alert("Erro ao enviar os dados: " + error.message);
  }
}
