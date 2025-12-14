const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Email não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    // ✅ UMA ÚNICA RESPOSTA
    return res.status(200).json({
      message: `Bem-vindo, ${usuario.nome}!`,
      user: {
        _id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
});

module.exports = router;
