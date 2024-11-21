const express = require('express')
const router = express.Router()
const BrandController = require('../controllers/BrandController')

router.get('/get-all', BrandController.getAllBrand)
router.get('/get-all-brand', BrandController.getAll)
router.get('/get-brand/:id', BrandController.getBrand)
router.post('/create-brand', BrandController.createBrand)
router.put('/update-brand/:id', BrandController.updateBrand)
router.delete('/delete-brand/:id', BrandController.deleteBrand)

module.exports = router