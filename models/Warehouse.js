const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    quantity: Number,
    pallets: Number
})

const warehouseSchema = new Schema({
    warehousename: String,
    capacity: Number,
    items: [itemSchema],
    inventory: Number
})



const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;