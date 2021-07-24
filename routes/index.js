const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  let usuario;
  let cor= req.cookies.corpreferida ? req.cookies.cor : "#FFFF";

  if (req.session.usuario){
    usuario = req.session.usuario;
  };

  res.render('index', { title: 'Pagina Inicial', usuario});
});


router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', { title: 'Express' });
});

router.post('/cadastro', function(req, res, next){
  const { nome, email, senha, cor } = req.body;

  const { senha: senhaNaoUsada , ...usuario }= loginControllers.criarUsuario(nome, email, senha);



  req.session.usuario = usuario;
  res.cookie("corpreferida", cor);
  res.redirect('/');

});

router.get('/logout', function(req, res, next){
  req.session.destroy;
  res.redirect('/')
});

module.exports = router;
