const express = require('express')
const router = express.Router()
const appRoutes = require('./app/index.route')
const cmsRoutes = require('./cms/index.route')
// ...

router.use('/app', appRoutes)
router.use('/cms', cmsRoutes)

module.exports = router