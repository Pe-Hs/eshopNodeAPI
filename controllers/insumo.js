const { response } = require('express');
const Insumo = require('../models/Insumo');

const crearInsumo = async (req, resp = response) => {

    const { nombreInsumo } = req.body;

    try {

        const findInusmo = Insumo.where({ nombreInsumo: nombreInsumo })

        const queryInsumo = await findInusmo.findOne();

        if (queryInsumo) {
            return resp.status(400).json({
                ok: false,
                msg: 'El insumo ya existe'
            })
        }

        const dbInsumo = new Insumo(req.body);

        await dbInsumo.save()

        return resp.status(200).json({
            ok: true,
            data: dbInsumo
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const updateStockInsumo = async (req, resp = response) => {
    const id = req.params.id

    const {stock} = req.body

    try {

        const findInsumo = await Insumo.findById(id)

        if (!findInsumo) {
            return resp.status(400).json({
                ok: false,
                msg: 'El insumo no existe'
            })
        }

       await findInsumo.updateOne({
            stock: stock
        })

        return resp.status(200).json({
            ok: true,
            msg: 'Insumo Actualizado'
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const getInsumobyName = async (req, resp = response) =>{

    const nombreInsumo = req.params.name

    try {

        const s = Insumo.where({nombreInsumo: nombreInsumo })
        const dbInsumo = await s.find()

        if(!dbInsumo){
            return resp.status(400).json({
                ok: false,
                msg: 'El insumo no existe'
            })
        }

        return resp.status(200).json(dbInsumo)

        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const getStockMinInsumo = async (req, resp = response) => {
    
    const minStock = req.params.min

    try {

        const getAllInsumos = await Insumo.find()
        var insimosFiltered = []

        getAllInsumos.forEach(e => {
            if(e.stock < minStock){
                insimosFiltered.push(e)
            }
        });
        
        return resp.status(200).json(insimosFiltered)

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

        const insumos = await Insumo.find();

        resp.json(insumos)

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

module.exports = {
    crearInsumo,
    getAll,
    updateStockInsumo,
    getInsumobyName,
    getStockMinInsumo
}