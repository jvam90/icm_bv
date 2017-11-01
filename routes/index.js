var express = require("express");
var router = express.Router({mergeParams: true});
var AnexoMongoose = require("../models/anexo");
var NoticiasMongoose = require("../models/noticia");
var LemaMongoose = require("../models/lema");
var ContatoMongoose = require("../models/contato");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/noticias", function(req, res){
    NoticiasMongoose.find(function(erro, noticias){
        if(erro){
            req.flash("erro", "Erro Ao Processar Sua Solicitação! Tente Novamente!");
            res.redirect("back");
        }else{
            res.render("noticias", {noticias: noticias});
        }
    });
});

router.get("/quemsomos", function(req, res) {
    res.render("quemsomos");
});

router.get("/lemas", function(req, res) {
    LemaMongoose.find().sort({ano: -1}).exec(function(erro, lemas){
        if(erro){
            req.flash("erro", "Erro Ao Processar Sua Solicitação! Tente Novamente!");
            res.redirect("back");
        }else{
            res.render("lemas", {lemas: lemas});
        }
    });
});

router.get("/arquivos", function(req, res){
    AnexoMongoose.find(function(erro, anexos){
        if(erro){
            req.flash("erro", "Erro ao tentar processar sua solicitação! Tente novamente!");
            res.redirect("back");
        }else{
            res.render("arquivos", {arquivos: anexos});
        }
    });
});

router.get("/contato", function(req, res){
    res.render("contato");
});

router.post("/contato", function(req, res){
    var contato = new ContatoMongoose({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        mensagem: req.body.mensagem
    });
    ContatoMongoose.create(contato, function(erro, contatoCriado){
        if(erro){
            req.flash("erro", erro.message);
            res.redirect("back");
        }else{
            req.flash("sucesso", "Contato cadastrado. Entraremos em contato assim que possível.");
            res.redirect("/");
        }
    });
});

module.exports = router;