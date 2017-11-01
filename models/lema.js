var mongoose = require("mongoose");

var lemaSchema = new mongoose.Schema({
    texto: String,
    versiculo: String,
    ano: Number
});

module.exports = mongoose.model("Lema", lemaSchema);