const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
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
    }
});

module.exports = model('Usuario', UsuarioSchema);