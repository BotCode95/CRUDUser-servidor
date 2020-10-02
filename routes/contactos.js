const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController')
const auth = require('../middleware/auth');
const { check} = require('express-validator');


//api/contactos

router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail()
    ],
    contactoController.crearContacto
)

router.get('/',
    auth,
    contactoController.obtenerContacto
)


router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').not().isEmpty()
    ],
    contactoController.actualizarContacto
)

router.delete('/:id',
    auth,
    contactoController.eliminarContacto
)

module.exports = router;