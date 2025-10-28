const express = require('express');
const authRoutes = require('./v1/authRoutes')
const productRoutes = require('./v1/productRoutes')

const router = express.Router()

router.use('/v1/auth', authRoutes)
router.use('/v1/products', productRoutes)

module.exports = router;
