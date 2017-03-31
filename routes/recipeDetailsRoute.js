var express = require('express');
var router = express.Router();
var recipeService = require('../Services/recipeService.js');


/* GET home page. */
router.route('/')
    .get(function(req,res, next){
        res.render('recipeDetailsView');
    })
;

router.route('/:recipeId')
    .get(function(req,res,next){
        recipeService.getOne(req, function(result){
            res.render('recipeDetailsView', {recipe: result, layout:false})
        })
    })
;
module.exports = router;