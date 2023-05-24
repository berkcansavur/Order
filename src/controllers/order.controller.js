class OrderController{
  constructor({OrderService}){
    this.OrderService = OrderService;
    this.createOrder = this.createOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.getOrdersOfUser = this.getOrdersOfUser.bind(this);
    this.assignOrderToCourier = this.assignOrderToCourier.bind(this);
    this.updateOrderStatusApproved = this.updateOrderStatusApproved.bind(this);
    this.updateOrderStatusDenied = this.updateOrderStatusDenied.bind(this);
    this.updateOrderStatusPreparingStarted = this.updateOrderStatusPreparingStarted.bind(this);
    this.updateOrderStatusPreparingCompleted = this.updateOrderStatusPreparingCompleted.bind(this);
    this.updateOrderStatusOntheway = this.updateOrderStatusOntheway.bind(this);
    this.updateOrderStatusDelivered = this.updateOrderStatusDelivered.bind(this);
    this.updateStatusCancelled = this.updateStatusCancelled.bind(this);

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
  async assignOrderToCourier(req,res){
    try {
      const order = await this.OrderService.assignOrderToCourier(req.params.orderId, req.courier);
      return res.status(200).send(order);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateOrderStatusApproved(req,res){
    try {
      const order = await this.OrderService.updateOrderStatusApprovedById(req.params.orderId,);
      return res.status(200).send(order);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateOrderStatusDenied(req,res){
    try {
      const order = await this.OrderService.updateOrderStatusDeniedById(req.params.orderId);
      return res.status(200).send(order);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
  async updateOrderStatusPreparingStarted(req,res){
    try {
      const order = await this.OrderService.updateOrderStatusPreparingStartedById(req.params.orderId);
      return res.status(200).send(order);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
  async updateOrderStatusPreparingCompleted(req,res){
    try {
      const order = await this.OrderService.updateOrderStatusPreparingCompletedById(req.params.orderId);
      return res.status(200).send(order);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
  async updateOrderStatusOntheway(req,res){
    try {
      const order = await this.OrderService.updateOrderStatusOnthewayById(req.params.orderId);
      return res.status(200).send(order);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
  async updateOrderStatusDelivered(req,res){
    try {
      const order = await this.OrderService.updateOrderStatusDeliveredById(req.params.orderId);
      return res.status(200).send(order);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateStatusCancelled(req,res){
    try {
      const order = await this.OrderService.updateStatusCancelledById(req.params.orderId); 
      return res.status(200).send(order);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
}
  
  module.exports =  OrderController ;
  