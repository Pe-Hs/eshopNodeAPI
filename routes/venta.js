const { Router } = require('express');
const {getAll, crearVentaProducto} = require('../controllers/ventas')
const router = Router();

router.post('/registroVenta', crearVentaProducto)

router.get('/getAll', getAll)


module.exports = router;