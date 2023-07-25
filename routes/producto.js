
const { check } = require('express-validator');
const { getLowPrices, getStockMinProducto, crearProducto, añadirProductoCarrito, getAll, updateProducto, getProductobyId, getProductosbyCategoria } = require('../controllers/productoC');
const { Router } = require('express');

const router = Router();
const {upload} = require('../libs/storage')

router.post('/add', upload.single('image') ,crearProducto)
router.put('/addcart/:id', añadirProductoCarrito)
router.put('/edit/:id', upload.single('image'), updateProducto)

router.get('/getProducto/:id', getProductobyId)
router.get('/getCategoria/:categoria', getProductosbyCategoria)
router.get('/getMinStockProdcuto/:min', getStockMinProducto)
router.get('/getLow', getLowPrices)

router.get('/', getAll)

module.exports = router;