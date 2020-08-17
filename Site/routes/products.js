const express = require('express');
const router = express.Router();

const controller = require('../controllers/productsController');

router.get('/', controller.index);
router.get('/:id', controller.detail);
router.get('/create', controller.store)
router.get('/:id/edit', controller.edit)
router.get('/cart', controller.cart);

module.exports = router;