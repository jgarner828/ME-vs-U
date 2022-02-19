const { Scoreboard, Competition, User } = require("../../models");
const { sequelize } = require("../../models/User");
const router = require("express").Router();
const withAuth = require("../../utils/auth");

router.put('/updatescore', async (req, res) => {
  try {

    const scoreboard = await Scoreboard.increment('score', { by: req.body.quantity, where: { competition_id: req.body.competition_id, user_id: req.session.user_id,}});
    
    // Scoreboard.update(
    //   {
    //     score: sequelize.literal(score + req.body.quantity),
    //   },
    //    { where: {
    //       competition_id: req.body.competition_id,
    //       user_id: req.session.user_id,
    //     },
    //   },
    // );
    //res.status(200).json(scoreboard);
    console.log(scoreboard);
        res.json(scoreboard);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  
  try {
    const scoreboard = await Scoreboard.update(
      {
        isAccepted: req.body.isAccepted,
        isDeclined: req.body.isDeclined,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(scoreboard);
  } catch (err) {
    res.status(500).json(err);
  }
});





//Get Scoreboard
router.get('/:id', withAuth, async (req, res) => {
  console.log('competition id'+ req.params.competition_id);
  try {
    const scores = await Scoreboard.findByPk(req.params.id);
      // where: {
      //   user_id: 1,
      //   competition_id: req.params.competition_id
      // }
    // });


    if(!scores){
      res.status(500).json(`Not a valid request`);
    } else {
      const newScore = scores.get({ plain: true });
      const newcomp=JSON.stringify(newScore);


      res.render('displaycompetition', {competition});
    };


  } catch (error) {
    
  };
});


// TODO: THIS IS NOT currently working. it will not find the User table to get user ID from the table
router.post('/add', async (req, res) => {
  try {

    let { username, competition_id } = req.body;
    console.log(username)
    console.log(competition_id)

    const users = await User.findAll({
      where: {
        username: username,
      },
    });

    const userInfo = users.map((user) => user.get({ plain: true }));


    const addUsertoComp = await Scoreboard.create({
      user_id: userInfo[0].id,
      competition_id: competition_id,
    });

    if(!addUsertoComp) {
      res.status(500).json('Could not add user to the competition')
    } else {
      res.status(200).json(req.body)
    }

  } catch (error) {
    res.status(500).json(error)
  }
});
  
module.exports = router;