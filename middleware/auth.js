const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    //leer el token del header -> with email and password post in api/listado 
    //pass in header x-auth-token and token for generate the token in consola
    const token = req.header('x-auth-token')

    // console.log(token);
    //revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay TOKEN, permiso no válido'});
    }


    //validar el token
    try{
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next(); //primero pasa por el middle auth y luego por proyecto

    }catch(error){
        res.status(401).json({msg: 'Token no válido'});
    }
}