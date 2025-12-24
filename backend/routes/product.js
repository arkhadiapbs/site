const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// rota para listar os produtos com filtro
router.get("/", async (req, res) => {
  try {
    const {
      search,
      categoria,
      marca,
      precoMin,
      precoMax,
    } = req.query;

    let filtro = { ativo: true };

    if (search) {
      filtro.nome = { $regex: search, $options: "i" };
    }

    if (categoria && categoria !== "Todas") {
      filtro.categoria = categoria;
    }

    if (marca && marca !== "Todas") {
      filtro.marca = marca;
    }

    if (precoMin || precoMax) {
      filtro.preco = {};
      if (precoMin) filtro.preco.$gte = Number(precoMin);
      if (precoMax) filtro.preco.$lte = Number(precoMax);
    }

    const produtos = await Product.find(filtro);

    res.json({
      total: produtos.length,
      produtos,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

//rota para criar/adicionar produto
router.post("/", async (req, res) => {
  try {
    const produto = await Product.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto" });
  }
});

module.exports = router;
