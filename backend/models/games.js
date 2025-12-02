const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  imagem: { type: String }, // opcional
  requisitos: {
    minimo: { type: String, required: true },
    recomendado: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model("jogo", gameSchema);
