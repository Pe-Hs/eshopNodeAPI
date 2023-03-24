const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

const app = express();

dbConnection();

app.use(express.static('public'));

app.use( cors() );

app.use( express.json() );


app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/producto', require('./routes/producto') );
app.use( '/api/cart', require('./routes/carrito') );
app.use( '/api/users', require('./routes/usuario') );


app.listen(process.env.PORT , () =>{
    console.log(`Server running at port : ${process.env.PORT }`)
});