import express from 'express'
import CartController from '../controllers/Cart.js'

const router = new express.Router()

router.get('/getone', CartController.getOne)
router.put('/product/:productId([0-9]+)/append/:quantity([0-9]+)', CartController.append)
router.put('/product/:productId([0-9]+)/increment/:quantity([0-9]+)', CartController.increment)
router.put('/product/:productId([0-9]+)/decrement/:quantity([0-9]+)', CartController.decrement)
router.put('/product/:productId([0-9]+)/remove', CartController.remove)
router.put('/clear', CartController.clear)

export default router