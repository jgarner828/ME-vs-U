const { Scoreboard } = require("../../models");
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


  
  module.exports = router