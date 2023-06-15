const { Schema, model } = require("mongoose");

const ProveedorSchema = Schema({
    empresaProveedor: {
        type: String,
        default: 'Ninguno'
    },
    rucEmpresa: {
        type: String,
        default: '20000000000'
    },
    contactoProveedor: {
        type: String,
    },
    email: {
        type: String
    },
    nroCelular: {
        type: String
    }
},
    {
        timestamps: true,
    }

);

module.exports = model('Proveedor', ProveedorSchema);