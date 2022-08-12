const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User, UserProfile } = require("../models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in" });
    }

    const userID = payload.userID;

    const user = await User.findOne({ _id: userID }, (err, user) => {
      req.user = user;
      next();
    }).clone();
  });
};
