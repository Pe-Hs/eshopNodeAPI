const  mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config();

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('DB Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar DB');
    }
}

module.exports = {
    dbConnection
}