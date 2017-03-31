var express = require('express');
var router = express.Router();
var recipeService = require('../Services/recipeService.js');

/* GET search page for recipes. */
router.route('/')
    .get(function(req, res, next) {
        recipeService.getSearch(req, function(results){
            res.render('partials/recipeList', {recipeList: results.matches, layout:false, helpers: {paginate: paginate}});
        });
    })
;
router.route('/:searchterm')
    .get(function(req,res, next){
        recipeService.getSearch(req, function(results){
            res.render('partials/recipeList', {recipeList: results.matches, layout:false, helpers: {paginate: paginate}});
        })
    })
;

var paginate = function(value, options) {
    return parseInt((value/5)+1);
};

module.exports = router;
/**
 * Created by Sam on 2017-03-25.
 */
