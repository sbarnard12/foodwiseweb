var express = require('express');
var router = express.Router();
var homeIngredientsService = require('../Services/homeIngredientsService.js');

/* GET search page for recipes. */
router.get('/', function(req, res, next) {
    homeIngredientsService.getHomeIngredients(req, function(status, result){
        console.log("result printed in route"+ status);
        res.render('homeIngredients', {result:result});

    });
});

router.post('/', function(req, res, next) {
	//req.session.user
    homeIngredientsService.setHomeIngredients(req, function(result){
        console.log("result printed in route"+ result);
        res.send(result);
    });
});

module.exports = router;
/**
 * Created by Brandon on 2017-03-25.
 * Edited by Huzaifa on 2017-03-29
 */