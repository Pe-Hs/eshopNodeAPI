
const { check } = require('express-validator');
const { crearProducto, añadirProductoCarrito, getAll, updateProducto } = require('../controllers/productoC');
const { Router } = require('express');

const router = Router();

router.post('/add', crearProducto)
router.put('/addcart/:id', añadirProductoCarrito)
router.put('/edit/:id', updateProducto)

router.get('/', getAll)

module.exports = router;