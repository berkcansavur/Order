class ProductService{
    constructor({ProductRepository}){
        this.ProductRepository = ProductRepository;
        this.registerProduct = this.registerProduct.bind(this);
    }
    async registerProduct(inputProduct){
        try {
            const product = await this.ProductRepository.registerProduct(inputProduct);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = ProductService;