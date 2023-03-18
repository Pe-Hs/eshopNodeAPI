
const {response} = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, resp = response) => {

    const {usuario, email , password, rol} = req.body;

    try {
        
        // VERIFICAR EMAIL o USER
        let user = await Usuario.findOne({ usuario });

        let correo = await Usuario.findOne({ email });

        if( user ){
            return resp.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        if( correo ){
            return resp.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }

        // CREAR USUARIO
        const dbUsuario = new Usuario(req.body);

        //HASHEAR PASSWORD
        const salt = bcrypt.genSaltSync(10);
        dbUsuario.password = bcrypt.hashSync( password , salt);

        //GENERAR JWT
        const token = await generarJWT(dbUsuario.id, usuario);


        //AÑADIR A LA BD
        await dbUsuario.save();
       
        //MOSTRAR JSON
        return resp.status(200).json({
            ok: true,
            uid: dbUsuario.id,
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

    const {usuario , password} = req.body;

    try {

        const dbUsuario = await Usuario.findOne({ usuario });

        if( !dbUsuario ){
            return resp.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }

        //CONFIRMAR PASSWORD
        const validPassword = bcrypt.compareSync(password, dbUsuario.password );

        if(!validPassword){
            return resp.status(400).json({
                ok: false,
                msg: 'El password no es Valido'
            })
        }

        //GENERAR TOKEN
        const token = await generarJWT(dbUsuario.id, dbUsuario.usuario);

        //RESPUESTA SERVICIO
        return resp.json({
            ok: true,
            uid: dbUsuario.id,
            usuario: dbUsuario.usuario,
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

    const {uid, email, usuario} = req;

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