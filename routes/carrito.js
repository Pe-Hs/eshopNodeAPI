const {Router} = require('express');
const { check } = require('express-validator');
const { updateStateCarrito, getAll, crearCarrito, getCarrito, removeProducto, updateCantidad } = require('../controllers/carrito');

const router = Router();

router.post('/newCart', crearCarrito)

router.put('/delcart/:id', removeProducto)
router.put('/upCant/:id', updateCantidad)
router.put('/upState/:id', updateStateCarrito)

router.get('/getall', getAll)
router.get('/getcart/:id', getCarrito)


module.exports = router;