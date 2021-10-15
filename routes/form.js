const router = require('express').Router();
const {resolve} = require('path');
const {newWarehouse} = require('../controllers/warehouse-controller.js');

router.get('/', (req,res) => {
    res.sendFile(resolve('public', 'views', 'addItem.html'));
})

router.get('/newcompany', (req,res) => {
    res.sendFile(resolve('public', 'views', 'addCompany.html'));
})

router.get('/warehouse', (req,res) => {
    res.sendFile(resolve('public', 'views', 'addWarehouse.html'));
})

router.get('/:company', (req,res) => {
    res.sendFile(resolve('public', 'views', 'addItem.html'));
})

router.post('/:_ownerId/:warehousename/:capacity', async (req,res) =>{
try
{
    const data = await newWarehouse(req.params._ownerId, req.params.warehousename, req.params.capacity);
    console.log(data);
    res.status(201).json({message: `created`});
        
} catch(err)
{
    res.status(500).json(err);
}
})


module.exports = router;