class UserRepository{
    constructor({User}){
        this.User = User;
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
            const user = await this.User.findById(id);
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
            const user = await this.User.findById(id);
            await user.remove();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = UserRepository;