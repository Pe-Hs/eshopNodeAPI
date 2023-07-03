const {Router} = require('express');
const { check } = require('express-validator');
const { getCarritosUser, updateStateCarrito, getAll, crearCarrito, getCarrito, removeProducto, updateCantidad } = require('../controllers/carrito');

const router = Router();

router.post('/newCart', crearCarrito)

router.put('/delcart/:id', removeProducto)
router.put('/upCant/:id', updateCantidad)
router.put('/upState/:id', updateStateCarrito)

router.get('/getall', getAll)
router.get('/getcart/:id', getCarrito)
router.get('/getCarritosUser/:id', getCarritosUser)


module.exports = router;