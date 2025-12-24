const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/Product");

// Ver carrinho do usuário
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { items: [] });
});

// Adicionar produto ao carrinho
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Produto não encontrado" });

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    item => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantidade += 1;
  } else {
    cart.items.push({
      productId,
      nome: product.nome,
      preco: product.preco,
      imagem: product.imagem
    });
  }

  await cart.save();
  res.json(cart);
});

// Remover produto
router.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ items: [] });

  cart.items = cart.items.filter(
    item => item.productId.toString() !== productId
  );

  await cart.save();
  res.json(cart);
});

// Limpar carrinho
router.delete("/clear/:userId", async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.params.userId });
  res.json({ message: "Carrinho limpo" });
});

module.exports = router;
