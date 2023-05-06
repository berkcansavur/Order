class UserRepository{
    constructor({userRepository}){
        this.userRepository = userRepository;
    }
    async createUser(user){
        try {
            return this.UserRepository.createUser(user);
        } catch (error) {
            throw new Error(error);
        }
    }
}