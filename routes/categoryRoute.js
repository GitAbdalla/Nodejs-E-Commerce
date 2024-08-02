const express = require('express')

const categoryController = require('../controllers/categoryController')

const router = express.Router()

router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)
router.post('/',categoryController.createCategory)

module.exports = router