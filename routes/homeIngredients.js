var express = require('express');
var router = express.Router();

/* GET search page for recipes. */
router.get('/', function(req, res, next) {
    res.render('searchRecipes', {});
});

module.exports = router;
/**
 * Created by Brandon on 2017-03-25.
 */
