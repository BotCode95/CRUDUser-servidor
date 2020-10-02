const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const { email, password} = req.body;
    try {
        
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }
        //crear el nuevo usuario
        usuario = new Usuario(req.body);

        //hashear password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //jwt signature
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            //mensaje de confirmacion
            res.json({token});
        })
    
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

//obtiene todos los usuarios
exports.mostrarUsuarios = async (req, res) => {
    try{
        // console.log(req.usuario);
        // const {usuario} = req.query;
        const usuarios = await Usuario.find();
        //.find({creador: req.usuario.id});
        res.json({usuarios});
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error')
    }
   
}