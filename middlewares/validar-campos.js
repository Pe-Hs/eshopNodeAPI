const {response} = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, resp = response, next) =>{ 

    const error = validationResult(req);

    if( !error.isEmpty()){
        return resp.status(404).json({
            ok:"false",
            errors: error.mapped()
        })
    }

    next();

}

module.exports = {
    validarCampos
}