const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    pallets: {type: Number, required: true}
})

const warehouseSchema = new Schema({
    warehousename: {type: String, required: true, unique: true},
    _ownerId: {type: String, required: true},
    capacity: {type: Number, required: true},
    items: [itemSchema],
    inventory: {type: Number, required: true}
})

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;