const express = require("express");
const { Treatment } = require("../models/Treatment");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/createnewtreatment", requireAuth, async (req, res) => {
  let newTreatment = req.body;

  try {
    const treatment = new Treatment({
      ...newTreatment,
      condition: req.user.conditions[0],
    });
    await treatment.save();

    res.send(treatment);
  } catch (err) {
    return res.status(422).send("Invalid treatment addition attempted");
  }
});

router.post("/addrating/:treatmentID", requireAuth, async (req, res) => {
  let rating = req.body.rating;

  try {
    await Treatment.findOneAndUpdate(
      { _id: req.params.treatmentID },
      { $push: { ratings: rating } }
    );

    res.send("Rating successfully added");
  } catch (err) {
    return res.status(422).send("Invalid rating addition attempted");
  }
});

router.get("/gettreatments", requireAuth, async (req, res) => {
  try {
    Treatment.find(
      { condition: req.user.conditions[0] },
      "treatment ratings",
      (err, treatments) => {
        if (err) {
          return res.status(422).send("Invalid query");
        } else {
          res.send(treatments);
        }
      }
    );
  } catch (err) {
    return res.status(422).send("Invalid query");
  }
});

module.exports = router;
