const express = require('express');
const router = new express.Router();
const {validateRequest} = require('../middlewares/validation.middleware');
const {validateManagementSchema} = require('../validations/management.validation');
const {container} = require('../di-setup');
const managementController = container.resolve('ManagementController');
const auth = require('../middlewares/authentication.middleware');
//ROUTERS
router.post('/management',validateRequest(validateManagementSchema),managementController.createManager);

router.post('/management/loginManager',validateRequest(validateManagementSchema),managementController.loginManager);

//router.post('/management',validateRequest(validateManagementSchema),managementController.createManagement);

module.exports = router;