const { check } = require('express-validator');

module.exports = {
    loginForm: [
        check: ('email')
            .notEmpty().withMessage('Debés completar el campo email').bail()
            isEmail().withMessage('Debés completar un email válido'),

        check: ('password')
            .notEmpty().withMessage('Debés completar el campo de contraseña').bail()
    ]
};