const { Schema, model } = require("mongoose");

const InsumosSchema = Schema({
    nombreInsumo: {
        type: String,
    },
    tipoInsumo: {
        type: String,
    },
    descripcionInsumo: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true,
    }
);

module.exports = model('Insumos', InsumosSchema);