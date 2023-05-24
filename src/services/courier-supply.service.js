class CourierSupplyService{
    constructor({CourierSupplyRepository,WarehouseRepository,CourierRepository}){
        this.CourierSupplyRepository = CourierSupplyRepository;
        this.WarehouseRepository = WarehouseRepository;
        this.CourierRepository = CourierRepository;
    }
    async createCourierSupplyRequest(courierSupplyRequest){
        try {
            const courier = await this.CourierRepository.findById(courierSupplyRequest.courierId.toString());
            const toWarehouse = await this.WarehouseRepository.getWarehouseById(courierSupplyRequest.toWarehouseId.toString());
            const fromWarehouse = await this.WarehouseRepository.getWarehouseById(courierSupplyRequest.fromWarehouseId.toString());
            const courierSupply = await this.CourierSupplyRepository.createCourierSupply(courier,courierSupplyRequest.preferredSupplyDate,toWarehouse,fromWarehouse);
            return courierSupply;
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = CourierSupplyService;