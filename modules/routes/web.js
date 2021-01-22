const router = require('express').Router();

router.get('/', ((req, res) =>{
    res.json('Welcome to Home Page');
} ));

router.get('/about',((req, res) => {
    res.json('Welcome to about page');
}));


module.exports = router;

