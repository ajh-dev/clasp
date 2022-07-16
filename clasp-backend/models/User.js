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
        type: Array,
        required: true
    },
    img:{
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'ProfileImage'
    },
    password: {
        type: String,
    },
});


mongoose.model('User', userSchema);