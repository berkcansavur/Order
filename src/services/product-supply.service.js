class ProductSupplyService{
    constructor({ProductSupplyRepository}){
        this.ProductSupplyRepository = ProductSupplyRepository;
        this.createProductSupply = this.createProductSupply.bind(this);
    }
    async createProductSupply(product,quantity,prefferredSupplyDate,toWarehouseId,fromWarehouseId){
        try {
            const productSupply = await this.ProductSupplyRepository.createProductSupply(product,quantity,prefferredSupplyDate,toWarehouseId,fromWarehouseId);
            return productSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = ProductSupplyService;