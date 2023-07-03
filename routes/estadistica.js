const { Router } = require('express');
const { reporteVentasHoy} = require('../controllers/ventas')
const { reporteComprasHoy }  = require('../controllers/compras')
const router = Router();

router.get('/ventasHoy', reporteVentasHoy)
router.get('/comprasHoy', reporteComprasHoy)
//router.get('/comprasHoy/:id', updateStockInsumo)

module.exports = router;