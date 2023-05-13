class OrderController{
  constructor({OrderService}){
    this.OrderService = OrderService;
    this.createOrder = this.createOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
}
  async createOrder(req, res){
    try{
      const order = await this.OrderService.createOrder(req.body,req.user);
      return res.status(201).json(order);
    }catch(e){
        return res.status(404).send(e.message);
    }
  }
  async deleteOrder(req, res){
    try {
      const order = await this.OrderService.deleteOrderById(req.params.orderId);
      const returnMessage = "Order "+order._id.toString()+" has been deleted";
      return res.status(200).send(returnMessage);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
  async updateOrder(req, res){
    try {
      const order = await this.OrderService.updateOrder(req.params.orderId,req.body);
      return res.status(200).send(order);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  async getOrdersOfUser(req, res){
    try {
      const orders = await this.OrderService.getOrdersOfUserById(req.user._id);
      return res.status(200).send(orders);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
}
  
  module.exports =  OrderController ;
  