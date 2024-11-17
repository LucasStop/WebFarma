import { setupFormValidation } from "./usuarios/register.js";
import { login } from "./usuarios/login.js";
import { setupProductFormValidation } from "./produtos/register.js";

document.addEventListener("DOMContentLoaded", () => {
  // Configuração do formulário de cadastro de usuário, se presente
  const registrationForm = document.getElementById("user-registration-form");
  if (registrationForm) {
    console.log(
      "Configuração do formulário de cadastro de usuário encontrada."
    );
    setupFormValidation(registrationForm);
  } else {
    console.log("Formulário de cadastro de usuário não encontrado.");
  }

  // Configuração do formulário de login de usuário, se presente
  const loginForm = document.getElementById("user-login-form");
  if (loginForm) {
    console.log("Configuração do formulário de login de usuário encontrada.");
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      login();
    });
  } else {
    console.log("Formulário de login de usuário não encontrado.");
  }

  // Configuração do formulário de cadastro de produto, se presente
  const productForm = document.getElementById("product-registration-form");
  if (productForm) {
    console.log(
      "Configuração do formulário de cadastro de produto encontrada."
    );
    setupProductFormValidation(productForm);
  } else {
    console.log("Formulário de cadastro de produto não encontrado.");
  }
});
