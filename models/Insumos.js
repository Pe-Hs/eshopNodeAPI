const { Schema, model } = require("mongoose");

const InsumosSchema = Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    },
    nombreUsuario:{
        type: String,
       
    },
    apellidoUsuario:{
        type: String,
       
    },
    dni:{
        type: String,
    },
    ruc:{
        type: String,
    },
    nroCelular:{
        type: String,
        
    },
    direccion: {
        type: String,
        
    },
    departamento:{
        type: String,
    },
    ciudad :{
        type: String,
       
    },
    distrito :{
        type: String,
        
    },
});

module.exports = model('Insumos', InsumosSchema);