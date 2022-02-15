const { Competition } = require("../../models");
const router = require("express").Router();
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newCompetition = await Competition.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      duration: req.body.duration,
      reward: req.body.reward,
      quantity: req.body.quantity,
      uom: req.body.uom,
      isPublic: req.body.isPublic,
      owner: req.session.user_id,
    });
    res.json(newCompetition);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router