const express = require("express");
const router = express.Router();

// Exemplo de dados da comunidade
const posts = [
  { id: 1, usuario: "Lucas", conteudo: "Alguém jogando Elden Ring hoje?" },
  { id: 2, usuario: "Sara", conteudo: "Sugestões para novos jogos?" },
  { id: 3, usuario: "Brenno", conteudo: "Postei uma review de Genshin Impact!" }
];

// GET todos os posts da comunidade
router.get("/", (req, res) => {
  res.json({ posts });
});

module.exports = router;