const createOrder = async (req, dependencies) => {
    const { customerName, productName, quantity, price } = req;
  
    return dependencies.orderService.createOrder({
      customerName,
      product,
      quantity,
      price,
      courier,
      Order: dependencies.Order,
      orderRepository: dependencies.orderRepository,
    });
  };
  
  module.exports = { createOrder };
  