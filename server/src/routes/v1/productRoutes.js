const express = require ('express')
const ProductController = require ('../../controllers/productController')
const { authenticateToken } = require('../../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, ProductController.getAll)

module.exports = router