var mongoose = require("mongoose");

var noticiaSchema = new mongoose.Schema({
   titulo: String,
   mensagem: String,
   criadoEm: {type: Date, default: Date.now},
   comentarios: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comentario"
   }],
   autor: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Usuario"
      },
      usuario: String
   }
});

module.exports = mongoose.model("Noticia", noticiaSchema);