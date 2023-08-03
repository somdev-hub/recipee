/**
 * @module src/datasources/models/order-placed
 * @filename order-placed.js
 * @namespace OrderPlaced
 * @fileoverview OrderPlaced model
 * @description This file defines the order-placed model
 */

import mongoose from 'mongoose';

export const OrderPlaced= mongoose.model('OrderPlaced', {
    restaurantId: String,
    customerEmail: String,
    orderId: String,
    orderDate: Date,
    orderStatus: String,
    orderItems: Array,
})