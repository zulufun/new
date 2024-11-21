const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.get('/get-all', ProductController.getAllProduct)
router.get('/get-all-product', ProductController.getAll)
router.get('/get-product/:id', ProductController.getProduct)
router.post('/create-product', ProductController.createProduct)
router.put('/update-product/:id', ProductController.updateProduct)
router.delete('/delete-product/:id', ProductController.deleteProduct)

module.exports = router