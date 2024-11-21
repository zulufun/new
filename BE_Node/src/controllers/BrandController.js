const BrandService = require('../services/BrandService')

const getAllBrand = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 100
        const filterName = req.query.filterName || ''
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1

        const response = await BrandService.getAllBrand(page, pageSize, filterName, sortOrder)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAll = async (req, res) => {
    try {
        const response = await BrandService.getAll()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getBrand = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await BrandService.getBrand(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createBrand = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else {
            const response = await BrandService.createBrand(name)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateBrand = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        if (!id) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The id is required'
            })
        } else {
            const response = await BrandService.updateBrand(id, data)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteBrand = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The id is required'
            })
        } else {
            const response = await BrandService.deleteBrand(id)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    getAllBrand,
    getAll,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
}