
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },

    enredo: {
      type: String,
      required: true,
    },

    informacoes: {
      genero: {
        type: String,
        required: true,
      },

      plataforma: [
        {
          type: String, // PC, PS4, PS5 etc
          required: true,
        },
      ],

      desenvolvedora: {
        type: String,
        required: true,
      },

      ano: {
        type: Number,
        required: true,
      },

      avaliacao: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
      },
    },

    requisitosMinimos: {
      sistemaOperacional: {
        type: String,
        required: true,
      },

      processador: {
        type: String,
        required: true,
      },

      memoria: {
        type: String, // "8 GB RAM"
        required: true,
      },

      placaDeVideo: {
        type: String,
        required: true,
      },

      armazenamento: {
        type: String, // "70 GB"
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jogo", gameSchema);
