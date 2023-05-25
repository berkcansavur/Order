const mongoose = require('mongoose');
const {CourierSupplyStatus} = require('../utils/constants');
class CourierSupplyRepository{
    constructor({CourierSupplySchema,WarehouseRepository,CourierRepository,}){
        this.CourierSupply = mongoose.model('CourierSupply',CourierSupplySchema);
    }
    async createCourierSupply(courier,preferredSupplyDate,toWarehouse,fromWarehouse){
        try {
            const newProductSupply = await this.ProductSupply({
                courier: courier,
                preferredSupplyDate:preferredSupplyDate,
                toWarehouse: toWarehouse,
                fromWarehouse : fromWarehouse,
                status: CourierSupplyStatus.CREATED,
            })
            await newProductSupply.save();
            return newProductSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getCourierSupplyById(courierSupplyId){
        try {
            const courierSupply = await this.CourierSupply.findById(courierSupplyId.toString());
            return courierSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAllCourierSupplies (){
        try {
            const courierSupplies = await this.CourierSupply.find();
            return courierSupplies;
        } catch (error) {
            throw new Error(error);
        }
    }
    async approveCourierSupply(courierSupply){
        //productId,quantity,preferredSupplyDate,toWarehouseId,fromWarehouseId
        try {
            const courierSupplyToUpdate  = await this.CourierSupply.findById(courierSupply._id);
            courierSupplyToUpdate.status = CourierSupplyStatus.APPROVED;
            await courierSupplyToUpdate.save();
            return courierSupplyToUpdate;
        } catch (error) {
            throw new Error(error);
        }
    }
    async rejectCourierSupply(courierSupply){
        try {
            const courierSupplyToUpdate = await this.CourierSupply.findById(courierSupply._id);
            courierSupplyToUpdate.status = CourierSupplyStatus.REJECTED;
            await courierSupplyToUpdate.save();
            return courierSupplyToUpdate;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = CourierSupplyRepository;
