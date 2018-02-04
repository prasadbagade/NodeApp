var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = 5000;

// Connect to mongoose
mongoose.connect('mongodb://qaz:qazqaz@ds223268.mlab.com:23268/mydb')
.then(function(){
    encodeURIComponent('prasad123');
    console.log("Mlab connected");
})
.catch(function(err){    
    console.log(err);
});

require('./models/ideas');
var Idea = mongoose.model('ideas');
// Handlebars Middleware
app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(port, function(){
    //console.log("server started on node"+ port);
});

app.get('/',function(req,res){    
    res.render("Index");
});


app.get('/About',function(req,res){
    res.render("about");
});

app.get('/register',function(req,res){
    res.render("resgister");
});

// Add idea form
app.get('/ideas/add',function(req,res){
    res.render("ideas/add");
});

//Process form
app.post('/ideas',function(req,res){
    // console.log(req.body);
    // res.render('ideas');
    var errors = [];
    if(!req.body.title){
        errors.push({text:'Please add title'});
    }
    if(!req.body.details)
    {
        errors.push({text:'Please add details'});
    }   
    if(errors.length > 0 ){
        res.render('ideas/add',{
            errors:errors,
            title:req.body.title,
            details:req.body.details
        });        
    }
    else{
        var newUser ={
            title:req.body.title,
            details:req.body.details
        };
       new Idea(newUser)
       .save()
       .then(idea =>{
           res.redirect('/ideas');
       });
    }
});

