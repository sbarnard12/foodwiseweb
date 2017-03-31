var express = require('express');
var router = express.Router();
var saleItemService = require('../Services/saleItemsService');

/* GET search page for recipes. */
router.route('/')
    .get(function(req, res, next) {
        res.render('viewSalesView', {});
    })
    .post(function(req,res, next){
        saleItemService("",req, function(result){
            res.send("stuff");
        })
    })
;
router.route('/:searchterm')
    .post(function(req,res, next){
        saleItemService(req.params.searchterm, req, function(result){
            res.send("things");
        })
    })
;

module.exports = router;
/**
 * Created by Brandon on 2017-03-25.
 */
