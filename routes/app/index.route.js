const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const wishlistRoutes = require('./wishlist.route')
const userRoutes = require('./user.route')

// ...

router.use('/auth', authRoutes)
router.use('/wishlist', wishlistRoutes)
router.use('/user', userRoutes)

module.exports = router