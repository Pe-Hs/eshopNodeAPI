const { Router } = require('express');
const {añadirFavoritos, getAll, removeFavoritos} = require('../controllers/favorito')
const router = Router();

router.put('/addFavorito/:id', añadirFavoritos)
router.put('/delFav/:id', removeFavoritos)

router.get('/getAll', getAll)

module.exports = router;