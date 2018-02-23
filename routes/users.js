var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//User login Route 
router.get('/login',function(req,res){
    res.send("Login");
});


//User registeration Route
router.get('/register',function(req,res){
    res.send("register");
});


module.exports = router;
