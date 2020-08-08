const express = require('express');
const router = express.Router();

const controller = require('../controllers/productsController');

router.get('/detail', controller.detail);

router.get('/cart', controller.cart);

module.exports = router;