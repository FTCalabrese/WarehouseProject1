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

const addToWarehouse = async({warehousename, name, quantity, pallets}) =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);

        //check if there is enough space in the warehouse for this item
        const hasSpace = await Warehouse.exists({warehousename: warehousename, inventory: {$gte: pallets}});
        if(!hasSpace) throw {error: 'There is not enough space in the warehouse.'};

        //check if an item of this name already exists, if not it will be added
        const doc = await Warehouse.updateOne({warehousename: warehousename, 'items.name': {$ne: name}}, {$addToSet: {items: {name: name, quantity: quantity, pallets: pallets}}});
        if(doc.modifiedCount === 0) throw {error: 'That item already exists in this warehouse. Edit the existing entry, or re-enter this item under a different name.'};
        

        //if no error has been thrown, reflect changes in warehouses capacity
        await Warehouse.findOneAndUpdate({warehousename: warehousename}, {$inc: {inventory: -pallets}});

        mongoose.connection.close();
        return {status: 201, message: `item added successfully`};
    }
    catch(err)
    {
        mongoose.connection.close();
        return {status: 400, err};
    }
}

const updateInWarehouse = async(warehousename, name, quantity, pallets, newname, newquantity, newpallets) =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);

        const check = await Warehouse.exists({warehousename: warehousename, 'items.name': {$eq: newname}});
        if(check == true && newname !== name) throw {error: 'That item already exists in this warehouse.'};

        await Warehouse.findOneAndUpdate({warehousename: warehousename, 'items.name': {$eq: name}},
            {'$set': {'items.$.name' : newname, 'items.$.quantity' : newquantity, 'items.$.pallets' : newpallets}});

        //update pallets
        await Warehouse.findOneAndUpdate({warehousename: warehousename}, {$inc: {inventory: pallets}}); //increment
        await Warehouse.findOneAndUpdate({warehousename: warehousename}, {$inc: {inventory: - newpallets}}); //increment

        mongoose.connection.close();
        return {status: 200, message: `item edited successfully`};
    }
    catch(err)
    {
        mongoose.connection.close();
        return {status: 400, error: err};
    }

}

const deleteFromWarehouse = async(warehousename, name, quantity, pallets) =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);

        if(! await Warehouse.exists({warehousename: warehousename})) 
        {
            throw {error: 'Warehouse does not exist, or is not owned by this company.'};
        }
        //, name: name
        await Warehouse.findOneAndUpdate({warehousename: warehousename}, {$pull: {items: {name: name, quantity: quantity, pallets: pallets}}});//remove

        await Warehouse.findOneAndUpdate({warehousename: warehousename}, {$inc: {inventory: pallets}}); //increment

        mongoose.connection.close();
        return {status: 200, message: `item removed successfully`};
    }
    catch(err)
    {
        mongoose.connection.close();
        return {status: 400, error: err};
    }
}

const newWarehouse = async({_ownerId, warehousename, capacity}) =>{
    try
    {
        await mongoose.connect(process.env.ATLAS_URI);
        const warehouse = new Warehouse({items: [], warehousename, _ownerId, capacity, inventory: capacity});

        await warehouse.save();
        mongoose.connection.close();
        return {status: 201, message: `${warehousename} added successfully`};
    }
    catch(err)
    {
        mongoose.connection.close();
        return{status: 500, error: 'could not add company.'};
    }
}

module.exports = 
{
    getInventory,
    addToWarehouse,
    deleteFromWarehouse,
    updateInWarehouse,
    newWarehouse
}

