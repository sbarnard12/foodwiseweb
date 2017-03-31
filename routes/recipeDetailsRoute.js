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
            res.render('recipeDetailsView', {recipe: result, layout:false, helpers: {if_eq: if_eq}})
        })
    })
;

var if_eq = function(a, b, opts) {
    //send this file into the view, in order to be able to use if clauses in the view file
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
};


module.exports = router;


