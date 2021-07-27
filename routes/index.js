const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');
const verificarUsuarioLogado = require('../middlewares/verificarUsuarioLogado');

/* GET home page. */
router.get('/', function(req, res, next) {
  let usuario;
  let tema= req.cookies.tema ? req.cookies.tema : "light-mode";

  if (req.session.usuario){
    usuario = req.session.usuario;
  };

  res.render('index', { title: 'Pagina Inicial', usuario, tema});
});


router.get('/cadastro', function(req, res, next) {
  res.render('cadastro');
});

router.post('/cadastro', function(req, res, next){
  const { nome, email, senha, tema } = req.body;

  const { senha: senhaNaoUsada , ...usuario }= loginControllers.criarUsuario(nome, email, senha);

  req.session.usuario = usuario;
  res.cookie("tema", tema);
  res.redirect('/produtos');

});

router.get('/login', function(req, res, next) {
  const { session } = req;
  res.render('login');
});

router.post('/login', function(req, res, next){
  const { email, senha } = req.body;

  
  let usuario = loginControllers.efetuarLogin(email, senha);
  req.session.usuario = usuario;


  res.redirect('/produtos');
  
});

router.get('/produtos', verificarUsuarioLogado, function(req, res, next){
  let usuario;
  let tema= req.cookies.tema ? req.cookies.tema : "light-mode";

  if (req.session.usuario){
    usuario = req.session.usuario;
  };

  res.render('produtos', { usuario: req.session.usuario, tema});
});

router.get('/logout', function(req, res, next){
  req.session.destroy;
  res.redirect('/')
});

module.exports = router;
