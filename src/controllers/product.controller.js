class ProductController{
    constructor({ProductService}){
        this.ProductService = ProductService;
    }
    async registerProduct(req,res){
        try {
            const product = await this.ProductService.registerProduct(req.body);
            return res.status(201).send(product);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }
} 
module.exports = ProductController;