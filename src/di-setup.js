const awilix = require('awilix');
const mongoose = require('mongoose');
//User Dependencies
const {UserSchema} = require('./models/user.model');
const UserRepository = require('./repositories/user.repository');
const UserService = require('./services/user.service');
const UserController = require('./controllers/user.controller');
// Order Dependencies
const {OrderSchema} = require('./models/order.model');
const OrderRepository = require('./repositories/order.repository');
const OrderService = require('./services/order.service');
const OrderController = require('./controllers/order.controller');
// Courier Dependencies
const {CourierSchema} = require('./models/courier.model');
const CourierRepository = require('./repositories/courier.repository');
const CourierService = require('./services/courier.service');
const CourierController = require('./controllers/courier.controller');
//Products Dependencies
const {ProductSchema} = require('./models/product.model');
const ProductRepository = require('./repositories/product.repository');
const ProductService = require('./services/product.service');
const ProductController = require('./controllers/product.controller');
// Warehouse-Manager Dependencies
const {WarehouseManagerSchema} = require('./models/warehousemanager.model');
const WarehouseManagerRepository = require('./repositories/warehousemanager.repository');
const WarehouseManagerService = require('./services/warehousemanager.service');
const WarehouseManagerController = require('./controllers/warehousemanager.controller');
// Management Dependencies
const {ManagementSchema} = require('./models/management.model');
const ManagementRepository = require('./repositories/management.repository');
const ManagementService = require('./services/management.service');
const ManagementController = require('./controllers/management.controller');
// Warehouse Dependencies
const {WarehouseSchema} = require('./models/warehouse.model');
const WarehouseRepository = require('./repositories/warehouse.repository');
const WarehouseService = require('./services/warehouse.service');
const WarehouseController = require('./controllers/warehouse.controller');
//ProductSupply Dependencies
const {ProductSupplySchema} = require('./models/product-supply.model');
const ProductSupplyRepository = require('./repositories/product-supply.repository');
const ProductSupplyService = require('./services/product-supply.service');
const ProductSupplyController = require('./controllers/product-supply.controller');


const container = awilix.createContainer();

function setup(){
    container.register({
        mongoose:awilix.asValue(mongoose),
        
        UserSchema:awilix.asValue(UserSchema),
        UserRepository: awilix.asClass(UserRepository),
        UserService: awilix.asClass(UserService),
        UserController: awilix.asClass(UserController),
        
        OrderSchema:awilix.asValue(OrderSchema),
        OrderRepository: awilix.asClass(OrderRepository),        
        OrderService: awilix.asClass(OrderService),
        OrderController: awilix.asClass(OrderController),
        
        CourierSchema: awilix.asValue(CourierSchema),
        CourierRepository: awilix.asClass(CourierRepository),
        CourierService: awilix.asClass(CourierService),
        CourierController: awilix.asClass(CourierController),

        ProductSchema:awilix.asValue(ProductSchema),
        ProductRepository: awilix.asClass(ProductRepository),
        ProductService: awilix.asClass(ProductService),
        ProductController: awilix.asClass(ProductController),
        
        WarehouseManagerSchema: awilix.asValue(WarehouseManagerSchema),        
        WarehouseManagerRepository: awilix.asClass(WarehouseManagerRepository),
        WarehouseManagerService: awilix.asClass(WarehouseManagerService),
        WarehouseManagerController: awilix.asClass(WarehouseManagerController),

        ManagementSchema: awilix.asValue(ManagementSchema),
        ManagementRepository: awilix.asClass(ManagementRepository),
        ManagementService: awilix.asClass(ManagementService),
        ManagementController: awilix.asClass(ManagementController),

        WarehouseSchema: awilix.asValue(WarehouseSchema),
        WarehouseRepository: awilix.asClass(WarehouseRepository),
        WarehouseService: awilix.asClass(WarehouseService),
        WarehouseController: awilix.asClass(WarehouseController),

        ProductSupplySchema: awilix.asValue(ProductSupplySchema),
        ProductSupplyRepository: awilix.asClass(ProductSupplyRepository),
        ProductSupplyService: awilix.asClass(ProductSupplyService),
        ProductSupplyController:awilix.asClass(ProductSupplyController)

    });
}
module.exports = {container,setup};