class ProductSupplyService{
    constructor({ProductSupplyRepository,WarehouseRepository,ProductRepository}){
        this.ProductSupplyRepository = ProductSupplyRepository;
        this.WarehouseRepository = WarehouseRepository;
        this.ProductRepository = ProductRepository;
    }
    async createProductSupplyRequest(productSupplyRequest){
        try {
            const product = await this.ProductRepository.findById(productSupplyRequest.productId.toString());
            const toWarehouse = await this.WarehouseRepository.getWarehouseById(productSupplyRequest.toWarehouseId.toString());
            const fromWarehouse = await this.WarehouseRepository.getWarehouseById(productSupplyRequest.fromWarehouseId.toString());
            const quantity =productSupplyRequest.quantity;
            const preferredSupplyDate = productSupplyRequest.preferredSupplyDate;
            const productSupply = await this.ProductSupplyRepository.createProductSupply(product,toWarehouse,fromWarehouse,quantity,preferredSupplyDate);
            return productSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = ProductSupplyService;