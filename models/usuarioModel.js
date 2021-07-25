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
       usuarios.find(usuario => fs.readFileSync("./database/usuarios.json", "utf-8", JSON.stringify(usuarios)).email === email);
};

