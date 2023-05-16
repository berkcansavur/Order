const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateProductSupplySchema} = require('../validations/product-supply.validation');
const {container} = require('../di-setup');
const productSupplyController = container.resolve('ProductSupplyController');
const auth = require('../middlewares/authentication.middleware');

router.post('/productSupply/create',auth,validateRequest(validateProductSupplySchema),productSupplyController.createProductSupply);
module.exports = router;
