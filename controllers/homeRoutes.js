const router = require('express').Router();


router.get('/', async (req, res) => {
    try {
        res.render('homepage',{
            logged_in: req.session.logged_in
        }
        );

    } catch (error) {
        res.status(500).json(error);
    }

})

router.get('/login', (req, res)=> {

if (req.session.logged_in){
    res.redirect('/');
    return;
}
res.render('login');
});



module.exports = router;