const router = require('express').Router();
const {resolve} = require('path');
const {getAllCompanies} = require('../controllers/company-controller.js');


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


module.exports = router;