import CartModel from '../models/Cart.js'
import AppError from '../errors/AppError.js'

const maxAge = 60 * 60 * 1000 * 24 * 365
const signed = true

class Cart {
    async getOne(req, res, next) {
        try {
            let cart
            if (req.signedCookies.cartId) {
                cart = await CartModel.getOne(parseInt(req.signedCookies.cartId))
            } else {
                cart = await CartModel.create()
            }
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async append(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const {productId, quantity} = req.params
            const cart = await CartModel.append(cartId, productId, quantity)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async increment(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const {productId, quantity} = req.params
            const cart = await CartModel.increment(cartId, productId, quantity)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async decrement(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const {productId, quantity} = req.params
            const cart = await CartModel.decrement(cartId, productId, quantity)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const cart = await CartModel.remove(cartId, req.params.productId)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async clear(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const cart = await CartModel.clear(cartId)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Cart()