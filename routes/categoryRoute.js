const express = require('express')
const categoryController = require('../controllers/categoryController')
const { getCategoryValidator, updateCategoryValidator, deleteCategoryValidator, createCategoryValidator } = require('../utils/validators/categoryValidator')

const router = express.Router()

router.get('/', categoryController.getCategories)
router.get('/:id', getCategoryValidator , categoryController.getCategory)
router.put('/:id', updateCategoryValidator ,categoryController.updateCategory)
router.delete('/:id', deleteCategoryValidator , categoryController.deleteCategory)
router.post('/', createCategoryValidator,categoryController.createCategory)

module.exports = router