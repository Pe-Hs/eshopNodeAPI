
const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');
const DetallesUsuario = require('../models/DetallesUsuario');

const crearUsuario = async (req, resp = response) => {

    const { email, password, nombreUsuario, apellidoUsuario} = req.body;

    try {

        // VERIFICAR EMAIL, USER , DNI, RUC

        const findEmailUsuario = Usuario.where({ email : email})

        let correo = await findEmailUsuario.findOne();

        if (correo) {
            return resp.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }

        // CREAR USUARIO
        const dbUsuario = new Usuario(req.body);


        //HASHEAR PASSWORD
        const salt = bcrypt.genSaltSync(10);
        dbUsuario.password = bcrypt.hashSync(password, salt);

        //GENERAR JWT
        const token = await generarJWT(dbUsuario.id, email);


        //AÑADIR A LA BD
        await dbUsuario.save();

        const newDetalles = {
            usuarioId: dbUsuario.id,
            nombreUsuario: nombreUsuario,
            apellidoUsuario: apellidoUsuario,
        }

        const dbDetalleUsuario = new DetallesUsuario(newDetalles)

        await dbDetalleUsuario.save();

        //MOSTRAR JSON
        return resp.status(200).json({
            ok: true,
            uid: dbUsuario.id,
            rol: dbUsuario.rol,
            token
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: 'false',
            msg: 'Error Inesperado'
        })
    }

}

const loginUsuario = async (req, resp = response) => {

    const { email, password } = req.body;

    try {

        const queryUsuario = Usuario.where({email : email});
        const dbUsuario = await queryUsuario.findOne();

        if (!dbUsuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }

        //CONFIRMAR PASSWORD
        const validPassword = bcrypt.compareSync(password, dbUsuario.password);

        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'El password no es Valido'
            })
        }

        //GENERAR TOKEN
        const token = await generarJWT(dbUsuario.id, dbUsuario.email);

        //RESPUESTA SERVICIO
        return resp.json({
            ok: true,
            uid: dbUsuario.id,
            email: dbUsuario.email,
            rol: dbUsuario.rol,
            token
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Ocurrio un Error'
        })

    }


}

const revalidarToken = async (req, resp = response) => {

    const { uid, email, usuario } = req;

    const token = await generarJWT(uid, usuario);

    return resp.json({
        ok: true,
        uid,
        usuario,
        token
    })
}

module.exports = {
    crearUsuario: crearUsuario,
    loginUsuario: loginUsuario,
    revalidarToken: revalidarToken

}