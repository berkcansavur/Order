const mongoose = require('mongoose');
class ProductSupplyRepository{
    constructor({ProductSupplySchema,WarehouseRepository}){
        this.ProductSupply= ProductSupplySchema;
        this.WarehouseRepository = WarehouseRepository;
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
    async assingRecievedProductSupplyToWarehouse(productSupply){
        try {
            const warehouse = await this.WarehouseRepository.getWarehouseById(productSupply.toWarehouseId);
            const supply = await this.ProductSupply({
                ...productSupply
            });
            

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
