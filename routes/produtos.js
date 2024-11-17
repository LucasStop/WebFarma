import express from "express";
const router = express.Router();

// Listar todos os produtos
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Produto";

  req.db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro no banco de dados - " + err.message });
    }
    res.status(200).json(result);
  });
});

// Criar um novo produto
router.post("/", (req, res) => {
  const { nome, preco, descricao, estoque } = req.body; // Adiciona 'estoque'
  const sql = "INSERT INTO Produto (nome, preco, descricao, estoque) VALUES (?, ?, ?, ?)";

  req.db.query(sql, [nome, preco, descricao, estoque], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao criar produto - " + err.message });
    }
    res.status(201).json({ message: "Produto criado com sucesso", productId: result.insertId });
  });
});


// Encontrar produto por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Produto WHERE ID_Produto = ?";

  req.db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar produto - " + err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(result[0]);
  });
});

// Atualizar produto parcialmente
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const fieldsToUpdate = [];
  const values = [];

  // Verifica quais campos foram enviados na requisição e os adiciona à lista de atualização
  if (req.body.nome) {
    fieldsToUpdate.push("nome = ?");
    values.push(req.body.nome);
  }
  if (req.body.preco) {
    fieldsToUpdate.push("preco = ?");
    values.push(req.body.preco);
  }
  if (req.body.descricao) {
    fieldsToUpdate.push("descricao = ?");
    values.push(req.body.descricao);
  }

  // Verifica se há campos para atualizar
  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: "Nenhum campo para atualizar" });
  }

  // Constrói a consulta SQL dinamicamente
  const sql = `UPDATE Produto SET ${fieldsToUpdate.join(", ")} WHERE ID_Produto = ?`;
  values.push(id); // Adiciona o ID do produto no final dos valores

  req.db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao atualizar produto - " + err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json({ message: "Produto atualizado com sucesso" });
  });
});

// Deletar produto
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Produto WHERE ID_Produto = ?";

  req.db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao deletar produto - " + err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json({ message: "Produto deletado com sucesso" });
  });
});

export default router;
