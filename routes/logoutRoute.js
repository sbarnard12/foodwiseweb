var express = require('express');
var router = express.Router();
var userService = require('../Services/userService.js');


/* GET home page. */
router.route('/')
    .get(function(req,res, next){
        userService.logoutUser(req, function(result){
            res.render('login');
        });
    })
;

module.exports = router;
