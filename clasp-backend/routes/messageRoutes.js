const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Message, Conversation } = require('../models/Conversation');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const requireAuth = require('../middlewares/requireAuth');


const router = express.Router();

const saltRounds = 15;

router.post('/createmessage/:conversationID', requireAuth, async (req, res) => {
    let message = req.body;

    message = new Message(message);

    await Conversation.findOneAndUpdate({ _id: req.params.conversationID, users: req.user }, {$push: {messages: message}});

    res.send('Request received');
});

router.post('/createconversation', requireAuth, async (req, res) => {
    const sender = req.user;
    let previousConvos = [];

    Conversation.find({users: sender._id}, 'users', (err, users) => {
        previousConvos = [...new Set(users.flat())];
    });

    User.findOne({conditions: sender.conditions[0], _id: { $nin: previousConvos}}, (err, user) => {
        if(user && !err){
            const recipient = user;
            const conversation = new Conversation({messages: [], users: [sender, recipient]});
    
            conversation.save();
            res.send(conversation._id);
        } else {
            return res.status(500).send("Cannot find eligable conversation partner.");
        }
    });
});

// router.get('/conversation/:conversationID', requireAuth, async (req, res) => {
//     Conversation.findOne({_id: req.params.conversationID}, (err, conversation) => {
//         if(err){
//             res.send("error");
//         } else {
//             res.send(conversation);
//         }
//     });
// });

router.get('/conversations', requireAuth, async (req, res) => {
    Conversation.find({users: req.user}, (err, conversations) => {
        if(err){
            res.send("error");
        } else {
            res.send(conversations);
        }
    })
});

module.exports = router;