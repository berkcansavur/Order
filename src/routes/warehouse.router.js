const express = require('express');
const router= express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateWarehouseSchema} = require('../validations/warehouse.validation');
const {container} = require('../di-setup');
const warehouseController = container.resolve('WarehouseController');
const auth = require('../middlewares/authentication.middleware');

router.post('/warehouse',validateRequest(validateWarehouseSchema),warehouseController.addWarehouse);

router.post('/warehouse/updateWarehouseById',warehouseController.updateWarehousesProductsById);

router.get('/warehouse/getProduct',warehouseController.getWarehousesSelectedProductById);

module.exports = router;