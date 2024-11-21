const Brand = require('../models/BrandModel')
const Product = require('../models/ProductModel')

const getAllBrand = (page, pageSize, filterName, sortOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filterObject = {}
            if (filterName) {
                filterObject.name = { $regex: filterName, $options: 'i' }
            }
            const allBrand = await Brand.find(filterObject).skip((page - 1) * pageSize).limit(pageSize).sort({ name: sortOrder })
            const total = await Brand.find(filterObject).countDocuments()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allBrand,
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
            const brand = await Brand.find()
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

const getBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const brand = await Brand.findOne({
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

const createBrand = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Brand.findOne({ name: name });
            if (check !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Đã tồn tại thương hiệu này'
                })
            } else {
                const createdBrand = await Brand.create({
                    name
                })

                if (createdBrand) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createdBrand
                    })
                }      
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateBrand = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Brand.findOne({ _id: id });
            if (check === null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tồn tại thương hiệu này'
                })
            } else {
                const updatedBrand = await Brand.findByIdAndUpdate(id, data, { new: true })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updatedBrand
                })     
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const check = await Brand.findOne({
                _id: id
            })
            if (check === null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tồn tại hãng này'
                })
            } else {
                await Product.deleteMany({ brand: id })
                await Brand.findByIdAndDelete(id)
                resolve({
                    status: 'OK',
                    message: 'Xóa hãng thành công'
                })
            }        
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllBrand,
    getAll,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
}