const { Router } = require('express');
const {crearProveedor, getAll} = require('../controllers/proveedores')
const router = Router();

router.post('/registroProveedor', crearProveedor)
router.get('/getProveedores', getAll)


module.exports = router;