var express = require('express');
var router = express.Router();
var flyerService = require('../Services/flyerService.js');

/* GET search page for recipes. */
router.route('/')
    .get(function(req, res, next) {
        flyerService.getAll(function(results){
            res.send(results);
        });
    })
;
router.route('/:searchterm')
    .get(function(req,res, next){
        flyerService.getOne(req, function(results){
            res.send(results);
        })
    })

module.exports = router;
/**
 * Created by Sam on 2017-03-25.
 */
