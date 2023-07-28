import mongoose from 'mongoose';

export const OrderPlaced= mongoose.model('OrderPlaced', {
    restaurantId: String,
    customerEmail: String,
    orderId: String,
    orderDate: Date,
    orderStatus: String,
    orderItems: Array,
})