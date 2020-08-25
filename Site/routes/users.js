const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/img/users'));
    },
    filename: (req, file, cb) => {
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/register', controller.register);
// Procesamiento del formulario de creación
router.post('/register', upload.single('image'), controller.store);

router.get('/login', controller.login);
// Procesamiento del formulario de creación
router.post('/login', controller.store);

module.exports = router;