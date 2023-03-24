const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    usuario: {
        type: String,
        requried: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol :{
        type: String,
        require: true,
        default: 'CLIENTE'
    },
    nroCelular: {
        type: String,
    }
});

module.exports = model('Usuario', UsuarioSchema);