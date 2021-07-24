const criarUmUsuario = require('../models/usuarioModel')
const bcrypt = require('bcrypt');

exports.criarUsuario = (nome, email, senha)=>{
    const senhaCripto = bcrypt.hashSync(senha, 12)
    const usuario = criarUmUsuario(nome, email, senhaCripto);
    return usuario;
    
};
