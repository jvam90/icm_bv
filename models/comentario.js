var mongoose = require("mongoose");

var comentarioSchema = new mongoose.Schema({
   texto: String,
   autor: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Usuario"
      },
      usuario: String
   }
});

module.exports = mongoose.model("Comentario", comentarioSchema);;