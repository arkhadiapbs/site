const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada,
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: {
        _id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

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
