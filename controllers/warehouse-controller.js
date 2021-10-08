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

        const doc = await Warehouse.updateOne({warehousename: warehousename, 'items.name': {$ne: name}}, {$addToSet: {items: {name: name, quantity: quantity, pallets: pallets}}} );
        if(doc.modifiedCount === 0) throw {error: 'The item already exists in this warehouse. Edit it, or re-enter this item under a different name.'};

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

