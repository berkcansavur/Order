const mongoose = require('mongoose');
class UserRepository{
    constructor({UserSchema}){
        this.User = mongoose.model('User',UserSchema);
        this.createUser = this.createUser.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.deleteUserById = this.deleteUserById.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserNameById = this.getUserNameById.bind(this);
        this.getUserEmailById = this.getUserEmailById.bind(this);
        this.updateUserEmailById = this.updateUserEmailById.bind(this);
        this.updateUserNameById = this.updateUserNameById.bind(this);
        this.updateUserPasswordById = this.updateUserPasswordById.bind(this);
        this.removeUsersToken = this.removeUsersToken.bind(this);
    }   
    async createUser(user){
        try {
            const newUser = await this.User({
                ...user
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getUserById(id){
        try {
            const user = await this.User.findById(id.toString());
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAllUsers(){
        try {
            const users = await this.User.find();
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getUserNameById(id){
        try {
            const user = await this.User.findById(id);
            return user.name;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getUserEmailById(id){
        try {
            const user = await this.User.findById(id);
            return user.email;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateUserNameById(id, name){
        try {
            const user = await this.User.findById(id);
            user.name = name;
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateUserEmailById(id, email){
        try {
            const user = await this.User.findById(id);
            user.email = email;
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateUserPasswordById(id, password){
        try {
            const user = await this.User.findById(id);
            user.password = password;
            await user.save();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteUserById(id){
        try {
            const user = await this.User.findByIdAndRemove(id.toString());
            return user;
        } catch (error) {
            throw new Error('Users could not be removed.');
        }
    }
    async removeUsersToken(user,token){
        try {
                user.tokens = user.tokens.filter((Tokens)=>{
                return Tokens.token !== token
                });
                await user.save();
                return user;
            } 
            catch (error) {
                return ('Users token could not be removed.')
            }
    }
}
module.exports = UserRepository;