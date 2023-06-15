const { Schema, model } = require('mongoose');
require('dotenv').config();

const OrdenCompraSchema = Schema({
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedor'
    },
    insumos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ItemCompra'
        }
    ],   
    imgOrdenCompra:{
        type: String
    },
    total: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean
    }
},
    {
        timestamps: true
    }
)

OrdenCompraSchema.methods.setImgUrl = function setImgUrl(filename){
    this.imgOrdenCompra = `${process.env.APP_HOST}:${process.env.PORT}/public/${filename}`
   }

module.exports = model('OrdenCompra', OrdenCompraSchema)