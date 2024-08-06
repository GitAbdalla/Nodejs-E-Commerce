const express = require('express')
const {getCategory , getCategories ,updateCategory ,deleteCategory ,createCategory} = require('../controllers/categoryController')
const { getCategoryValidator, updateCategoryValidator, deleteCategoryValidator, createCategoryValidator } = require('../utils/validators/categoryValidator')

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategoryValidator , getCategory)
router.put('/:id', updateCategoryValidator ,updateCategory)
router.delete('/:id', deleteCategoryValidator , deleteCategory)
router.post('/', createCategoryValidator,createCategory)

module.exports = router