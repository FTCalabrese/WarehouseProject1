const Company = require('../models/Company.js');
const mongoose = require('mongoose');
const { MongoDriverError } = require('mongodb');

const getAllCompanies = async() =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);
        const companies = await Company.find();
        if(companies.length === 0) throw {status: 500, error: 'no'};
        mongoose.connection.close();
        return companies;
    }
    catch(err)
    {
        mongoose.connection.close();
        throw err;
    }
}



module.exports = 
{
    getAllCompanies
}