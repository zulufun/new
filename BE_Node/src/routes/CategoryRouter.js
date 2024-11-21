const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController')

router.get('/get-all', CategoryController.getAllCategory)
router.get('/get-all-category', CategoryController.getAll)
router.get('/get-category/:id', CategoryController.getCategory)
router.post('/create-category', CategoryController.createCategory)
router.put('/update-category/:id', CategoryController.updateCategory)
router.delete('/delete-category/:id', CategoryController.deleteCategory)

module.exports = router