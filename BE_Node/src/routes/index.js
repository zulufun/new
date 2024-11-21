const UserRouter = require('./UserRouter')
const BrandRouter = require('./BrandRouter')
const CategoyRouter = require('./CategoryRouter')
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/brand', BrandRouter)
    app.use('/api/category', CategoyRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/order', OrderRouter)
}

module.exports = routes