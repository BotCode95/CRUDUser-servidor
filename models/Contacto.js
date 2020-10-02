const mongoose = require('mongoose')

const ContactoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: false
    },
    ciudad: {
        type: String,
        required: false 
    },    
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Contacto', ContactoSchema);