class CourierSupplyService{
    constructor({CourierSupplyRepository}){
        this.CourierSupplyRepository = CourierSupplyRepository;
    }
    async createCourierSupplyRequest(courierSupplyRequest){
        try {
            const courierSupply = await this.CourierSupplyRepository.createCourierSupply(courierSupplyRequest);
            return courierSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = CourierSupplyService;