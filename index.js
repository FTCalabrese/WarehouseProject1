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
app.use('/form', require('./routes/form.js'));
app.use('/item', require('./routes/item.js'));

//RESPONSES
app.get('/', (req, res) => {
    res.sendFile(resolve('public', 'views', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(resolve('public', 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});