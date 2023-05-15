const mongoose = require('mongoose');
class CourierRepository{
    constructor({CourierSchema}){
        this.Courier = mongoose.model('Courier',CourierSchema);
        this.createCourier = this.createCourier.bind(this);
        this.updateCourierById = this.updateCourierById.bind(this);
        this.deleteCourierById = this.deleteCourierById.bind(this);
        this.removeCouriersToken= this.removeCouriersToken.bind(this);
        this.getCourierWarehouseById = this.getCourierWarehouseById.bind(this);
        this.removeCourierOrderById =this.removeCourierOrderById.bind(this);
        this.getCourierOrdersById = this.getCourierOrdersById.bind(this);
    }
    async createCourier(courier){
        try {
            const newCourier = await this.Courier({
                ...courier
            });
            await newCourier.save();
            return newCourier;
        } catch (error) {
            throw new Error('Courier could not be created.');
        }
    }
    async updateCourierById(id,updates){
        try {
            const updatedCourier = await this.Courier.findByIdAndUpdate(id,updates);
            await updatedCourier.save();
            return updatedCourier;
        } catch (error) {
            throw new Error('Courier could not be updated.');
        }
    }
    async getCourierById(id){
        try {
            const courier = await this.Courier.findById(id.toString());
            return courier;
        } catch (error) {
            throw new Error('Courier has not found.')
        }
    }
    async deleteCourierById(id){
        try {
            const courier = await this.Courier.findByIdAndDelete(id.toString());
            return courier;
        } catch (error) {
            throw new Error('Courier has not been deleted.')
        }
    }
    async removeCouriersToken(courier,token){
        try {
            courier.tokens = courier.tokens.filter((Tokens)=>{
                return Tokens.token !== token
                });
                await courier.save();
                return courier;
        } catch (error) {
            throw new Error('Courier has not been logged out.');
        }
    }
    async getCourierWarehouseById(id){
        try {
            const courier = await this.Courier.findById(id.toString());
            const couriersWarehouse = courier.warehouse;
            return couriersWarehouse;
        } catch (error) {
            throw new Error(error);
        }
    }
    async removeCourierOrderById(id,order){
        try {
            
            const courier = await this.Courier.findById(id.toString());
            courier.orders = order.orders.filter((Orders)=>{
                return Orders.order!== order;
            });
            await courier.save();
            return courier;
            

        } catch (error) {
            throw new Error(error);
        }
    }
    async getCourierOrdersById(id){
        try {
            const courier = await this.Courier.findById(id.toString());
            const orders = courier.orders;
            return orders; 
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = CourierRepository;