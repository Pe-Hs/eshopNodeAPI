const { Schema, model } = require('mongoose')

const ItemSchema = Schema({
    productoId: {
        type: Schema.Types.ObjectId,
        ref: "Producto",
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
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = model('Item', ItemSchema)