const router = require('express').Router();
const userRoutes = require('./userRoutes');
const competitionRoutes = require('./competitionRoutes')
const scoreboardRoutes = require('./scoreboardRoutes')

router.use('/users', userRoutes);
router.use('/competitions', competitionRoutes);
router.use('/scoreboard', scoreboardRoutes);


module.exports = router;