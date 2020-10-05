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
router.post('/register', upload.single('image'), controller.store);

router.get('/login', guestRoute, controller.login);
router.post('/login', validate.loginForm, controller.authenticate);
router.get('/logout', controller.logout);

router.get('/list', controller.list);
router.get('/search', controller.search)
router.get('/:id', controller.show);
router.get('/:id/edit', controller.edit);
router.put('/:id', upload.single('image'), controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;