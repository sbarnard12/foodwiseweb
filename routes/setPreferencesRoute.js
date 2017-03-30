var express = require('express');
var router = express.Router();
var preferencesService = require('../Services/preferencesService');

    /* GET search page for recipes. */
router.get('/', function(req, res, next) {
    preferencesService.getPreferencesbyUserId(req.session.userId, function(preferences){
        res.render('setPreferences', {preferences: preferences, helpers: {if_eq: if_eq, ifIn: ifIn}});
    });
});
router.post('/', function(req,res,next){
    preferencesService.updatePreferences(req, function(result){
        res.send(result);
    });
});

var if_eq = function(a, b, opts) {
    //send this file into the view, in order to be able to use if clauses in the view file
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
};

var ifIn = function(elem, list, options){
    if(list.indexOf(elem) > -1) {
        return options.fn(this);
    }
    return options.inverse(this);
};

module.exports = router;
/**
 * Created by Brandon on 2017-03-25.
 */
