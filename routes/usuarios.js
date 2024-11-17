import express from "express";
const router = express.Router();

// Listar usuários
router.get("/", (req, res) => {
  const sql = "SELECT ID_Usuario, nome, email, senha, endereco, celular, tipo FROM Usuario";

  req.db.query(sql, (err, rows) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err.message);
      return res.status(500).json({ error: "Erro no banco de dados - " + err.message });
    }
    res.status(200).json(rows);
  });
});

// Criar usuário
router.post("/", (req, res) => {
  try {
    const { nome, email, senha, endereco, celular } = req.body;
    console.log("Dados recebidos para criação:", req.body);

    const sql = "INSERT INTO Usuario (nome, email, senha, endereco, celular, tipo) VALUES (?, ?, ?, ?, ?, 'cliente')";

    req.db.query(sql, [nome, email, senha, endereco, celular], (err, result) => {
      if (err) {
        console.error("Erro ao criar usuário:", err.message);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "O email já está em uso." });
        }
        return res.status(500).json({ error: "Erro ao criar usuário - " + err.message });
      }
      res.status(201).json({ message: "Usuário criado com sucesso", userId: result.insertId });
    });
  } catch (error) {
    console.error("Erro inesperado ao criar usuário:", error);
    res.status(500).json({ error: "Erro inesperado ao criar usuário." });
  }
});

// Encontrar usuário por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Usuario WHERE ID_Usuario = ?";

  req.db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err.message);
      return res.status(500).json({ error: "Erro ao buscar usuário - " + err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(rows[0]);
  });
});

// Atualizar usuário parcialmente
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const fieldsToUpdate = [];
  const values = [];

  // Itera sobre cada campo no corpo da requisição e adiciona à lista de atualizações se o campo for definido
  if (req.body.nome) {
    fieldsToUpdate.push("nome = ?");
    values.push(req.body.nome);
  }
  if (req.body.email) {
    fieldsToUpdate.push("email = ?");
    values.push(req.body.email);
  }
  if (req.body.senha) {
    fieldsToUpdate.push("senha = ?");
    values.push(req.body.senha);
  }
  if (req.body.endereco) {
    fieldsToUpdate.push("endereco = ?");
    values.push(req.body.endereco);
  }
  if (req.body.celular) {
    fieldsToUpdate.push("celular = ?");
    values.push(req.body.celular);
  }

  // Verifica se há campos para atualizar
  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: "Nenhum campo para atualizar" });
  }

  // Constrói a consulta SQL dinamicamente
  const sql = `UPDATE Usuario SET ${fieldsToUpdate.join(", ")} WHERE ID_Usuario = ?`;
  values.push(id); // Adiciona o ID do usuário no final dos valores

  req.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err.message);
      return res.status(500).json({ error: "Erro ao atualizar usuário - " + err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  });
});


// Deletar usuário
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Usuario WHERE ID_Usuario = ?";

  req.db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar usuário:", err.message);
      return res.status(500).json({ error: "Erro ao deletar usuário - " + err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  });
});

export default router;
