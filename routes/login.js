import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  // Consulta para verificar o email, senha e tipo de usuário
  const sql = "SELECT tipo FROM Usuario WHERE email = ? AND senha = ?";
  
  req.db.query(sql, [email, senha], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao verificar credenciais - " + err.message });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    const user = result[0];
    res.status(200).json({ message: "Login bem-sucedido", tipo: user.tipo });
  });
});

export default router;
