const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require("../../utils/auth");

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


router.get('/adduser', (req, res) => {
  try {
    res.render('createuser');
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post("/adduser",  async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.newUsername,
      email: req.body.newEmail,
      password: req.body.newPassword,
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});


router.get('/all', withAuth, async (req, res) => {

  try {
    let allUsers = await User.findAll({exclude: ['password']});


    let usernames = await allUsers.map( (element) => {
    return element.username
    });

    console.log(usernames)

    res.render('invitePeople', {usernames});

  } catch (error) {
    res.status(500).json(error);
    
  }

})
module.exports = router;