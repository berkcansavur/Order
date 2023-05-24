class ProductSupplyService{
    constructor({ProductSupplyRepository}){
        this.ProductSupplyRepository = ProductSupplyRepository;
        this.createProductSupplyRequest = this.createProductSupplyRequest.bind(this);
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