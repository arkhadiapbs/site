const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Modelo Mongoose
const bcrypt = require("bcrypt");

// Rota POST de cadastro
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se já existe usuário com esse email
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email já está em uso" });

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = new User({ nome, email, senha: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Conta criada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar conta" });
  }
});

// Rota POST de login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario)
      return res.status(400).json({ message: "Email não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida)
      return res.status(400).json({ message: "Senha incorreta" });

    res.status(200).json({ message: `Bem-vindo, ${usuario.nome}!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

module.exports = router;