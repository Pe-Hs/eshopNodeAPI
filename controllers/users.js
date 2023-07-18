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

    const { nombreUsuario, apellidoUsuario, dni, ruc, nroCelular, direccion, departamento, ciudad, distrito } = req.body;

    try {

        const findIdUsuario = DetallesUsuario.where({usuarioId: usuarioId});

        const dbDetalleUsuario = await findIdUsuario.findOne();

        if (!dbDetalleUsuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'El Detalle de Usuario no existe'
            })
        }

        if (req.file) {
            const { filename } = req.file
            dbDetalleUsuario.setImgUrl(filename)
        }

        const Ordenresp = await DetallesUsuario.findByIdAndUpdate(
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
                    imgUsuario: dbDetalleUsuario.imgUsuario
                }
            }
        );


        return resp.status(200).json({
            ok: true,
            msg: 'Detalles de Usuario Actualizado',
            data1: dbDetalleUsuario,
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


const getUsuarioFlutter = async (req, resp = response) => {

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

        return resp.status(200).json({
            data: [dbDetallesUsuario]
        })


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
    getUsuarioFlutter,
}