const express = require("express");
const Game = require("../models/games");
const router = express.Router();

// 📌 Listar todos os games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar games", err });
  }
});

// 📌 Criar um game
router.post("/", async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json({ message: "Game criado!", game });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar game", err });
  }
});

// 📌 Buscar 1 game pelo ID
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game não encontrado" });

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar game", err });
  }
});

// 📌 Editar um game
router.put("/:id", async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // retorna o atualizado
    );

    if (!game) return res.status(404).json({ message: "Game não encontrado" });

    res.status(200).json({ message: "Game atualizado", game });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar game", err });
  }
});

// 📌 Deletar um game
router.delete("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) return res.status(404).json({ message: "Game não encontrado" });

    await game.deleteOne();
    res.status(200).json({ message: "Game deletado" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar game", err });
  }
});

module.exports = router;
