const { Competition, User } = require("../../models");
const router = require("express").Router();
const withAuth = require("../../utils/auth");


router.get('/allcompetitions', async (req, res) => {
  try {
    const allCompetitions = await Competition.findAll({
      include: [{
        model: User,
        attributes: { exclude: ["password"] },
        }],
      order: [['id', 'DESC']],
    });

    if(!allCompetitions) {
      res.status(500).json('couldnt get competititons');
    } else {

      res.json(allCompetitions);
    }
  } catch (error) {
    
  }
})



router.post("/addcompetition", withAuth, async (req, res) => {
  try {
    const newCompetition = await Competition.create({
      title: req.body.title,
      category: req.body.category,
      rules: req.body.rules,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      reward: req.body.reward,
      quantity: req.body.quantity,
      uom: req.body.uom,
      isPublic: req.body.isPublic,
      owner: req.session.user_id,
      isActive:'true'
    });
    res.json(newCompetition);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const individualCompetition = await Competition.findByPk(req.params.id);
    if(! individualCompetition){
      res.status(500).json(`${req.params.id} is not a valid competition`);
    } else {

      const competition = individualCompetition.get({ plain: true });
      res.render('displaycompetition', {competition});
    }
  } catch (error) {
    
  }
})


module.exports = router