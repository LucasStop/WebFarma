// routes/categorias.js
import express from "express";
const router = express.Router();

// Listar todas as categorias
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Categoria";

  req.db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro no banco de dados - " + err.message });
    }
    res.status(200).json(result);
  });
});

// Criar uma nova categoria
router.post("/", (req, res) => {
  const { nome } = req.body;
  const sql = "INSERT INTO Categoria (nome) VALUES (?)";

  req.db.query(sql, [nome], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao criar categoria - " + err.message });
    }
    res.status(201).json({ message: "Categoria criada com sucesso", categoryId: result.insertId });
  });
});

// Encontrar categoria por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Categoria WHERE ID_Categoria = ?";

  req.db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar categoria - " + err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json(result[0]);
  });
});

// Atualizar categoria
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nome } = req.body;
  const sql = "UPDATE Categoria SET nome = ? WHERE ID_Categoria = ?";

  req.db.query(sql, [nome, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao atualizar categoria - " + err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json({ message: "Categoria atualizada com sucesso" });
  });
});

// Deletar categoria
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Categoria WHERE ID_Categoria = ?";

  req.db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao deletar categoria - " + err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json({ message: "Categoria deletada com sucesso" });
  });
});

export default router;
