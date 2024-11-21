const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')

router.get('/get-all', OrderController.getAllOrder)
router.get('/get-order/:id', OrderController.getOrder)
router.get('/get-order-user/:id', OrderController.getAllOrderByUser)
router.post('/create-order', OrderController.createOrder)
router.put('/update-order/:id', OrderController.updateOrder)
router.put('/cancel-order/:id', OrderController.cancelOrder)
router.delete('/delete-order/:id', OrderController.deleteOrder)

module.exports = router