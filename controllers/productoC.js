const {response} = require('express')
const Producto = require('../models/Producto')
const Carrito = require('../models/Carrito');
const Item = require('../models/Item');

const crearProducto = async (req , resp = response) => {

    const {nombreProducto, descripcionProducto, precioUnitario} = req.body;

    try {

        let producto = await Producto.findOne( {nombreProducto} )

        if(producto){
            return resp.status(400).json({
                ok: false,
                msg: 'Producto ya Existe'
            })
        }

        const dbProducto = new Producto(req.body);

        await dbProducto.save();

        return resp.status(200).json({
            ok: true,
            id: dbProducto.id,
        })
        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const añadirProductoCarrito = async (req, resp = response) => {

    const id = req.params.id

    const item = req.body;

    var sum = 0;

    try {

        const dbCarrito = await Carrito.findById(id)
            .populate({
                path: 'items'
            })
             .exec();

        const dbItem = new Item(item)

        await dbItem.save();

        const newItemId = dbItem._id;

        dbCarrito.items.forEach(e => {
            const add = e.total;
            sum = sum + add;

        }); 

        await Carrito.findByIdAndUpdate(
            id,
            {
                $push: { items: newItemId },
                $set:  { subTotal: sum }
            }
        )

        return resp.status(200).json({
            ok: true,
            msg: 'Se agrego al Carrito',
        })
        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }


    // try {

    //     const f = await Carrito.findOne({productos : productos})

    //     const a = await Producto.findById(productos)

    //     await Carrito.findByIdAndUpdate(
    //         id,
    //         {
    //             $push: { productos: productos }
    //         },
    //         {
    //             useFindAndModify: false
    //         }
    //     );

    //     return resp.status(200).json({
    //         ok: true,
    //         msg: 'Se agrego al Carrito',
    //     })

    // } catch (error) {
    //     console.log(error);

    //     return resp.status(500).json({
    //         ok: false,
    //         msg: 'Error Inesperado'
    //     })
    // }
}

const getAll = async ( req, resp = response) =>{
    const productos = await Producto.find();
    resp.json(productos)
}

module.exports = {
    crearProducto,
    getAll,
    añadirProductoCarrito
}