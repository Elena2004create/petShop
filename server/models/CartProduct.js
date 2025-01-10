import { CartProduct as CartProductMapping } from './mapping.js'
import { Cart as CartMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class CartProduct {
    async getAll(cartId) {
        const cart = await CartMapping.findByPk(basketId)
        if (!cart) {
            throw new Error('Корзина не найдена')
        }
        const items = await CartProductMapping.findAll({where: {cartId}})
        return items
    }

    async getOne(cartId, productId) {
        const cart = await CartMapping.findByPk(cartId)
        if (!cart) {
            throw new Error('Корзина не найдена')
        }
        const item = await CartProductMapping.findOne({where: {cartId, productId}})
        if (!item) {
            throw new Error('Товара нет в корзине')
        }
        return item
    }

    async create(cartId, data) {
        const cart = await CartMapping.findByPk(cartId)
        if (!cart) {
            throw new Error('Корзина не найдена')
        }
        const {quantity = 1} = data
        const item = await CartProductMapping.create({cartId, productId, quantity})
        return item
    }

    async update(cartId, productId, data) {
        const cart = await CartMapping.findByPk(basketId)
        if (!cart) {
            throw new Error('Корзина не найдена')
        }
        const item = await CartProductMapping.findOne({where: {cartId, productId}})
        if (!item) {
            throw new Error('Товара нет в корзине')
        }
        if (data.quantity) {
            await item.update({quantity})
        } else if (data.increment) {
            await item.increment('quantity', {by: data.increment})
        } else if (data.decrement) {
            await item.decrement('quantity', {by: data.decrement})
        }
        return item
    }

    async delete(cartId, productId) {
        const cart = await CartMapping.findByPk(cartId)
        if (!cart) {
            throw new Error('Корзина не найдена')
        }
        const item = await CartProductMapping.findOne({where: {cartId, productId}})
        if (!item) {
            throw new Error('Товара нет в корзине')
        }
        await item.destroy()
        return item
    }
}

export default new CartProduct()