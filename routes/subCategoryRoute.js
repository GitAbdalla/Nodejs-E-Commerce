const express = require('express') 
const { createSubCategory} = require('../controllers/subCategoryController')
const { createSubCategoryValidator } = require('../utils/validators/subCategoryValidator ')
const router = express.Router()



router.post('/' ,createSubCategoryValidator,createSubCategory )
module.exports =router