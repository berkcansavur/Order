class CourierController{
    constructor({CourierService}){
        this.CourierService = CourierService;
        this.createCourier = this.createCourier.bind(this);
        this.loginCourier = this.loginCourier.bind(this);
        this.logoutCourier= this.logoutCourier.bind(this);
        this.deleteCourier= this.deleteCourier.bind(this);
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
            const deletedCourier = await this.CourierService.deleteCourierById(req.courier._id);
            return res.status(200).send(deletedCourier);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
}
module.exports = CourierController;