'use strict'

const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const BookingShema = Shema({
    name: String,
    Idhost: Number,
    days: Number,
    amount: {type:Number, default:1},
    discount: {type: Number, default:0},
    room: {type: String, enum:['sencilla', 'doble', 'familiar']}

});

module.exports = mongoose.model('Booking', BookingShema);