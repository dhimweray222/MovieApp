const express = require('express')
const router = express.Router()
const {authentication} = require('../../helpers/middlewares.helper')
const WishlistController = require('../../controllers/app/wishlist.controller')

router.post('/',
authentication,
WishlistController.add
)
module.exports = router