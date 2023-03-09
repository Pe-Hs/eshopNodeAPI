const jwt = require('jsonwebtoken');


const generarJWT = (uid, usuario) => {
    
    const payload = {uid, usuario}

    return new Promise( (resolve, reject ) => {

        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(token)
            }
        })
    })

}

module.exports = {
    generarJWT
}