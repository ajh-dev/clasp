const mongoose = require('mongoose');

const userIDSchema = new mongoose.Schema({
    conditions: {
        type: Array,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    img:{
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'ProfileImage'
    }
});


const User = mongoose.model('User', userIDSchema);

const UserProfile = User.discriminator('UserProfile', userProfileSchema);

module.exports = { User, UserProfile };