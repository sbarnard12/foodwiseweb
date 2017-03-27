var express = require('express');
var router = express.Router();
var userService = require('../Services/userService.js');


/* GET home page. */
router.route('/')
    .get(function(req,res, next){
        res.render('login');
    })
    .post(function(req,res,next){
        userService.checkUser(req.body, res);
    })
;

module.exports = router;
