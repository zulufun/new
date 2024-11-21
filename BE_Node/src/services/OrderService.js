const Order = require('../models/OrderModel')
const OrderItem = require('../models/OrderItemModel')
const User = require('../models/UserModel')
const Product = require('../models/ProductModel');
const emailService = require('./EmailService')

const createOrder = (shippingAddress, recipient, phone, orderDate, paymentMethod, status, totalPrice, user, email, orderItems) => {
    return new Promise(async (resolve, reject) => {
        try {
            // await emailService.sendEmail(email, orderItems)
            // resolve({
            //     status: 'OK',
            //     message: 'SUCCESS'
            // })

            const createdOrder = await Order.create({
                shippingAddress,
                recipient,
                phone,
                orderDate,
                paymentMethod,
                status,
                totalPrice,
                user
            })

            if (createdOrder) {
                const createdOrderItems = await Promise.all(orderItems.map(async (item) => {
                    const product = await Product.findById(item.product)
                    product.stock -= item.quantity
                    product.sold += item.quantity
                    await product.save();

                    return await OrderItem.create({
                        order: createdOrder._id,
                        product: item.product,
                        name: item.name,
                        image: item.image,
                        quantity: item.quantity,
                        price: item.price,
                        totalPrice: item.totalPrice
                    });
                }));

                await emailService.sendEmail(email, orderItems)

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    order: createdOrder,
                    orderItems: createdOrderItems
                });
            } else {
                resolve({
                    status: 'ERR',
                    message: 'CREATE ORDER FAIL'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                _id: id
            })

            const orderItems = await OrderItem.find({
                order: id
            })

            const orderWithItems = {
                ...order._doc, // Lấy tất cả các thuộc tính của order
                orderItems: orderItems
            };

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: orderWithItems
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = []

            const orders = await Order.find();

            for (const orderElement of orders) {
                const orderItems = await OrderItem.find({ order: orderElement._id });
                const user = await User.findOne({ _id: orderElement.user });
                const orderWithItems = {
                    ...orderElement.toObject(),
                    userName: user.name,
                    orderItems: orderItems
                };
                data.push(orderWithItems);
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: data
            });
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrderByUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = []

            const orders = await Order.find({
                user: user
            });

            for (const orderElement of orders) {
                const orderItems = await OrderItem.find({ order: orderElement._id });
                const orderWithItems = {
                    ...orderElement.toObject(),
                    orderItems: orderItems
                };
                data.push(orderWithItems);
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: data
            });
        } catch (e) {
            reject(e)
        }
    })
}

const updateOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                _id: id
            })

            if (order.status === 1) {
                order.status = 2
            } else if (order.status === 2) {
                order.status = 3
            }

            await order.save();

            resolve({
                status: 'OK',
                message: 'SUCCESS'
            });
        } catch (e) {
            reject(e)
        }
    })
}

const cancelOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                _id: id
            })

            const orderItems = await OrderItem.find({ order: id })

            for (const item of orderItems) {
                const product = await Product.findById(item.product).session(session);
                if (!product) {
                    throw new Error(`Product with id ${item.product} not found`);
                }

                product.stock += item.quantity;
                product.sold -= item.quantity;
                await product.save();
            }

            order.status = 0;
            await order.save();

            resolve({
                status: 'OK',
                message: 'SUCCESS'
            });
        } catch (e) {
            reject(e)
        }
    })
}

const deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await OrderItem.deleteMany({
                order: id
            })

            await Order.deleteOne({
                _id: id
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS'
            });
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrder,
    getOrder,
    updateOrder,
    getAllOrderByUser,
    deleteOrder,
    cancelOrder
}