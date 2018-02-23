var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/ideas');
var Idea = mongoose.model('ideas');


// Add idea form
router.get('/add', function (req, res) {
    res.render("ideas/add");
});

//Idea Index page
router.get('/', function (req, res) {
    Idea.find({})
        .sort({date:'descending'})
        .then(ideas => {
            res.render('ideas/index',
                {
                    ideas: ideas
                }
            );
        });
});

//Process form
router.post('/ideas', function (req, res) {
    // console.log(req.body);
    // res.render('ideas');
    var errors = [];
    if (!req.body.title) {
        errors.push({ text: 'Please add title' });
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add details' });
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    }
    else {
        var newUser = {
            title: req.body.title,
            details: req.body.details
        };
        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg','Video idea added');
                res.redirect('/ideas');
            });
    }
});

//Edit form Process
router.put('/:id',function(req,res){
    Idea.findOne({
        _id:req.params.id
    })
    .then(idea =>{
        idea.title = req.body.title;
        idea.details = req.body.details;

        idea.save()        
        .then(idea => {
            req.flash('success_msg','Video idea updated');
            res.redirect('/ideas');
        });
    });
});
//Edit form 
router.get('/edit/:id', function (req, res) {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {        
        res.render('ideas/edit',{
            idea: idea
        });
    });    
});

// Delete idea
router.delete('/:id',function(req,res){
    Idea.remove({_id : req.params.id})
    .then(function(){
        req.flash('success_msg','Video idea remove');
        res.redirect('/ideas');
    });
});


module.exports = router;