const mongoose = require('mongoose');
const User = require('./User');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }, 
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    timestamp: {
        type: Date,
        required: true
    }
});

const conversationSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    messages: [messageSchema],
    pending: {
        type: Boolean
    }
});

const Message = mongoose.model('Message', messageSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = { Message, Conversation };