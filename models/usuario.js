var mongoose = require("mongoose");
var passport_mongoose = require("passport-local-mongoose");

var usuarioSchema = new mongoose.Schema({
   usuario: String,
   senha: String,
   nome: String,
   email: String
});

usuarioSchema.plugin(passport_mongoose);

module.exports = mongoose.model("Usuario", usuarioSchema);