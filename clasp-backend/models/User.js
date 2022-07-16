const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
    },
    conditions: {
        type: Array
    },
    img:{
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'ProfileImage'
    },
    password: {
        type: String,
        required: true
    },
});


mongoose.model('User', userSchema);