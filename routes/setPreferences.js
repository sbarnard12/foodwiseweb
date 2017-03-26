var express = require('express');
var router = express.Router();

/* GET search page for recipes. */
router.get('/', function(req, res, next) {
    res.render('setPreferences', {});
});
router.post('/', function(req,res,next){
    preferencesService.savenew(req, function(){});
})

module.exports = router;
/**
 * Created by Brandon on 2017-03-25.
 */
