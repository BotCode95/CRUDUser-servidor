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
exports.obtenerUsuarios = async (req, res) => {
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

exports.actualizarUsuario  = async (req,res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const nuevoUsuario = {};

    const {nombre, apellido, telefono, ciudad, email} = req.body;

    
    if(nombre) {
        nuevoUsuario.nombre= nombre;
    }
    
    if(apellido) {
        nuevoUsuario.apellido= apellido;
    }
    
    if(telefono) {
        nuevoUsuario.telefono= telefono;
    }
    
    if(ciudad) {
        nuevoUsuario.ciudad= ciudad;
    }
    
    if(email) {
        nuevoUsuario.email= email;
    }

    try {
        let usuario = await Usuario.findById(req.params.id);

        if(!usuario){
            return res.status(400).json({msg: 'Usuario no encontrado'})
        }

        usuario = await Usuario.findOneAndUpdate({_id : req.params.id}, nuevoUsuario, {new: true})
        res.json({usuario})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

exports.eliminarUsuario = async (req,res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);
        if(!usuario){
            return res.status(400).json({msg: 'Usuario no encontrado'})
        }

        // const existeUsuario = await Usuario.findById(usuario);

        //eliminar 
        await Usuario.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Usuario Eliminado'})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}