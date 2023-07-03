const { response } = require('express')
const Producto = require('../models/Producto')
const Carrito = require('../models/Carrito');
const Item = require('../models/Item');

const crearProducto = async (req, resp = response) => {

    const { nombreProducto, pesoProducto } = req.body;

    try {

        const queryProducto = Producto.where({nombreProducto: nombreProducto, pesoProducto: pesoProducto})
        
        let productExist = await queryProducto.findOne()

        if (productExist) {
            return resp.status(400).json({
                ok: false,
                msg: 'Producto ya Existe'
            })
        }

        const dbProducto = new Producto(req.body);

        if (req.file) {
            const { filename } = req.file
            dbProducto.setImgUrl(filename)
        }

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

const getStockMinProducto = async (req, resp = response) => {
    
    const minStock = req.params.min

    try {

        const getAllProductos = await Producto.find()
        var productosFiltered = []

        getAllProductos.forEach(e => {
            if(e.stock < minStock){
                productosFiltered.push(e)
            }
        });
        
        return resp.status(200).json(productosFiltered)

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

    const { nombreProducto, descripcionProducto, precioUnitario, estado, cantidad, stock, categoria, pesoProducto, mostrarProducto } = req.body;

    try {

        var estadoAct = '';

        let producto = await Producto.findById(id);

        if (!producto) {
            return resp.status(400).json({
                ok: false,
                msg: 'Producto no Existe'
            })
        }

        if (req.file) {
            const { filename } = req.file
            producto.setImgUrl(filename)
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
                    categoria: categoria,
                    pesoProducto: pesoProducto,
                    mostrarProducto: mostrarProducto,
                    imgProducto: producto.imgProducto
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

const getProductosbyCategoria = async (req, resp = response) => {

    const categoriaName = req.params.categoria;

    try {
        const queryProducto = Producto.where({categoria: categoriaName});
        const dbProducto = await queryProducto.find().exec();
        
        return resp.status(200).json({
            data: dbProducto
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const deleteProductoById= async (req = resp = response) => {

  const idProducto = req.params.id;

    try {

        const producto = await Producto.findByIdAndDelete(idProducto)

        if (!producto) {
            return resp.status(404).json({
                ok: false,
                msg: 'Producto no Existe'
            })
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Producto eliminado'
        })


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
    getProductobyId,
    getProductosbyCategoria,
    deleteProductoById,
    getStockMinProducto
}