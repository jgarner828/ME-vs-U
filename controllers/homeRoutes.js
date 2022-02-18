const router = require("express").Router();
const { Scoreboard, Competition, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
    } else {
      res.render("homepage", {
        logged_in: req.session.logged_in,
      });
    }
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

    res.render("createCompetition", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/invitePeople", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const usersData = await User.findAll({});
    // Serialize data so the template can read it
    const Users = usersData.map((User) => User.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("invitePeople", {
      Users,
      logged_in: req.session.logged_in,
    });
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
