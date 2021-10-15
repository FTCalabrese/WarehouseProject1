const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {type: String, required: true, unique: true},
    desc: String
})

const Company = mongoose.model('Company', companySchema);
module.exports = Company;