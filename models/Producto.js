const {Schema, model} = require('mongoose');
require('dotenv').config();

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
        require: true,
        default: 'No Disponible'
    },
    cantidad:{
        type: Number,
        require:true,
        default: 1,
        min: [1, "Cantidad no puede ser Menor que 1"],
    },
    stock: {
        type: Number,
        require: true,
        default: 0
    },
    categoria: {
        type: String,
        require: true,
    },
    imgProducto: {
        type: String
    },
    mostrarProducto: {
        type: Boolean,
        default: true
    },
    pesoProducto: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
)
ProductoSchema.methods.setImgUrl = function setImgUrl(filename){
 this.imgProducto = `${process.env.APP_HOST}:${process.env.PORT}/public/${filename}`
}

module.exports = model('Producto', ProductoSchema)