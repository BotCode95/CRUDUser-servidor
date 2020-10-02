const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req,res) => {

    //check if errors
    const errores = validationResult(req);
    if( !errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //extract emial and password
    const {email, password} = req.body;

    try{
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //check password
        const passCorrecto = await bcryptjs.compare(password, usuario.password); 
        //compara el password ingresado con el que esta en la DB
        if(!passCorrecto){ //si no es correcto
            return res.status(400).json({msg: 'Password incorrecto'});
        }

           //create and signature jwt
           const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //signature for get token from jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            //msj confirm
            res.json({token});
        })

    }catch(error){
        console.log(error);
    }
}


//obtiene que el usuario esta autenticado
exports.usuarioAutenticado = async (req,res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}
