//const exp = require('constants');
const express = require('express');
const {resolve} = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8088;
console.log(port);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//ROUTES
app.use('/forms', require('./routes/form.js'));
app.use('/companies', require('./routes/companies.js'));
app.use('/warehouse', require('./routes/warehouse.js'));

//RESPONSES
app.get('/', (req, res) => {
    res.sendFile(resolve('public', 'views', 'index.html'));
});

app.get('*', (req, res) => {
    //res.sendFile(resolve('public', 'views', 'notFound.html'));
    res.status(404).sendFile(resolve('public', 'views', 'notFound.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});