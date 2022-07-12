const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const adminRoutes = require('./admin.route')
const movieRoutes = require('./movie.route')

// ...

router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)
router.use('/movie', movieRoutes)


module.exports = router