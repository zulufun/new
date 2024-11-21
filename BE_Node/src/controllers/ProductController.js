const ProductService = require('../services/ProductService')

const getAllProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 100
        const filterName = req.query.filterName || ''
        const filterCategory = req.query.filterCategory || ''
        const filterBrand = req.query.filterBrand || ''
        const filterPriceMin = parseFloat(req.query.filterPriceMin) || 0
        const filterPriceMax = parseFloat(req.query.filterPriceMax) || Infinity
        const sortBy = req.query.sortBy || 'name'
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1

        const response = await ProductService.getAllProduct(page, pageSize, filterName, filterCategory, filterBrand, filterPriceMin, filterPriceMax, sortBy, sortOrder)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAll = async (req, res) => {
    try {
        const response = await ProductService.getAll()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const response = await ProductService.getProduct(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, brand, image } = req.body
        if (!name || !description || !price || !stock || !category || !brand ) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        } else {
            const response = await ProductService.createProduct(req.body)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        if (!id) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'ID not provided.'
            })
        } else {
            const response = await ProductService.updateProduct(id, data)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'ID not provided.'
            })
        } else {
            const response = await ProductService.deleteProduct(id)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    getAllProduct,
    getAll,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}