import CartProductModel from '../models/CartProduct.js'
import CartModel from '../models/Cart.js'
import AppError from '../errors/AppError.js'

const check = async (req, res, next) => {
    try {
        if (!req.signedCookies.cartId) {
            throw new Error('Корзина еще не создана')
        }
        const exist = await CartModel.isExist(req.signedCookies.cartId)
        if (!exist) {
            res.clearCookie('cartId')
            throw new Error('Корзина не найдена')
        }
    } catch(e) {
        next(AppError.badRequest(e.message))
    }
}

class CartProduct {
    async getAll(req, res, next) {
        await check(req, res, next) 
        try {
            const products = await CartProductModel.getAll(req.signedCookies.cartId)
            res.json(products)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        await check(req, res, next) 
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const item = await CartProductModel.create(
                req.signedCookies.cartId,
                req.params.productId,
                req.body
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        await check(req, res, next) 
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const item = await CartProductModel.update(
                req.signedCookies.cartId,
                req.params.productId,
                req.body
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        await check(req, res, next) 
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const item = await CartProductModel.delete(
                req.signedCookies.cartId,
                req.params.productId,
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new CartProduct()