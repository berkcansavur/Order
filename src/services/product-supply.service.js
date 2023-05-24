class ProductSupplyService{
    constructor({ProductSupplyRepository}){
        this.ProductSupplyRepository = ProductSupplyRepository;
    }
    async createProductSupplyRequest(productSupplyRequest){
        try {
            const productSupply = await this.ProductSupplyRepository.createProductSupply(productSupplyRequest);
            return productSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = ProductSupplyService;