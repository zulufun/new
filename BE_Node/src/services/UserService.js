const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const { generalAccessToken, generalRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword } = newUser
        try {
            const checkEmail = await User.findOne({ email: email })
            if (checkEmail !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            } else {
                const hash = bcrypt.hashSync(password, 10)
                const createdUser = await User.create({
                    name,
                    email,
                    password: hash
                })

                if (createdUser) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createdUser
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (loginUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = loginUser
        try {
            const checkUser = await User.findOne({ email: email })
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            } else if (comparePassword === false) {
                resolve({
                    status: 'ERR',
                    message: 'Email or password is incorrect'
                })
            } else {
                const access_token = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                const refresh_token = await generalRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                    refresh_token
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            } else {
                const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updatedUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            } else {
                await User.findByIdAndDelete(id)
                resolve({
                    status: 'OK',
                    message: 'Delete user success',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            resolve({
                status: 'OK',
                message: 'Success',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    getAllUser,
    getUser
}