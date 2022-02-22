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


router.post('/add', async (req, res) => {
  try {

    let { userIds } = req.body;
    console.log(userIds)
    
    let competition_id = req.headers.referer;
    const myArray = competition_id.split("invitePeople/");
    competition_id = myArray[1];
    console.log(competition_id);


  userIds.forEach( async (user_id) => {
    const addUsertoScoreboard = await Scoreboard.create({ user_id, competition_id, score: 0, isAccepted: false, isDeclined: false});
      if(!addUsertoScoreboard) {
        console.log(`Failed to add User_id ${user_id} to ${competition_id}`)
      } else {
        console.log(`Added User_id ${user_id} to ${competition_id}.`)
      }
  });


    res.render('dashboard');

  } catch (error) {
    res.status(500).json(error)
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



module.exports = router;