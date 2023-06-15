const { Router } = require('express');
const {deleteItemCompraInOrden, deleteItemCompra, findItemsinOrden, getAll, crearOrdenCompra, deleteCompraById, getOrdenCompraId, addItemCompra, updateOrdenCompra} = require('../controllers/compras')
const router = Router();
const {upload2} = require('../libs/storage')

router.post('/registroCompra', upload2.single('image') ,crearOrdenCompra)

router.put('/addItemCompra/:id', addItemCompra)
router.put('/putCompra/:id', upload2.single('image'), updateOrdenCompra)

router.get('/getCompra/:id', getOrdenCompraId)
router.get('/getAll', getAll)
router.get('/getIsumosOrden/:id', findItemsinOrden)

router.delete('/delCompra/:id', deleteCompraById)
router.delete('/delItemCompra/:id', deleteItemCompra)
router.put('/delItemCompraInOrden/:id', deleteItemCompraInOrden)


module.exports = router;