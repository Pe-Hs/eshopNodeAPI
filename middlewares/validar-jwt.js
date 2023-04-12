const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, resp = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return resp.status(401).json({
            ok: false,
            msg: 'Error Token'
        })
    }   

    try {

        const {uid, email } = jwt.verify(token, process.env.SECRET_JWT);

        req.uid = uid;
        req.email = email;
         
    } catch (error) {

        return resp.status(401).json({
            ok: false,
            msg: 'error en el token'
        })

    }

    //TODO OK!
    next();

}

module.exports = {
    validarJWT
}