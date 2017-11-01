var mongoose = require("mongoose");

var anexoSchema = new mongoose.Schema({
    descricao: String,
    link: String
});

module.exports = mongoose.model("Anexo", anexoSchema);