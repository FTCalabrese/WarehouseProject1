const Warehouse = require('../models/Warehouse.js');
const mongoose = require('mongoose');

const getInventory = async() =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);
        const inventory = await Warehouse.find();
        if(inventory.length === 0) throw {status: 500, error: 'no'};
        mongoose.connection.close();
        return inventory;
    }
    catch(err)
    {
        mongoose.connection.close();
        throw err;
    }
}

const addWarehouse = async({warehousename, name, quantity, pallets}) =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);

        //const itemExists = await Warehouse.exists({items[0]: name});
        //console.log(itemExists);
        //if(itemExists) 
        //{
         //   throw {error: 'This warehouse already contains an item of that name. Differentiate the name, or edit the existing item.'};
        //}

        await Warehouse.findOneAndUpdate({warehousename: warehousename}, {$addToSet: {items: [{name: name, quantity: quantity, pallets: pallets}]}} );

        mongoose.connection.close();
        return {status: 201, message: `item added successfully`};
    }
    catch(err)
    {
        mongoose.connection.close();
        return {status: 400, err};
    }
}

const deleteWarehouse = async(warehousename, name, quantity, pallets) =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);

        if(! await Warehouse.exists({warehousename: warehousename})) 
        {
            throw {error: 'Warehouse does not exist, or is not owned by this company.'};
        }

        await Warehouse.findOneAndUpdate({warehousename: warehousename, name: name}, {$pull: {items: {name: name, quantity: quantity, pallets: pallets}}});
        mongoose.connection.close();
        return {status: 200, message: `item removed successfully`};
    }
    catch(err)
    {
        mongoose.connection.close();
        return {status: 400, error: err};
    }
}

module.exports = 
{
    getInventory,
    addWarehouse,
    deleteWarehouse
}

