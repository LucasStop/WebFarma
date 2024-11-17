import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mysql from "mysql";
import cors from "cors"; // Import CORS

const app = express();

// Enable CORS for all routes
app.use(cors());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 10000,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados MySQL:", err);
    process.exit(1); // Encerra a aplicação se a conexão falhar
  }
  console.log("Conectado ao banco de dados MySQL!");
});

app.use(express.json());
app.use(express.static("pages")); // para servir arquivos em pages
app.use("/js", express.static("js")); // para servir a pasta js diretamente

app.use((req, res, next) => {
  req.db = db;
  next();
});

// Import and setup routes
import usuarioRouter from "./routes/usuarios.js";
app.use("/api/usuarios", usuarioRouter);

import produtoRouter from "./routes/produtos.js";
app.use("/api/produtos", produtoRouter);

import categoriaRouter from "./routes/categorias.js";
app.use("/api/categorias", categoriaRouter);

import loginRouter from "./routes/login.js";
app.use("/", loginRouter); // Mount login router

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
