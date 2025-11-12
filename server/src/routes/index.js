const express = require('express');
const authRoutes = require('./v1/authRoutes')
const productRoutes = require('./v1/productRoutes')
const categoryRoutes = require('./v1/categoryRoutes') // Importe as rotas de categoria

const router = express.Router()

router.use('/v1/auth', authRoutes)
router.use('/v1/products', productRoutes)
router.use('/v1/categories', categoryRoutes) // Use as rotas de categoria

module.exports = router;
