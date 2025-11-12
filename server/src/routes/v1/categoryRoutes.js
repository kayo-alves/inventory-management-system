const express = require('express');
const CategoryController = require('../../controllers/categoryController');
const { authenticateToken } = require('../../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, CategoryController.getAll);

module.exports = router;
