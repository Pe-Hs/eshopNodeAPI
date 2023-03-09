const { Schema, model } = require('mongoose')

const CarritoSchema = Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        default: ''
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    subTotal: {
        default: 0,
        type: Number,
    },
},
    {
        timestamps: true,
    }
)

module.exports = model('Carrito', CarritoSchema)