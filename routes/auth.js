const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//CREAR USUAROI
router.post('/new', [
    check('email','El email es Obligatorio').isEmail(),
    check('password','La contraseña es Obligatoria').isLength({min: 6}),
    validarCampos
],crearUsuario)

// INICIAR SESION
router.post('/',[
    check('email', 'El email es Obligatorio').not().isEmpty(),
    check('password', 'La contraseña es Obligatorio').isLength({min: 6}),
    validarCampos
], loginUsuario)

//VALIDAR Y REVALIDAR TOKEN
router.get('/renew', validarJWT ,revalidarToken )


module.exports = router;