class CourierController{
    constructor({CourierService}){
        this.CourierService = CourierService;
    }
    async createCourier(req,res){
        try {
            const courier = await this.CourierService.createCourier(req.body);
            return res.status(201).send(courier);            
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
    async loginCourier(req,res){
        try {
            const loggedCourier = await this.CourierService.loginCourier(req.body.email,req.body.password);
            return res.status(200).send(loggedCourier); 
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
    async logoutCourier(req,res){
        try {
            const loggedOutUser = await this.CourierService.logoutCourier(req.courier,req.token);
            return res.status(200).send(loggedOutUser);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
    async deleteCourier(req,res){
        try {
            const deletedCourier = await this.CourierService.deleteCourierById(req.params.courierId);
            return res.status(200).send(deletedCourier);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
    async removeCourierOrderById(req,res){
        try {
            const updatedCourier = await this.CourierService.removeCourierOrderById(req.courier,req.params.orderId);
            return updatedCourier;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getCourierOrdersById(req,res){
        try {
            const orders = await this.CourierService.getCourierOrdersById(req.courier._id);
            return res.status(200).send(orders);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
}
module.exports = CourierController;