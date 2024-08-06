const slugify =  require('slugify')
const SubCategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require('../utils/apiError');

// @desc Create subCategory
// @route POST /api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
    const { name, category } = req.body;
    console.log('Request Body:', req.body); // Debug log

    // Create the subcategory
    const subCategory = await SubCategory.create({
        name,
        slug: req.body.slug, // Ensure slug is from req.body
        category,
    });

    res.status(201).json({ data: subCategory });
});