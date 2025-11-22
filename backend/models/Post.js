const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
