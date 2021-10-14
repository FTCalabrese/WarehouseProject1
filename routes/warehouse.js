const router = require('express').Router();
const {resolve} = require('path');
const {getInventory, addToWarehouse, deleteFromWarehouse, updateInWarehouse} = require('../controllers/warehouse-controller.js');


router.get('/', async (req,res) =>{
    try
    {
        const items = await getInventory();
        res.status(200).json(items);
    } catch(err)
    {
        res.status(500).json(err);
    }
})
router.get('/:companyName', async (req,res) =>{
    res.sendFile(resolve('public', 'views', 'warehouses.html'));
 })

 router.put('/update/:warehousename/:name/:quantity/:pallets/:newname/:newquantity/:newpallets', async (req,res) =>{
    try
    {
        const data = await updateInWarehouse(req.params.warehousename, req.params.name, req.params.quantity, req.params.pallets, req.params.newname, req.params.newquantity, req.params.newpallets);
        console.log(data);
        res.status(200).json({message: `updated`});
    }
    catch(err)
    {
        res.status(500).json({message: `Unable to update item.`});
    }
})

router.post('/', async (req,res) =>{
    try
    {
        const data = await addToWarehouse(req.body);
        console.log(data);
        
    } catch(err)
    {
        res.status(500).json(err);
    }
})

router.delete('/delete/:warehousename/:name/:quantity/:pallets', async (req,res) =>{
    try
    {
        const data = await deleteFromWarehouse(req.params.warehousename,req.params.name, req.params.quantity, req.params.pallets);
        console.log(data);
        res.status(200).json({message: `deleted.`});
    }
    catch(err)
    {
        res.status(500).json({message: `Unable to delete item.`});
    }
})

router.get('/*', async (req,res) =>{
    res.sendFile(resolve('public', 'views', 'index.html'));
 })

module.exports = router;