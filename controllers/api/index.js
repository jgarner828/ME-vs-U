const router = require('express').Router();
const userRoutes = require('./userRoutes');
const competitionRoutes = require('./competitionRoutes')

router.use('/users', userRoutes);
router.use('/competitions', competitionRoutes)


module.exports = router;