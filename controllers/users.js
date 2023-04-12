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

const newDetalleUsuario = async(req , resp = response) => {
    
}

const updateUsuario = async (req, resp = response) => {

    const id = req.params.id;

    const { usuario, email, password, rol, nroCelular } = req.body;

    try {

        let findEmail = await Usuario.findOne({email});

        let findNroCelular = await Usuario.findOne({nroCelular});

        if(findEmail){
            return resp.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }

        if(findNroCelular){
            return resp.status(400).json({
                ok: false,
                msg: 'El numero ya existe'
            })
        }

        await Usuario.findByIdAndUpdate(
            id,
            {
                $set: {
                    usuario: usuario,
                    email: email,
                    nroCelular: nroCelular
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

module.exports = {
    getUsuarios,
    updateUsuario
}