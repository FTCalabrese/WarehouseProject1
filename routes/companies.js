const router = require('express').Router();
const {resolve} = require('path');
const {getAllCompanies, addCompany} = require('../controllers/company-controller.js');


router.get('/', async (req,res) =>{
    try
    {
        const items = await getAllCompanies();
        res.status(200).json(items);
    } catch(err)
    {
        res.status(500).json(err);
    }
})

router.post('/:name/:desc', async (req,res) =>{
    try
    {
        const data = await addCompany(req.params.name, req.params.desc);
        console.log(data);
        res.status(201).json({message: `created.`});
        
    } catch(err)
    {
        res.status(500).json(err);
    }
})

module.exports = router;