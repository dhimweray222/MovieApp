const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/app/auth.controller')

router.post('/register', AuthController.register)
router.post('/login-password', AuthController.loginPassword)
router.post('/login-google', AuthController.google)
router.post('/login-facebook', AuthController.facebook)

module.exports = router