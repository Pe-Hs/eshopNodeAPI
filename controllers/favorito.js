const { response } = require('express')
const Favoritos = require('../models/Favoritos');

const añadirFavoritos = async (req, resp = response) => {

    const id = req.params.id

    const item = req.body;

    try {

        const query = Favoritos.where({cliente : id})
        const favCons = await query.findOne() .populate({
            path: 'productos'
        }).exec()
        
        if(!item.productos || "" || undefined){
            return resp.status(200).json({
                ok: true,
                msg: 'Ingrese un Producto',
                data : favCons
            })
        }

        if(!favCons){

            const dbFavorito  = new Favoritos();

            dbFavorito.cliente = id
    
            await dbFavorito.save()
    
            const prodid = item.productos
    
    
            await Favoritos.findByIdAndUpdate(
                dbFavorito._id,
                {
                    $push: { productos: prodid },
                }
            )

            const favResp = await Favoritos.findById(favCons._id)
            .populate({
                path: 'productos'
            }).exec()
    
            return resp.status(200).json({
                ok: true,
                msg: 'Se agrego al Carrito',
                data: favResp
            })

           
        }

        var prodid = item.productos

        const dbProd = await Favoritos.findOne({'productos' : prodid})

        if(dbProd){
            return resp.status(400).json({
                ok: false,
                msg: 'Ya hay un Producto con ese Id',
                data: favCons
            })
        }

        await Favoritos.findByIdAndUpdate(
            favCons._id,
            {
                $push: { productos: prodid },
            }
        )

        const favResp = await Favoritos.findById(favCons._id)
            .populate({
                path: 'productos'
            }).exec()

        return resp.status(200).json({
            ok: false,
            msg: 'Producto agreado',
            data: favResp,
        })

       

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const getAll = async (req, resp = response) => {

    try {

        const fav = await Favoritos.find();
        resp.json(fav)

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const removeFavoritos = async (req, resp = response) => {

    const id = req.params.id
    const itemFav = req.body;


    try {

        const query = Favoritos.where({cliente : id})
        const favCons = await query.findOne() .populate({
            path: 'productos'
        }).exec()

         if(!itemFav.productos || "" || undefined){
            return resp.status(400).json({
                ok: true,
                msg: 'Ingrese un Producto',
                data : favCons
            })
        }


        await Favoritos.findByIdAndUpdate(
            favCons._id,
            {
                $pull: { productos: itemFav.productos },
            },
        );

        return resp.status(200).json({
            ok: true,
            msg: 'Se removio al Carrito',
        })

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

module.exports = {
    añadirFavoritos,
    getAll,
    removeFavoritos
}