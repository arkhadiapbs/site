
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },

    descricao: {
      type: String,
      required: true,
    },

    categoria: {
      type: String, // Teclado, Mouse, Headset etc
      required: true,
    },

    marca: {
      type: String, // HyperX, Logitech, Razer...
      required: true,
    },

    preco: {
      type: Number,
      required: true,
    },

    avaliacao: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    quantidadeEstoque: {
      type: Number,
      required: true,
    },

    imagem: [
      {
        type: String, // URL da imagem
        required: true,
      },
    ],

    ativo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
