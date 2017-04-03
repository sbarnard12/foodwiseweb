var express = require('express');
var router = express.Router();
var userService = require('../Services/userService.js');

/* GET home page. */
router.route('/')
	.get(function(req, res, next) {
 		res.render('signupView');
	})
	.post(function(req,res, next){
		userService.newUser(req.body, function(result){
            res.send(result);
        });
	})
;

module.exports = router;