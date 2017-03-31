var express = require('express');
var router = express.Router();
var saleItemService = require('../Services/saleItemsService');

/* GET search page for recipes. */
router.route('/')
    .get(function(req, res, next) {
        res.render('viewSalesView', {});
    })
    .post(function(req,res, next){
        saleItemService.searchSaleItems("",req, function(result){
            res.render('partials/itemList', {itemList: result, layout: false});
        })
    })
;
router.route('/:searchterm')
    .post(function(req,res, next){
        saleItemService.searchSaleItems(req.params.searchterm, req, function(result){
            res.render('partials/itemList', {itemList: result, layout:false});
        })
    })
;

module.exports = router;
/**
 * Created by Brandon on 2017-03-25.
 */
