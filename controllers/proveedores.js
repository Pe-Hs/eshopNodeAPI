const { response } = require('express');
const Proveedor = require('../models/Proveedor');

const crearProveedor = async (req, resp = response) => {

    const {empresaProveedor, rucEmpresa } = req.body;

    try {

        const findProveedor = Proveedor.where({empresaProveedor : empresaProveedor, rucEmpresa: rucEmpresa});

        const queryProveedor = await findProveedor.findOne();

        // if(queryProveedor){
        //     return resp.status(400).json({
        //         ok: false,
        //         msg: 'La empresa ya existe'
        //     })
        // }

        const dbProveedor = new Proveedor(req.body);

        await dbProveedor.save();

        return resp.status(200).json(dbProveedor)

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

        const proveedores = await Proveedor.find();

        resp.json(proveedores)

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

module.exports = {
    crearProveedor,
    getAll
}