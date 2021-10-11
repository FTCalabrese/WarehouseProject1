const router = require('express').Router();
const {resolve} = require('path');

router.get('/', (req,res) => {
    res.sendFile(resolve('public', 'views', 'addItem.html'));
})

router.get('/newcompany', (req,res) => {
    res.sendFile(resolve('public', 'views', 'addCompany.html'));
})

router.get('/:company', (req,res) => {
    res.sendFile(resolve('public', 'views', 'addItem.html'));
})



module.exports = router;