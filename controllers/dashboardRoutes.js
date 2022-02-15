const router = require("express").Router();
const { Scoreboard, Competition, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.render("dashboard", {
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/hydration", async (req, res) => {
  try {
    const scoreboardData = await Scoreboard.findByPk(req.session.user_id, {
      include: [
        {
          model: Competition,
          attributes: ["title"],
        },
      ],
    });

    const hydration = scoreboardData.get({ plain: true });

    res.render("hydration", {
      ...hydration,
      logged_in: req.session.logged_in,
    });
    console.log(scoreboardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/daily-steps", async (req, res) => {
  try {
    const scoreboardData = await Scoreboard.findByPk(req.session.user_id, {
      include: [
        {
          model: Competition,
          attributes: ["title"],
        },
      ],
    });

    const dailysteps = scoreboardData.get({ plain: true });

    res.render("dailysteps", {
      ...dailysteps,
      logged_in: req.session.logged_in,
    });
    console.log(scoreboardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/weekly-miles", async (req, res) => {
  try {
    const scoreboardData = await Scoreboard.findByPk(req.session.user_id, {
      include: [
        {
          model: Competition,
          attributes: ["title"],
        },
      ],
    });

    const weeklymiles = scoreboardData.get({ plain: true });

    res.render("weeklymile", {
      ...weeklymiles,
      logged_in: req.session.logged_in,
    });
    console.log(scoreboardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
