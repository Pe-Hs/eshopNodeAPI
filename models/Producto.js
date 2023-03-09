const {Schema, model} = require('mongoose');

const ProductoSchema = Schema ({
    nombreProducto: {
        type: String,
        requried: true
    },
    descripcionProducto : {
        type: String,
    },
    precioUnitario: {
        type: Number,
        requried: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    categoria: {
        type: String,
        require: true,
    }
},
    {
        timestamps: true
    }
)

module.exports = model('Producto', ProductoSchema)