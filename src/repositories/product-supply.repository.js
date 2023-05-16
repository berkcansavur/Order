const mongoose = require('mongoose');
class ProductSupplyRepository{
    constructor({ProductSupplySchema,WarehouseRepository,ProductRepository,}){
        this.ProductSupply= mongoose.model('ProductSupply',ProductSupplySchema);
        this.WarehouseRepository = WarehouseRepository;
        this.ProductRepository = ProductRepository;
    }
    async createProductSupply(product,quantity,prefferredSupplyDate,toWarehouseId,fromWarehouseId){
        try {
        } catch (error) {
            throw new Error(error);
        }
    }
    async getProductSupply(productSupply){
        try {
            const supply = await this.ProductSupply({
                ...ProductSupply
            })
            await supply.save();
            return supply;
        } catch (error) {
            throw new Error(error);
        }
    }
    async sendProductSupply(productSupply){
        try {
            const supply = await this.ProductSupply({
                ...productSupply
            });
            await supply.save();
            return supply;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = ProductSupplyRepository;
