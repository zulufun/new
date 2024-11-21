const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!name || !email || !password || !confirmPassword) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (reg.test(email) === false) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The email is not validation'
            })
        } else if (password !== confirmPassword) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The password not match the confirmation password'
            })
        } else {
            const response = await UserService.createUser(req.body)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!email || !password) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (reg.test(email) === false) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The email is not validation'
            })
        } else {
            const response = await UserService.loginUser(req.body)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        } else {
            const response = await UserService.updateUser(userId, data)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const response = await UserService.getUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1]
        const response = await JwtService.refreshToken(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    getAllUser,
    getUser,
    refreshToken
}