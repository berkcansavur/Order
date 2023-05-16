const express = require('express');
const router = express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateProductSchema} =require('../validations/product.validation');
const {container} = require('../di-setup');
const productController = container.resolve('ProductController');
const auth = require('../middlewares/authentication.middleware');

router.post('/products/addProduct',auth,validateRequest(validateProductSchema),productController.registerProduct);

// router.post('/products/updateProduct',auth,validateRequest(validateProductSchema),productController.updateProduct);

// router.post('/products/removeProduct',auth,validateRequest(validateProductSchema),productController.removeProduct);

module.exports = router;
