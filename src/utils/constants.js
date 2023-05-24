const OrderStatus=Object.freeze({
    CREATED: 100,
    APPROVED: 200,
    PREPARING_STARTED: 300,
    PREPARING_COMPLETED: 310,
    ONTHEWAY: 400,
    DELIVERED: 500,
    DENIED: 600,
    CANCELLED: 700
});
const ProductSupplyStatus=Object.freeze({
    CREATED:100,
    APPROVED:200,
    ONTHEWAY:300,
    DELIVERED:400,
    REJECTED:500,
});
const CourierSupplyStatus=Object.freeze({
    CREATED:100,
    APPROVED:200,
    ONTHEWAY:300,
    DELIVERED:400,
    REJECTED:500,
});
module.exports={OrderStatus,ProductSupplyStatus,CourierSupplyStatus}
