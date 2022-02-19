const { render } = require("express/lib/response");
const { Competition, User, Scoreboard } = require("../../models");
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
    console.log(res.body)
    const newCompetition = await Competition.create({
      title: req.body.title,
      category: req.body.category,
      rules: req.body.rules,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      reward: req.body.reward,
      quantity: req.body.quantity,
      uom: req.body.uom,
      owner: req.session.user_id,
      isActive:'true'
    });
    if(!newCompetition) {
      res.status(500).json('Error creating competition')
    } else {
      console.log('supposed to render invitePeople')
      res.redirect('/');
    }


  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


router.get('/:id', withAuth, async (req, res) => {
  try {


    const individualCompetition = await Competition.findByPk(req.params.id, {
      include: [


          {
            model: Scoreboard,
            attributes: ['id','user_id','competition_id','score'],
            include: [{model: User, attributes: ['id','username']}],
          },
      ],
    });


    if(! individualCompetition){
      res.status(500).json(`${req.params.id} is not a valid competition`);
    } else {
      const competition = individualCompetition.get({ plain: true });
      const newcomp=JSON.stringify(competition);
      console.log('this is my console log '+ newcomp);


      res.render('displaycompetition', {competition});
    }


  } catch (error) {
    
  }
})


module.exports = router