const usuarioModel = require('../models/usuarioModel')
const bcrypt = require('bcrypt');

exports.criarUsuario = (nome, email, senha)=>{
    const senhaCripto = bcrypt.hashSync(senha, 12)
    const usuario = usuarioModel.criarUmUsuario(nome, email, senhaCripto);
    return usuario;
    
};

exports.efetuarLogin = (email, senha)=> {
    const usuario = usuarioModel.buscarPorEmail(email);

    if(!usuario){
        throw new Error("Access denied");
    };

    const { senhaCripto } = usuario;
    const isValid = bcrypt.compareSync(senha, senhaCripto);

    if (!isValid){
    throw new Error('password invalid')
    }

    const { id, nome }= usuario;

    const ret = { id, nome, email };
  
    return ret;
};