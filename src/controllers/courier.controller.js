class CourierController{
    constructor({CourierService}){
        this.CourierService = CourierService;
        this.createCourier = this.createCourier.bind(this);
        this.loginCourier = this.loginCourier.bind(this);
        this.logoutCourier= this.logoutCourier.bind(this);
    }
    async createCourier(req,res){
        try {
            const courier = await this.CourierService.createUser(req.body);
            return res.status(201).send(courier);            
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
    async loginCourier(req,res){
        try {
            const loggedCourier = await this.CourierService.loginUser(req.body.email,req.body.password);
            return res.status(200).send(loggedCourier); 
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async logoutCourier(req,res){
        try {
            const loggedOutUser = await this.CourierService.logoutUser(req.user,req.token);
            return res.status(200).send(loggedOutUser);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
module.exports = CourierController;