const { response } = require('express')
const Producto = require('../models/Producto')
const Carrito = require('../models/Carrito');
const Item = require('../models/Item');

const crearProducto = async (req, resp = response) => {

    const { nombreProducto, descripcionProducto, precioUnitario } = req.body;

    try {

        let producto = await Producto.findOne({ nombreProducto })

        if (producto) {
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
                path: 'items',
            })
            .exec();

        const dbItem = new Item(item)

        dbItem.total = dbItem.cantidad * dbItem.precio;

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
                $set: { subTotal: sum }
            }
        )

        return resp.status(200).json({
            ok: true,
            msg: 'Se agrego al Carrito',
            data: dbCarrito
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const updateProducto = async (req, resp = response) => {

    const id = req.params.id;

    const { nombreProducto, descripcionProducto, precioUnitario, estado, cantidad, stock, categoria } = req.body;

    try {

        let producto = await Producto.findById(id);

        if (!producto) {
            return resp.status(400).json({
                ok: false,
                msg: 'Producto no Existe'
            })
        }


        await Producto.findByIdAndUpdate(
            id,
            {
                $set: {
                    nombreProducto: nombreProducto,
                    descripcionProducto: descripcionProducto,
                    precioUnitario: precioUnitario,
                    estado: estado,
                    cantidad: cantidad,
                    stock: stock,
                    categoria: categoria
                }
            }
        );

        return resp.status(200).json({
            ok: true,
            msg: 'Producto Actualizado'
        })


    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const getProductobyId = async (req, resp = response) => {

    const idProducto = req.params.id;

    try {

        const producto = await Producto.findById(idProducto)

        if (!producto) {
            return resp.status(404).json({
                ok: false,
                msg: 'Producto no Existe'
            })
        }

        return resp.status(200).json(producto)

        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const getAll = async (req, resp = response) => {

    try {

        const productos = await Producto.find();
        resp.json(productos)

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

module.exports = {
    crearProducto,
    getAll,
    añadirProductoCarrito,
    updateProducto,
    getProductobyId
}