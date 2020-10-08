const path = require('path');
const { check } = require("express-validator");

module.exports = {
  createProduct: [
    check('name')
        .notEmpty().withMessage('Debes completar el campo nombre').bail()
        .isLength({ min: 5 }).withMessage('El campo nombre debe tener al menos 5 caracteres').bail(),
    check('price')
        .notEmpty().withMessage('Debes completar el campo precio').bail()
        .isNumeric().withMessage('Solo se permiten números'),
    check('description')
        .notEmpty().withMessage('Debes completar el campo descripción').bail()
        .isLength({ min: 20 }).withMessage('El campo descripción debe tener al menos 20 caracteres'),
    check('image')
        .custom((value, { req })=> {
           if(req.file) {
            const ext = req.file.mimetype.split('/')[1];
            console.log(['jpg', 'jpeg', 'png', 'gif'].includes(ext));
            return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
           }
           return true;
        }).withMessage('La imagén debe tener uno de los siguientes formatos (JPG, JPEG, PNG, GIF).')
  ]
};