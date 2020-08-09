const router = require('express').Router();
const controller = require('../controllers/staticController');

//Vista de "nosotros"
router.get('/aboutus', controller.us);
//acceder al formulario de contacto
router.get('/contact', controller.contact);
//procesar el formulario de contacto
router.post('/contact', controller.contact);

module.exports = router;