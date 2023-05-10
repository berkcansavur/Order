class OrderController{
  constructor({OrderService}){
    this.OrderService = OrderService;
    this.createOrder = this.createOrder.bind(this);
}
  async createOrder(req, res){
    try{
      const order = await this.OrderService.createOrder(req.body);
      return res.status(201).json(order);
  }catch(e){
      return res.status(404).send(e)
  }
};
}
  
  module.exports =  OrderController ;
  