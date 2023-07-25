const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

const app = express();

dbConnection();

app.use(express.static('public'));

app.use( cors() );

app.use( express.json() );


app.use( '/api/auth',        require('./routes/auth') );
app.use( '/api/producto',    require('./routes/producto') );
app.use( '/api/cart',        require('./routes/carrito') );
app.use( '/api/users',       require('./routes/usuario') );
app.use( '/api/venta' ,      require('./routes/venta'));
app.use( '/api/compra' ,     require('./routes/compra'));
app.use( '/api/proveedor' ,  require('./routes/provedor'));
app.use( '/api/insumo' ,     require('./routes/insumo'));
app.use( '/api/stats' ,      require('./routes/estadistica'));
app.use( '/api/fav' ,        require('./routes/favoritos'));

app.use( '/public', express.static(`${__dirname}/storage/img`))
app.use( '/public', express.static(`${__dirname}/storage/boletaCompras`))
app.use( '/public', express.static(`${__dirname}/storage/avatar`))

app.listen(process.env.PORT , () =>{
    console.log(`Server running at port : ${process.env.PORT }`)
});