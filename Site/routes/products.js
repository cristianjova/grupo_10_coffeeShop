const express = require('express');
const router = express.Router();

const controller = require('../controllers/productsController');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img'),
    filename: (req, file, callback) => {
        callback(null, 'group-' + Date.now() + path.extname(file.originalname)) 
    }
});

const upload = multer({ storage });

router.get('/', controller.index);
router.get('/cart', controller.cart);
router.get('/create', controller.create)
router.post('/', controller.store);
router.get('/:id', controller.detail);
router.get('/:id/edit', controller.edit);
router.put('/:id', upload.single('image'), controller.update);

module.exports = router;