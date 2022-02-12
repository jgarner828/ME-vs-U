const router = require('express').Router();
const userRoutes = require('./userRoutes');


router.get('/users', userRoutes);



module.exports = router;