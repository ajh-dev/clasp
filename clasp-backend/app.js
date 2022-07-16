require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountRoutes');
var cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(accountRoutes);

mongoose.connect("mongodb://localhost:27017/claspUserDB");

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', err => {
    console.log('Error connecting to mongo', err);
})

app.get('/', (req, res) => {
    res.send('Hi there');
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});