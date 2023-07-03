const { response } = require('express');
const Proveedor = require('../models/Proveedor');
const OrdenCompra = require('../models/OrdenCompra');
const ItemCompra = require('../models/ItemCompra');
const Insumo = require('../models/Insumo');

const crearOrdenCompra = async (req, resp = response) => {

    const { proveedor } = req.body;

    try {

        const dbOrdenCompra = new OrdenCompra(req.body);

        if (req.file) {
            const { filename } = req.file
            dbOrdenCompra.setImgUrl(filename)
        }

        await dbOrdenCompra.save();

        return resp.status(200).json(dbOrdenCompra)

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const deleteCompraById = async (req, resp = response) => {

    const idCompra = req.params.id;

    try {

        const findOrdenCompra = await OrdenCompra.findByIdAndDelete(idCompra)

        if (!findOrdenCompra) {
            return resp.status(404).json({
                ok: false,
                msg: 'Producto no Existe'
            })
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Orden de Compra eliminado'
        })


    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const getOrdenCompraId = async (req, resp = response) => {

    const idOrden = req.params.id;

    try {

        const ordenCompra = await OrdenCompra.findById(idOrden)

        if (!ordenCompra) {
            return resp.status(404).json({
                ok: false,
                msg: 'Producto no Existe'
            })
        }

        return resp.status(200).json(ordenCompra)


    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const updateOrdenCompra = async (req, resp = response) => {

    const id = req.params.id

    const {proveedor} = req.body

    try {

        let dbOrdenCompra = await OrdenCompra.findById(id)

        if (req.file) {
            const { filename } = req.file
            dbOrdenCompra.setImgUrl(filename)
        }

        await OrdenCompra.findByIdAndUpdate(
            id,
            {
                $set: {
                    proveedor : proveedor,
                    imgOrdenCompra: dbOrdenCompra.imgOrdenCompra
                }
            }
        )

        return resp.status(200).json({
            ok: true,
            msg: 'Orden de Compra actualizado'
        })

        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const addItemCompra = async (req, resp = response) => {

    const id = req.params.id

    const itemCompra = req.body;

    var sum = 0;

    try {

        const dbItemCompra = new ItemCompra(itemCompra)

        dbItemCompra.total = dbItemCompra.cantidad * dbItemCompra.precio

        await dbItemCompra.save();

        const newItemCompraId = dbItemCompra._id        

        await OrdenCompra.findByIdAndUpdate(id,
            {
                $push: {insumos : newItemCompraId},
            }
        )

        const ordenCompraResp = await OrdenCompra.findById(id)
        .populate({
            path: 'insumos',
        })
        .exec();

        ordenCompraResp.insumos.forEach(e => {
            const add = e.total
            sum = sum + add
         });

        await OrdenCompra.findByIdAndUpdate(id,
            {
                $set:  {total: sum}
            }
        )
        
        const ordenCompraF = await OrdenCompra.findById(id)
        .populate({
            path: 'insumos',
        })
        .exec();

        const itemCompraAdd = await ItemCompra.findById(newItemCompraId)
        .populate({
            path: 'insumoId',
        })
        .exec();

        return resp.status(200).json({
            ok: true,
            addedItem: itemCompraAdd,
            data: ordenCompraF
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const deleteItemCompra = async(req, resp = response) =>{

    const idItemCompra = req.params.id

    try {

        await ItemCompra.findByIdAndDelete(idItemCompra)

        return resp.status(200).json({
            ok: true,
            msg: 'Item de Compra eliminado'
        })
        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const deleteItemCompraInOrden = async (req, resp = response) =>{

    const id = req.params.id
    const itemOrden = req.body
    var sum = 0

    try {

        const dbOrdenCompra = await OrdenCompra.findById(id)

        if (!dbOrdenCompra) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe la Orden'
            })
        }

        dbOrdenCompra.insumos.forEach(e => {
            const add = e.total;
            sum = sum + add;
        });        

         await OrdenCompra.findByIdAndUpdate(
            id,
            {
                $pull: { insumos: itemOrden.insumos },
            },
        );

        await ItemCompra.findByIdAndDelete(itemOrden.insumos)

        return resp.status(200).json({
            ok: true,
            msg: 'Se removio Insumo',
        })
        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const findItemsinOrden = async (req, resp = response) =>{

    const idCompra = req.params.id

    try {

        const dbOrdenCompra = await OrdenCompra.findById(idCompra)

        if(dbOrdenCompra.insumos == 0){
            return resp.status(400).json({
                ok: false,
                msg: 'No hay Insumos en la Orden'
                
            })
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Si hay Insumos'
        })
        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const reporteComprasRango = async (req, resp = response) => {

    const fechaInicio = req.params.id
    const fechaFin = req.params.id2

    // const { fechaInicio, fechaFin } = req.body

    try {

        let newFechaIn = new Date(fechaInicio)
        let newFechaFn = new Date(fechaFin)

         const query = OrdenCompra.where({ "createdAt" : { "$gte": newFechaIn, "$lt": newFechaFn  }})
         const dbOrdenCompra = await query.find()
            .populate({
                path: 'insumos',
                populate : {
                    path: 'insumoId'
                }
            })
            .populate('proveedor')
            .exec()

        return resp.status(200).json(dbOrdenCompra)


    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const reporteComprasHoy = async (req, resp = response) => {


    try {

        let newFechaIn = new Date()
        newFechaIn.setHours(0,0,0)

         const query = OrdenCompra.where({ "createdAt" : { "$gte": newFechaIn }})
         const dbCompras = await query.find()
            .populate('proveedor')
            .populate('insumos')
            .exec()

        return resp.status(200).json(dbCompras)


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

        const ordenes = await OrdenCompra.find().sort({ createdAt: 'desc' })
            .populate({
                path: 'insumos',
                populate: {
                    path: 'insumoId'
                }
            })
            .populate('proveedor');

        resp.json(ordenes)

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

module.exports = {
    addItemCompra,
    crearOrdenCompra,
    deleteCompraById,
    findItemsinOrden,
    getAll,
    getOrdenCompraId,
    updateOrdenCompra,
    deleteItemCompra,
    deleteItemCompraInOrden,
    reporteComprasRango,
    reporteComprasHoy
}