const { Schema, model } = require("mongoose");

const DetalleUsuarioSchema = Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    },
    nombreUsuario: {
        type: String,

    },
    apellidoUsuario: {
        type: String,

    },
    dni: {
        type: String,
        default: '00000000'
    },
    ruc: {
        type: String,

    },
    nroCelular: {
        type: String,

    },
    direccion: {
        type: String,
        default: ''
    },
    departamento: {
        type: String,
    },
    ciudad: {
        type: String,

    },
    distrito: {
        type: String,

    },
    imgUsuario: {
        type: String
    }
},
{
    timestamps: true,
});

DetalleUsuarioSchema.methods.setImgUrl = function setImgUrl(filename) {
    this.imgUsuario = `${process.env.APP_HOST}:${process.env.PORT}/public/${filename}`
}

module.exports = model('DetalleUsuario', DetalleUsuarioSchema);