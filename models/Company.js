const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: String,
    warehouses: [{type: Schema.Types.ObjectId, ref: 'Warehouse'}]
})

const Company = mongoose.model('Company', companySchema);
module.exports = Company;