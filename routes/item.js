const router = require('express').Router();
const {resolve} = require('path');
const {addItem, getAllItems} = require('../controllers/item-controller.js');


router.get('/', async (req,res) =>{
    try
    {
        const items = await getAllItems();
        res.status(200).json(items);
    } catch(err)
    {
        res.status(500).json(err);
    }
})

router.post('/', async (req,res) =>{
    try
    {
        const data = await addItem(req.body);
        console.log(data);
        res.sendFile(resolve('public','views','index.html/'));
    } catch(err)
    {
        res.status(500).json(err);
    }
    
})

module.exports = router;