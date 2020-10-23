const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validate = require('../middlewares/validators/users');
const guestRoute = require('../middlewares/guestRoute');
const userRoute = require('../middlewares/userRoute')
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
router.post('/register', upload.single('image') , validate.register , controller.store);

router.get('/login', guestRoute, controller.login);
router.post('/login', validate.loginForm, controller.authenticate);
router.get('/logout', controller.logout);

router.get('/list', userRoute ,controller.list);
router.get('/:id', controller.show);
router.get('/:id/edit', userRoute, controller.edit);
router.put('/:id', upload.single('image'), validate.edit, controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;