var mongoose = require("mongoose");

var contatoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    mensagem: String
});

module.exports = mongoose.model("Contato", contatoSchema);