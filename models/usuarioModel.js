const { v4: uuid } = require("uuid");
const fs = require('fs');
const usuarios = require('../database/usuarios.json')


exports.criarUmUsuario = (nome, email, senhaCripto)=> {
    const usuario = {
        id: uuid(),
        nome,
        email,
        senhaCripto
    }

    usuarios.push(usuario);
    fs.writeFileSync("./database/usuarios.json", JSON.stringify(usuarios));
    
    return usuario;
};

exports.buscarPorEmail = function(email){
      const usuarioEncontrado= usuarios.find(usuario => usuario.email === email);
       return usuarioEncontrado;
};

