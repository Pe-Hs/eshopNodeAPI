const {Router} = require('express');
const { check } = require('express-validator');
const { getAll, crearCarrito, getCarrito, removeProducto } = require('../controllers/carrito');

const router = Router();

router.post('/newCart', crearCarrito)
router.get('/getcart', getCarrito)
router.put('/delcart/:id', removeProducto)
router.get('/getall', getAll)

module.exports = router;