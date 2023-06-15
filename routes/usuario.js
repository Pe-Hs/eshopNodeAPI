const { check } = require('express-validator');
const { getUsuarios, updateUsuarioCliente, getUsuario } = require('../controllers/users');
const { Router } = require('express');
const {upload3} = require('../libs/storage')

const router = Router();

router.get('/getAll', getUsuarios);
router.put('/editUser/:id', upload3.single('image') , updateUsuarioCliente)
router.get('/getUser/:id', getUsuario)


module.exports = router;