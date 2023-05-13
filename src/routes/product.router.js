const express = require('express');
const router = express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateProductSchema} =require('../validations/product.validation');
const {container} = require('../di-setup');
const productController = container.resolve('ProductController');
const auth = require('../middlewares/authentication.middleware');

router.post('/products',auth,validateRequest(validateProductSchema),productController.registerProduct);

module.exports = router;
