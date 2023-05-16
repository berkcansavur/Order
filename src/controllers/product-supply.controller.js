class ProductSupplyController{
    constructor({ProductSupplyService}){
        this.ProductSupplyService = ProductSupplyService;
        this.createProductSupply = this.createProductSupply.bind(this);
    }
    async createProductSupply(req,res){
        try {
            const productSupply =await this.ProductSupplyService.createProductSupply(req.body);
            return res.status(201).send(productSupply);
        } catch (error) {
            return res.status(404).send(error);
        }
    }
}
module.exports = ProductSupplyController;