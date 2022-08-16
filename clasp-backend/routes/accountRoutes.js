const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { User, UserProfile } = require("../models/User");
const bcrypt = require("bcrypt");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

const saltRounds = 15;

router.post("/user", async (req, res) => {
    try{
        if(req.body.name && req.body.password){
            User.find({name: req.body.name}, (err, result) => {
                if(err){
                    return res.status(422).send(err.message);
                }
                if(result.length === 1){
                    bcrypt.compare(req.body.password, result[0].password, (err, result) => {
                        if(err){
                            return res.status(422).send(err.message);
                        } else if(result){
                            res.send({result, token: jwt.sign({ userID: result._id }, "MY_SECRET_KEY")});
                        }
                    })
                } else {
                    res.send({result: false})
                }
            })
        } else if (req.body.condition && req.body.ID){
            User.find({ __t: null, conditions: req.body.condition}, (err, result) => {
                if(err){
                    return res.status(422).send(err.message);
                } else if(result.length === 0){
                    res.send({result: false})
                } else {
                    for(let i = 0; i < result.length; i++){
                        bcrypt.compare(req.body.ID, result[i].password, (err, check) => {
                            if(err){
                                return res.status(422).send(err.message);
                            } else if(check){
                                return res.send({result: check, token: jwt.sign({ userID: result[i]._id }, "MY_SECRET_KEY")});
                            } else if(i === result.length - 1){
                                return res.send({result: false})
                            }
                        })
                    }
                }
            })
        } else{
            return res.status(422).send('Invalid request')
        }
    } catch (err) {
        return res.status(422).send(err.message);
    }
})

router.get("/user/:userID", requireAuth, async (req, res) => {
  try {
    User.findById(req.params.userID, (err, user) => {
      if (err) {
        return res.status(422).send(err.message);
      } else {
        res.send(user);
      }
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/createuserprofile", async (req, res) => {
  let newUserInfo = req.body;

  try {
    bcrypt.hash(newUserInfo.password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(422).send(err.message);
      } else {
        const user = new UserProfile({ ...newUserInfo, password: hash });
        await user.save();
        const token = jwt.sign({ userID: user._id }, "MY_SECRET_KEY");
        res.send({ token });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(422).send(err.message);
  }
});

router.post("/createuserid", async (req, res) => {
  const { conditions } = req.body;
  let password = (Math.random() + 1)
    .toString(36)
    .substring(7)
    .toString()
    .toUpperCase();

  const checkID = () => {
    User.find({ password }, function (err, result) {
      if (!result.length === 0) {
        password = (Math.random() + 1)
          .toString(36)
          .substring(7)
          .toString()
          .toUpperCase();
        checkID();
      }
    });
  };

  checkID();

  try {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new User({ conditions, password: hash });

        await user.save();

        const token = jwt.sign({ userID: user._id }, "MY_SECRET_KEY");
        res.send({ token, password });
      }
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
