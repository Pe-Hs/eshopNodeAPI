const { Schema, model } = require('mongoose')

const ItemCompraSchema = Schema({
    insumoId: {
        type: Schema.Types.ObjectId,
        ref: "Insumos",
    },
    cantidad: {
        type: Number,
        required: true,
        min: [1, "Cantidad no puede ser Menor que 1"],
    },
    precio: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        default: 0
    },
},
    {
        timestamps: true,
    }
);

module.exports = model('ItemCompra', ItemCompraSchema)