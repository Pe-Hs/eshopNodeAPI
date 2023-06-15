const { Router } = require('express');
const {getStockMinInsumo, getInsumobyName, crearInsumo, getAll, updateStockInsumo} = require('../controllers/insumo')
const router = Router();

router.post('/registroInsumo', crearInsumo)

router.get('/getInsumos', getAll)
router.get('/getIsumo/:name', getInsumobyName)
router.get('/getMinStockIsumo/:min', getStockMinInsumo)

router.put('/editInsumo/:id', updateStockInsumo)

module.exports = router;