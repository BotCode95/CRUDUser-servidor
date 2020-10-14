const Contacto = require('../models/Contacto');
const {validationResult} = require('express-validator');

exports.crearContacto = async (req,res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try {
        const contacto = new Contacto(req.body);

        contacto.creador = req.usuario.id;

        contacto.save();
        res.json(contacto)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerContacto = async (req,res) => {
    try {
        const contactos = await Contacto.find({creador: req.usuario.id});
        res.json({contactos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');   
    }
}

exports.actualizarContacto = async (req,res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

   
    const nuevoContacto = {};
            //extraer de contacto
            const {nombre, apellido, telefono, ciudad, email} = req.body;
       

            if(nombre) {
                nuevoContacto.nombre= nombre;
            }
            
            if(apellido) {
                nuevoContacto.apellido= apellido;
            }
            
            if(telefono) {
                nuevoContacto.telefono= telefono;
            }
            
            if(ciudad) {
                nuevoContacto.ciudad= ciudad;
            }
            
            if(email) {
                nuevoContacto.email= email;
            }

    try {

    

        let contacto = await Contacto.findById(req.params.id);
        //si el contacto existe o no 
        if(!contacto){
            return res.status(400).json({msg: 'Contacto no encontrado'});
        }
        //verificar el creador del proyecto
        if(contacto.creador.toString() !== req.usuario.id){
            return res.status(400).json({msg: 'No autorizado'})
        }

        //update
        contacto = await Contacto.findOneAndUpdate({_id : req.params.id},  nuevoContacto, {new: true});
        

        res.json({contacto})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }


}

exports.eliminarContacto = async (req,res) => {
    try {
        let contacto = await Contacto.findById(req.params.id);
        if(!contacto){
            return res.status(400).json({msg: 'Contacto no encontrado'})
        }

        const existeContacto = await Contacto.findById(contacto);
        //verificar el creador
        if(existeContacto.creador.toString() !== req.usuario.id){
            return res.status(400).json({msg: 'No autorizado'})
        }

        //eliminar
        await Contacto.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Contacto Eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}