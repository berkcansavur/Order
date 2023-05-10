class UserController{
    constructor({UserService}){
        this.UserService = UserService;
        this.createUser = this.createUser.bind(this);
    }
    async createUser(req,res){
        try {
            const user = await this.UserService.createUser(req.body);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(404).send(error.message);   
        }
    };
}
module.exports = UserController;