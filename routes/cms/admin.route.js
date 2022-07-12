const express = require('express')
const router = express.Router()
const AdminController = require('../../controllers/cms/admin.controller')
const { authenticateAdmin, authorization } = require('../../helpers/middlewares.helper')

router.post('/', 
// autentikasi
authenticateAdmin,
// autorisasi
(req, res, next) => authorization(req, res, next, [1]),
AdminController.create)

module.exports = router