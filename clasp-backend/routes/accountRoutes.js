const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { User, UserProfile } = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

const saltRounds = 15;

router.post("/createuserprofile", async (req, res) => {
  let newUserInfo = req.body;

  try {
    bcrypt.hash(newUserInfo.password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserProfile({ ...newUserInfo, password: hash });
        await user.save();
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
        res.send({ token });
      }
    });
  } catch (err) {
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
