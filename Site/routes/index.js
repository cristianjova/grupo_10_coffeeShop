const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');


router.get('/', controller.index);
//Vista de "nosotros"
router.get('/aboutus', controller.about);
//acceder al formulario de contacto
router.get('/contact', controller.contact);
//procesar el formulario de contacto
router.post('/contact', controller.contact);

module.exports = router;