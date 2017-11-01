var express = require("express");
var router = express.Router();
var NoticiaMongoose = require("../models/noticia");
var AnexoMongoose = require("../models/anexo");
var LemaMongoose = require("../models/lema");

//página inicial
router.get("/", function(req, res){
    res.render("admin/index");
});

//tela de cadastro de notícia
router.get("/noticias/new", function(req, res){
    res.render("admin/noticias/new");
});

//cadastro de notícia
router.post("/noticias", function(req, res){
    NoticiaMongoose.create(req.body.noticia, function(erro, noticiaCriada) {
        if (erro) {
            req.flash("erro", erro.message);
            res.redirect("back");
        }
        else {
            req.flash("sucesso", "Notícia cadastrada com sucesso!");
            res.redirect("/admin");
        }
    });
});

//tela de cadastro de anexo
router.get("/anexo/new", function(req, res){
    res.render("admin/anexos/new");
});

//cadastro de anexo
router.post("/anexo", function(req, res){
    
    var anexo = new AnexoMongoose({
        descricao: req.body.descricao,
        link: req.body.link
    });

    
    AnexoMongoose.create(anexo, function(erro, anexoSalvo){
        if(erro){
            req.flash("erro", erro.message);
            res.redirect("back");
        }else{
            req.flash("sucesso", "Anexo Salvo Com Sucesso!");
            res.redirect("/admin");
        }
    });
});

//tela de cadastro do lema
router.get("/lema/new", function(req, res){
    res.render("admin/lema/new");
});

router.post("/lema", function(req, res){
    var lema = new LemaMongoose({
        texto: req.body.texto,
        versiculo: req.body.versiculo,
        ano: req.body.ano
    });

    LemaMongoose.create(lema, function(erro, lemaCriado){
        if(erro){
            req.flash("erro", erro.message);
            res.redirect("back");
        }else{
            req.flash("sucesso", "Lema Do Ano Cadastrado Com Sucesso!");
            res.redirect("/admin");
        }
    });
});

module.exports = router;