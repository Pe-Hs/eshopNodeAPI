const { check } = require('express-validator');
const { getUsuarios, updateUsuario } = require('../controllers/users');
const { Router } = require('express');

const router = Router();

router.get('/getAll', getUsuarios);
router.put('/editUser/:id', updateUsuario)


module.exports = router;