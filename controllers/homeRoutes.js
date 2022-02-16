const router = require("express").Router();
const { Scoreboard, Competition, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to create competiton in handlebars
router.get("/createCompetition", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Competition }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
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

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
