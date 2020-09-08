const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validate = require('../middlewares/validators/users');
const guestRoute = require('../middlewares/guestRoute')
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

router.get('/register', guestRoute, controller.register);
// Procesamiento del formulario de creación
router.post('/register', upload.single('image'), controller.store);

router.get('/login', guestRoute, controller.login);
// Procesamiento del formulario de login
router.post('/login', validate.loginForm, controller.authenticate);

router.get('/logout', controller.logout);

module.exports = router;