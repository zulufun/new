const orderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {
        const { shippingAddress, recipient, phone, orderDate, paymentMethod, status, totalPrice, user, email, orderItems } = req.body
        const response = await orderService.createOrder(shippingAddress, recipient, phone, orderDate, paymentMethod, status, totalPrice, user, email, orderItems);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getOrder = async (req, res) => {
    try {
        const id = req.params.id
        const response = await orderService.getOrder(id);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const response = await orderService.getAllOrder();
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderByUser = async (req, res) => {
    try {
        const user = req.params.id
        const response = await orderService.getAllOrderByUser(user);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id
        const response = await orderService.updateOrder(id);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrder = async (req, res) => {
    try {
        const id = req.params.id
        const response = await orderService.cancelOrder(id);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id
        const response = await orderService.deleteOrder(id);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getOrder,
    getAllOrder,
    updateOrder,
    getAllOrderByUser,
    deleteOrder,
    cancelOrder
}