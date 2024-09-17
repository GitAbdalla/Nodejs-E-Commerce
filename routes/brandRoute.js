const express = require('express');
const {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
} = require('../utils/validators/brandValidator');
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require('../controllers/brandController');

const router = express.Router();

router.get('/', getBrands);
router.get('/:id', getBrandValidator, getBrand);
router.post('/',uploadBrandImage, resizeImage , createBrandValidator, createBrand);
router.put('/:id', uploadBrandImage, resizeImage , updateBrandValidator, updateBrand);
router.delete('/:id', deleteBrandValidator, deleteBrand);

module.exports = router