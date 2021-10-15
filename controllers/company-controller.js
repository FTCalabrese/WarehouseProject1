const Company = require('../models/Company.js');
const mongoose = require('mongoose');

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

const checkCompanyExists = async({name}) =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);
        const exists = await Company.exists({name: name});
        mongoose.connection.close();
        return exists;

    }
    catch(err)
    {
        mongoose.connection.close();
        throw err;
    }
}

const addCompany = async(name, desc)=>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);

        const exists = await Company.exists({name: name});
        if(exists) throw {error: 'That Company already exists.'};

        const company = new Company({name, desc});

        await company.save();
        mongoose.connection.close();
        return {status: 201, message: `${name} added successfully`};
    }
    catch(err)
    {
        mongoose.connection.close();
        throw {status: 400, err};
    }
}


module.exports = 
{
    getAllCompanies, addCompany, checkCompanyExists
}