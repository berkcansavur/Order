const Utils = require('../utils/utils');
class UserService{
    constructor({UserRepository}){
        this.UserRepository = UserRepository;
        this.createUser = this.createUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.getUserNameById = this.getUserNameById.bind(this);
        this.getUserEmailById = this.getUserEmailById.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.updateUserNameById = this.updateUserNameById.bind(this);
        this.updateUserEmailById = this.updateUserEmailById.bind(this);
        this.updateUserPasswordById = this.updateUserPasswordById.bind(this);
        this.deleteUserById = this.deleteUserById.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }
    async createUser(user){
        try {
            const newUser = await this.UserRepository.createUser(user);
            const token = await Utils.generateAuthToken('user',newUser._id);
            const createdUser = await this.UserRepository.getUserById(newUser._id);
            const authenticatedUser = await Utils.authenticateLogger('user',token,createdUser);
            return authenticatedUser;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getUserById(id){
        try {
            return await this.UserRepository.getUserById(id);
        } catch (error) {
            
        }
    }
    async getUserNameById(id){
        try {
            return await this.UserRepository.getUserNameById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async getUserEmailById(id){
        try {
            return await this.UserRepository.getUserEmailById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAllUsers(){
        try {
            return await this.UserRepository.getAllUsers();
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateUserNameById(id,name){
        try {
            const user = await this.UserRepository.getUserNameById(id);
            user.name = name;
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateUserEmailById(id,email){
        try {
            const user = await this.UserRepository.getUserEmailById(id);
            user.email = email;
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteUserById(id){
        try {
            return await this.UserRepository.deleteUserById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateUserPasswordById(id,password){
        try {
            return await this.UserRepository.updateUserPasswordById(id,password);
        } catch (error) {
            throw new Error(error);
        }
    }
    async loginUser(email,password){
        try {
            const user = await Utils.findByCredentials('user',email,password);
            const token = await Utils.generateAuthToken('user',user._id);
            const authenticatedUser = await Utils.authenticateLogger('user',token,user);
            await authenticatedUser.save();
            return authenticatedUser ;
        } catch (error) {
            throw new Error(error);
        }
    }
    async logoutUser(user,token){
        try {
            const loggedOutUser = await this.UserRepository.removeUsersToken(user,token);
            if(!loggedOutUser){
                return ('User could not be remover');
            }
            return ('user '+loggedOutUser.email+' has been logged out');
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = UserService;
