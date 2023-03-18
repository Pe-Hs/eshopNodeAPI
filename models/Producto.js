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
    estado:{
        type: String,
        require: true
    },
    cantidad:{
        type: Number,
        require:true,
        min: [1, "Cantidad no puede ser Menor que 1"],
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