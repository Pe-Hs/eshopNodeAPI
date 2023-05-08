const {Schema, model} = require('mongoose');
require('dotenv').config();

const OrdenCompraSchema = Schema ({
    nombreProveedor:{

    },
    telefonoProveedor:{

    },

},
    {
        timestamps: true
    }
)

module.exports = model('OrdenCompra', OrdenCompraSchema)