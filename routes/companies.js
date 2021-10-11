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

router.post('/', async (req,res) =>{
    try
    {
        const data = await addCompany(req.body);
        console.log(data);
        
    } catch(err)
    {
        res.status(500).json(err);
    }
})

module.exports = router;