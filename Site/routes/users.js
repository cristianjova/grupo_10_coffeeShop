const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/register', controller.register);
// Procesamiento del formulario de creación
router.post('/register', controller.store);

module.exports = router;