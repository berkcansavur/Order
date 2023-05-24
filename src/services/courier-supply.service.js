class CourierSupplyService{
    constructor({CourierSupplyRepository}){
        this.CourierSupplyRepository = CourierSupplyRepository;
        this.createCourierSupplyRequest = this.createCourierSupplyRequest.bind(this);
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