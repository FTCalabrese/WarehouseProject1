const router = require('express').Router();
const {resolve} = require('path');
const {getInventory, addWarehouse, deleteWarehouse} = require('../controllers/warehouse-controller.js');


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
router.get('/*', async (req,res) =>{
   // res.sendFile(resolve('public', 'views', 'warehouses.html'));
   throw res.status(500).json(err);
})

router.post('/', async (req,res) =>{
    try
    {
        const data = await addWarehouse(req.body);
        console.log(data);
        res.sendFile(resolve('public','views','index.html'));
        
    } catch(err)
    {
        res.status(500).json(err);
    }
})

router.delete('/delete/:warehousename/:name/:quantity/:pallets', async (req,res) =>{
    try
    {
        const data = await deleteWarehouse(req.params.warehousename,req.params.name, req.params.quantity, req.params.pallets);
        console.log(data);
        res.status(200).json({message: `deleted.`});
    }
    catch(err)
    {
        res.status(500).json({message: `Unable to delete item.`});
    }
    
})

module.exports = router;