const { response } = require('express');
const Ventas = require('../models/Ventas');
const DetallesUsuario = require('../models/DetallesUsuario');
const Carrito = require('../models/Carrito');


const crearVentaProducto = async (req, resp = response) => {

    const body = req.body;

    try {

        // const findIdUsuario = DetallesUsuario.where({usuarioId: usuarioId});

        // const dbDetalleUsuario = await findIdUsuario.findOne({ usuarioId });

        const dbVenta = new Ventas(req.body);

        await dbVenta.save()

        // let r = (Math.random() + 1 ).toString(36).substring(6)

        // const newVenta = new Ventas(body)

        // await newVenta.save();

        return resp.status(200).json({
            ok: true,
            ms: 'Registro Exitoso'
        })

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const reporteVentasRango = async (req, resp = response) => {

    const fechaInicio = req.params.id
    const fechaFin = req.params.id2

    // const { fechaInicio, fechaFin } = req.body

    try {

        let newFechaIn = new Date(fechaInicio)
        let newFechaFn = new Date(fechaFin)

         const query = Ventas.where({ "createdAt" : { "$gte": newFechaIn, "$lt": newFechaFn  } , estado : "Pagado"})
         const dbVentas = await query.find()
            .populate('detallesUsuario')
            .populate({
                path: 'detallesCarrito',
                populate: {
                    path: 'items',
                    populate: {
                        path: 'productoId'
                    }
                }
            })
            .exec()

        return resp.status(200).json(dbVentas)


    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const updateStatus = async (req, resp = response) => {
    
    const idVenta = req.params.id
    const {estado} = req.body

    try {

         await Ventas.findByIdAndUpdate(
            idVenta,
            {
                $set : { estado : estado }
            }
         )        

         return resp.status(200).json({
            ok: true,
            ms: 'Ser actualizo Venta'
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const reporteVentasHoy = async (req, resp = response) => {

    const fechaHoy = req.params.id
 
    // const { fechaInicio, fechaFin } = req.body

    try {

        let newFechaIn = new Date()
        newFechaIn.setHours(0,0,0)

         const query = Ventas.where({ "createdAt" : { "$gte": newFechaIn }})
         const dbVentas = await query.find()
            .populate('detallesUsuario')
            .populate({
                path: 'detallesCarrito',
                populate: {
                    path: 'items'
                }
            })
            .exec()

        return resp.status(200).json(dbVentas)


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

        const ventas = await Ventas.find()
            .sort({ createdAt: 'desc' })
            .populate({
                path : 'detallesUsuario',
                populate: [
                    {
                        path: 'usuarioId'
                    }
                ]
            })
            .populate({
                path: 'detallesCarrito',
                populate: [
                    {
                        path: 'items',
                        populate: [
                            {
                                path: 'productoId'
                            }
                        ]
                    }
                ]
            }).exec()

        return resp.status(200).json(ventas)

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

module.exports = {
    crearVentaProducto,
    getAll,
    reporteVentasRango,
    reporteVentasHoy,
    updateStatus
}