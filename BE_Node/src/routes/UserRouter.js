const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { authMiddleware, authUserMiddleware } = require('../middleware/AuthMiddleware')

router.post('/sign-up', UserController.createUser)
router.post('/sign-in', UserController.loginUser)
router.put('/update-user/:id', UserController.updateUser)
router.delete('/delete-user/:id', UserController.deleteUser)
router.get('/get-all', UserController.getAllUser)
router.get('/get-user/:id', UserController.getUser)
router.post('/refresh-token', UserController.refreshToken)

module.exports = router