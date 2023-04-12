const {Router} = require('express');
const { check } = require('express-validator');
const { getAll, crearCarrito, getCarrito, removeProducto, updateCantidad } = require('../controllers/carrito');

const router = Router();

router.post('/newCart', crearCarrito)
router.get('/getcart/:id', getCarrito)
router.put('/delcart/:id', removeProducto)
router.put('/upCant/:id', updateCantidad)
router.get('/getall', getAll)

module.exports = router;