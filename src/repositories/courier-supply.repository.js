const mongoose = require('mongoose');
const {CourierSupplyStatus} = require('../utils/constants');
class CourierSupplyRepository{
    constructor({CourierSupplySchema,WarehouseRepository,CourierRepository,}){
        this.CourierSupply = mongoose.model('CourierSupply',CourierSupplySchema);
        this.WarehouseRepository = WarehouseRepository;
        this.CourierRepository = CourierRepository;
        this.createCourierSupply = this.createCourierSupply.bind(this);
        this.getCourierSupplyById = this.getCourierSupplyById.bind(this);
        this.getAllCourierSupplies = this.getAllCourierSupplies.bind(this);
        this.approveCourierSupply = this.approveCourierSupply.bind(this);
        this.rejectCourierSupply =this.rejectCourierSupply.bind(this);
    }
    async createCourierSupply(courierId,preferredSupplyDate,toWarehouseId,fromWarehouseId){
        try {
            const courier = await this.CourierRepository.findById(courierId.toString());
            const toWarehouse = await this.WarehouseRepository.getWarehouseById(toWarehouseId.toString());
            const fromWarehouse = await this.WarehouseRepository.getWarehouseById(fromWarehouseId.toString());
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
