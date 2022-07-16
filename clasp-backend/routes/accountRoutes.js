const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const UserID = mongoose.model('UserID');
const bcrypt = require('bcrypt');

const router = express.Router();

const saltRounds = 15;

router.post('/createuserprofile', async(req, res) => {
    let newUserInfo = req.body;

    try{
        bcrypt.hash(newUserInfo.password, saltRounds, async (err, hash) => {
            if(err){
                console.log(err);
            } else {
                const user = new User({...newUserInfo, password: hash});
                await user.save();
                const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
                res.send({ token });
            }
        });
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/createuserid', async(req, res) => {
    const { condition } = req.body;
    let userCode = (Math.random() + 1).toString(36).substring(7).toString().toUpperCase();

    const checkID = () => {
        UserID.find({ userCode }, function (err, result) {
            if(result){
                userCode = (Math.random() + 1).toString(36).substring(7).toString().toUpperCase();
                checkID();
            }
        });   
    };

    checkID();

    try{
        bcrypt.hash(userCode, saltRounds, async (err, hash) => {
            if(err){
                console.log(err);
            } else {
                const user = new UserID({ condition, userCode: hash });
                await user.save();
        
                const token = jwt.sign({ userID: user._id }, 'MY_SECRET_KEY');
                res.send({ token, userCode });   
            }
        });
    } catch(err) {
        return res.status(422).send(err.message);
    }
})

module.exports = router;