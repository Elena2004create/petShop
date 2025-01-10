import { guestInstance } from './index.js'

export const fetchCart = async () => {
    const { data } = await guestInstance.get('cart/getone')
    return data
}

export const append = async (id) => {
    const { data } = await guestInstance.put(`cart/product/${id}/append/1`)
    return data
}

export const increment = async (id) => {
    const { data } = await guestInstance.put(`cart/product/${id}/increment/1`)
    return data
}

export const decrement = async (id) => {
    const { data } = await guestInstance.put(`cart/product/${id}/decrement/1`)
    return data
}

export const remove = async (id) => {
    const { data } = await guestInstance.put(`cart/product/${id}/remove`)
    return data
}

export const clear = async () => {
    const { data } = await guestInstance.put(`cart/clear`)
    return data
}