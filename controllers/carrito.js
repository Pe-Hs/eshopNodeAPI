const { response } = require('express')
const Carrito = require('../models/Carrito');
const Producto = require('../models/Producto');

const Usuario = require('../models/Usuario');

const crearCarrito = async (req, resp = response) => {

    const carrito = req.body;

    try {

        const dbCarrito = new Carrito(carrito);

        await dbCarrito.save();

        return resp.status(200).json({
            ok: true,
            msg: 'creado',
            id: dbCarrito._id
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })

    }

}

const getCarrito = async (req, resp = response) => {

    const id = req.header('x-id')

    var sum = 0; 
    
    try {

        const dbCarrito = await Carrito.findById(id)
            .populate({
                path: 'items',
            })
            .exec();
        
            dbCarrito.items.forEach(e => {
                const add = e.total;
                sum = sum + add;
                console.log(e);
            }); 

        return resp.status(200).json(dbCarrito)


    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const removeProducto = async (req, resp = response) => {

    // const id = req.header('x-id');
    const id = req.params.id
    const { items } = req.body;
    var sum = 0;

    try {

        let carrito = await Carrito.findById(id)

        if (!carrito) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el Carrito'
            })
        }

        carrito.items.forEach(e => {
            const add = e.total;
            sum = sum + add;
        }); 

        const s = await Carrito.findByIdAndUpdate(
            id,
            {
                $pull: { items: items },
                $set:  { subTotal: sum }
            },
            {
                useFindAndModify: false
            }
        );

        return resp.status(200).json({
            ok: true,
            msg: 'Se removio al Carrito',
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const getAll = async ( req, resp = response) =>{
    const carritos = await Carrito.find();
    resp.json(carritos)
}

module.exports = {
    crearCarrito,
    getCarrito,
    removeProducto,
    getAll
}