const mongoose = require('mongoose');

const UserIDSchema = new mongoose.Schema({
    conditions: {
        type: Array,
        required: true
    },
    userCode: {
        type: String,
        required: true,
        unique: true
    }
});

mongoose.model('UserID', UserIDSchema);