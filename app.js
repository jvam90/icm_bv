//REQUIRES
var mongoose = require("mongoose");
var express = require("express");
var bp = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var passport_local = require("passport-local");
var express_session = require("express-session");
var flash = require("connect-flash");


//models
var UsuarioMongoose = require("./models/usuario");


//variáveis
var ip = process.env.IP || '127.0.0.1';
var port = process.env.PORT || 3000;


//CONFIGURAÇÃO
var app = express();
app.locals.moment = require('moment');
app.use(flash());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


//banco de dados
mongoose.connect("mongodb://localhost/icm", { useMongoClient: true });

//Configuração do passport
app.use(express_session({ secret: "Igreja Cristã Maranata", resave: false, saveUninitialized: false }));
app.use(passport.initialize()); //middleware necessário para inicializar o passport
app.use(passport.session()); //indicando o uso de session
passport.use(new passport_local(UsuarioMongoose.authenticate())); //indicando que vai ser uma estratégia de autenticação local - usuário e senha
passport.serializeUser(UsuarioMongoose.serializeUser()); //indicando que vai serializar o usuário pelo passport
passport.deserializeUser(UsuarioMongoose.deserializeUser()); //indicando que vai desserializar o usuário pelo passport

app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.msgErro = req.flash("erro");
    res.locals.msgSucesso = req.flash("sucesso");
    next();
});

app.use("/admin", require("./routes/admin"));
app.use(require("./routes/index"));

app.listen(port, ip, function() {
    console.log("Servidor on-line");
});
