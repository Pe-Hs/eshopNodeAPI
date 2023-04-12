
const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');
const DetallesUsuario = require('../models/DetallesUsuario');

const crearUsuario = async (req, resp = response) => {

    const { email, password, rol, nombreUsuario, apellidoUsuario, dni, ruc, nroCelular, departamento, direccion, ciudad, distrito } = req.body;

    try {

        // VERIFICAR EMAIL, USER , DNI, RUC
        let correo = await Usuario.findOne({ email });

        let userDni = await DetallesUsuario.findOne({ dni });

        let userRuc = await DetallesUsuario.findOne({ ruc });

        if (userDni || userRuc) {
            return resp.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

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
            dni: dni,
            ruc: ruc,
            nroCelular: nroCelular,
            direccion: direccion,
            departamento: departamento,
            ciudad: ciudad,
            distrito: distrito
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

        const dbUsuario = await Usuario.findOne({ email });

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