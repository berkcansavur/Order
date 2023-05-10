class UserController{
    constructor({UserService}){
        this.UserService = UserService;
        this.createUser = this.createUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }
    async createUser(req,res){
        try {
            const user = await this.UserService.createUser(req.body);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(404).send(error.message);   
        }
    };
    async loginUser(req,res){
        try {
            const loggedInUser = await this.UserService.loginUser(req.body.email,req.body.password);
            return res.status(200).send(loggedInUser);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
    async logoutUser(req,res){
        try {
            const loggedOutUser = await this.UserService.logoutUser(req.user,req.token);
            return res.send(loggedOutUser);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
}
module.exports = UserController;