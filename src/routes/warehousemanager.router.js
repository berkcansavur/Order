const express = require('express');
const router = express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateWarehouseManagerSchema} = require('../validations/warehousemanager.validation');
const {container} =require('../di-setup');
const WarehouseManagerController = container.resolve('WarehouseManagerController');
const auth = require('../middlewares/authentication.middleware');

router.post('/warehouse-manager',validateRequest(validateWarehouseManagerSchema),WarehouseManagerController.createWarehouseManager);

router.post('/warehouse-manager/login',validateRequest(validateWarehouseManagerSchema),WarehouseManagerController.loginWarehouseManager);

router.post('/warehouse-manager/addProducts',WarehouseManagerController.addProductsToWarehouse);

module.exports = router;
