const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
// Validations
const {validateManagementSchema,validateCreateManagerSchema} = require('../validations/management.validation');
const {validateCreateWarehouseManagerSchema} = require('../validations/warehousemanager.validation');
const {validateCreateWarehouseSchema}= require('../validations/warehouse.validation');
const {validateCreateCourierSchema}= require('../validations/courier.validation');
const {validateCreateProductSchema} =require('../validations/product.validation');
const {validateCreateProductSupplySchema} = require('../validations/product-supply.validation');
const {validateCreateCourierSupplySchema} = require('../validations/courier-supply.validation');
const {container} = require('../di-setup');
//Controllers
const managementController = container.resolve('ManagementController');
const productController = container.resolve('ProductController');
const warehouseController = container.resolve('WarehouseController');
const auth = require('../middlewares/authentication.middleware');
//ROUTERS
// Management Related Routes
router.post('/management',validateRequest(validateManagementSchema),managementController.createManager);

router.post('/management/createManager',validateRequest(validateCreateManagerSchema),managementController.createManager);

router.post('/management/loginManager',validateRequest(validateManagementSchema),managementController.loginManager);

//Courier Related Routes

router.post('/management/createCourier',auth,validateRequest(validateCreateCourierSchema),managementController.createCourier);

//Product Related Routes

router.post('/management/addProduct',auth,validateRequest(validateCreateProductSchema),productController.registerProduct);

//Warehouse Related Routes

router.post('/management/createWarehouse',auth,validateRequest(validateCreateWarehouseSchema),managementController.createWarehouse);

// Warehouse Manager Related Routes

router.post('/management/createWarehouseManager',auth,validateRequest(validateCreateWarehouseManagerSchema),managementController.createWarehouseManager);

router.post('/management/:warehouseId/updateWarehouseProducts',warehouseController.updateWarehousesProductsById);

router.get('/management/:warehouseId/getWarehousesProduct',warehouseController.getWarehousesSelectedProductById);
// Product-Supply Related Routes

router.post('management/approveProductSupply',auth,validateRequest(validateCreateProductSupplySchema),managementController.approveProductSupply);

// Courier-Supply Related Routes

router.post('management/approveCourierSupply',auth,validateRequest(validateCreateCourierSupplySchema),managementController.approveCourierSupply);

module.exports = router;