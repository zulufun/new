const Product = require('../models/ProductModel')

const getAllProduct = (page, pageSize, filterName, filterCategory, filterBrand, filterPriceMin, filterPriceMax, sortBy, sortOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filterObject = {}
            if (filterName) {
                filterObject.name = { $regex: filterName, $options: 'i' }
            }
            if (filterCategory) {
                filterObject.category = filterCategory;
            }
            if (filterBrand) {
                filterObject.brand = filterBrand;
            }
            filterObject.price = { $gte: filterPriceMin, $lte: filterPriceMax }
            const allProduct = await Product.find(filterObject).skip((page - 1) * pageSize).limit(pageSize).sort({ [sortBy]: sortOrder })
            const total = await Product.find(filterObject).countDocuments()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct,
                total: total,
                totalPage: Math.ceil(total / pageSize)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.find()
            const total = await Product.find().countDocuments()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product,
                total: total
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, description, price, stock, category, brand, image } = data
            const createdProduct = await Product.create({
                name,
                description,
                price,
                stock,
                category,
                brand,
                image
            })
            if (createdProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Product.findOne({
                _id: id
            })
            if (check === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            } else {
                const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updatedProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Product.findOne({
                _id: id
            })
            if (check === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            } else {
                await Product.findByIdAndDelete(id)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllProduct,
    getAll,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}