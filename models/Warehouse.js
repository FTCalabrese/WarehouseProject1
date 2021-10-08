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
    items: [itemSchema]
})



const Warehouse = mongoose.model('Warehouse', warehouseSchema);
//const Item = mongoose.model('Item', itemSchema);

module.exports = Warehouse;