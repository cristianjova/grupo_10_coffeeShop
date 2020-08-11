const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/register', controller.register);
// Procesamiento del formulario de creación
router.post('/register', controller.store);

router.get('/login', controller.login);
// Procesamiento del formulario de creación
router.post('/login', controller.store);

module.exports = router;