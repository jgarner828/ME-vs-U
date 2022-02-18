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
  { score: sequelize.literal(`score + ${updateValue}`) },
   { where: {
          user: `${user_id}`,
          competition_id: `${competitionId}`,
          }
  })

  if(!updateScore) {
    res.status(500).json('Error updating score')
  } else {
    res.redirect('/');
  }


  
} catch (error) {
  res.status(500).json(error)
}



});
  
  module.exports = router