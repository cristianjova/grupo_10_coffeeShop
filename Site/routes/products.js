const express = require('express');
const router = express.Router();
const userRoute = require('../middlewares/userRoute')
const controller = require('../controllers/productsController');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img'),
    filename: (req, file, callback) => {
        let nameProduct = req.body.name.split(' ').join('-').toLowerCase()
        callback(null, nameProduct + '-' + Date.now() + path.extname(file.originalname)) 
    }
});

const upload = multer({ storage });

router.get('/', controller.index);
router.get('/cart', controller.cart);
router.get('/create', userRoute, controller.create)
router.post('/', userRoute, upload.single('image'),controller.store);
router.get('/:id', controller.detail);
router.get('/:id/edit', userRoute, controller.edit);
router.put('/:id', userRoute, upload.single('image'), controller.update);

module.exports = router;