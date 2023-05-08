const { check } = require('express-validator');
const { getUsuarios, updateUsuarioCliente, getUsuario } = require('../controllers/users');
const { Router } = require('express');

const router = Router();

router.get('/getAll', getUsuarios);
router.put('/editUser/:id', updateUsuarioCliente)
router.get('/getUser/:id', getUsuario)


module.exports = router;