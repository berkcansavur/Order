class ManagementController{
    constructor({ManagementService}){
        this.ManagementService =ManagementService;
        this.createManagement = this.createManagement.bind(this);
        this.createManager = this.createManager.bind(this);
        this.loginManager = this.loginManager.bind(this);
    }
    async createManager(req,res){
        try {
            const newManager = await this.ManagementService.createManager(req.body);
            return res.status(201).send(newManager);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async createManagement(req,res){
        try {
            const newManagement = await this.ManagementService.createManagement(req.body);
            return res.status(201).send(newManagement);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
    async loginManager(req,res){
        try {
            const loggedInManager = await this.ManagementService.loginManager(req.body.email,req.body.password);
            return res.status(200).send(loggedInManager);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
}
module.exports = ManagementController;