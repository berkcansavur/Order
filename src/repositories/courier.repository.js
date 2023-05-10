const mongoose = require('mongoose');
class CourierRepository{
    constructor({CourierSchema}){
        this.Courier = mongoose.model('Courier',CourierSchema);
        this.createCourier = this.createCourier.bind(this);
        this.updateCourierById = this.updateCourierById.bind(this);
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
}
module.exports = CourierRepository;