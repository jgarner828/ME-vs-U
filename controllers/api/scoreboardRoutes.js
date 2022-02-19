const { Scoreboard } = require("../../models");
const { sequelize } = require("../../models/User");
const router = require("express").Router();
const withAuth = require("../../utils/auth");

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


router.post('/updatescore', withAuth, async (req, res) => {

try {
// user id
const user_id = req.session.user_id;

// competition id
let competitionId = req.headers.referer;
let competitionToSplit = competitionId.split('competitions/');
let splitForId = competitionToSplit[1].split('?');
competitionId = splitForId[0];

// user score update
const { updateValue } = req.body;

const updateScore = await Scoreboard.update(
  { 
    score: sequelize.literal(`score + ${updateValue}`),
  },
   {
     where: {
          user: `${user_id}`,
          competition_id: `${competitionId}`,
          }
  });

  if(!updateScore) {
    res.status(500).json('Error updating score')
  } else {
    res.redirect('/');
  }


  
} catch (error) {
  res.status(500).json(error)
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
      console.log('this is my console log '+ newcomp);


      res.render('displaycompetition', {competition});
    };


  } catch (error) {
    
  };
});


  
module.exports = router;