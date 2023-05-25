const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
// Validations
const {validateLoginManagerSchema,validateCreateManagerSchema} = require('../validations/management.validation');
const {validateCreateWarehouseManagerSchema} = require('../validations/warehousemanager.validation');
const {validateCreateWarehouseSchema}= require('../validations/warehouse.validation');
const {validateCreateCourierSchema,validateDeleteCourierSchema}= require('../validations/courier.validation');
const {validateCreateProductSchema} =require('../validations/product.validation');
const {validateCreateProductSupplySchema,validateDeleteProductSupplySchema} = require('../validations/product-supply.validation');
const {validateCreateCourierSupplySchema} = require('../validations/courier-supply.validation');

const {container} = require('../di-setup');
//Controllers
const managementController = container.resolve('ManagementController');
const productController = container.resolve('ProductController');
const warehouseController = container.resolve('WarehouseController');
const courierController = container.resolve('CourierController');
const auth = require('../middlewares/authentication.middleware');
//ROUTERS
// Management Related Routes

router.post('/management/createManager',validateRequest(validateCreateManagerSchema),managementController.createManager);

router.post('/management/loginManager',validateRequest(validateLoginManagerSchema),managementController.loginManager);

//Courier Related Routes

router.post('/management/createCourier',auth,validateRequest(validateCreateCourierSchema),courierController.createCourier);

router.delete('/management/:courierId/deleteCourier',auth,validateRequest(validateDeleteCourierSchema),courierController.deleteCourier);

//Product Related Routes

router.post('/management/addProduct',auth,validateRequest(validateCreateProductSchema),productController.registerProduct);

//Warehouse Related Routes

router.post('/management/createWarehouse',auth,validateRequest(validateCreateWarehouseSchema),warehouseController.addWarehouse);

router.delete('/management/:warehouseId/deleteWarehouse',auth,validateRequest(validateCreateWarehouseSchema),warehouseController.deleteWarehouse);

// Warehouse Manager Related Routes

router.post('/management/createWarehouseManager',auth,validateRequest(validateCreateWarehouseManagerSchema),managementController.createWarehouseManager);

router.post('/management/:warehouseId/updateWarehouseProducts',warehouseController.updateWarehousesProductsById);

router.get('/management/:warehouseId/getWarehousesProduct',warehouseController.getWarehousesSelectedProductById);
// Product-Supply Related Routes

router.post('management/:productSupplyId/approveProductSupply',auth,validateRequest(validateCreateProductSupplySchema),managementController.approveProductSupply);

router.post('management/:productSupplyId/rejectProductSupply',auth,validateRequest(validateDeleteProductSupplySchema),managementController.rejectProductSupply);


// Courier-Supply Related Routes

router.post('management/:courierSupplyId/approveCourierSupply',auth,validateRequest(validateCreateCourierSupplySchema),managementController.approveCourierSupply);

router.delete('management/:courierSupplyId/rejectCourierSupply',auth,validateRequest(validateCreateCourierSupplySchema),managementController.rejectCourierSupply);

module.exports = router;