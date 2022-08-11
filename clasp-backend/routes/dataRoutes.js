const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Treatment } = require("../models/Treatment");
const bcrypt = require("bcrypt");

const router = express.Router();

const saltRounds = 15;

router.post("/createnewtreatment", async (req, res) => {
  let newTreatment = req.body;

  const treatment = new Treatment(newTreatment);
  console.log(treatment);
  await treatment.save();

  res.send("Treatment added");
});

router.post("/addrating", async (req, res) => {
  let rating = req.body;

  rating = new Treatment(rating);
  await Treatment.findOneAndUpdate(
    { treatment: rating.treatment },
    { $push: { ratings: rating.ratings[0] } }
  );

  res.send("Rating added");
});

router.get("/gettreatments", async (req, res) => {
  Treatment.find({ condition: req.body.condition }, (err, treatments) => {
    if (err) {
      res.send("error");
    } else {
      res.send(treatments);
    }
  });
});

module.exports = router;
