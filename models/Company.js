const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    warehouses:[{
        capacity: Number,
        items: [{
            name: String,
            quantity: Number,
            pallets: Number
        }]
    }]
})

const Item = mongoose.model('Company', itemSchema);
module.exports = Company;