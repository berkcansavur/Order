const jwt = require('jsonwebtoken');
const {container} = require('../di-setup');
const UserRepository = container.resolve('UserRepository');
const CourierRepository = container.resolve('CourierRepository');
const WarehouseManagerRepository = container.resolve('WarehouseManagerRepository');
const ManagementRepository = container.resolve('ManagementRepository');
const auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        throw new Error('Token cannot be verified');
      }
  
      let user;
      let courier;
      let warehouseManager;
      let manager;
  
      switch (true) {
        // User authentication
        case req.path.includes('/users'):
          user = await UserRepository.getUserById(decoded.userId);
          validateToken(user, token);
          req.user = user;
          break;
  
        // Courier authentication
        case req.path.includes('/couriers'):
          courier = await CourierRepository.getCourierById(decoded.courierId);
          validateToken(courier, token);
          req.courier = courier;
          break;
  
        // Warehouse Manager authentication
        case req.path.includes('/warehouse-manager'):
          warehouseManager = await WarehouseManagerRepository.getWarehouseManagerById(decoded.userId);
          validateToken(warehouseManager, token);
          req.warehouseManager = warehouseManager;
          break;
  
        // Management authentication
        case req.path.includes('/management'):
          manager = await ManagementRepository.getManagerById(decoded.managerId);
          validateToken(manager, token);
          req.manager = manager;
          break;
  
        default:
          throw new Error('Invalid route');
      }
  
      req.token = token;
      next();
    } catch (error) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
  };
  
  const validateToken = (entity, token) => {
    if (!entity) {
      throw new Error('Entity not found');
    }
  
    const foundToken = entity.tokens.find((t) => t.token === token);
    if (!foundToken) {
      throw new Error('Token not found');
    }
  };
  
  module.exports = auth;