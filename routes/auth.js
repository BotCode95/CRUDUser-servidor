//rutas para autenticar usuario
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')

//login
//api/auth
router.post('/',
    // [
    //     check('email', 'Agregar un email válido').isEmail(),
    //     check('password', 'El password debe contener minimo 6 caracteres').isLength({min:6})
    // ],
authController.autenticarUsuario
);

//obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports= router;

