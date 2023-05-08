const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const DetallesUsuario = require('../models/DetallesUsuario');

const getUsuarios = async (req, resp = response) => {

    try {
        const usuarios = await DetallesUsuario.find()
            .populate({
                path: 'usuarioId'
            });

        return resp.status(200).json(usuarios)

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const updateUsuarioCliente = async (req, resp = response) => {

    const usuarioId = req.params.id;

    const { email, nombreUsuario, apellidoUsuario, dni, ruc, nroCelular, direccion, departamento, ciudad, distrito } = req.body;

    try {

        const findIdUsuario = DetallesUsuario.where({usuarioId: usuarioId});

        const dbDetalleUsuario = await findIdUsuario.findOne({ usuarioId });

        if (!dbDetalleUsuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'El Detalle de Usuario no existe'
            })
        }

        await DetallesUsuario.findByIdAndUpdate(
            dbDetalleUsuario._id,
            {
                $set: {
                    nombreUsuario: nombreUsuario,
                    apellidoUsuario: apellidoUsuario,
                    dni: dni,
                    ruc: ruc,
                    nroCelular: nroCelular,
                    direccion: direccion,
                    departamento: departamento,
                    ciudad: ciudad,
                    distrito: distrito,
                }
            }
        );

        return resp.status(200).json({
            ok: true,
            msg: 'Detalles de Usuario Actualizado',
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const getUsuario = async (req, resp = response) => {

    const idUsuario = req.params.id;

    try {

        const findIdUsuario = DetallesUsuario.where({usuarioId: idUsuario});

        const dbDetallesUsuario = await findIdUsuario.findOne()
            .populate({
                path: 'usuarioId'
            }).exec();

        if (!dbDetallesUsuario) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe Usuario'
            })
        }

        return resp.status(200).json(dbDetallesUsuario)


    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    updateUsuarioCliente,
    getUsuario,
}