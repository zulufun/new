const CategoryService = require('../services/CategoryService')

const getAllCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 100
        const filterName = req.query.filterName || ''
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1

        const response = await CategoryService.getAllCategory(page, pageSize, filterName, sortOrder)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAll = async (req, res) => {
    try {
        const response = await CategoryService.getAll()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await CategoryService.getCategory(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else {
            const response = await CategoryService.createCategory(name)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        if (!id) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The id is required'
            })
        } else {
            const response = await CategoryService.updateCategory(id, data)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The id is required'
            })
        } else {
            const response = await CategoryService.deleteCategory(id)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    getAllCategory,
    getAll,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}