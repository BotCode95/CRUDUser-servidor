//rutas
const express= require('express');
const router= express.Router();
const usuarioController = require('../controllers/usuarioController')
const {check} = require('express-validator');
const auth = require('../middleware/auth');
//crear usuario
// api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password minimo debe contener 6 caracteres').isLength({min: 6})
    ],
    usuarioController.crearUsuario
);

router.get('/',
    auth,
    usuarioController.obtenerUsuarios
)

router.put('/:id',
    auth,
    usuarioController.actualizarUsuario
)

router.delete('/:id',
    auth,
    usuarioController.eliminarUsuario
)

module.exports = router;