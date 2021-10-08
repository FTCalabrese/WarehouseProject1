const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    warehousename: String,
    capacity: Number,
    items: [{name: String, quantity: Number, pallets: Number}]
})

const itemSchema = new Schema({
    name: String,
    quantity: Number,
    pallets: Number
})

const Warehouse = mongoose.model('Warehouse', warehouseSchema);
const Item = mongoose.model('Item', itemSchema)

module.exports = Warehouse;