const Item = require('../models/Item.js');
const mongoose = require('mongoose');
const { MongoDriverError } = require('mongodb');

const addItem = async({name, size, quantity}) =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);
        if(size <= 0 || quantity <=0) throw err;
        const item = new Item({name, size, quantity});

        await item.save();
        mongoose.connection.close();
        return{status:201, message: 'Item added successfully.'}
    }
    catch(err)
    {
        mongoose.connection.close();
        console.log(err);
        return {status: 500, error: 'Could not create item.'};
    }
}

const getAllItems = async() =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);
        const items = await Item.find();
        if(items.length === 0) throw {status: 500, error: 'no'};
        mongoose.connection.close();
        return items;
    }
    catch(err)
    {
        mongoose.connection.close();
        throw err;
    }
}

module.exports = 
{
    addItem,
    getAllItems
}