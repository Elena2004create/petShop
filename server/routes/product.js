import express from 'express'
import ProductController from '../controllers/Product.js'
import ProductDescController from '../controllers/ProductDesc.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()


router.get('/getall/categoryId/:categoryId([0-9]+)/brandId/:brandId([0-9]+)', ProductController.getAll)
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
router.get('/getall/brandId/:brandId([0-9]+)', ProductController.getAll)
router.get('/getall', ProductController.getAll)
router.get('/getone/:id([0-9]+)', ProductController.getOne)
router.post('/create', ProductController.create)
router.put('/update/:id([0-9]+)', ProductController.update)
router.delete('/delete/:id([0-9]+)', ProductController.delete)


router.get('/:productId([0-9]+)/description/getall', ProductDescController.getAll)
router.get('/:productId([0-9]+)/description/getone/:id([0-9]+)', ProductDescController.getOne)
router.post(
    '/:productId([0-9]+)/description/create',
    authMiddleware,
    adminMiddleware,
    ProductDescController.create
)
router.put(
    '/:productId([0-9]+)/description/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductDescController.update
)
router.delete(
    '/:productId([0-9]+)/description/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductDescController.delete
)

export default router