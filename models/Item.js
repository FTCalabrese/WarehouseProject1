const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    size:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number, 
        required: true
    },
    department: String
})

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;