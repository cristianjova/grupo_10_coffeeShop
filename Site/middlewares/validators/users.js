const { check } = require('express-validator');
const { user, category } = require('../../database/models');

module.exports = {
    loginForm: [
        check('email')
            .notEmpty().withMessage('Debés completar el campo email').bail()
            .isEmail().withMessage('Debés completar un email válido'),
        check('password')
            .notEmpty().withMessage('Debés completar el campo de contraseña').bail()
    ],
    register: [

        check('first_name').trim()
            .notEmpty().withMessage('Debés completar el campo nombre').bail()
            .isLength({ min : 2}).withMessage('el nombre debe tener por lo menos 2 caracters'),
        
        check('last_name').trim()
            .notEmpty().withMessage('Debés completar el campo apellido').bail()
            .isLength({ min : 2}).withMessage('el apellido debe tener por lo menos 2 caracters'),

        check('email_register').trim()
            .notEmpty().withMessage('Debés completar el campo correo').bail()
            .isEmail().withMessage('Debe ingregar un mail válido.').bail()
            .custom(async value => { // Comprueba si ese mail ya está en uso en BD
                let result = await user.findOne({ where : { email : value } });
                // Al ser la función de comprobación asincrónica, la validación tiene que responder con promesas
                // https://stackoverflow.com/questions/53693650/express-validation-custom-async-checking
                if(result !== null){
                    return Promise.reject();
                } else {
                    return Promise.resolve();
                }
            }).withMessage('Ese correo ya está registrado.'),
        
        check('password_register')
            .notEmpty().withMessage('Debés completar el campo contraseña').bail()
            .isLength({ min : 8}).withMessage('Debe contener mas de 8 caracteres').bail()
            .custom(value => {
                // Chequeo de caracteres por medio de expresiones regulares
                // https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions
                let upper = new RegExp('[A-Z]');
                let lower = new RegExp('[a-z]');
                let number = new RegExp('[0-9]');
                return upper.test(value) && lower.test(value) && number.test(value);

            }).withMessage('Debe contener al menos una minúscula, una mayúscula y un número'),

        check('adress').trim()
            .notEmpty().withMessage('Debés completar el campo direccion').bail()
            .isLength({ min : 2}).withMessage('la direccion debe tener por lo menos 2 caracters'),
        
        check('phone_number').trim()
            .notEmpty().withMessage('Debés completar el campo telefono').bail()
            .isLength({ min : 2}).withMessage('la direccion debe tener por lo menos 2 caracters'),    
    ],
    edit: [

        check('first_name').trim()
            .notEmpty().withMessage('Debés completar el campo nombre').bail()
            .isLength({ min : 2}).withMessage('el nombre debe tener por lo menos 2 caracters'),
        
        check('last_name').trim()
            .notEmpty().withMessage('Debés completar el campo apellido').bail()
            .isLength({ min : 2}).withMessage('el apellido debe tener por lo menos 2 caracters'),

        check('adress').trim()
            .notEmpty().withMessage('Debés completar el campo direccion').bail()
            .isLength({ min : 2}).withMessage('la direccion debe tener por lo menos 2 caracters'),
        
        check('phone_number').trim()
            .notEmpty().withMessage('Debés completar el campo telefono').bail()
            .isLength({ min : 2}).withMessage('la direccion debe tener por lo menos 2 caracters'),    
    ],
};