const router = require("express").Router();
const { Scoreboard, Competition, User } = require("../models");
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [

        {
            model: Competition,
            attributes: ['id', 'title', 'start_date', 'end_date', 'winner','owner','isActive'],
          },
          {
            model: Scoreboard,
            attributes: ['id','user_id','competition_id'],
          },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
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
