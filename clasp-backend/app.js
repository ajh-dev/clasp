const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/accountRoutes');
const messageRoutes = require('./routes/messageRoutes');
var cors = require('cors');
const { createServer } = require('http');

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(accountRoutes);
app.use(messageRoutes);

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

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});