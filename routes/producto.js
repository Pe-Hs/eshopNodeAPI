
const { check } = require('express-validator');
const { crearProducto, añadirProductoCarrito, getAll } = require('../controllers/productoC');
const { Router } = require('express');

const router = Router();

router.post('/add', crearProducto)
router.put('/addcart/:id', añadirProductoCarrito)

router.get('/', getAll)

module.exports = router;