
const { check } = require('express-validator');
const { crearProducto, añadirProductoCarrito, getAll, updateProducto, getProductobyId } = require('../controllers/productoC');
const { Router } = require('express');

const router = Router();
const upload = require('../libs/storage')

router.post('/add', upload.single('image') ,crearProducto)
router.put('/addcart/:id', añadirProductoCarrito)
router.put('/edit/:id', upload.single('image'), updateProducto)

router.get('/getProducto/:id', getProductobyId)
router.get('/', getAll)

module.exports = router;