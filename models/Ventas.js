const { Schema, model } = require("mongoose");

const VentaSchema = Schema({
    formaPago:{
        type: String,        
    },
    detallesUsuario: {
        type: Schema.Types.ObjectId,
        ref: "DetalleUsuario",      
    },
    detallesCarrito :{
        type: Schema.Types.ObjectId,
        ref: "Carrito",       
    },
    totalVenta: {
        type: Number
    },
    impuesto : {
        type: Number,
        default: 0.18
    },
    estado: {
        type : String,
        default: 'No Pagado'
    },
    tipoComprobante: {
        type: String,
        default: 'Boleta'
    },
    
},
    {
        timestamps: true    
    }
);

module.exports = model('Venta', VentaSchema);