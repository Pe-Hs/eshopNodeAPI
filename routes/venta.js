const { Router } = require('express');
const { updateStatus, reporteVentasRango, getAll, crearVentaProducto} = require('../controllers/ventas')
const router = Router();

router.post('/registroVenta', crearVentaProducto)

router.put('/updateEstado/:id', updateStatus)

router.get('/getAll', getAll)
router.get('/reporteVentas/:id/:id2' , reporteVentasRango)


module.exports = router;