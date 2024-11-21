const Category = require('../models/CategoryModel')
const Product = require('../models/ProductModel')

const getAllCategory = (page, pageSize, filterName, sortOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filterObject = {}
            if (filterName) {
                filterObject.name = { $regex: filterName, $options: 'i' }
            }
            const allCategory = await Category.find(filterObject).skip((page - 1) * pageSize).limit(pageSize).sort({ name: sortOrder })
            const total = await Category.find(filterObject).countDocuments()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allCategory,
                total: total,
                totalPage: Math.ceil(total / pageSize)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAll = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const brand = await Category.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: brand
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const brand = await Category.findOne({
                _id: id
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: brand
            })
        } catch (e) {
            reject(e)
        }
    })
}

const createCategory = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Category.findOne({ name: name });
            if (check !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Đã tồn tại danh mục này'
                })
            } else {
                const createdCategory = await Category.create({
                    name
                })

                if (createdCategory) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createdCategory
                    })
                }      
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Category.findOne({ _id: id });
            if (check === null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tồn tại danh mục này'
                })
            } else {
                const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updatedCategory
                })     
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Category.findOne({
                _id: id
            })
            if (check === null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tồn tại danh mục này'
                })
            } else {
                await Product.deleteMany({ category: id })
                await Category.findByIdAndDelete(id)
                resolve({
                    status: 'OK',
                    message: 'Xóa danh mục thành công'
                })
            }        
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllCategory,
    getAll,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}