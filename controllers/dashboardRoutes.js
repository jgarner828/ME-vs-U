const router = require("express").Router();
const { json } = require("express/lib/response");
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
            attributes: ['id','user_id','competition_id','isAccepted', 'isDeclined'],
            include: [{model: Competition, attributes: ['title','winner','isActive','reward']}],
          },
      ],
    });

    const user = userData.get({ plain: true });
    const newUser=JSON.stringify(user);
    console.log(newUser);

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
