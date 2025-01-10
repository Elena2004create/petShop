import { Cart as CartMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import { CartProduct as CartProductMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

const normal = (cart) => {
    const data = {}
    data.id = cart.id
    data.products = []
    if (cart.products) {
        data.products = cart.products.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.cart_product.quantity
            }
        })
    }
    return data
}

class Cart {
    async getOne(cartId) {
        let cart = await CartMapping.findByPk(cartId, {
            attributes: ['id'],
            include: [
                {model: ProductMapping, attributes: ['id', 'name', 'price']},
            ],
        })
        if (!cart) {
            cart = await CartMapping.create()
        }
        return normal(cart)
    }

    async create() {
        const cart = await CartMapping.create()
        return normal(cart)
    }

    async append(cartId, productId, quantity) {
        let cart = await CartMapping.findByPk(cartId, {
            attributes: ['id'],
            include: [
                {model: ProductMapping, attributes: ['id', 'name', 'price']},
            ]
        })
        if (!cart) {
            cart = await CartMapping.create()
        }
        const cart_product = await CartProductMapping.findOne({
            where: {cartId, productId}
        })
        if (cart_product) {
            await cart_product.increment('quantity', {by: quantity})
        } else { 
            await CartProductMapping.create({cartId, productId, quantity})
        }
        await cart.reload()
        return normal(cart)
    }

    async increment(cartId, productId, quantity) {
        let cart = await CartMapping.findByPk(cartId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!cart) {
            cart = await CartMapping.create()
        }
        const cart_product = await CartProductMapping.findOne({
            where: {cartId, productId}
        })
        if (cart_product) {
            await cart_product.increment('quantity', {by: quantity})
            await cart.reload()
        }
        return normal(cart)
    }

    async decrement(cartId, productId, quantity) {
        let cart = await CartMapping.findByPk(cartId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!cart) {
            cart = await Cart.create()
        }
        const cart_product = await CartProductMapping.findOne({
            where: {cartId, productId}
        })
        if (cart_product) {
            if (cart_product.quantity > quantity) {
                await cart_product.decrement('quantity', {by: quantity})
            } else {
                await cart_product.destroy()
            }
            await cart.reload()
        }
        return normal(cart)
    }

    async remove(cartId, productId) {
        let cart = await CartMapping.findByPk(cartId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!cart) {
            cart = await Cart.create()
        }
        const cart_product = await CartProductMapping.findOne({
            where: {cartId, productId}
        })
        if (cart_product) {
            await cart_product.destroy()
            await cart.reload()
        }
        return normal(cart)
    }

    async clear(cartId) {
        let cart = await CartMapping.findByPk(cartId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (cart) {
            await CartProductMapping.destroy({where: {cartId}})
            await cart.reload()
        } else {
            cart = await Cart.create()
        }
        return normal(cart)
    }

    async delete(cartId) {
        const cart = await CartMapping.findByPk(cartId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!cart) {
            throw new Error('Корзина не найдена')
        }
        await cart.destroy()
        return normal(cart)
    }
}

export default new Cart()