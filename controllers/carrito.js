const { response } = require('express')
const Carrito = require('../models/Carrito');
const Item = require('../models/Item');

const crearCarrito = async (req, resp = response) => {

    const {cliente} = req.body;

    try {

        const query = Carrito.where({cliente : cliente});
        const userCarrito = await query.findOne().sort({ createdAt: 'desc' })


        if(!userCarrito){

            const dbCarrito1 = new Carrito(req.body);

            dbCarrito1.estado = true

            await dbCarrito1.save();

            return resp.status(200).json({
                ok: true,
                msg: 'Carrito creado - New',
                id: dbCarrito1._id
            })

        } else if(userCarrito && userCarrito.estado == false){

            const dbCarrito2 = new Carrito(req.body);

            dbCarrito2.estado = true

            await dbCarrito2.save();

            return resp.status(200).json({
                ok: true,
                msg: 'Carrito creado OP1',
                id: dbCarrito2._id
            })
        } else if(userCarrito && userCarrito.estado == true){

            return resp.status(200).json({
                ok: true,
                msg: 'Ya hay un Carrito creado - True',
                id: userCarrito._id
            })

        }else {

            return resp.status(200).json({
                ok: true,
                msg: 'Ya hay un Carrito creado - F',
                id: userCarrito._id
            })
        }

        //----------------------------------------------------------
        // if ( userCarrito.estado == false) {

        //     const dbCarrito = new Carrito(req.body);

        //     dbCarrito.estado = true

        //     await dbCarrito.save();

        //     return resp.status(200).json({
        //         ok: true,
        //         msg: 'Carrito creado OP1',
        //         id: dbCarrito._id
        //     })

        // } else if (userCarrito.estado == true) {

        //     return resp.status(200).json({
        //         ok: true,
        //         msg: 'Ya hay un Carrito creado - True',
        //         id: userCarrito._id
        //     })

        // } else if (!userCarrito) {

        //     const dbCarrito = new Carrito(req.body);

        //     dbCarrito.estado = true

        //     await dbCarrito.save();

        //     return resp.status(200).json({
        //         ok: true,
        //         msg: 'Carrito creado OP2',
        //         id: dbCarrito._id
        //     })
        // } else {

        //     return resp.status(200).json({
        //         ok: true,
        //         msg: 'Ya hay un Carrito creado - F',
        //         id: userCarrito._id
        //     })
        // }


    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })

    }

}

const getCarrito = async (req, resp = response) => {

    const id = req.params.id

    var sum = 0;

    try {

        const dbCarrito = await Carrito.findById(id)
            .populate({
                path: 'items',
                populate: [
                    {
                        path: 'productoId'
                    }
                ]
            })
            .exec();

        if (!dbCarrito) {
            return resp.status(500).json({
                ok: false,
                msg: 'No hay Carrito'
            })
        }

        dbCarrito.items.forEach(e => {
            const add = e.total;
            sum = sum + add;
        });

       // dbCarrito.subTotal = sum;

        await Carrito.findByIdAndUpdate(
            id,
            {
                $set : { subTotal : sum}
            }
        )

        const dbCarrito2 = await Carrito.findById(id)
            .populate({
                path: 'items',
                populate: [
                    {
                        path: 'productoId'
                    }
                ]
            })
            .exec();

        return resp.status(200).json(dbCarrito2)


    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const getCarritoFlutter = async (req, resp = response) => {

    const id = req.params.id

    var sum = 0;

    try {

        const dbCarrito = await Carrito.findById(id)
            .populate({
                path: 'items',
                populate: [
                    {
                        path: 'productoId'
                    }
                ]
            })
            .exec();

        if (!dbCarrito) {
            return resp.status(500).json({
                ok: false,
                msg: 'No hay Carrito'
            })
        }

        dbCarrito.items.forEach(e => {
            const add = e.total;
            sum = sum + add;
        });

       // dbCarrito.subTotal = sum;

        await Carrito.findByIdAndUpdate(
            id,
            {
                $set : { subTotal : sum}
            }
        )

        const dbCarrito2 = await Carrito.findById(id)
            .populate({
                path: 'items',
                populate: [
                    {
                        path: 'productoId'
                    }
                ]
            })
            .exec();

        return resp.status(200).json({
            data: [dbCarrito2]
        })


    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }

}

const removeProducto = async (req, resp = response) => {

    // const id = req.header('x-id');
    const id = req.params.id
    const itemCart = req.body;
    var sum = 0;

    try {

        const carrito = await Carrito.findById(id)

        if (!carrito) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el Carrito'
            })
        }

        carrito.items.forEach(e => {
            const add = e.total;
            sum = sum + add;
        });

        await Carrito.findByIdAndUpdate(
            id,
            {
                $pull: { items: itemCart.items },
            },
        );

        await Item.findByIdAndDelete(itemCart.items)

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

const updateCantidad = async (req, resp = response) => {

    const id = req.params.id
    const body = req.body;
    var sum = 0;

    try {

        const dbItem = await Item.findById(id)

        if (!dbItem) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe Item en el Carrito'
            })
        }


        dbItem.total = body.cantidad * dbItem.precio;

        await Item.findByIdAndUpdate(
            id,
            {
                $set: { cantidad: body.cantidad,
                        total: dbItem.total 
                      }
            }
        )

        const dbCarrito = await Carrito.findById(body.idCarrito)
            .populate({
                path: 'items'
            }).exec()

        dbCarrito.items.forEach(e => {
            const add = e.total;
            sum = sum + add;
        });

        await Carrito.findByIdAndUpdate(
            body.idCarrito,
            {
                $set: { subTotal: sum }
            }
        )

        return resp.status(200).json({
            ok: true,
            msg: 'Se modifico cantidad',
        })


    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }



}

const updateStateCarrito = async (req, resp = response) => {

    const id = req.params.id

    try {

        const carrito = await Carrito.findById(id)

        if (!carrito) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el Carrito'
            })
        }

        await carrito.updateOne({
            estado: false
        })

        return resp.status(200).json({
            ok: true,
            msg: 'Se modifico Carrito',
        })
        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const getCarritosUser = async (req, resp = response) => {

    const idUser = req.params.id
    var sum = 0;

    try {

        const query = Carrito.where({cliente: idUser, estado: false})
        const dbCarrito = await query.find().populate({
            path: 'items',
            populate: {
                path: 'productoId',
            }
        }).populate('cliente')


        if(!dbCarrito){
            return resp.status(400).json({
                ok: false,
                msg: 'No hay Carritos',
            })
        }

        return resp.status(200).json(dbCarrito)
        
    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const getAll = async (req, resp = response) => {
    const carritos = await Carrito.find();
    resp.json(carritos)
}

module.exports = {
    crearCarrito,
    getCarrito,
    removeProducto,
    getAll,
    updateCantidad,
    updateStateCarrito,
    getCarritosUser,
    getCarritoFlutter
}