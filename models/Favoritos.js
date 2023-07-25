const { Schema, model } = require('mongoose')

const FavoritoSchema = Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        default: ''
    },
    productos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        }
    ],
},
    {
        timestamps: true,
    }
)

module.exports = model('Favorito', FavoritoSchema)